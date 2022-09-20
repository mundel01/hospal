import { InputField } from '@custom-types/models/input-fields.type';
import { FormPreviewInputField } from '@custom-types/form-preview';

export const transformDataForFormPreview = (
  formInputList: InputField[]
): FormPreviewInputField[] => {
  return formInputList.map((formField) => {
    return {
      label: formField.label,
      value: formField.placeHolder,
      type: formField.fieldType,
    };
  });
};

export const transformDataForAuditing = (
  formInputList: any[]
): FormPreviewInputField[] => {
  return formInputList.map((formField) => {
    return {
      label: formField.sales.label,
      value: formField.value,
      type: formField.sales.fieldType,
    };
  });
};

