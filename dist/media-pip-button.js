import c from"./media-chrome-button.js";import{defineCustomElement as d}from"./utils/defineCustomElement.js";import{Window as b,Document as m}from"./utils/server-safe-globals.js";import{MediaUIEvents as n,MediaUIAttributes as t}from"./constants.js";import{verbs as i}from"./labels/labels.js";const l='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="icon" d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',a=m.createElement("template");a.innerHTML=`
  <style>
  :host([${t.MEDIA_IS_PIP}]) slot:not([name=exit]) > *, 
  :host([${t.MEDIA_IS_PIP}]) ::slotted(:not([slot=exit])) {
    display: none;
  }

  /* Double negative, but safer if display doesn't equal 'block' */
  :host(:not([${t.MEDIA_IS_PIP}])) slot:not([name=enter]) > *, 
  :host(:not([${t.MEDIA_IS_PIP}])) ::slotted(:not([slot=enter])) {
    display: none;
  }
  </style>

  <slot name="enter">${l}</slot>
  <slot name="exit">${l}</slot>
`;const r=o=>{const s=o.getAttribute(t.MEDIA_IS_PIP)!=null?i.EXIT_PIP():i.ENTER_PIP();o.setAttribute("aria-label",s)};class u extends c{static get observedAttributes(){return[...super.observedAttributes,t.MEDIA_IS_PIP]}constructor(e={}){super({slotTemplate:a,...e})}connectedCallback(){r(this),this.setAttribute(t.MEDIA_CHROME_ATTRIBUTES,this.constructor.observedAttributes.join(" ")),super.connectedCallback()}attributeChangedCallback(e,s,I){e===t.MEDIA_IS_PIP&&r(this),super.attributeChangedCallback(e,s,I)}handleClick(e){const s=this.getAttribute(t.MEDIA_IS_PIP)!=null?n.MEDIA_EXIT_PIP_REQUEST:n.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new b.CustomEvent(s,{composed:!0,bubbles:!0}))}}d("media-pip-button",u);export default u;
