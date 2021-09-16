import{MediaUIAttributes as n}from"./constants.js";import{defineCustomElement as l}from"./utils/defineCustomElement.js";import{Window as m,Document as i}from"./utils/server-safe-globals.js";const r=i.createElement("template");r.innerHTML=`
  <style>
    :host {
      /* Need position to display above video for some reason */
      position: relative;
      box-sizing: border-box;
      display: inline-flex;

      /* Allows putting the progress range at full width on other lines */
      flex-wrap: wrap;

      color: var(--media-icon-color, #eee);
    }

    ::slotted(*), :host > * {
      /* position: relative; */
    }

    media-time-range,
    ::slotted(media-time-range),
    ::slotted(media-progress-range),
    ::slotted(media-clip-selector) {
      flex-grow: 1;
    }
  </style>

  <slot></slot>
`;class d extends m.HTMLElement{static get observedAttributes(){return[n.MEDIA_CONTROLLER]}constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(r.content.cloneNode(!0))}attributeChangedCallback(o,s,t){var a,c;if(o===n.MEDIA_CONTROLLER){if(s){const e=i.getElementById(s);(a=e==null?void 0:e.unassociateElement)==null||a.call(e,this)}if(t){const e=i.getElementById(t);(c=e==null?void 0:e.associateElement)==null||c.call(e,this)}}}connectedCallback(){var s;const o=this.getAttribute(n.MEDIA_CONTROLLER);if(o){const t=i.getElementById(o);(s=t==null?void 0:t.associateElement)==null||s.call(t,this)}}disconnectedCallback(){var s;if(this.getAttribute(n.MEDIA_CONTROLLER)){const t=i.getElementById(mediaControllerId);(s=t==null?void 0:t.unassociateElement)==null||s.call(t,this)}}}l("media-control-bar",d);export default d;
