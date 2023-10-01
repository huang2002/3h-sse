// @ts-check
const http = require('http');
const SSE = require('..');

const PORT = 8888;

/**
 * @type {import('3h-test').TestCaseCallback}
 */
module.exports = (ctx) => (
    new Promise((resolve) => {

        const backendAdaptor = new SSE.NodeJSAdaptor();
        const sseController = new SSE.SSEController({
            backendAdaptor,
            pingInterval: 100,
            pingText: 'smart-ping',
        });

        sseController.start();

        const server = http.createServer((req, res) => {
            backendAdaptor.addResponse(res);
        });
        server.listen(PORT);

        let clientData = '';
        const client = http.get(`http://localhost:${PORT}/`);
        client.on('response', (res) => {
            res.on('data', (chunk) => {
                clientData += chunk.toString();
            });
            res.once('end', () => {
                ctx.assertStrictEqual(clientData, EXPECTED_DATA);
                resolve();
            });
        });
        client.end();

        setTimeout(() => {
            sseController.sendVerbatim(':50\n');
        }, 50);

        setTimeout(() => {
            sseController.sendEvent('E_120');
        }, 120);

        setTimeout(() => {
            sseController.sendEvent('E_150', 'D_150');
        }, 150);

        setTimeout(() => {
            sseController.stop();
            backendAdaptor.clear();
            server.close();
        }, 280);

        const EXPECTED_DATA = [
            ':50',
            'event: E_120',
            '',
            'event: E_150',
            'data: D_150',
            '',
            ':smart-ping',
            '',
        ].join('\n');

    })
);
