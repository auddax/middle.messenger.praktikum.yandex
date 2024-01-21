import Block from 'src/core/Block';
import { focusOutHandler } from 'src/utils/handlers';
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
    return this.compile(template, this.props);
  }
}

export { ProfileEditItem };
