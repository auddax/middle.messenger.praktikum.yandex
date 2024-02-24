import { JSDOM } from 'jsdom'
import * as Components from './src/components';
import { registerComponent } from './src/utils/registerComponent';

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component);
});

const jsdom = new JSDOM(`<body><div id="app"></div></body>`, { url: "https://example.org/" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
