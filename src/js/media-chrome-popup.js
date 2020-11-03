import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-chrome-popup.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaChromePopup extends MediaChromeElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  mediaSetCallback(media) {

  }

  mediaUnsetCallback() {

  }
}

defineCustomElement('media-chrome-popup', MediaChromePopup);

export default MediaChromePopup;
