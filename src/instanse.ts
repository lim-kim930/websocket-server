import EventEmitter from "events"

// const socket = new WebSocket(webSocketUrl);

export interface Response {
    info_name: string;
    [key: string]: any;
}

class AppSocket extends EventEmitter {
    socket: WebSocket;
    constructor(webSocketUrl: string) {
        super();
        this.socket = new WebSocket(webSocketUrl);
        this.socket.onmessage = (res) => {
            console.log(res);
            try {
                const data = JSON.parse(res.data);
                this.emit(data.info_name, data)
            } catch (error) {
                console.error(error);
            }
        }
    }
    socketOpend() {
        return new Promise((resolve, reject) => {
            this.socket.onopen = () => {
                console.log("websocket connected");
                resolve(true);
            }
            this.socket.onerror = (err) => {
                reject(err);
            }
        })
    }
    send(command: string, data?: object) {
        const stringData = JSON.stringify({
            command,
            ...data
        })
        this.socket.send(stringData);
    }
}

// const socketOpend = () => {
//     return new Promise((resolve, reject) => {
//         socket.onopen = () => {
//             console.log("websocket connected");
//             resolve(true);
//         }
//         socket.onerror = (err) => {
//             reject(err);
//         }
//     })
// }

// const sendSocketAsync = (command: string, info_name: string, data?: object) => {
// const stringData = JSON.stringify({
//     command,
//     ...data
// })
// socket.send(stringData);
//     return new Promise((resolve, reject)=>{
//         socket.onmessage = (res) => {
//             console.log(res);
// try {
//     const data = JSON.parse(res.data);
//     if(data.info_name === info_name) {
//         resolve(data);
//     }
// } catch (error) {
//     console.error(error);
//     reject(error);
// }
//         }
//     })
// }

// const sendSocket = (command: string, data?: object) => {
//     const stringData = JSON.stringify({
//         command,
//         ...data
//     })
//     socket.send(stringData);
// }

// const startServe = () => {
//     sendSocket("start");
// }
// const stopServe = () => {
//     sendSocket("stop");
// }
// const getSettings = () => {
//     sendSocket("get_settings");
// }
// const updateSettings = (settings: { ip?: string, port?: string, rootdir?: string }) => {
//     sendSocket("update_settings", { settings });
// }



// socket.onmessage = (res) => {
//     console.log(res);

//     try {
//         const data = JSON.parse(res.data);
//         switch (data.info_name) {
//             case "start":
//                 store.setServeStatus(true);
//                 break;
//             case "stop":
//                 store.setServeStatus(false);
//                 break;
//             case "get_settings":
//                 store.setSettings(data);
//                 break;

//             case "new_client":
//                 store.addClient({
//                     id: store.clients.length + 1,
//                     ip: data.ip
//                 })
//                 store.addResult({
//                     id: store.results.length + 1,
//                     msg: "fffff",
//                     format: "QR"
//                 })
//                 break;
//             case "history":
//                 store.addClient({
//                     id: store.clients.length + 1,
//                     ip: data.ip
//                 })
//                 break;

//             default:
//                 break;
//         }
//     } catch (error) {
//         console.error(error);

//     }
// }

// export { socketOpend, startServe, stopServe, getSettings, updateSettings }
// export { socketOpend, sendSocketAsync }

// export default socket; 
export default AppSocket; 