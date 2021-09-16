import{MediaUIAttributes as o}from"./constants.js";import{defineCustomElement as h}from"./utils/defineCustomElement.js";import{Window as f,Document as s}from"./utils/server-safe-globals.js";const d=s.createElement("template");d.innerHTML=`
  <style>
    :host {
      display: inline-flex;
      justify-content: center;
      align-items: center;

      background-color: var(--media-control-background, rgba(20,20,30, 0.7));

      /* Default width and height can be overridden externally */
      height: 44px;

      box-sizing: border-box;
      padding: 0 5px;

      /* Min icon size is 24x24 */
      min-height: 24px;
      min-width: 24px;

      /* Vertically center any text */
      font-size: 16px;
      line-height: 24px;
      font-family: sans-serif;
      text-align: center;
      color: #ffffff;
    }

    #container {}
  </style>
  <div id="container"></div>
`;class r extends f.HTMLElement{static get observedAttributes(){return[o.MEDIA_CONTROLLER]}constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(d.content.cloneNode(!0)),this.container=this.shadowRoot.querySelector("#container")}attributeChangedCallback(i,n,t){var a,c;if(i===o.MEDIA_CONTROLLER){if(n){const e=s.getElementById(n);(a=e==null?void 0:e.unassociateElement)==null||a.call(e,this)}if(t){const e=s.getElementById(t);(c=e==null?void 0:e.associateElement)==null||c.call(e,this)}}}connectedCallback(){var n;const i=this.getAttribute(o.MEDIA_CONTROLLER);if(i){const t=s.getElementById(i);(n=t==null?void 0:t.associateElement)==null||n.call(t,this)}}disconnectedCallback(){var n;if(this.getAttribute(o.MEDIA_CONTROLLER)){const t=s.getElementById(mediaControllerId);(n=t==null?void 0:t.unassociateElement)==null||n.call(t,this)}}}h("media-text-display",r);export default r;
