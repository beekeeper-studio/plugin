import { JsonValue } from "./commonTypes";
import {
  BroadcastNotification,
  PluginErrorNotification,
  ThemeChangedNotification,
  ViewLoadedNotification,
  WindowEventNotification,
} from "./notificationTypes";
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

export async function request(raw: any): Promise<any> {
  const payload = { id: generateUUID(), ...raw } as PluginRequestPayload;

  if (debugComms) {
    const time = new Date().toLocaleTimeString("en-GB");
    console.groupCollapsed(`${time} [REQUEST] ${payload.name}`);
    console.log("id:", payload.id);
    console.log("args:", payload.args);
    console.log("payload:", payload);
    console.groupEnd();
  }

  return new Promise<any>((resolve, reject) => {
    try {
      pendingRequests.set(payload.id, { payload: payload, resolve, reject });
      window.parent.postMessage(payload, "*");
    } catch (e) {
      reject(e);
    }
  });
}

export function notify<Message extends JsonValue = JsonValue>(
  name: BroadcastNotification["name"],
  args: BroadcastNotification<Message>["args"],
): void;
export function notify(
  name: PluginErrorNotification["name"],
  args: PluginErrorNotification["args"],
): void;
export function notify(
  name: WindowEventNotification["name"],
  args: WindowEventNotification["args"],
): void;
export function notify(name: string, args: any) {
  const payload = { name, args };
  if (debugComms) {
    const time = new Date().toLocaleTimeString("en-GB");
    console.groupCollapsed(`${time} [NOTIFICATION] ${name}`);
    console.log("args:", args);
    console.log("payload:", payload);
    console.groupEnd();
  }
  window.parent.postMessage(payload, "*");
}

const notificationListeners = new Map<string, ((args: any) => void)[]>();

export function addNotificationListener<Message extends JsonValue = JsonValue>(
  name: BroadcastNotification["name"],
  handler: (args: BroadcastNotification<Message>["args"]) => void,
): void;
export function addNotificationListener(
  name: ViewLoadedNotification["name"],
  handler: (args: ViewLoadedNotification["args"]) => void,
): void;
export function addNotificationListener(
  name: ThemeChangedNotification["name"],
  handler: (args: ThemeChangedNotification["args"]) => void,
): void;
export function addNotificationListener(
  name: string,
  handler: (args: any) => void,
) {
  if (!notificationListeners.get(name)) {
    notificationListeners.set(name, []);
  }
  notificationListeners.get(name)!.push(handler);
}

export function removeNotificationListener(
  name: string,
  handler: (args: any) => void,
) {
  const handlers = notificationListeners.get(name);
  if (handlers) {
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}
