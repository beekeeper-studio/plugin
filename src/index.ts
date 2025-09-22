import { JsonValue } from "./commonTypes";
import { addNotificationListener, notify, request } from "./comms";
import type {
  GetTablesRequest,
  GetColumnsRequest,
  RunQueryRequest,
  ExpandTableResultRequest,
  SetTabTitleRequest,
  SetViewStateRequest,
  OpenExternalRequest,
  SetDataRequest,
  SetEncryptedDataRequest,
  OpenTabRequest,
  OpenQueryTabRequest,
  OpenTableTableTabRequest,
  OpenTableStructureTabRequest,
  GetTableKeysRequest,
} from "./requestTypes";
import type {
  GetTablesResponse,
  GetColumnsResponse,
  GetConnectionInfoResponse,
  RunQueryResponse,
  ExpandTableResultResponse,
  SetTabTitleResponse,
  GetViewStateResponse,
  SetViewStateResponse,
  OpenExternalResponse,
  GetDataResponse,
  SetDataResponse,
  GetEncryptedDataResponse,
  SetEncryptedDataResponse,
  OpenTabResponse,
  GetTableKeysResponse,
  GetAppInfoResponse,
  CheckForUpdateResponse,
  GetViewContextResponse,
} from "./responseTypes";

/**
 * Get a list of tables from the current database.
 * @since Beekeeper Studio 5.3.0
 **/
export async function getTables(schema?: string): Promise<GetTablesResponse['result']> {
  return await request({ name: "getTables", args: { schema } as GetTablesRequest['args'] });
}

/**
 * Get a list of columns from a table.
 *
 * @since Beekeeper Studio 5.3.0
 **/
export async function getColumns(table: string, schema?: string): Promise<GetColumnsResponse['result']> {
  return await request({ name: "getColumns", args: { table, schema } as GetColumnsRequest['args'] });
}

/** @since Beekeeper Studio 5.4.0 */
export async function getTableKeys(table: string, schema?: string): Promise<GetTableKeysResponse['result']> {
  return await request({ name: "getTableKeys", args: { table, schema } as GetTableKeysRequest['args'] });
}

/**
 * Get information about the current database connection.
 *
 * @since Beekeeper Studio 5.3.0
 **/
export async function getConnectionInfo(): Promise<GetConnectionInfoResponse['result']> {
  return await request({ name: "getConnectionInfo", args: void 0 });
}

/** @since Beekeeper Studio 5.4.0 */
export async function getAppInfo(): Promise<GetAppInfoResponse['result']> {
  return await request({ name: "getAppInfo", args: void 0 });
}

/**
 * Check if plugin's update is available.
 *
 * @since Beekeeper Studio 5.4.0
 **/
export async function checkForUpdate(): Promise<CheckForUpdateResponse['result']> {
  return await request({ name: "checkForUpdate", args: void 0 });
}

/**
 * Execute a SQL query against the current database.
 *
 * WARNING: The query will be executed exactly as provided with no modification
 * or sanitization. Always validate and sanitize user input before including it
 * in queries to prevent unwanted actions.
 *
 * @since Beekeeper Studio 5.3.0
 **/
export async function runQuery(query: string): Promise<RunQueryResponse['result']> {
  return await request({ name: "runQuery", args: { query } as RunQueryRequest['args'] });
}

/**
 * Display query results in the bottom table panel (shell-type tabs only).
 *
 * @since Beekeeper Studio 5.3.0
 **/
export async function expandTableResult(results: any[]): Promise<ExpandTableResultResponse['result']> {
  return await request({ name: "expandTableResult", args: { results } as ExpandTableResultRequest['args'] });
}

/**
 * Set the title of the current plugin tab.
 *
 * @since Beekeeper Studio 5.3.0
 **/
export async function setTabTitle(title: string): Promise<SetTabTitleResponse['result']> {
  return await request({ name: "setTabTitle", args: { title } as SetTabTitleRequest['args'] });
}

/**
 * Get the current view context.
 *
 * A view context describes how this plugin view was opened and what data is
 * available for it. It always includes the static `command` from your
 * `manifest.json`, and may also include dynamic `params` depending on where
 * the menu was invoked.
 *
 * @since Beekeeper Studio 5.4.0
 **/
export async function getViewContext(): Promise<GetViewContextResponse['result']> {
  return await request({ name: "getViewContext", args: void 0 });
}

/**
 * Get the current state of your view instance.
 *
 * @see {@link https://docs.beekeeperstudio.io/plugin_development/plugin-views/#view-state|View State}
 * @since Beekeeper Studio 5.3.0
 **/
export async function getViewState<T>(): Promise<GetViewStateResponse<T>['result']> {
  return await request({ name: "getViewState", args: void 0 });
}

/**
 * Set the state of your view instance.
 *
 * @see {@link https://docs.beekeeperstudio.io/plugin_development/plugin-views/#view-state|View State}
 * @since Beekeeper Studio 5.3.0
 **/
export async function setViewState<T>(state: T): Promise<SetViewStateResponse['result']> {
  return await request({ name: "setViewState", args: { state } as SetViewStateRequest<T>['args'] });
}

/** @since Beekeeper Studio 5.3.0 */
export async function openExternal(link: string): Promise<OpenExternalResponse['result']> {
  return await request({ name: "openExternal", args: { link } as OpenExternalRequest['args'] });
}

/** @since Beekeeper Studio 5.3.0 */
export async function getData<T>(key: string = "default"): Promise<GetDataResponse<T>['result']> {
  return await request({ name: "getData", args: { key } });
}

/**
 * Store data that can be retrieved later.
 * 
 * @example
 * // Store with custom key
 * await setData("myKey", { name: "John" });
 * 
 * // Store with default key (equivalent to setData("default", value))
 * await setData({ name: "John" });
 *
 * @since Beekeeper Studio 5.3.0
 */
export async function setData<T>(key: string, value: T): Promise<SetDataResponse['result']>;
export async function setData<T>(value: T): Promise<SetDataResponse['result']>;
export async function setData<T>(keyOrValue: string | T, value?: T): Promise<SetDataResponse['result']> {
  if (value !== undefined) {
    return await request({ name: "setData", args: { key: keyOrValue as string, value } as SetDataRequest<T>['args'] });
  } else {
    return await request({ name: "setData", args: { key: "default", value: keyOrValue as T } as SetDataRequest<T>['args'] });
  }
}

/** @since Beekeeper Studio 5.3.0 */
export async function getEncryptedData<T>(key: string): Promise<GetEncryptedDataResponse<T>['result']> {
  return await request({ name: "getEncryptedData", args: { key } });
}

/**
 * Store encrypted data that can be retrieved later.
 * 
 * @example
 * // Store with custom key
 * await setEncryptedData("secretKey", { token: "abc123" });
 * 
 * // Store with default key (equivalent to setEncryptedData("default", value))
 * await setEncryptedData({ token: "abc123" });
 *
 * @since Beekeeper Studio 5.3.0
 */
export async function setEncryptedData<T>(key: string, value: T): Promise<SetEncryptedDataResponse['result']>;
export async function setEncryptedData<T>(value: T): Promise<SetEncryptedDataResponse['result']>;
export async function setEncryptedData<T>(keyOrValue: string | T, value?: T): Promise<SetEncryptedDataResponse['result']> {
  if (value !== undefined) {
    return await request({ name: "setEncryptedData", args: { key: keyOrValue as string, value } as SetEncryptedDataRequest<T>['args'] });
  } else {
    return await request({ name: "setEncryptedData", args: { key: "default", value: keyOrValue as T } as SetEncryptedDataRequest<T>['args'] });
  }
}

/** @since Beekeeper Studio 5.4.0 */
export async function openTab(type: "query", args?: Omit<OpenQueryTabRequest['args'], 'type'>): Promise<OpenTabResponse>;
export async function openTab(type: "tableTable", args: Omit<OpenTableTableTabRequest['args'], 'type'>): Promise<OpenTabResponse>;
export async function openTab(type: "tableStructure", args: Omit<OpenTableStructureTabRequest['args'], 'type'>): Promise<OpenTabResponse>;
export async function openTab(type: OpenTabRequest['args']['type'], args?: Omit<OpenTabRequest['args'], 'type'>): Promise<OpenTabResponse> {
  return await request({ name: "openTab", args: { type, ...args } });
}

/** @since Beekeeper Studio 5.4.0 */
export const broadcast = {
  post<T extends JsonValue = JsonValue>(message: T) {
    return notify("broadcast", { message });
  },
  on<T extends JsonValue = JsonValue>(handler: (message: T) => void) {
    addNotificationListener<T>("broadcast", (params) => {
      handler(params.message);
    });
  },
}

/** @since Beekeeper Studio 5.3.0 */
export const log = {
  error(err: string | Error) {
    return notify("pluginError", {
      name: err.name || "Error",
      message: err.message || err,
      stack: err.stack,
    });
  },
}

/**
 * Clipboard interface.
 *
 * @since Beekeeper Studio 5.3.0
 **/
export const clipboard = {
  /** Write text to the Electron clipboard. */
  async writeText(text: string): Promise<void> {
    await request({
      name: "clipboard.writeText",
      args: { text },
    });
  },
  /** Read text from the Electron clipboard. */
  async readText(): Promise<string> {
    return await request({
      name: "clipboard.readText",
      args: void 0,
    });
  },
  // async write() {},
  // async read() {},
};

export * from "./commonTypes";
export * from "./requestTypes";
export * from "./responseTypes";
export * from "./notificationTypes";
export * from "./comms";

