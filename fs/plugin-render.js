import { ipcRenderer } from "electron/renderer";

export default {
    fs: {
        readFile: async(filePath = "", encoding = "utf-8") => {
            try {
                return await ipcRenderer.invoke("fs-readFile", filePath, encoding);
            }
            catch(error) {
                throw error;
            };
        },
        access: async(filePath = "", mode) => {
            try {
                return await ipcRenderer.invoke("fs-access", filePath, mode);
            }
            catch(error) {
                throw error;
            };
        }
    }
}