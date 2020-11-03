import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-current-time-display.html';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';
import { formatTime } from './utils/time.js';
// Todo: Use data locals: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString

const template = createTemplate(templateHtml);

class MediaCurrentTimeDisplay extends MediaChromeElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.container = this.shadowRoot.querySelector('#container');
    this.update(6000);
  }

  update(time) {
    this.container.innerHTML = formatTime(time);
  }

  mediaSetCallback(media) {
    media.addEventListener('timeupdate', e => {
      this.update(media.currentTime);
    });
    this.update(media.currentTime);
  }

  mediaUnsetCallback() {
    this.update(0);
  }
}

defineCustomElement('media-current-time-display', MediaCurrentTimeDisplay);

export default MediaCurrentTimeDisplay;
