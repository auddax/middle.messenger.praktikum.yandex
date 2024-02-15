import Block from 'src/core/Block';
import { focusOutHandler, getFormData } from 'src/utils/handlers';
import { searchUser } from 'src/services/user';
import { deleteUsersFromChat } from 'src/services/chat';
import { UserResponse } from 'src/types';
import template from './UserDeleteModal.hbs?raw';

class UserDeleteModal extends Block {
  constructor() {
    super({
      users: [],
      selectedUsers: [],
      success: false,
      focusOutHandler,
      handleSearchUser: async () => {
        const formProps = getFormData('userNameForm');
        if (formProps) {
          const login = formProps.user_name as string;
          const resp = await searchUser(login);
          if (resp) {
            this.setProps({ users: resp });
          }
        }
      },
      handleDeleteUser: async () => {
        const { currentChat } = window.store.getState();
        const users = this.props.users as UserResponse[];
        const selectedUsers = users.filter((user) => user.selected).map((user) => user.id);
        if (selectedUsers?.length && currentChat) {
          const response = await deleteUsersFromChat(selectedUsers, currentChat);
          if (response) {
            this.setProps({ success: true });
          }
        } else {
          throw new Error('invalid params');
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

  render() {
    return this.compile(template, this.props);
  }
}

export { UserDeleteModal };
