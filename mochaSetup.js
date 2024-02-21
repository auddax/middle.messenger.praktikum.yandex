import { JSDOM } from 'jsdom'
import * as Components from 'src/components';
import * as Layout from 'src/layout';
import * as Modules from 'src/modules';
import { registerComponent } from 'src/utils/registerComponent';

Object.entries(Components).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Layout).forEach(([name, component]) => {
  registerComponent(name, component);
});

Object.entries(Modules).forEach(([name, component]) => {
  registerComponent(name, component);
});

// const jsdom = new JSDOM(`<body></body>`);
const jsdom = new JSDOM(`<body><div id="app"></div></body>`, {
  url: "https://example.org/",
  referrer: "https://example.com/",
  contentType: "text/html",
  includeNodeLocations: true,
  storageQuota: 10000000,
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;