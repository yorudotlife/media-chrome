import h from"./media-chrome-button.js";import{defineCustomElement as u}from"./utils/defineCustomElement.js";import{Window as c,Document as d}from"./utils/server-safe-globals.js";import{MediaUIEvents as o,MediaUIAttributes as t}from"./constants.js";import{verbs as l}from"./labels/labels.js";const v=`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path class="icon" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
</svg>`,m=`<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M0 0h24v24H0z" fill="none"/>
  <path class="icon" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
</svg>`,i=d.createElement("template");i.innerHTML=`
  <style>
  :host([${t.MEDIA_IS_FULLSCREEN}]) slot:not([name=exit]) > *, 
  :host([${t.MEDIA_IS_FULLSCREEN}]) ::slotted(:not([slot=exit])) {
    display: none;
  }

  /* Double negative, but safer if display doesn't equal 'block' */
  :host(:not([${t.MEDIA_IS_FULLSCREEN}])) slot:not([name=enter]) > *, 
  :host(:not([${t.MEDIA_IS_FULLSCREEN}])) ::slotted(:not([slot=enter])) {
    display: none;
  }
  </style>

  <slot name="enter">${v}</slot>
  <slot name="exit">${m}</slot>
`;const r=n=>{const s=n.getAttribute(t.MEDIA_IS_FULLSCREEN)!=null?l.EXIT_FULLSCREEN():l.ENTER_FULLSCREEN();n.setAttribute("aria-label",s)};class a extends h{static get observedAttributes(){return[...super.observedAttributes,t.MEDIA_IS_FULLSCREEN]}constructor(e={}){super({slotTemplate:i,...e})}connectedCallback(){r(this),this.setAttribute(t.MEDIA_CHROME_ATTRIBUTES,this.constructor.observedAttributes.join(" ")),super.connectedCallback()}attributeChangedCallback(e,s,E){e===t.MEDIA_IS_FULLSCREEN&&r(this),super.attributeChangedCallback(e,s,E)}handleClick(e){const s=this.getAttribute(t.MEDIA_IS_FULLSCREEN)!=null?o.MEDIA_EXIT_FULLSCREEN_REQUEST:o.MEDIA_ENTER_FULLSCREEN_REQUEST;this.dispatchEvent(new c.CustomEvent(s,{composed:!0,bubbles:!0}))}}u("media-fullscreen-button",a);export default a;
