import Block from 'src/core/Block';
import { StoreEvents } from 'src/core/Store';
import { Props } from 'src/types';
import isEqual from 'src/utils/isEqual';

export function connect(Component: typeof Block) {
  return class extends Component {
    private onChangeStoreCallback: () => void;

    constructor(...props: Props[]) {
      const { store } = window;
      let state = store.getState();

      super({ ...props, ...state });

      this.onChangeStoreCallback = () => {
        const newState = store.getState();

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        state = newState;
      };

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...store.getState() });
      });
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
    }
  };
}
