const http = require('http');
const app = require('../dist/server');

const server = http.createServer(app);
let currentApp = app;

server.listen(3000);

if (module.hot) {
    module.hot.accept('../dist/server', () => {
        server.removeListener('request', currentApp);
        console.log('Server hot reload');
        server.on('request', app);
        currentApp = app;
    })
}