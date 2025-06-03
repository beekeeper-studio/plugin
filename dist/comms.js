import { requestDevMode } from "./devComms";
const pendingRequests = new Map();
let debugComms = false;
export function setDebugComms(value) {
    debugComms = value;
}
window.addEventListener("message", (event) => {
    const { id, name, args, result, error } = event.data || {};
    if (name) {
        if (debugComms) {
            const time = new Date().toLocaleTimeString("en-GB");
            console.groupCollapsed(`${time} [NOTIFICATION] ${name}`);
            console.log("Args:", args);
            console.groupEnd();
        }
        const handlers = notificationListeners.get(name);
        if (handlers) {
            handlers.forEach((handler) => handler(args));
        }
    }
    if (id && pendingRequests.has(id)) {
        const { resolve, reject, name } = pendingRequests.get(id);
        pendingRequests.delete(id);
        if (debugComms) {
            const time = new Date().toLocaleTimeString("en-GB");
            console.groupCollapsed(`${time} [RESPONSE] ${name}`);
            console.log("Result:", result);
            if (error)
                console.error("Error:", error);
            console.groupEnd();
        }
        if (error) {
            reject(error);
        }
        else {
            resolve(result);
        }
    }
});
export async function request(name, args) {
    if (import.meta.env?.MODE === "development") {
        const result = await requestDevMode(name, args);
        // console.log("result", result);
        return result;
    }
    if (debugComms) {
        const time = new Date().toLocaleTimeString("en-GB");
        console.groupCollapsed(`${time} [REQUEST] ${name}`);
        console.log("Args:", args);
        console.groupEnd();
    }
    return new Promise((resolve, reject) => {
        try {
            const id = crypto.randomUUID();
            const data = { id, name, args };
            pendingRequests.set(id, { name: name, resolve, reject });
            window.parent.postMessage(data, "*");
        }
        catch (e) {
            reject(e);
        }
    });
}
export function notify(name, args) {
    if (debugComms) {
        const time = new Date().toLocaleTimeString("en-GB");
        console.groupCollapsed(`${time} [NOTIFICATION] ${name}`);
        console.log("Args:", args);
        console.groupEnd();
    }
    window.parent.postMessage({ name, args }, "*");
}
const notificationListeners = new Map();
export async function addNotificationListener(name, handler) {
    if (!notificationListeners.get(name)) {
        notificationListeners.set(name, []);
    }
    notificationListeners.get(name).push(handler);
}
