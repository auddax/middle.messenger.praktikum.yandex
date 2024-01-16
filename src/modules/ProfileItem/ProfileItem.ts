import Block from 'src/core/Block';
import template from './ProfileItem.hbs?raw';

type ProfileItemProps = {
  profileInfoTitle: string;
  profileInfoText: string;
};

class ProfileItem extends Block {
  constructor(props: ProfileItemProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ProfileItem };
