import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-settings-popup.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaSettingsPopup extends MediaChromeElement {
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

defineCustomElement('media-settings-popup', MediaSettingsPopup);

export default MediaSettingsPopup;
