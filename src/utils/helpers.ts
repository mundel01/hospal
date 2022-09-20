import { DATE_FORMAT, FILE_BASE_URL } from '@config/constant';
import * as dayjs from 'dayjs';
import { cloneDeep, forEach, omit } from 'lodash';
import { TableConfig } from '@custom-types/table';

export const stripText = (text: string, length: number = 100) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export const stripId = (id: string) => {
  return id.slice(id.length - 5);
  let idElements: string[] = id.split('-');
  return idElements[idElements.length - 1];
};

export const getDatefromDatetime = (date: string) => {
  return dayjs(date).format(DATE_FORMAT);
};

export const transformAadharData = (
  data: any,
  user_id: string,
  type: 'INPUT' | 'OUTPUT'
) => {
  switch (type) {
    case 'INPUT':
      return getAadharInputData(data, user_id);

    // case 'OUTPUT':
    //   return getOutputData(data);
  }
};

export const getImageURLFromFile = (file: any) => {
  const { paths } = file;
  return FILE_BASE_URL + paths.split(',')[0];
};

export const getImageURLFromShortUrls = (url: any) => {
  return FILE_BASE_URL + url;
};


export const convertFileToBinary = (file: File): FormData => {
  let formData = new FormData();
  formData.append('file', file);
  return formData;
};

export const transformDocumentDataForUI = (data: any) => {
  let resut = cloneDeep(data);
  const details: any = {};
  forEach(resut.details, (detail: any) => {
    details[detail.label] = detail.value;
  });

  const documentType: string = data.name;

  resut = omit(resut, 'details');
  return {
    ...resut,
    ...details,
    documentType,
  };
};

export const getPanInputData = (data: any, user_id: string) => {
  const details: any[] = [];
  details.push({
    label: 'NAME',
    value: data.NAME,
  });
  const panCardPhotoId: string = data.panCardPhotoId;

  data = omit(data, 'NAME', 'panCardPhotoId');
  return {
    ...data,
    details: details,
    name: 'PAN_CARD',
    backFileId: null,
    otherName: '',
    userId: user_id,
    frontFileId: panCardPhotoId,
  };
};

export const getAadharInputData = (data: any, user_id: string) => {
  const details: any[] = [];
  details.push({
    label: 'NAME',
    value: data.NAME,
  });

  details.push({
    label: 'FATHER_NAME',
    value: data.FATHER_NAME,
  });

  details.push({
    label: 'DOB',
    value: data.DOB,
  });

  data = omit(data, 'NAME', 'FATHER_NAME', 'DOB');

  return {
    ...data,
    details: details,
    name: 'AADHAR_CARD',
    otherName: '',
    userId: user_id,
  };
};

export const formatOptions = (options: any[], formatConf: any = {}): any[] => {
  const name: string = formatConf.name ?? 'name';
  const value: string = formatConf.value ?? 'id';

  return options.map((option) => {
    return {
      value: option[value],
      name: option[name],
    };
  });
};

export const formatManagerOptions = (data: any[]) => {
  return data.map((option: any) => {
    return {
      value: option.id,
      name: `${option.firstName} ${option.lastName} - ${option.role.name}`,
    };
  });
};

export const getImagePathFromFile = (file: any): string | undefined => {
  try {
    let path: string = file.paths;
    path = path.split(',')[0];
    return FILE_BASE_URL + path;
  } catch (error) {}

  return undefined;
};

export const camelize = (str: string) => {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

// convert array of string to type.
export function asLiterals<T extends string>(arr: T[]): T[] {
  return arr;
}

// convert array of string to enum
export function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const parseBoolean = (value: string) => {
  value = value.toString();
  value = value.toLowerCase();
  return value === 'true';
};

export const transformPocAddressDataForUI = (data: any) => {
  let result = cloneDeep(data);
  const line1 = data.address.line1;
  const line2 = data.address.line2;
  const city = data.address.city;
  const state = data.address.state;

  result = omit(result, 'address');
  return {
    ...result,
    line1,
    line2,
    city,
    state,
  };
};

export const getPOCAddressInputData = (data: any, client_id: string) => {
  const address = {
    line1: data.line1,
    line2: data.line2,
    city: data.city,
    state: data.state,
  };

  data = omit(data, 'line1', 'line2', 'city', 'state');

  return {
    ...data,
    address: address,
    clientId: client_id,
  };
};

export const getPayoutDetailViewIdsFromUrl = (url: string) => {
  const splitUrl: string[] = url.split('/');
  return [splitUrl[3], splitUrl[5]];
};

export const updatePayoutDetailViewTableConfig = (
  tableConfig: TableConfig,
  url: string
) => {
  const [id, payoutId] = getPayoutDetailViewIdsFromUrl(url);

  return {
    ...tableConfig,
    base: tableConfig.base.replace('{id}', id).replace('{payoutId}', payoutId),
  };
};

export const getPayoutTemplateId = (url: string) => {
  const splitUrl: string[] = url.split('/');
  return splitUrl[splitUrl.length - 2];
};

export const parseTargetsToInt = (data: any) => {
  data['target'] = parseInt(data['target']);
  return { ...data };
};
