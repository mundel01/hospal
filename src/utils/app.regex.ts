export const alpha = /^[a-zA-Z]+$/;
export const email =
  /^(([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-.]+)@{[a-zA-Z0-9_\-.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/;
export const numeric = /^[0-9]+$/;
export const alphanum = /^[0-9a-zA-Z]+$/;
export const name = /^[a-zA-Z ]+$/;
export const slug = /^[a-z-]+$/;
export const workspace = /^[a-zA-Z0-9-]+$/;
export const BANK_VALIDATION = /^\d{9,18}$/;
export const AADHAR_NUMBER_VALIDATION = /^(\d{12}|\d{16})$/;
export const PAN_NUMBER_VALIDATION = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
export const EMPLOYEE_ID_VALIDATION = /[a-zA-Z]{4}-[0-9]{5}$/;
export const MOBILE_VALIDATION = /^[0-9]{10}$/;
export const POSSITIVE_INTEGER = /^\d*[1-9]\d*$/;
