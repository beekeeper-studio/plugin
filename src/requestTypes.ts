import { QueryResult } from "./commonTypes";

interface BaseRequest {
  id: string;
}

export interface GetTablesRequest extends BaseRequest {
  name: "getTables";
  args: {
    schema?: string;
  };
}

export interface GetColumnsRequest extends BaseRequest {
  name: "getColumns";
  args: {
    table: string;
    schema?: string;
  };
}

export interface GetConnectionInfoRequest extends BaseRequest {
  name: "getConnectionInfo";
  args: void;
}

export interface GetAllTabsRequest extends BaseRequest {
  name: "getAllTabs";
  args: void;
}

export interface RunQueryRequest extends BaseRequest {
  name: "runQuery";
  args: {
    query: string;
  };
}

export interface ExpandTableResultRequest extends BaseRequest {
  name: "expandTableResult";
  args: {
    results: QueryResult[];
  };
}

export interface SetTabTitleRequest extends BaseRequest {
  name: "setTabTitle";
  args: {
    title: string;
  };
}

export interface GetViewStateRequest extends BaseRequest {
  name: "getViewState";
  args: void;
}

export interface SetViewStateRequest<T extends unknown> extends BaseRequest {
  name: "setViewState";
  args: {
    state: T;
  };
}

export interface OpenExternalRequest extends BaseRequest {
  name: "openExternal";
  args: {
    link: boolean;
  };
}

export interface SetDataRequest<T extends unknown> extends BaseRequest {
  name: "setData";
  args: T;
}

export interface GetDataRequest extends BaseRequest {
  name: "getData";
  args: void;
}

export interface GetEncryptedDataRequest extends BaseRequest {
  name: "getEncryptedData";
  args: void;
}

export interface SetEncryptedDataRequest<T extends unknown> extends BaseRequest {
  name: "setEncryptedData";
  args: T;
}

export type PluginRequestData =
  | GetTablesRequest
  | GetColumnsRequest
  | GetConnectionInfoRequest
  | GetAllTabsRequest
  | RunQueryRequest
  | ExpandTableResultRequest
  | SetTabTitleRequest
  | GetViewStateRequest
  | SetViewStateRequest<unknown>
  | OpenExternalRequest
  | GetDataRequest
  | SetDataRequest<unknown>
  | GetEncryptedDataRequest
  | SetEncryptedDataRequest<unknown>;
