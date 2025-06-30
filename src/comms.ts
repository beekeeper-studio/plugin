import type { PluginRequestPayload } from "./requestTypes";
import { generateUUID } from "./utils";

// Define a custom import.meta interface for TypeScript
declare global {
  interface ImportMeta {
    env: {
      MODE: string;
    };
  }
}

const pendingRequests = new Map<
  string,
  {
    // The whole payload is kept just in case for debugging
    payload: PluginRequestPayload;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  }
>();

let debugComms = false;

export function setDebugComms(value: boolean) {
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
    const { resolve, reject, payload } = pendingRequests.get(id)!;
    pendingRequests.delete(id);

    if (debugComms) {
      const time = new Date().toLocaleTimeString("en-GB");
      console.groupCollapsed(`${time} [RESPONSE] ${payload.name}`);
      console.log("Result:", result);
      if (error) console.error("Error:", error);
      console.groupEnd();
    }

    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  }
});

export async function request(payload: any): Promise<any> {
  const fullPayload = {
    id: generateUUID(),
    ...payload,
  } as PluginRequestPayload;

  if (debugComms) {
    const time = new Date().toLocaleTimeString("en-GB");
    console.groupCollapsed(`${time} [REQUEST] ${payload.name}`);
    console.log("Args:", payload.args);
    console.groupEnd();
  }

  return new Promise<any>((resolve, reject) => {
    try {
      pendingRequests.set(fullPayload.id, { payload: fullPayload, resolve, reject });
      window.parent.postMessage(payload, "*");
    } catch (e) {
      reject(e);
    }
  });
}

export function notify(name: string, args: any) {
  if (debugComms) {
    const time = new Date().toLocaleTimeString("en-GB");
    console.groupCollapsed(`${time} [NOTIFICATION] ${name}`);
    console.log("Args:", args);
    console.groupEnd();
  }
  window.parent.postMessage({ name, args }, "*");
}

const notificationListeners = new Map<string, ((args: any) => void)[]>();

export async function addNotificationListener(
  name: string,
  handler: (args: any) => void,
) {
  if (!notificationListeners.get(name)) {
    notificationListeners.set(name, []);
  }
  notificationListeners.get(name)!.push(handler);
}
