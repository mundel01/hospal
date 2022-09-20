import { Options } from '@custom-types/models/input-fields.type';
import { strEnum } from '@utils/helpers';

export const InputFieldOptions: Options[] = [
  {
    label: 'Number',
    value: 'number',
  },
  {
    label: 'Text',
    value: 'text',
  },
  {
    label: 'Select',
    value: 'select',
  },
  {
    label: 'Radio',
    value: 'radio',
  },
  {
    label: 'Checkbox',
    value: 'checkbox',
  },
  {
    label: 'Date',
    value: 'date',
  },
  {
    label: 'Password',
    value: 'password',
  },
  {
    label: 'Email',
    value: 'email',
  },
  {
    label: 'Textarea',
    value: 'textarea',
  },
  {
    label: 'Image',
    value: 'image',
  },
];

export const OPTIONS_LIST: string = 'options';
export const VALIDATION_LIST: string = 'validations';
export const ValidationTypeOptions: Options[] = [
  {
    label: 'Is Email',
    value: 'isEmail',
  },
  {
    label: 'Is Mobile number',
    value: 'isMobileNumber',
  },
  // {
  //   label: 'Required',
  //   value: 'required',
  // },
  {
    label: 'Min length',
    value: 'minLength',
  },
  {
    label: 'Min Count',
    value: 'minCount',
  },
  {
    label: 'Max Count',
    value: 'maxCount',
  },
  {
    label: 'Max Length',
    value: 'maxLength',
  },
];

export const ValidationsTypes: any = strEnum(
  ValidationTypeOptions.map((item: Options) => {
    return item.value;
  })
);
export const REGEX: string = 'regex';
