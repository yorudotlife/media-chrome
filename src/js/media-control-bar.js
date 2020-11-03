import MediaChromeElement from './media-chrome-element.js';
import './media-chrome-menu-button.js';
import './media-chrome-menu.js';
import './media-chrome-popup.js';
import templateHtml from './media-control-bar.html';
import './media-current-time-display.js';
import './media-duration-display.js';
import './media-forward-button.js';
import './media-fullscreen-button.js';
import './media-mute-button.js';
import './media-pip-button.js';
import './media-play-button.js';
import './media-progress-range.js';
import './media-replay-button.js';
import './media-settings-popup.js';
import './media-volume-range.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);

const controlsTemplate = document.createElement('template');

/*
Before this can work, the media needs to propogate from the control bar
to shadow dom children. Media-chrome can't do that automatically, it
has to be the control bar (or media-chrome-element).
Probably could just kill this feature and wait until we know there's value.
Let all custom controls happen at the media-chrome level.
*/
controlsTemplate.innerHTML = `
  <media-play-button>Play</media-play-button>
  <media-mute-button>Mute</media-mute-button>
  <media-volume-range>Volume</media-volume-range>
  <media-progress-range>Progress</media-progress-range>
  <media-pip-button>PIP</media-pip-button>
  <media-fullscreen-button>Fullscreen</media-fullscreen-button>
`;

class MediaControlBar extends MediaChromeElement {
  constructor() {
    super();

    var shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.attributes['defaultControls']) {
      this.shadowRoot.appendChild(controlsTemplate.content.cloneNode(true));
    }
  }
}

defineCustomElement('media-control-bar', MediaControlBar);

export default MediaControlBar;
