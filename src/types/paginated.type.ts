export type Paginated<T> = {
  rows: Array<T>;
  page: number;
  limit: number;
  count: number;
};
