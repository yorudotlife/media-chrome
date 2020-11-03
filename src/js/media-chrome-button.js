import templateHtml from './media-chrome-button.html';
import MediaChromeElement from './media-chrome-element.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaChromeButton extends MediaChromeElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.iconContainer = this.shadowRoot.querySelector('#icon-container');

    this.addEventListener('click', e => {
      this.onClick(e);
    });
  }

  onClick() { }

  set icon(svg) {
    this.iconContainer.innerHTML = svg;
  }
}

defineCustomElement('media-chrome-button', MediaChromeButton);

export default MediaChromeButton;
