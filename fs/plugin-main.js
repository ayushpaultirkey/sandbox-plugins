import { ipcMain } from "electron";
import fs from "fs/promises";

ipcMain.handle("fs-readFile", async(event, filePath, encoding = "utf-8") => {
    try {
        const data = await fs.readFile(filePath, encoding);
        return data;
    }
    catch(error) {
        throw error;
    }
});
ipcMain.handle("fs-access", async(event, filePath, mode) => {
    try {
        await fs.access(filePath, mode);
        return true;
    }
    catch(error) {
        throw error;
    }
});

export default ipcMain;