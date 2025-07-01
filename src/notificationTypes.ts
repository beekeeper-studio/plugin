import { ThemeType, WindowEventInits, WindowEventClass } from "./commonTypes";

export interface ThemeChangedNotification {
  name: "themeChanged";
  args: {
    palette: Record<string, string>;
    cssString: string;
    type: ThemeType;
  };
}

export interface WindowEventNotification {
  name: "windowEvent";
  args: {
    eventType: string;
    eventClass: WindowEventClass;
    eventInitOptions: WindowEventInits;
  };
}

export interface PluginErrorNotification {
  name: "pluginError";
  args: {
    name?: string;
    message?: string;
    stack?: string;
  };
}

export type PluginNotificationData =
  | ThemeChangedNotification
  | WindowEventNotification
  | PluginErrorNotification;
