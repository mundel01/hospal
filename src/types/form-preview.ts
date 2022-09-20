export enum FormPreviewType {
  'preview' = 'preview',
  'auditor' = 'auditor',
}

export type FormPreviewInputField = {
  label: string;
  value: any;
  type: string;
};
