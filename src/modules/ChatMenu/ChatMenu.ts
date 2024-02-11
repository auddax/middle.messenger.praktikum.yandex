import Block from 'src/core/Block';
import { ChatDeleteModal } from '../ChatDeleteModal';
import template from './ChatMenu.hbs?raw';
import config from '../../../config.json';

const { rootQuery } = config;

const modal = new ChatDeleteModal();

class ChatMenu extends Block {
  constructor() {
    super({
      handleDeleteChat: () => {
        const modalElement = modal.render();
        const root = document.getElementById(rootQuery);
        if (root) root.append(modalElement);
        const popup = document.querySelector('.backdrop');
        if (popup) {
          popup.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            if (target.className === 'backdrop') popup.remove();
          });
        }
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export { ChatMenu };
