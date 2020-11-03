import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-chrome-menu.html';
import './media-chrome-menuitem.js';
import './media-chrome-submenu-menuitem.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaChromeMenu extends MediaChromeElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  mediaSetCallback(media) { }
}

defineCustomElement('media-chrome-menu', MediaChromeMenu);

export default MediaChromeMenu;
