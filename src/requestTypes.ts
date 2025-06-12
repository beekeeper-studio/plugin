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

export interface GetStateRequest extends BaseRequest {
  name: "getState";
  args: void;
}

export interface SetStateRequest<T extends unknown> extends BaseRequest {
  name: "setState";
  args: {
    state: T;
  };
}

export type PluginRequestData =
  | GetTablesRequest
  | GetColumnsRequest
  | GetConnectionInfoRequest
  | GetAllTabsRequest
  | RunQueryRequest
  | ExpandTableResultRequest
  | SetTabTitleRequest
  | GetStateRequest
  | SetStateRequest<unknown>;
