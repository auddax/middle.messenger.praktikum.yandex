import Block from 'src/core/Block';
import { router } from 'src/router';
import { Props } from 'src/types';
import { connect } from 'src/utils/connect';
import template from './ErrorPage.hbs?raw';

const ErrorPage = connect(class extends Block {
  constructor(props: Props) {
    super({
      goBack: () => router.back(),
      ...props,
    });
  }

  protected render() {
    return template;
  }
});

export { ErrorPage };
