import Block from 'src/core/Block';
import template from './ProfileEditItem.hbs?raw';

type ProfileEditItemProps = {
  label: string; 
  htmlType: string; 
  name: string;
  id: string;
}

class ProfileEditItem extends Block {
  constructor(props: ProfileEditItemProps) {
    super(props)
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileEditItem };
