import Block from '../../core/Block';
import { focusOutHandler } from '../../utils/handlers';
import template from './ProfileEditItem.hbs?raw';

type ProfileEditItemProps = {
  label: string;
  htmlType: string;
  name: string;
  id: string;
};

class ProfileEditItem extends Block {
  constructor(props: ProfileEditItemProps) {
    super({
      ...props,
      focusOutHandler,
    });
  }

  render() {
    return template;
  }
}

export { ProfileEditItem };
