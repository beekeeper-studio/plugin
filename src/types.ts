export type ThemeType = "dark" | "light";

export interface QueryResult {
  fields: {
    id: string;
    name: string;
    dataType?: string;
  }[];
  rows: Record<string, unknown>[];
}

export interface TableKey {
  isComposite: boolean;
  toTable: string;
  toSchema: string;
  toColumn: string | string[];
  fromTable: string;
  fromSchema: string;
  fromColumn: string | string[];
  constraintName?: string;
  onUpdate?: string;
  onDelete?: string;
}

export type IndexColumn = {
  name: string;
  order?:
    | "ASC"
    | "DESC"
    | "2d"
    | "2dsphere"
    | "text"
    | "geoHaystack"
    | "hashed"
    | number; // after DESC is for mongo only
  /** MySQL Only */
  prefix?: number | null;
};

export type PrimaryKey = {
  columnName: string;
  position: number;
};

export type TableIndex = {
  id: string;
  table: string;
  schema: string;
  name: string;
  columns: IndexColumn[];
  unique: boolean;
  primary: boolean;
  /** for postgres 15 and above https://www.postgresql.org/about/featurematrix/detail/392/ */
  nullsNotDistinct?: boolean;
};

export type Table = {
  name: string;
  schema?: string;
};

export type Column = {
  name: string;
  type: string;
};

export type WindowEventClass =
  | "MouseEvent"
  | "KeyboardEvent"
  | "PointerEvent"
  | "Event";

export type WindowEventInits =
  | MouseEventInit
  | KeyboardEventInit
  | PointerEventInit;

export type TableFilter = {
  field: string;
  type:
    | "="
    | "!="
    | "like"
    | "not like"
    | "<"
    | "<="
    | ">"
    | ">="
    | "in"
    | "is"
    | "is not";
  value?: string | string[];
  op?: "AND" | "OR";
};

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ActiveRange = {
  rows: number[];
  columns: string[];
  value: JsonValue[][];
};

export type CellMenuTarget = {
  type: "cell";
  row: number;
  column: string;
  value: JsonValue;
};

export type ColumnMenuTarget = {
  type: "column";
  column: string;
  rows: number[];
  value: JsonValue[];
};

export type RowMenuTarget = {
  type: "row";
  row: number;
  columns: string[];
  value: JsonValue[];
};

export type CornerMenuTarget = {
  type: "corner";
  rows: number[];
  columns: string[];
  value: JsonValue[][];
};

export type CellMenuParams = {
  target: CellMenuTarget;
  activeRange: ActiveRange;
};

export type ColumnMenuParams = {
  target: ColumnMenuTarget;
  activeRange: ActiveRange;
};

export type RowMenuParams = { target: RowMenuTarget; activeRange: ActiveRange };

export type CornerMenuParams = {
  target: CornerMenuTarget;
  activeRange: ActiveRange;
};

/** Params from the query editor: `editor.query.context` and
 * `editor.query.toolbar`. */
export type EditorMenuParams = {
  /** The whole text of the editor. */
  text: string;
  /** The selected text, or an empty string. */
  selectedText: string;
  /** The statement under the cursor, or an empty string. */
  selectedQuery: string;
};

export type MenuEntity = {
  type: string;
  schema?: string;
  name: string;
};

/**
 * Params from the Visualize menu: `results.statusbar` and
 * `tableTable.statusbar`.
 *
 * - `selection`: the user selected more than one cell, or a row or column
 *   from its header. `activeRange` holds it.
 * - `result`: every row of a query result. `activeRange` holds it.
 * - `table`: a table view with nothing selected. The grid only holds one
 *   page, so no rows are sent. Read the table from `entity`, applying
 *   `where`, with your own row limit.
 */
export type StatusbarMenuParams = {
  source: "selection" | "result" | "table";
  activeRange?: ActiveRange;
  /** Same as `activeRange`, so `CornerMenuParams` handlers work unchanged. */
  target?: CornerMenuTarget;
  /** Query results only: the statement that produced the result. */
  query?: string;
  /** Query results only: the result stopped at the row limit. */
  truncated?: boolean;
  /** Table view only: the table being viewed. */
  entity?: MenuEntity;
  /** Table view only: the filters applied in the table view. */
  filters?: TableFilter[];
  /** Table view only: the SQL condition for `filters`, without the `WHERE`
   * keyword. Empty when there are no filters. */
  where?: string;
};

/** Params from a tab header: `tab.query.header.context` and
 * `tab.table.header.context`. */
export type TabMenuParams = {
  tab: {
    type: string;
    id: number;
    title: string;
    data?: { [key: string]: JsonValue };
  };
};

/** Params from the sidebar (`entity.*.context`) and the structure view
 * (`structure.statusbar.menu`). */
export type EntityMenuParams = {
  entity: MenuEntity;
};

export type LoadViewParams =
  | CornerMenuParams
  | RowMenuParams
  | ColumnMenuParams
  | CellMenuParams
  | EditorMenuParams
  | StatusbarMenuParams
  | TabMenuParams
  | EntityMenuParams;

export type PluginViewContext = {
  command: string;
  /** Depends on the placement of the menu item that opened the view. */
  params?: LoadViewParams;
};

export type DatabaseType =
  | "postgresql"
  | "mysql"
  | "mariadb"
  | "sqlite"
  | "sqlserver"
  | "oracle"
  | "mongodb"
  | "cassandra"
  | "clickhouse"
  | "firebird"
  | "bigquery"
  | "redshift"
  | "duckdb"
  | "libsql"
  | "redis"
  | "surrealdb"
  | "trino"
  | "snowflake";

export type ConnectionInfo = {
  /** @alias databaseType */
  connectionType: string;
  /** The ID of the connection */
  id: number;
  /** The name of the connection specified in the connection form */
  workspaceId: number;
  /** The name of the connection specified in the connection form */
  connectionName: string;
  databaseType: DatabaseType;
  /** The name of the database connected to */
  databaseName: string;
  defaultSchema?: string;
  readOnlyMode: boolean;
};

export type AppInfo = {
  version: string;
  theme: AppTheme;
};

export type AppTheme = {
  palette: Record<string, string>;
  cssString: string;
  type: ThemeType;
};

export type RunQueryResult = {
  results: QueryResult[];
  error?: unknown;
};

export type OpenQueryTabOptions = {
  query?: string;
};

export type OpenTableTableTabOptions = {
  name: string;
  schema?: string;
  filters?: TableFilter[];
  database?: string;
};

export type OpenTableStructureTabOptions = {
  name: string;
  schema?: string;
  database?: string;
};

export type RequestFileSaveOptions = {
  data: string;
  fileName: string;
  /** @default "utf8" */
  encoding?: "utf8" | "base64";
  filters?: { name: string; extensions: string[] }[];
};

export type PluginErrorObject = {
  name: string;
  message: string;
  stack?: string;
  logStack: string;
};

export type WindowEventObject = {
  eventType: string;
  eventClass: WindowEventClass;
  eventInitOptions: WindowEventInits;
};

export type ConfirmOptions = {
  confirmLabel?: string;
  cancelLabel?: string;
};

export type WorkspaceInfo = {
  id: number;
  type: "local" | "cloud";
  name: string;
  isOwner: boolean;
};
