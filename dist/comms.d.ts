import type { GetTablesRequest, GetColumnsRequest, RunQueryRequest, ExpandTableResultRequest, SetTabTitleRequest } from "./requestTypes";
import type { GetTablesResponse, GetColumnsResponse, GetConnectionInfoResponse, GetAllTabsResponse, RunQueryResponse, ExpandTableResultResponse, SetTabTitleResponse } from "./responseTypes";
declare global {
    interface ImportMeta {
        env: {
            MODE: string;
        };
    }
}
export declare function setDebugComms(value: boolean): void;
export declare function request(name: "getTables", args?: GetTablesRequest["args"]): Promise<GetTablesResponse>;
export declare function request(name: "getColumns", args: GetColumnsRequest["args"]): Promise<GetColumnsResponse>;
export declare function request(name: "getConnectionInfo"): Promise<GetConnectionInfoResponse>;
export declare function request(name: "getAllTabs"): Promise<GetAllTabsResponse>;
export declare function request(name: "runQuery", args: RunQueryRequest["args"]): Promise<RunQueryResponse>;
export declare function request(name: "expandTableResult", args: ExpandTableResultRequest["args"]): Promise<ExpandTableResultResponse>;
export declare function request(name: "setTabTitle", args: SetTabTitleRequest["args"]): Promise<SetTabTitleResponse>;
export declare function notify(name: string, args: any): void;
export declare function addNotificationListener(name: string, handler: (args: any) => void): Promise<void>;
