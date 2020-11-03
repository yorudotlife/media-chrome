import videojs from 'video.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';
import templateHtml from './video-js-element.html';

const template = createTemplate(templateHtml);

class VideoJSElement extends HTMLElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.videoEl = this.shadowRoot.querySelector('video');
  }

  connectedCallback() {
    videojs(this.videoEl);
  }
}

defineCustomElement('video-js', VideoJSElement);

export default VideoJSElement;
