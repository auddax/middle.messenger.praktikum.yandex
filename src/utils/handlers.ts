import { validateField } from './validateField';

export const submitHandler = (formId: string) => {
  const formElement = document.getElementById(formId) as HTMLFormElement;
  if (formElement) {
    const formData = new FormData(formElement);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  }
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
