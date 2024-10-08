import {UnorderedTableInterface} from "@interfaces";

export class UnorderedTable<RowData> implements UnorderedTableInterface<RowData> {
  public rows;

  constructor(rows?: Iterable<[string, RowData]>) {
    this.rows = new Map<string, RowData>(rows);
  }

  addRow(rowID: string, newRow: RowData): void {
    this.rows.set(rowID, newRow);
  }

  row(rowID: string): RowData | undefined {
    return this.rows.get(rowID);
  }

  removeRow(rowID: string): void {
    this.rows.delete(rowID);
  }

}