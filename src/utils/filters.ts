import * as _ from 'lodash';

export class FiltersHandler {
  static getSort(sort: string) {
    const [sortBy, sortOrder] = sort.split(':');

    return {
      sortBy,
      sortOrder: sortOrder.toUpperCase(),
    };
  }

  static setDefaultSort(params: any) {
    return {
      ...params,
      sortBy: 'createdAt',
      sortOrder: 'DESC',
    };
  }

  static setFilter = (params: any, filters: any | undefined) => {
    if (filters && Object.keys(filters).length > 0) {
      return {
        ...params,
        ...filters,
      };
    }

    params = _.pick(params, ['page', 'sortBy', 'sortOrder']);
    return {
      ...params,
    };
  };

  static setSort(params: any, sort: string | undefined) {
    if (sort) {
      return {
        ...params,
        ...FiltersHandler.getSort(sort),
      };
    }

    return FiltersHandler.setDefaultSort(params);
    params = _.omit(params, ['sortBy', 'sortOrder']);
    return {
      ...params,
    };
  }

  static setPage(params: any, page: number | undefined) {
    page = page ?? 1;
    return {
      ...params,
      page,
    };
  }

  static setSearch(params:any, search:any) {
    if(search) {
      return {
        ...params,
        search,
      };
    } else {
      return {
        ...params,
      };
    }
  }

  static setParams(
    params: any,
    page: number | undefined,
    sort: string | undefined,
    filters: any,
    q?: string
  ) {
    params = FiltersHandler.setPage(params, page);
    params = FiltersHandler.setSort(params, sort);
    params = FiltersHandler.setFilter(params, filters);
    params = FiltersHandler.setSearch(params, q)
    return params;
  }
}
