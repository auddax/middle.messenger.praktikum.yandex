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

  render() {
    const { error } = window.store.getState();
    const { props } = this;
    return this.compile(template, { ...props, ...error });
  }
});

export { ErrorPage };
