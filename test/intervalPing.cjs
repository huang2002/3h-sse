// @ts-check
const http = require('http');
const SSE = require('..');

const PORT = 8888;

/**
 * @type {import('3h-test').TestCaseCallback}
 */
module.exports = (ctx) => (
    new Promise((resolve) => {

        const backend = new SSE.NodeJSBackend();
        const sseController = new SSE.SSEController({
            backend,
            pingInterval: 101,
            smartPing: false,
        });

        sseController.start();

        const server = http.createServer((req, res) => {
            backend.addResponse(res);
            setTimeout(() => {
                backend.removeResponse(res);
                res.end();
            }, 240);
        });
        server.listen(PORT);

        let clientData = '';
        const client = http.get(`http://localhost:${PORT}/`);
        client.on('response', (res) => {
            res.on('data', (chunk) => {
                clientData += chunk.toString();
            });
        });
        client.end();

        setTimeout(() => {
            sseController.sendVerbatim(':60\n');
        }, 60);

        setTimeout(() => {
            sseController.sendEvent('E_120');
        }, 120);

        setTimeout(() => {
            sseController.sendEvent('E_180', 'a\nb');
        }, 180);

        setTimeout(() => {

            sseController.stop();
            backend.clear();
            server.close();

            ctx.assertStrictEqual(clientData, EXPECTED_DATA);
            resolve();

        }, 320);

        const EXPECTED_DATA = [
            ':60',
            ':ping',
            'event: E_120',
            '',
            'event: E_180',
            'data: a',
            'data: b',
            '',
            ':ping',
            '',
        ].join('\n');

    })
);
