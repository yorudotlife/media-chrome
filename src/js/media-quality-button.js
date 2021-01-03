import MediaChromeButton from './media-chrome-button.js';
import { defineCustomElement } from './utils/defineCustomElement.js';

/*
  <media-quality-rate-button rates="1,1.5,2">
*/

class QualityLevelList extends EventTarget {
  constructor() {
    super();
  }

  addLevel(levelObject) {

  }

  removeLevel(index) {

  }
}

class MediaQualityMenu extends MediaChromeButton {
  constructor() {
    super();

    this.qualityList = new QualityLevelList();
    console.log(this.qualityList);
  }

  static get observedAttributes() {
    return [].concat(super.observedAttributes || []);
  }

  onClick(e) {
  }

  mediaSetCallback(media) {
    const qualityList = media.qualityList;

    if (!qualityList) {
      // media element doesn't support qualityLists
      return;
    }

    this._listChangeHandler = () => {};
    this._addLevelHandler = () => {};
    this._removeLevelHandler = () => {};

    qualityList.addEventListener('change', this._listChangeHandler);
    qualityList.addEventListener('addlevel', this._addLevelHandler);
    qualityList.addEventListener('removelevel', this._removeLevelHandler);
  }

  mediaUnsetCallback(media) {
    const levels = media.qualityLevels;

    if (!levels) {
      // media element doesn't support qualityLists
      return;
    }

    levels.removeEventListener('change', this._listChangeHandler);
  }
}

defineCustomElement('media-playback-rate-button', MediaPlaybackRateButton);

export default MediaPlaybackRateButton;
