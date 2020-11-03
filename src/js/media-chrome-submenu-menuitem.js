import MediaChromeMenuitem from './media-chrome-menuitem.js';
import templateHtml from './media-chrome-submenu-menuitem.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const addTemplate = createTemplate(templateHtml);

class MediaChromeSubmenuMenuitem extends MediaChromeMenuitem {
  constructor() {
    super();

    this.shadowRoot.appendChild(addTemplate.content.cloneNode(true));
    this.menu = this.querySelector('[slot=menu]');
    this.menu.style.display = 'none';
  }

  onClick() {
    if (this.menu.style.display == 'block') {
      this.menu.style.display = 'none';
    } else {
      this.menu.style.display = 'block';
    }
  }
}

defineCustomElement('media-chrome-submenu-menuitem', MediaChromeSubmenuMenuitem);

export default MediaChromeSubmenuMenuitem;
