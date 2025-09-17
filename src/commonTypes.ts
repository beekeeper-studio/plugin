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

export type LoadViewParams =
  | CornerMenuParams
  | RowMenuParams
  | ColumnMenuParams
  | CellMenuParams;

export type PluginViewContext = {
  command: string;
  params?: CellMenuParams | ColumnMenuParams | RowMenuParams | CornerMenuParams;
};
