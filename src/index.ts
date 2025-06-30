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

export async function getTables(args?: GetTablesRequest['args']): Promise<GetTablesResponse['result']> {
  return await request({ name: "getTables", args: args || {} });
}

export async function getColumns(args: GetColumnsRequest['args']): Promise<GetColumnsResponse['result']> {
  return await request({ name: "getColumns", args });
}

export async function getConnectionInfo(): Promise<GetConnectionInfoResponse['result']> {
  return await request({ name: "getConnectionInfo", args: void 0 });
}

export async function getAllTabs(): Promise<GetAllTabsResponse['result']> {
  return await request({ name: "getAllTabs", args: void 0 });
}

export async function runQuery(args: RunQueryRequest['args']): Promise<RunQueryResponse['result']> {
  return await request({ name: "runQuery", args });
}

export async function expandTableResult(args: ExpandTableResultRequest['args']): Promise<ExpandTableResultResponse['result']> {
  return await request({ name: "expandTableResult", args });
}

export async function setTabTitle(args: SetTabTitleRequest['args']): Promise<SetTabTitleResponse['result']> {
  return await request({ name: "setTabTitle", args });
}

export async function getViewState<T>(): Promise<GetViewStateResponse<T>['result']> {
  return await request({ name: "getViewState", args: void 0 });
}

export async function setViewState<T>(args: SetViewStateRequest<T>['args']): Promise<SetViewStateResponse['result']> {
  return await request({ name: "setViewState", args });
}

export async function openExternal(args: OpenExternalRequest['args']): Promise<OpenExternalResponse['result']> {
  return await request({ name: "openExternal", args });
}

export async function getData<T>(): Promise<GetDataResponse<T>['result']> {
  return await request({ name: "getData", args: void 0 });
}

export async function setData<T>(args: SetDataRequest<T>['args']): Promise<SetDataResponse['result']> {
  return await request({ name: "setData", args });
}

export async function getEncryptedData<T>(): Promise<GetEncryptedDataResponse<T>['result']> {
  return await request({ name: "getEncryptedData", args: void 0 });
}

export async function setEncryptedData<T>(args: SetEncryptedDataRequest<T>['args']): Promise<SetEncryptedDataResponse['result']> {
  return await request({ name: "setEncryptedData", args });
}

export * from "./commonTypes";
export * from "./requestTypes";
export * from "./responseTypes";
export * from "./notificationTypes";
export * from "./comms";

