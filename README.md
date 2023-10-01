# 3h-sse

> A simple lib for server-sent events in NodeJS.

## Example

Here's an example SSE server
which emits an event periodically
and sends a ping message every 10 seconds.

```js
const http = require('http');
const SSE = require('3h-sse');

const backendAdaptor = new SSE.NodeJSAdaptor();
const sseController = new SSE.SSEController({
    backendAdaptor,
    pingInterval: 10_000,
    pingText: ')',
});

const server = http.createServer((req, res) => {
    backendAdaptor.addResponse(res);
    res.once('close', () => {
        backendAdaptor.responses.delete(res);
    });
});

setInterval(() => {
    sseController.sendEvent('name', 'data');
}, 1000);

sseController.start();
server.once('close', () => {
    backendAdaptor.clear();
    sseController.stop();
});
```

## Links

- [API Reference](https://github.com/huang2002/3h-sse/wiki)
- [Changelog](./CHANGELOG.md)
- [License (ISC)](./LICENSE)
