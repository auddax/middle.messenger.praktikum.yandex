import { router } from 'src/router';
import { RequestResult } from 'src/types';
import { validateField } from './validateField';

export const getFormData = (formId: string) => {
  const formElement = document.getElementById(formId) as HTMLFormElement;
  if (!formElement) throw new Error('Form does not exists!');
  const formData = new FormData(formElement);
  const formProps = Object.fromEntries(formData);
  const isFormValid = Object.entries(formProps).every(([key, value]) => {
    const { isValid } = validateField(value, key);
    return isValid;
  });
  if (!isFormValid) throw new Error('Form is not valid!');
  return formProps;
};

export const focusOutHandler = (event: Event) => {
  const element = event.target as HTMLInputElement;
  const parent = element?.parentElement;
  const { value, name } = element;
  const { isValid, message } = validateField(value, name);

  const messageElement = parent?.querySelector('.validation-message');
  if (messageElement) parent?.querySelector('.validation-message')?.remove();

  if (!isValid) {
    const span = document.createElement('span');
    span.className = 'validation-message';
    span.textContent = message;
    parent?.appendChild(span);
  }
};

export const handleError = (response: RequestResult) => {
  const responseObj = JSON.parse(response.response);
  const message = responseObj.reason;
  const code = response.status;
  window.store.set({ error: { code, message } });
  router.go('/error');
};
