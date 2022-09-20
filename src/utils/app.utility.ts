import { FormGroup, ValidatorFn } from "@angular/forms";

export function MustMatch(controlName: string, matchingControlName: string) {
  const fn: any = (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors["mustMatch"]) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };

  return fn as ValidatorFn;
}

export const parseToken = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]).toString());
};

export const userFromToken = (token: string) => {
  const payload: any = parseToken(token);
  return payload.user;
};

export const isExpired = (token: string): boolean => {
  const { expiry }: any = parseToken(token);
  return Date.now() > expiry * 1000;
};

export const query = (params: any): string => {
  const _params: URLSearchParams = new URLSearchParams(),
    keys: Array<string> = Object.keys(parseParams(params));

  if (keys.length === 0) {
    return "";
  }

  keys.forEach((key: string) => _params.append(key, params[key]));
  return _params.toString();
};

export const parseParams = (params: any): any => {
  const _params: any = {};

  Object.keys(params).forEach((key: string) => {
    if (params[key]) {
      _params[key] = params[key];
    }
  });

  return _params;
};

export const toSlug = (value: string) => {
  if (!value) {
    return "";
  }

  return value.toLowerCase().replace(/\s/g, "-");
};
