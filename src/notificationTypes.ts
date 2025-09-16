import {
  ThemeType,
  WindowEventInits,
  WindowEventClass,
  JsonValue,
  CellMenuParams,
  CornerMenuParams,
  RowMenuParams,
  ColumnMenuParams,
} from "./commonTypes";

export type AppTheme = {
  palette: Record<string, string>;
  cssString: string;
  type: ThemeType;
};

export type ThemeChangedNotification = {
  name: "themeChanged";
  args: AppTheme;
};

export type WindowEventNotification = {
  name: "windowEvent";
  args: {
    eventType: string;
    eventClass: WindowEventClass;
    eventInitOptions: WindowEventInits;
  };
};

export type PluginErrorNotification = {
  name: "pluginError";
  args: {
    name?: string;
    message?: string;
    stack?: string;
  };
};

export type BroadcastNotification<Message extends JsonValue = JsonValue> = {
  name: "broadcast";
  args: {
    message: Message;
  };
};

export type ViewLoadedNotification = {
  name: "viewLoaded";
  args: {
    command: string;
    params?:
      | CellMenuParams
      | ColumnMenuParams
      | RowMenuParams
      | CornerMenuParams;
  };
};

export type PluginNotificationData =
  | ThemeChangedNotification
  | WindowEventNotification
  | PluginErrorNotification
  | ViewLoadedNotification
  | BroadcastNotification;
