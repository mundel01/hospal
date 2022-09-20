const FILTERS_CONFIG = {
    name: {
        label: 'Name',
        type: 'text',
        validations: {
          required: false,
        },
        errors: {},
        placeholder: 'Name',
      },
      stateId: {
        label: 'State',
        type: 'select',
        options: [],
        url: '/states',
        isDynamic: true,
        validations: {
          required: false,
        },
        errors: {},
        placeholder: 'State',
      },
  };
  
  const FILTER_ITEMS = [{ label: '', data: FILTERS_CONFIG }];
  
  export { FILTER_ITEMS as CITY_FILTER_CONFIG };
  