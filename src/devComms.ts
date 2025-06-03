import type {
  GetTablesRequest,
  GetColumnsRequest,
  GetConnectionInfoRequest,
  GetAllTabsRequest,
  RunQueryRequest,
  ExpandTableResultRequest,
  SetTabTitleRequest,
} from "./requestTypes";
import type {
  GetTablesResponse,
  GetColumnsResponse,
  GetConnectionInfoResponse,
  GetAllTabsResponse,
  RunQueryResponse,
  ExpandTableResultResponse,
  SetTabTitleResponse,
} from "./responseTypes";

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
}

const responses: {
  [K in keyof RequestMap]: ResponseMap[K];
} = {
  getConnectionInfo: {
    connectionType: "sqlite",
    readOnlyMode: false,
    databaseName: "db.sqlite",
    defaultSchema: "",
  },
  getTables: [{ name: "countries" }, { name: "users" }],
  getColumns: [
    {
      name: "id",
      type: "integer",
    },
  ],
  getAllTabs: [],
  runQuery: {
    results: [
      {
        fields: [{ id: "id", name: "id", dataType: "integer" }],
        rows: [],
      },
    ],
  },
  expandTableResult: undefined,
  setTabTitle: undefined,
};

export async function request(name: "getTables", args?: GetTablesRequest["args"]): Promise<GetTablesResponse>;
export async function request(name: "getColumns", args: GetColumnsRequest["args"]): Promise<GetColumnsResponse>;
export async function request(name: "getConnectionInfo"): Promise<GetConnectionInfoResponse>;
export async function request(name: "getAllTabs"): Promise<GetAllTabsResponse>;
export async function request(name: "runQuery", args: RunQueryRequest["args"]): Promise<RunQueryResponse>;
export async function request(name: "expandTableResult", args: ExpandTableResultRequest["args"]): Promise<ExpandTableResultResponse>;
export async function request(name: "setTabTitle", args: SetTabTitleRequest["args"]): Promise<SetTabTitleResponse>;
export async function request(name: unknown, args?: unknown): Promise<unknown> {
  if (name === "setTabTitle") {
    document.title = args.title || "Plugin";
    return responses["setTabTitle"];
  }
  return responses[name];
}
