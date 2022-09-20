import { ModelAction } from './model-action.enum';

export type TableConfig = {
  base: string;
  icon: string;
  name: string;
  columns: Array<TableColumn>;
  actions: Array<TableAction>;
  filter: TableFilter | null;

  showCheckbox?: boolean;
  showIndex?: boolean;
  expandable?:boolean
};

export type TableColumn = {
  label: string;
  field: string;
  subField?: string,            //in case of nested object(one level only)
  class?: string;
  sortable?: boolean;
  searchable?: boolean;
  type?: string;
  sortableField?: string;
};

export type TableAction = {
  label: string;
  icon: string;
  action: ModelAction;
  warn?: boolean;
};

// export type TableFilter = {
//   [key: string]: {
//     label: string;
//     field: string;
//     type: string;
//   };
// };

export type TableFilterOption = {
  label: string;
  value: string;
};

export type TableFilter = {
  active: string;
  default: string;
  param: string;
  options: Array<TableFilterOption>;
};
