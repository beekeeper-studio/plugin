import { AppInfo, AppTheme, Column, ConnectionInfo, JsonValue, OpenQueryTabOptions, OpenTableStructureTabOptions, OpenTableTableTabOptions, PluginErrorObject, PrimaryKey, QueryResult, RequestFileSaveOptions, RunQueryResult, Table, TableIndex, TableKey, WindowEventObject } from "./types";

export type RequestMap = {
  getSchemas: {
    args: void;
    return: string[];
  },
  getTables: {
    args: {
      schema?: string;
    };
    return: Table[];
  };
  getColumns: {
    args: {
      table: string;
      schema?: string;
    };
    return: Column[];
  };
  getTableKeys: {
    args: {
      table: string;
      schema?: string;
    };
    return: TableKey[];
  };
  getPrimaryKeys: {
    args: {
      table: string;
      schema?: string;
    };
    return: PrimaryKey[];
  };
  getTableIndexes: {
    args: {
      table: string;
      schema?: string;
    };
    return: TableIndex[];
  };
  getIncomingKeys: {
    args: {
      table: string;
      schema?: string;
    };
    return: TableKey[];
  };
  getOutgoingKeys: {
    args: {
      table: string;
      schema?: string;
    };
    return: TableKey[];
  };
  getConnectionInfo: {
    args: void;
    return: ConnectionInfo;
  };
  getAppInfo: {
    args: void;
    return: AppInfo;
  };
  checkForUpdate: {
    args: void;
    return: boolean;
  };
  runQuery: {
    args: {
      query: string;
    };
    return: RunQueryResult;
  };
  expandTableResult: {
    args: {
      results: QueryResult[];
    };
    return: void;
  };
  setTabTitle: {
    args: {
      title: string;
    };
    return: void;
  };
  getViewContext: {
    args: void;
    return: any;
  };
  getViewState: {
    args: void;
    return: any;
  };
  setViewState: {
    args: {
      state: any;
    };
    return: void;
  };
  openExternal: {
    args: {
      link: string;
    };
    return: void;
  };
  getData: {
    args: {
      key: string;
    };
    return: any;
  };
  setData: {
    args: {
      key: string;
      value: any;
    };
    return: void;
  };
  getEncryptedData: {
    args: {
      key: string;
    };
    return: any;
  };
  setEncryptedData: {
    args: {
      key: string;
      value: any;
    };
    return: void;
  };
  openTab: {
    args:
    ({ type: "query" } & OpenQueryTabOptions)
    | ({ type: "tableTable" } & OpenTableTableTabOptions)
    | ({ type: "tableStructure" } & OpenTableStructureTabOptions);
    return: void;
  };
  requestFileSave: {
    args: RequestFileSaveOptions;
    return: void;
  };
  "clipboard.writeText": {
    args: {
      text: string;
    };
    return: void;
  };
  "clipboard.writeImage": {
    args: {
      data: string;
    };
    return: void;
  };
  "clipboard.readText": {
    args: void;
    return: string;
  };
};

export type RequestPayload<T extends keyof RequestMap = keyof RequestMap> = {
  id: string;
  name: T;
} & Pick<RequestMap[T], "args">;

export type ResponsePayload<T extends keyof RequestMap = keyof RequestMap> = {
  id: string;
  result: RequestMap[T]["return"];
  error?: unknown;
};

export type NotificationMap = {
  tablesChanged: {
    args: void;
  };
  broadcast: {
    args: {
      message: JsonValue;
    };
  };
  themeChanged: {
    args: AppTheme;
  };
  windowEvent: {
    args: WindowEventObject;
  };
  pluginError: {
    args: PluginErrorObject;
  };
};

