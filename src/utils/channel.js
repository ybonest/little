const { ipcRenderer } = require("electron");

export async function getSources() {
    return await ipcRenderer.invoke('get-markdown-path');
}

export async function getMdContent(path) {
    return await ipcRenderer.invoke('get-markdown-content', path);
}

export async function getAppConfig() {
    return await ipcRenderer.invoke('get-app-config');
}


export async function setAppConfig(config) {
    return await ipcRenderer.invoke('set-app-config', config);
}

export function injectSettingIpc(callback) {
    ipcRenderer.on('redirect-to-setting', () => {
        console.log("node 00000")
        if (typeof callback === 'function') {
            callback();
        }
    })
}