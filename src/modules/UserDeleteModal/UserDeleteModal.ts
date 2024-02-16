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
      error: false,
      notFound: false,
      focusOutHandler,
      handleSearchUser: async (e:Event) => {
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
      handleDeleteUser: async () => {
        const { currentChat } = window.store.getState();
        const users = this.props.users as UserResponse[];
        const selectedUsers = users.filter((user) => user.selected).map((user) => user.id);
        if (selectedUsers?.length && currentChat) {
          const response = await deleteUsersFromChat(selectedUsers, currentChat);
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

  render() {
    return this.compile(template, this.props);
  }
}

export { UserDeleteModal };
