import { ipcMain,  } from "electron";
import http from "http";
import crypto from "crypto";
import storage from "../.bucket/storage.js";

ipcMain.handle("http-createServer", async(event, httpId) => {
    try {

        const app = storage.get(httpId);

        if(!app) {
            throw new Error("Invalid http object");
        }

        const serverId = crypto.randomUUID();
        const server = http.createServer(app);
        storage.set(serverId, server);

        return serverId;

    }
    catch(error) {
        throw error;
    }
});
ipcMain.handle("http-serverListen", async(event, port = 2500, httpId, serverId) => {
    try {

        const app = storage.get(httpId);
        const server = storage.get(serverId);

        if(!app && !server) {
            throw new Error("Invalid http or server object");
        }

        server.listen(port, () => {
            event.sender.send("http-serverResponse");
        });

    }
    catch(error) {
        throw error;
    }
});


export default ipcMain;