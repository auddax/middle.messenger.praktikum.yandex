import Router from '../core/Router';
import { ROOT_QUERY } from '../../config';
import { RequestResult, SocketResponse } from '../types';
import { validateField } from './validateField';

const router = new Router(ROOT_QUERY);

export const getFormData = (formId: string, clearForm?:boolean) => {
  const formElement = document.getElementById(formId) as HTMLFormElement;
  if (!formElement) throw new Error('Form does not exists!');
  const formData = new FormData(formElement);
  const formProps = Object.fromEntries(formData);
  const isFormValid = Object.entries(formProps).every(([key, value]) => {
    const { isValid } = validateField(value, key);
    return isValid;
  });
  if (!isFormValid) throw new Error('Form is not valid!');
  if (clearForm) formElement.reset();
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

export const handleMessage = (data: SocketResponse, id: number) => ({
  user_id: data.user_id,
  time: data.time,
  content: data.content,
  class: data.user_id === id ? 'message_out' : 'message_in',
});
