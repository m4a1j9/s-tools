export interface UnorderedTableInterface<RowData> {

  rows: Map<string, RowData>;

  row: (rowID: string) => RowData | undefined;

  addRow: (rowId: string, newRow: RowData) => void;

  removeRow: (rowID: string) => void;

}