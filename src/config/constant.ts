import { Options } from '@custom-types/models/input-fields.type';
import { AllRoles, Role } from '@custom-types/role.enum';
import * as dayjs from 'dayjs';

export const APP_URL = {
  AUTH: 'auth',
  USER: 'user',
  PROFILE: 'Profile',
  PARTNERS:'Partners',
  PATIENTS:'Patients',
  
};

export const API_URL = {
  MASTERS_CITY: 'cities',
  BULK_UPLOAD_TEMPLATE: 'bulk-upload'
};

export const MODEL_NAMES = {
  CITY: 'CITY',
};

export const APP_NAVIGATION: Array<any> = [
  {
    icon: 'user',
    label: 'User Role',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'Profile',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Partners',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Patients',
        url: APP_URL.USER,
        roles: [],
      },
      
      
  ]
  },
  {
    icon: 'check-square',
    label: 'Treatment Estimate',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'New Estimate Requests',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Forwarded Estimates',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Received Estimates',
        url: APP_URL.USER,
        roles: [],
      },
      
    ]
  },
  {
    icon: 'database',
    label: 'Database',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'Surgeons',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Patient Attendants',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Health Cards',
        url: APP_URL.USER,
        roles: [],
      },     
    ]
  },

  {
    icon: 'file-text',
    label: 'Analytics',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'Hospital-Wise billing',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Patient Country metrics',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'HSC Wise Report',
        url: APP_URL.USER,
        roles: [],
      },
      
    ]
  },
  {
    icon: 'whats-app',
    label: 'Whatsapp Chat',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'Patients Messages',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Other (Unregistered)',
        url: APP_URL.USER,
        roles: [],
      },
      
    ]
  },
  {
    icon: 'question-circle',
    label: 'Queries',
    url: APP_URL.USER,
    children: [
      {
        icon: 'user',
        label: 'Assured Queries',
        url: APP_URL.USER,
        roles: [],
      },
      {
        icon: 'user',
        label: 'Loan Queries',
        url: APP_URL.USER,
        roles: [],
      },
      
      
    ]
  },
  {
    icon: 'file',
    label: 'Hospital Queries',
    url: APP_URL.USER,
    
  },
  {
    icon: 'file',
    label: 'Affilate Partners',
    url: APP_URL.USER,
    
  },
  {
    icon: 'file',
    label: 'Affilate Patients',
    url: APP_URL.USER,
    
  },
  {
    icon: 'file',
    label: 'Product Requests',
    url: APP_URL.USER,
    
  }
]

export const FORM_TYPE: any = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const INVALID_ROLE_LEVEL: number = -1;

export type FormType = 'CREATE' | 'EDIT';

export const PAGINAIION_LIMIT: number = 10;

export const DATE_FORMAT: string = 'YYYY-MM-DD';

export const FILE_TYPES: any[] = ['file', 'file-img'];

export const NULL_VALUE: any = '-';

export const FILE_BASE_URL: string =
  'https://biziselldev.s3.ap-south-1.amazonaws.com/images/';

export const DEFAULT_AVATAR: string =
  'https://www.w3schools.com/howto/img_avatar.png';

export const DEFAULT_LOGO: string =
  'https://www.w3schools.com/howto/img_avatar.png';

export const MAX_DOWNLOAD_LIMIT: number = 10000;

export const FILE_URL_PREFIX: string =
  'https://biziselldev.s3.ap-south-1.amazonaws.com/images/';
export const REQUIRED_VALIDATION: any = {
  required: true,
};

export const FILE_TYPE = {
  'text/plain': 'text/plain',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
};

export const REQUIRED_OPTIONS: Options[] = [
  {
    label: 'yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

export const INPUT_FILEDS: string[] = [
  'name',
  'label',
  'placeHolder',
  'hint',
  'fieldType',
  'minRequiredCount',
  'hasOptions',
  'options',
  'hasValidation',
  'validations',
  'prefix',
  'suffix',
];

export const DEFAULT_DATE_FROMAT: string = 'YYYY-MM-DD';

export const OVERVIEW_DEFAULT_DATE_RANGE = {
  dateFrom: dayjs().format(DEFAULT_DATE_FROMAT),
  dateTo: dayjs().startOf('month').format(DEFAULT_DATE_FROMAT),
};
