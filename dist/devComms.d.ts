import type { GetTablesRequest, GetColumnsRequest, GetConnectionInfoRequest, GetAllTabsRequest, RunQueryRequest, ExpandTableResultRequest, SetTabTitleRequest } from "./requestTypes";
import type { GetTablesResponse, GetColumnsResponse, GetConnectionInfoResponse, GetAllTabsResponse, RunQueryResponse, ExpandTableResultResponse, SetTabTitleResponse } from "./responseTypes";
export type RequestResponsePairs = {
    getTables: {
        req: GetTablesRequest;
        res: GetTablesResponse;
    };
    getColumns: {
        req: GetColumnsRequest;
        res: GetColumnsResponse;
    };
    getConnectionInfo: {
        req: GetConnectionInfoRequest;
        res: GetConnectionInfoResponse;
    };
    getAllTabs: {
        req: GetAllTabsRequest;
        res: GetAllTabsResponse;
    };
    runQuery: {
        req: RunQueryRequest;
        res: RunQueryResponse;
    };
    expandTableResult: {
        req: ExpandTableResultRequest;
        res: ExpandTableResultResponse;
    };
    setTabTitle: {
        req: SetTabTitleRequest;
        res: SetTabTitleResponse;
    };
};
type RequestMap = {
    getTables: GetTablesRequest;
    getColumns: GetColumnsRequest;
    getConnectionInfo: GetConnectionInfoRequest;
    getAllTabs: GetAllTabsRequest;
    runQuery: RunQueryRequest;
    expandTableResult: ExpandTableResultRequest;
    setTabTitle: SetTabTitleRequest;
};
type ResponseMap = {
    getTables: GetTablesResponse;
    getColumns: GetColumnsResponse;
    getConnectionInfo: GetConnectionInfoResponse;
    getAllTabs: GetAllTabsResponse;
    runQuery: RunQueryResponse;
    expandTableResult: ExpandTableResultResponse;
    setTabTitle: SetTabTitleResponse;
};
export declare const devModeReponses: {
    [K in keyof RequestMap]: ResponseMap[K];
};
export declare function requestDevMode<K extends keyof RequestMap>(name: K, args: RequestMap[K]["args"]): Promise<ResponseMap[K]>;
export {};
