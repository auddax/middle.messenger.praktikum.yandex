import Block from '../../core/Block';
import { focusOutHandler, getFormData } from '../../utils/handlers';
import { searchUser } from '../../services/user';
import { addUsersToChat } from '../../services/chat';
import { UserResponse } from '../../types';
import template from './UserAddModal.hbs?raw';

class UserAddModal extends Block {
  constructor() {
    super({
      users: [],
      selectedUsers: [],
      success: false,
      error: false,
      notFound: false,
      focusOutHandler,
      handleSearchUser: async (e: Event) => {
        e.preventDefault();
        const formProps = getFormData('userNameForm');
        if (formProps) {
          const login = formProps.user_name as string;
          const resp = await searchUser(login);
          if (resp?.length) {
            this.setProps({ notFound: false, users: resp });
          } else {
            this.setProps({ notFound: true });
          }
        }
      },
      handleAddUser: async () => {
        const { currentChat } = window.store.getState();
        const users = this.props.users as UserResponse[];
        const selectedUsers = users.filter((user) => user.selected).map((user) => user.id);
        if (selectedUsers?.length && currentChat) {
          const response = await addUsersToChat(selectedUsers, currentChat);
          if (response) {
            this.setProps({ error: false, success: true });
          }
        } else {
          this.setProps({ error: true, success: false });
        }
      },
      handleSelectUser: (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const selectedUser = Number(target.id);
        const users = this.props.users as UserResponse[];
        const currentUser = users.find((user) => user.id === selectedUser);
        if (currentUser) {
          currentUser.selected = !currentUser.selected;
        }
        this.setProps({ users });
      },
    });
  }

  remove() {
    const modal = document.querySelector('.backdrop');
    if (modal) modal.remove();
  }

  cancelMenu() {
    const element = document.querySelector('.chat__menu') as HTMLElement;
    element.classList.toggle('hidden');
  }

  protected render() {
    return template;
  }
}

export { UserAddModal };
