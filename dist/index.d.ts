type ThemeType = "dark" | "light";
interface QueryResult {
    fields: {
        id: string;
        name: string;
        dataType?: string;
    }[];
    rows: Record<string, unknown>[];
}
type WindowEventClass = "MouseEvent" | "KeyboardEvent" | "PointerEvent" | "Event";
type WindowEventInits = MouseEventInit | KeyboardEventInit | PointerEventInit;

interface BaseRequest {
    id: string;
}
interface GetTablesRequest extends BaseRequest {
    name: "getTables";
    args: {
        schema?: string;
    };
}
interface GetColumnsRequest extends BaseRequest {
    name: "getColumns";
    args: {
        table: string;
        schema?: string;
    };
}
interface GetConnectionInfoRequest extends BaseRequest {
    name: "getConnectionInfo";
    args: void;
}
interface GetAllTabsRequest extends BaseRequest {
    name: "getAllTabs";
    args: void;
}
interface RunQueryRequest extends BaseRequest {
    name: "runQuery";
    args: {
        query: string;
    };
}
interface ExpandTableResultRequest extends BaseRequest {
    name: "expandTableResult";
    args: {
        results: QueryResult[];
    };
}
interface SetTabTitleRequest extends BaseRequest {
    name: "setTabTitle";
    args: {
        title: string;
    };
}
interface GetStateRequest extends BaseRequest {
    name: "getState";
    args: void;
}
interface SetStateRequest<T extends unknown> extends BaseRequest {
    name: "setState";
    args: {
        state: T;
    };
}
type PluginRequestData = GetTablesRequest | GetColumnsRequest | GetConnectionInfoRequest | GetAllTabsRequest | RunQueryRequest | ExpandTableResultRequest | SetTabTitleRequest | GetStateRequest | SetStateRequest<unknown>;

type TabType = string;
type TableFilter = any;
type TableOrView = any;

/** The list of tables */
type GetTablesResponse = {
    name: string;
    schema?: string;
}[];
/** The list of columns */
type GetColumnsResponse = {
    name: string;
    type: string;
}[];
type GetConnectionInfoResponse = {
    connectionType: string;
    databaseName: string;
    defaultSchema?: string;
    readOnlyMode: boolean;
};
type TabResponse = BaseTabResponse | QueryTabResponse | TableTabResponse;
type GetAllTabsResponse = TabResponse[];
type RunQueryResponse = {
    results: QueryResult[];
    error?: unknown;
};
type ExpandTableResultResponse = void;
type SetTabTitleResponse = void;
type GetStateResponse<T extends unknown> = T;
type SetStateResponse = void;
interface PluginResponseData {
    id: string;
    result: GetTablesResponse | GetColumnsResponse | GetConnectionInfoResponse | GetAllTabsResponse | RunQueryResponse | ExpandTableResultResponse | SetTabTitleResponse | GetStateResponse<unknown> | SetStateResponse;
    error?: Error;
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
interface BaseTabResponse {
    type: TabType;
    id: number;
    title: string;
}

interface ThemeChangedNotification {
    name: "themeChanged";
    args: {
        palette: Record<string, string>;
        cssString: string;
        type: ThemeType;
    };
}
interface WindowEventNotification {
    name: "windowEvent";
    args: {
        eventType: string;
        eventClass: WindowEventClass;
        eventInitOptions: WindowEventInits;
    };
}
type PluginNotificationData = ThemeChangedNotification | WindowEventNotification;

declare global {
    interface ImportMeta {
        env: {
            MODE: string;
        };
    }
}
declare function setDebugComms(value: boolean): void;
declare function request(name: "getTables", args?: GetTablesRequest["args"]): Promise<GetTablesResponse>;
declare function request(name: "getColumns", args: GetColumnsRequest["args"]): Promise<GetColumnsResponse>;
declare function request(name: "getConnectionInfo"): Promise<GetConnectionInfoResponse>;
declare function request(name: "getAllTabs"): Promise<GetAllTabsResponse>;
declare function request(name: "runQuery", args: RunQueryRequest["args"]): Promise<RunQueryResponse>;
declare function request(name: "expandTableResult", args: ExpandTableResultRequest["args"]): Promise<ExpandTableResultResponse>;
declare function request(name: "setTabTitle", args: SetTabTitleRequest["args"]): Promise<SetTabTitleResponse>;
declare function request<T extends unknown>(name: "getState", args: GetStateRequest["args"]): Promise<GetStateResponse<T>>;
declare function request<T extends unknown>(name: "setState", args: SetStateRequest<T>["args"]): Promise<SetStateResponse>;
declare function notify(name: string, args: any): void;
declare function addNotificationListener(name: string, handler: (args: any) => void): Promise<void>;

export { addNotificationListener, notify, request, setDebugComms };
export type { ExpandTableResultRequest, ExpandTableResultResponse, GetAllTabsRequest, GetAllTabsResponse, GetColumnsRequest, GetColumnsResponse, GetConnectionInfoRequest, GetConnectionInfoResponse, GetStateRequest, GetStateResponse, GetTablesRequest, GetTablesResponse, PluginNotificationData, PluginRequestData, PluginResponseData, QueryResult, RunQueryRequest, RunQueryResponse, SetStateRequest, SetStateResponse, SetTabTitleRequest, SetTabTitleResponse, TabResponse, ThemeChangedNotification, ThemeType, WindowEventClass, WindowEventInits, WindowEventNotification };
