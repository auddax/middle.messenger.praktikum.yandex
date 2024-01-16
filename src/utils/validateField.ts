const rules = {
  login: {
    regexp: /^[a-zA-Z0-9_-]{3,20}$/,
    message: 'Логин должен включать в себя от 3 до 20 символов латиницы или цифр',
  },
  password: {
    regexp: /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,40}$/,
    message: 'Пароль должен включать в себя от 8 до 40 символов латиницы в верхнем и нижнем регистрах и цифры',
  },
  email: {
    regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Проверьте правильность ввода электронной почты',
  },
  phone: {
    regexp: /^\+?\d{10,15}$/,
    message: 'Проверьте правильность ввода, телефонный номер должен включать от 10 до 15 цифр',
  },
  name: {
    regexp: /^([А-ЯЁA-Z][а-яёa-z]+-?[А-ЯЁA-Zа-яёa-z]*)$/,
    message: 'Проверьте правильность ввода, не допускаются цифры и спецсимволы',
  },
  message: {
    regexp: /.+/,
    message: 'Поле не может быть пустым',

  }
};

export const validateField = (value: string, name: string) => {
  let rule;
  switch (name) {
    case 'login':
      rule = rules.login;
      break;
    case 'password':
    case 'oldPassword':
    case 'newPassword':
    case 'confirmPassword':
      rule = rules.password;
      break;
    case 'email':
      rule = rules.email;
      break;
    case 'phone':
      rule = rules.phone;
      break;
    case 'first_name':
    case 'second_name':
    case 'display_name':
      rule = rules.name;
      break;
    case 'message':
      rule=rules.message;
      break;
    default:
      return { isValid: true, message: '' };
  }
  return {
    isValid: rule?.regexp?.test(value),
    message: rule?.message,
  };
};
