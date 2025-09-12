import { QueryResult, TableFilter } from "./commonTypes";

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

export type GetTableKeysRequest = BaseRequest & {
  name: "getTableKeys";
  args: {
    table: string;
    schema?: string;
  };
};

export type GetAppInfoRequest = BaseRequest & {
  name: "getAppInfo";
  args: void;
}

export interface GetConnectionInfoRequest extends BaseRequest {
  name: "getConnectionInfo";
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
    link: string;
  };
}

export interface SetDataRequest<T extends unknown> extends BaseRequest {
  name: "setData";
  args: {
    key: string;
    value: T;
  };
}

export interface GetDataRequest extends BaseRequest {
  name: "getData";
  args: {
    key: string;
  };
}

export interface GetEncryptedDataRequest extends BaseRequest {
  name: "getEncryptedData";
  args: {
    key: string;
  };
}

export interface SetEncryptedDataRequest<T extends unknown> extends BaseRequest {
  name: "setEncryptedData";
  args: {
    key: string;
    value: T;
  };
}

export interface ClipboardWriteTextRequest extends BaseRequest {
  name: "clipboard.writeText";
  args: {
    text: string;
  };
}

export interface ClipboardReadTextRequest extends BaseRequest {
  name: "clipboard.readText";
  args: void;
}

export type OpenQueryTabRequest = BaseRequest & {
  name: "openTab";
  args: {
    type: "query";
    query?: string;
  };
}

export type OpenTableTableTabRequest = BaseRequest & {
  name: "openTab";
  args: {
    type: "tableTable";
    table: string;
    schema?: string;
    filters?: TableFilter[];
    database?: string;
  };
}

export type OpenTableStructureTabRequest = BaseRequest & {
  name: "openTab";
  args: {
    type: "tableStructure";
    table: string;
    schema?: string;
    database?: string;
  };
}

export type CheckForUpdateRequest = BaseRequest & {
  name: "checkForUpdate";
  args: void;
}

export type OpenTabRequest =
  | OpenQueryTabRequest
  | OpenTableTableTabRequest
  | OpenTableStructureTabRequest;

export type PluginRequestData =
  | GetTablesRequest
  | GetColumnsRequest
  | GetTableKeysRequest
  | GetAppInfoRequest
  | GetConnectionInfoRequest
  | RunQueryRequest
  | ExpandTableResultRequest
  | SetTabTitleRequest
  | GetViewStateRequest
  | SetViewStateRequest<unknown>
  | OpenExternalRequest
  | GetDataRequest
  | SetDataRequest<unknown>
  | GetEncryptedDataRequest
  | SetEncryptedDataRequest<unknown>
  | ClipboardWriteTextRequest
  | ClipboardReadTextRequest
  | OpenTabRequest
  | CheckForUpdateRequest;

export type PluginRequestPayload = PluginRequestData;
