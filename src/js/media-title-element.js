import templateHtml from './media-chrome-button.html';
import MediaChromeElement from './media-chrome-element.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaTitleBar extends MediaChromeElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

defineCustomElement('media-title-bar', MediaTitleBar);

export default MediaTitleBar;
