import { APP_URL } from '@config/constant';
import { ModelAction } from './../../types/model-action.enum';
import { TableConfig, TableColumn, TableAction } from '@custom-types/table';

const CITY_TABLE_COLUMNS: Array<TableColumn> = [
  {
    label: 'Name',
    field: 'name',
    class: 'f16 cn75 w700',
    sortable: true,
    searchable: true,
    type: 'title',
  },

  {
    label: 'State',
    field: 'state.name',
    class: 'f16 cn75 w700',
    sortable: true,
    searchable: true,
    type: 'title',
    sortableField: 'stateId'
  },
  {
    label: 'Created At',
    field: 'createdAt',
    sortable: true,
    type: 'date',
  },
];

const CITY_TABLE_ACTIONS: Array<TableAction> = [
  {
    label: 'Edit',
    icon: 'edit',
    action: ModelAction.EDIT,
  },
  {
    label: 'Delete',
    icon: 'delete',
    action: ModelAction.DELETE,
    warn: true,
  },
];

export const CITY_TABLE_CONFIG: TableConfig = {
  base: APP_URL.MASTERS_CITY,
  icon: 'badge',
  name: 'city',
  columns: CITY_TABLE_COLUMNS,
  actions: CITY_TABLE_ACTIONS,
  filter: {
    active: '',
    default: '',
    param: 'status',
    options: [],
  },
};
