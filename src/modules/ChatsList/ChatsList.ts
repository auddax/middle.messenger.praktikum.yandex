import { ROOT_QUERY, INIT_STATE } from '../../../config';
import Block from '../../core/Block';
import { Props } from '../../types';
import { logout } from '../../services/auth';
import Router from '../../core/Router';
import { connect } from '../../utils/connect';
import template from './ChatsList.hbs?raw';

const router = new Router(ROOT_QUERY);

const ChatsList = connect(class extends Block {
  constructor(props: Props) {
    super({
      handleLogout: async () => {
        window.store.set(INIT_STATE);
        const response = await logout();
        if (response) router.go('/login');
      },
      goProfilePage: () => router.go('/settings'),
      handleAddChat: () => window.store.set({ isChatAddModalOpen: true }),
      ...props,
    });
  }

  render() {
    return template;
  }
});

export { ChatsList };
