import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-duration-display.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';
import { formatTime } from './utils/time.js';
// Todo: Use data locals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

const template = createTemplate(templateHtml);

class MediaDurationDisplay extends MediaChromeElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.container = this.shadowRoot.querySelector('#container');
    this.update(0);
  }

  update(duration) {
    this.container.innerHTML = formatTime(duration);
  }

  mediaSetCallback(media) {
    media.addEventListener('durationchange', e => {
      this.update(media.duration);
    });
    this.update(media.duration);
  }

  mediaUnsetCallback() {
    this.update(0);
  }
}

defineCustomElement('media-duration-display', MediaDurationDisplay);

export default MediaDurationDisplay;
