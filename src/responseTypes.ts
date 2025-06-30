import { QueryResult } from "./commonTypes";

type TabType = string;
type TableFilter = any;
type TableOrView = any;

interface BaseResponse {
  id: string;
  error?: Error;
}

export interface GetTablesResponse extends BaseResponse {
  result: {
    name: string;
    schema?: string;
  }[];
}

export interface GetColumnsResponse extends BaseResponse {
  result: {
    name: string;
    type: string;
  }[];
}

export interface GetConnectionInfoResponse extends BaseResponse {
  result: {
    connectionType: string;
    databaseName: string;
    defaultSchema?: string;
    readOnlyMode: boolean;
  };
}

export interface GetAllTabsResponse extends BaseResponse {
  result: Tab[];
}

export interface RunQueryResponse extends BaseResponse {
  result: {
    results: QueryResult[];
    error?: unknown;
  };
}

export interface ExpandTableResultResponse extends BaseResponse {
  result: void;
}

export interface SetTabTitleResponse extends BaseResponse {
  result: void;
}

export interface GetViewStateResponse<T extends unknown> extends BaseResponse {
  result: T;
}

export interface SetViewStateResponse extends BaseResponse {
  result: void;
}

export interface OpenExternalResponse extends BaseResponse {
  result: void;
}

export interface GetDataResponse<T extends unknown> extends BaseResponse {
  result: T;
}

export interface SetDataResponse extends BaseResponse {
  result: void;
}

export interface GetEncryptedDataResponse<T extends unknown> extends BaseResponse {
  result: T;
}

export interface SetEncryptedDataResponse extends BaseResponse {
  result: void;
}

export type PluginResponseData =
  | GetTablesResponse
  | GetColumnsResponse
  | GetConnectionInfoResponse
  | GetAllTabsResponse
  | RunQueryResponse
  | ExpandTableResultResponse
  | SetTabTitleResponse
  | GetViewStateResponse<unknown>
  | SetViewStateResponse
  | OpenExternalResponse
  | GetDataResponse<unknown>
  | SetDataResponse
  | GetEncryptedDataResponse<unknown>
  | SetEncryptedDataResponse;

export type PluginResponsePayload = PluginResponseData;

export type TabResponse = Tab;

type Tab = BaseTabResponse | QueryTabResponse | TableTabResponse;

interface BaseTabResponse {
  type: TabType;
  id: number;
  title: string;
}

interface QueryTabResponse extends BaseTabResponse {
  type: "query";
  data: {
    query: string;
    result: unknown;
  };
}

interface TableTabResponse extends BaseTabResponse {
  type: "table";
  data: {
    table: TableOrView;
    filters: TableFilter[] | string;
    result: unknown;
  };
}
