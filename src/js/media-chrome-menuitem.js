import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-chrome-menuitem.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaChromeMenuitem extends MediaChromeElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.contentConatiner = this.shadowRoot.querySelector('#contentContainer');

    this.addEventListener('click', e => {
      this.onClick(e);
    });
  }

  onClick() { }
}

defineCustomElement('media-chrome-menuitem', MediaChromeMenuitem);

export default MediaChromeMenuitem;
