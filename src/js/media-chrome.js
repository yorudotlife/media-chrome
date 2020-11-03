import controlsTemplateHtml from './media-chrome-controls.html';
import MediaChromeElement from './media-chrome-element.js';
import templateHtml from './media-chrome.html';
import './media-control-bar.js';
import { createTemplate } from './utils/createTemplate.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

const template = createTemplate(templateHtml);
const controlsTemplate = createTemplate(controlsTemplateHtml);

class MediaChrome extends HTMLElement {
  constructor() {
    super();

    // Set up the Shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.container = this.shadowRoot.getElementById('container');

    this._media = null;

    const mutationCallback = function (mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.removedNodes.forEach(node => {
            if (node.media === this.media) {
              // Undo auto-injected medias
              node.media = null;
            }
          });
          mutation.addedNodes.forEach(node => {
            if (node instanceof MediaChromeElement && !node.media) {
              // Inject the media in new children
              // Todo: Make recursive
              node.media = this.media;
            }
          });
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(mutationCallback);

    // Start observing the target node for configured mutations
    observer.observe(this, { childList: true, subtree: true });

    // -=----------------------------


  }

  get media() {
    return this._media;
  }

  set media(media) {
    this._media = media;

    if (media) {
      // Toggle play/pause with clicks on the media element itself
      // TODO: handle child element changes, mutationObserver
      this.addEventListener('click', e => {
        const media = this.media;

        // instanceof HTMLMediaElement ||
        // CustomVideoElement && e.target instanceof CustomVideoElement
        if (e.target.slot == 'media') {
          if (media.paused) {
            media.play();
          } else {
            media.pause();
          }
        }
      });

      this.container.classList.add('paused');

      // Uncomment to auto-hide controls
      media.addEventListener('play', () => {
        this.container.classList.remove('paused');
      });

      media.addEventListener('pause', () => {
        this.container.classList.add('paused');
      });

      const mediaName = media.nodeName.toLowerCase();

      if (mediaName == 'audio' || mediaName == 'video') {
        propagteNewMedia.call(this, media);
      } else {
        // Wait for custom video element to be ready before setting it
        window.customElements.whenDefined(mediaName).then(() => {
          propagteNewMedia.call(this, media);
        });
      }
    }

    function propagteNewMedia(media) {
      this.querySelectorAll('*').forEach(el => {

        if (el instanceof MediaChromeElement) {
          // Media should be settable at this point.
          el.media = this.media;
        }
      });

      this.shadowRoot.querySelectorAll('*').forEach(el => {
        if (el instanceof MediaChromeElement) {
          el.media = this.media;
        }
      });
    }
  }

  connectedCallback() {
    // Don't know child components until the el finishes displaying
    const observer = new MutationObserver((mutationsList, observer) => {
      // Set this up to track what media elements are available.
      // This could be much faster than doing a querySelector
      // for the mediaElement each time, but that might also be
      // premature optimization.
    });
    observer.observe(this, {
      childList: true,
    });

    if (this.attributes['defaultControls']) {
      this.container.appendChild(controlsTemplate.content.cloneNode(true));
    }

    let media = this.querySelector('[slot=media]');

    if (media) {
      this.media = media;
    }

    const scheduleInactive = () => {
      this.container.classList.remove('inactive');
      window.clearTimeout(this.inactiveTimeout);
      this.inactiveTimeout = window.setTimeout(() => {
        this.container.classList.add('inactive');
      }, 2000);
    };

    // Unhide for keyboard controlling
    this.addEventListener('keyup', e => {
      scheduleInactive();
    });

    this.addEventListener('mousemove', e => {
      if (e.target === this) return;

      // Stay visible if hovered over control bar
      this.container.classList.remove('inactive');
      window.clearTimeout(this.inactiveTimeout);

      // If hovering over the media element we're free to make inactive
      if (e.target === this.media) {
        scheduleInactive();
      }
    });

    // Immediately hide if mouse leaves the container
    this.addEventListener('mouseout', e => {
      this.container.classList.add('inactive');
    });
  }
}

defineCustomElement('media-chrome', MediaChrome);

export default MediaChrome;
