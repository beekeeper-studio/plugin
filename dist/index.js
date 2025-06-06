const responses = {
    getConnectionInfo: {
        connectionType: "sqlite",
        readOnlyMode: false,
        databaseName: "db.sqlite",
        defaultSchema: "",
    },
    getTables: [{ name: "countries" }, { name: "users" }],
    getColumns: [
        {
            name: "id",
            type: "integer",
        },
    ],
    getAllTabs: [],
    runQuery: {
        results: [
            {
                fields: [{ id: "id", name: "id", dataType: "integer" }],
                rows: [],
            },
        ],
    },
    expandTableResult: undefined,
    setTabTitle: undefined,
};
async function request$1(name, args) {
    if (name === "setTabTitle") {
        document.title = args.title || "Plugin";
        return responses["setTabTitle"];
    }
    return responses[name];
}

function generateUUID() {
    const buf = new Uint8Array(16);
    crypto.getRandomValues(buf);
    buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
    buf[8] = (buf[8] & 0x3f) | 0x80; // variant
    const hex = Array.from(buf, (b) => b.toString(16).padStart(2, "0")).join("");
    return [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20),
    ].join("-");
}

const pendingRequests = new Map();
let debugComms = false;
function setDebugComms(value) {
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
async function request(name, args) {
    if (import.meta.env?.MODE === "development") {
        const result = await request$1(name, args);
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
            const id = generateUUID();
            const data = { id, name, args };
            pendingRequests.set(id, { name: name, resolve, reject });
            window.parent.postMessage(data, "*");
        }
        catch (e) {
            reject(e);
        }
    });
}
function notify(name, args) {
    if (debugComms) {
        const time = new Date().toLocaleTimeString("en-GB");
        console.groupCollapsed(`${time} [NOTIFICATION] ${name}`);
        console.log("Args:", args);
        console.groupEnd();
    }
    window.parent.postMessage({ name, args }, "*");
}
const notificationListeners = new Map();
async function addNotificationListener(name, handler) {
    if (!notificationListeners.get(name)) {
        notificationListeners.set(name, []);
    }
    notificationListeners.get(name).push(handler);
}

export { addNotificationListener, notify, request, setDebugComms };
//# sourceMappingURL=index.js.map
