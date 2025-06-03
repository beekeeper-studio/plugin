const pendingRequests = new Map();
window.addEventListener("message", (event) => {
    const { id, name, args, result, error } = event.data || {};
    if (name) {
        const handlers = notificationListeners.get(name);
        if (handlers) {
            handlers.forEach((handler) => handler(args));
        }
    }
    if (id && pendingRequests.has(id)) {
        const { resolve, reject, name } = pendingRequests.get(id);
        pendingRequests.delete(id);
        if (error) {
            reject(error);
        }
        else {
            resolve(result);
        }
    }
});
function notify(name, args) {
    window.parent.postMessage({ name, args }, "*");
}
const notificationListeners = new Map();

/** Any events that need to be forwarded to parent/plugin system
 * must go here */
/** FIXME this file must be injected from the plugin system automatically */
function createEventInit(event) {
    if (event instanceof MouseEvent) {
        const eventInitOptions = {
            clientX: event.clientX,
            clientY: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            button: event.button,
            buttons: event.buttons,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            movementX: event.movementX,
            movementY: event.movementY,
            detail: event.detail,
        };
        return {
            eventClass: "MouseEvent",
            eventInitOptions,
        };
    }
    if (event instanceof PointerEvent) {
        const eventInitOptions = {
            clientX: event.clientX,
            clientY: event.clientY,
            screenX: event.screenX,
            screenY: event.screenY,
            button: event.button,
            buttons: event.buttons,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            movementX: event.movementX,
            movementY: event.movementY,
            detail: event.detail,
            pointerId: event.pointerId,
            pointerType: event.pointerType,
            isPrimary: event.isPrimary,
        };
        return {
            eventClass: "PointerEvent",
            eventInitOptions,
        };
    }
    if (event instanceof KeyboardEvent) {
        const isPasswordField = event.target?.type === "password";
        if (isPasswordField) {
            // Avoid logging keystrokes from password fields
            return {
                eventClass: "KeyboardEvent",
                eventInitOptions: {},
            };
        }
        const eventInitOptions = {
            key: event.key,
            code: event.code,
            keyCode: event.keyCode,
            location: event.location,
            altKey: event.altKey,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey,
            repeat: event.repeat,
            isComposing: event.isComposing,
        };
        return {
            eventClass: "KeyboardEvent",
            eventInitOptions,
        };
    }
    return {
        eventClass: "Event",
        eventInitOptions: {},
    };
}
const forwardedEvents = [
    "contextmenu",
    "click",
    "dblclick",
    "pointercancel",
    "pointerdown",
    "pointerenter",
    "pointerleave",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "mousedown",
    "mouseenter",
    "mouseleave",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "keydown",
    "keypress",
    "keyup",
];
forwardedEvents.forEach((eventType) => {
    document.addEventListener(eventType, (event) => {
        const eventInit = createEventInit(event);
        notify("windowEvent", {
            eventType,
            eventClass: eventInit.eventClass,
            eventInitOptions: eventInit.eventInitOptions,
        });
    });
});
//# sourceMappingURL=eventForwarder.js.map
