export type Options = {
  value: any;
  label: string;
};

export type Validation = {
  key: string;
  msg: string;
  value: string;
};

export type InputField = {
  id?: string;
  name: string;
  label: string;
  key: string;
  placeHolder: string;
  hint: string;
  fieldType: string;
  minRequiredCount: number | null;
  hasOptions: boolean;
  options: Options[];
  hasValidation: boolean;
  validations: Validation[];
  status?: string;
};

export type OrderIDList = {
  id: string;
  order: number;
};
