import { request } from "./comms";
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
} from "./requestTypes";
import type {
  GetTablesResponse,
  GetColumnsResponse,
  GetConnectionInfoResponse,
  GetAllTabsResponse,
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
} from "./responseTypes";

export async function getTables(schema?: string): Promise<GetTablesResponse['result']> {
  return await request({ name: "getTables", args: { schema } as GetTablesRequest['args'] });
}

export async function getColumns(table: string, schema?: string): Promise<GetColumnsResponse['result']> {
  return await request({ name: "getColumns", args: { table, schema } as GetColumnsRequest['args'] });
}

export async function getConnectionInfo(): Promise<GetConnectionInfoResponse['result']> {
  return await request({ name: "getConnectionInfo", args: void 0 });
}

export async function getAllTabs(): Promise<GetAllTabsResponse['result']> {
  return await request({ name: "getAllTabs", args: void 0 });
}

export async function runQuery(query: string): Promise<RunQueryResponse['result']> {
  return await request({ name: "runQuery", args: { query } as RunQueryRequest['args'] });
}

export async function expandTableResult(results: any[]): Promise<ExpandTableResultResponse['result']> {
  return await request({ name: "expandTableResult", args: { results } as ExpandTableResultRequest['args'] });
}

export async function setTabTitle(title: string): Promise<SetTabTitleResponse['result']> {
  return await request({ name: "setTabTitle", args: { title } as SetTabTitleRequest['args'] });
}

export async function getViewState<T>(): Promise<GetViewStateResponse<T>['result']> {
  return await request({ name: "getViewState", args: void  });
}

export async function setViewState<T>(state: T): Promise<SetViewStateResponse['result']> {
  return await request({ name: "setViewState", args: { state } as SetViewStateRequest<T>['args'] });
}

export async function openExternal(link: boolean): Promise<OpenExternalResponse['result']> {
  return await request({ name: "openExternal", args: { link } as OpenExternalRequest['args'] });
}

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

export * from "./commonTypes";
export * from "./requestTypes";
export * from "./responseTypes";
export * from "./notificationTypes";
export * from "./comms";

