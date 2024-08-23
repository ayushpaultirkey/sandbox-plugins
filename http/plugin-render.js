import { ipcRenderer } from "electron/renderer";


export default {
    http: {
        createServer: async function(httpApp) {

            try {

                const id = await ipcRenderer.invoke("http-createServer", httpApp.__id);

                return {
                    __id: id,
                    listen: async function(port = 2500, callback) {

                        ipcRenderer.on("http-serverResponse", callback);

                        await ipcRenderer.invoke("http-serverListen", port, httpApp.__id, id);

                    }
                }

            }
            catch(error) {
                throw error;
            };

        }
    }
}