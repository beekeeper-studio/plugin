export type ThemeType = "dark" | "light";

export interface QueryResult {
  fields: {
    id: string;
    name: string;
    dataType?: string;
  }[];
  rows: Record<string, unknown>[];
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
  type: "=" | "!=" | "like" | "not like" | "<" | "<=" | ">" | ">=" | "in" | "is" | "is not";
  value?: string | string[];
  op?: 'AND' | 'OR';
}

