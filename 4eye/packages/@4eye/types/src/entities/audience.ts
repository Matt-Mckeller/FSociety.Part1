import type { SymbolColor, SymbolName } from "../symbols";

export interface Audience {
  id: string;
  name: string;
  description?: string;
  symbol: SymbolName;
  symbolColor: SymbolColor;
  identifiers: string[];
  /** References Target.id */
  memberIds?: string[];
  createdAt: number;
}
