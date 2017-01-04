// const express = require('express')
// const path = require('path')
const port = process.env.PORT || 8888
// const app = express()

// app.use('/assets', express.static(path.join(__dirname, 'dist/assets')))

// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, 'dist/index.html'))
// })

// app.listen(port)

const liveServer = require('live-server');

const params = {
    port: port, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./dist", // Set root directory that's being server. Defaults to cwd.
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    logLevel: 1, // 0 = errors only, 1 = some, 2 = lots
    open: false,
};
liveServer.start(params);

console.info(`Listening on localhost:${port}`)