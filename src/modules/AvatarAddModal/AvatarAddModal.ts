import Block from 'src/core/Block';
// import { getFormData } from 'src/utils/handlers';
import { editUserAvatar } from 'src/services/user';
import { setUser } from 'src/services/auth';
import template from './AvatarAddModal.hbs?raw';

class AvatarAddModal extends Block {
  constructor() {
    super({
      success: false,
      fileName: '',
      file: null,
      handleSelectAvatar: () => {
        const inputElement = document.getElementById('profileEditAvatar') as HTMLInputElement;
        if (inputElement && inputElement?.files?.length) {
          const file = inputElement.files[0];
          const fileName = file.name;
          this.setProps({ fileName, file });
        }
      },
      handleSubmitAvatar: async () => {
        const file = this.props.file as File;
        if (!file) throw new Error('File is not selected!');
        const formData = new FormData();
        formData.append('avatar', file);
        if (formData) {
          const resp = await editUserAvatar(formData);
          if (resp) {
            this.setProps({ success: true });
            await setUser();
            window.store.set({ isAvatarAddModalOpen: false });
          }
        }
      },
    });
  }

  protected render() {
    return template;
  }
}

export { AvatarAddModal };
