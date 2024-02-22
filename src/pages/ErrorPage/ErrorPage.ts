import Block from '../../core/Block';
import Router from '../../core/Router';
import { ROOT_QUERY } from '../../../config';
import { Props } from '../../types';
import { connect } from '../../utils/connect';
import template from './ErrorPage.hbs?raw';

const router = new Router(ROOT_QUERY);

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
