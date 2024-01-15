export const submitHandler = (formId: string) => {
  const formElement = document.getElementById(formId) as HTMLFormElement;
  if (formElement) {
    const formData = new FormData(formElement);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
  }
}
