import MediaChromeButton from './media-chrome-button.js';
import templateHtml from './media-chrome-menu-button.html';
import './media-chrome-menuitem.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaChromeMenuButton extends MediaChromeButton {
  constructor() {
    super();
    this.shadowRoot.prepend(template.content.cloneNode(true));
    this.menuContainer = this.shadowRoot.querySelector('#menuContainer');

    if (this.attributes.expanded) {
      this.menuContainer.style.display = 'flex';
    }
  }

  onClick(e) {
    if (this.attributes.expanded) {
      this.removeAttribute('expanded');
      this.menuContainer.style.display = 'none';
    } else {
      this.setAttribute('expanded', 'expanded');
      this.menuContainer.style.display = 'flex';
    }
  }

  mediaSetCallback(media) { }
}

defineCustomElement('media-chrome-menu-button', MediaChromeMenuButton);

export default MediaChromeMenuButton;
