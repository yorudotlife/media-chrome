// IN PROGRESS
import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-chrome-poster.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

class MediaPoster extends MediaChromeElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.addEventListener('click', e => {
      this.onClick(e);
    });
  }

  mediaSetCallback() {
    const media = this.media;

    if (!media) return;

    this.media.addEventListener('play', () => {
      this.hide();
    });
  }

  onClick() {
    const media = this.media;

    if (media) {
      media.play();
    }
  }

  set src(url) {
    this.shadowRoot.querySelector('#poster').style.backgroundImage = `url(${url})`;
  }

  get src() {
    const val = this.shadowRoot.querySelector('#poster').style.backgroundImage;

    if (!val || val === 'none') {
      return null;
    } else {
      // strip 'url()' from value
      return val.substr(4, val.length - 5);
    }
  }

  show() {
    this.shadowRoot.querySelector('#poster').className = '';
  }

  hide() {
    this.shadowRoot.querySelector('#poster').className = 'hidden';
  }
}

defineCustomElement('media-poster', MediaPoster);

export default MediaPoster;
