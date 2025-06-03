(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.BeekeeperStudioPlugin = {}));
})(this, (function (exports) { 'use strict';

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
        if (undefined?.MODE === "development") {
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

    exports.addNotificationListener = addNotificationListener;
    exports.notify = notify;
    exports.request = request;
    exports.setDebugComms = setDebugComms;

}));
//# sourceMappingURL=index.umd.js.map
