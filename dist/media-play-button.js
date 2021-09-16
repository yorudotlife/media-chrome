import d from"./media-chrome-button.js";import{Window as c,Document as h}from"./utils/server-safe-globals.js";import{defineCustomElement as p}from"./utils/defineCustomElement.js";import{MediaUIEvents as a,MediaUIAttributes as t}from"./constants.js";import{verbs as n}from"./labels/labels.js";const A='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="icon" d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',E='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="icon" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',l=h.createElement("template");l.innerHTML=`
  <style>
  :host([${t.MEDIA_PAUSED}]) slot[name=pause] > *, 
  :host([${t.MEDIA_PAUSED}]) ::slotted([slot=pause]) {
    display: none;
  }

  :host(:not([${t.MEDIA_PAUSED}])) slot[name=play] > *, 
  :host(:not([${t.MEDIA_PAUSED}])) ::slotted([slot=play]) {
    display: none;
  }
  </style>

  <slot name="play">${A}</slot>
  <slot name="pause">${E}</slot>
`;const i=o=>{const s=o.getAttribute(t.MEDIA_PAUSED)!=null?n.PLAY():n.PAUSE();o.setAttribute("aria-label",s)};class r extends d{static get observedAttributes(){return[...super.observedAttributes,t.MEDIA_PAUSED]}constructor(e={}){super({slotTemplate:l,...e})}connectedCallback(){i(this),this.setAttribute(t.MEDIA_CHROME_ATTRIBUTES,this.constructor.observedAttributes.join(" ")),super.connectedCallback()}attributeChangedCallback(e,s,u){e===t.MEDIA_PAUSED&&i(this),super.attributeChangedCallback(e,s,u)}handleClick(e){const s=this.getAttribute(t.MEDIA_PAUSED)!=null?a.MEDIA_PLAY_REQUEST:a.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new c.CustomEvent(s,{composed:!0,bubbles:!0}))}}p("media-play-button",r);export default r;
