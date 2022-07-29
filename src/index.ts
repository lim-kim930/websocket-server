import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({
    port: 3001,
    //   perMessageDeflate: {
    //     zlibDeflateOptions: {
    //       // See zlib defaults.
    //       chunkSize: 1024,
    //       memLevel: 7,
    //       level: 3
    //     },
    //     zlibInflateOptions: {
    //       chunkSize: 10 * 1024
    //     },
    //     // Other options settable:
    //     clientNoContextTakeover: true, // Defaults to negotiated value.
    //     serverNoContextTakeover: true, // Defaults to negotiated value.
    //     serverMaxWindowBits: 10, // Defaults to negotiated value.
    //     // Below options specified as default values.
    //     concurrencyLimit: 10, // Limits zlib concurrency for perf.
    //     threshold: 1024 // Size (in bytes) below which messages
    //     // should not be compressed if context takeover is disabled.
    //   }
});

wss.on("listening", () => {
    console.log("serve is running on 3001");
});

wss.on('connection', (client, req) => {
    console.log(req.headers.origin! + " 连接成功");
    client.on("message", (data) => {
        console.log("msg", data.toString());
        // console.log(JSON.parse(data.toString()));
        setInterval(() => {
            client.send("6666666");
        }, 1000)
    });
});