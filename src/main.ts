import { registerComponent } from 'src/utils/registerComponent';
import { navigate } from 'src/utils/navigate';
import * as Components from './components';
import * as Layout from './layout';
import * as Modules from './modules';

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Layout).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Modules).forEach(([name, component]) => {
  registerComponent(name, component);
});

document.addEventListener('DOMContentLoaded', () => navigate('loginPage'));
document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
