import {
  QueryResult,
  TableKey,
  CellMenuParams,
  CornerMenuParams,
  RowMenuParams,
  ColumnMenuParams,
  PluginViewContext,
} from "./commonTypes";
import { AppTheme } from "./notificationTypes";

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

export type GetTableKeysResponse = BaseResponse & {
  result: TableKey[];
};

export interface GetConnectionInfoResponse extends BaseResponse {
  result: {
    /** @deprecated Use `databaseType` instead */
    connectionType: string;
    /** The ID of the connection */
    id: number;
    /** The name of the connection specified in the connection form */
    workspaceId: number;
    /** The name of the connection specified in the connection form */
    connectionName: string;
    databaseType: 'postgresql' | 'mysql' | 'mariadb' | 'sqlite' | 'sqlserver' | 'oracle' | 'mongodb' | 'cassandra' | 'clickhouse' | 'firebird' | 'bigquery' | 'redshift' | 'duckdb' | 'libsql' | 'redis' | 'surrealdb' | 'trino';
    /** The name of the database connected to */
    databaseName: string;
    defaultSchema?: string;
    readOnlyMode: boolean;
  };
}

export type GetAppInfoResponse = BaseResponse & {
  result: {
    version: string;
    theme: AppTheme;
  };
};

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

export type GetViewContextResponse = BaseResponse & {
  result: PluginViewContext;
};

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

export interface GetEncryptedDataResponse<T extends unknown>
  extends BaseResponse {
  result: T;
}

export interface SetEncryptedDataResponse extends BaseResponse {
  result: void;
}

export interface ClipboardWriteTextResponse extends BaseResponse {
  result: void;
}

export interface ClipboardReadTextResponse extends BaseResponse {
  result: string;
}

export interface OpenTabResponse extends BaseResponse {
  result: void;
}

export interface CheckForUpdateResponse extends BaseResponse {
  result: boolean;
}

export type PluginResponseData =
  | GetTablesResponse
  | GetColumnsResponse
  | GetTableKeysResponse
  | GetConnectionInfoResponse
  | RunQueryResponse
  | ExpandTableResultResponse
  | SetTabTitleResponse
  | GetViewContextResponse
  | GetViewStateResponse<unknown>
  | SetViewStateResponse
  | OpenExternalResponse
  | GetDataResponse<unknown>
  | SetDataResponse
  | GetEncryptedDataResponse<unknown>
  | SetEncryptedDataResponse
  | ClipboardWriteTextResponse
  | ClipboardReadTextResponse
  | OpenTabResponse
  | CheckForUpdateResponse;

export type PluginResponsePayload = PluginResponseData;

export type TabResponse = BaseTabResponse | QueryTabResponse | TableTabResponse;

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
