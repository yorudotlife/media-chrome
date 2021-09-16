import{Window as g,Document as c}from"./utils/server-safe-globals.js";import{defineCustomElement as p}from"./utils/defineCustomElement.js";import{MediaUIAttributes as o}from"./constants.js";const E=c.createElement("template");E.innerHTML=`
  <style>
    :host {
      box-sizing: border-box;
      background-color: #000;
      width: 284px;
      height: 160px;
      overflow: hidden;
    }

    img {
      position: absolute;
      left: 0;
      top: 0;
    }
  </style>
  <img crossorigin loading="eager" decoding="async" />
`;class u extends g.HTMLElement{static get observedAttributes(){return[o.MEDIA_CONTROLLER,"time",o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS]}constructor(){super();this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(E.content.cloneNode(!0))}connectedCallback(){var i;this.setAttribute(o.MEDIA_CHROME_ATTRIBUTES,this.constructor.observedAttributes.join(" "));const n=this.getAttribute(o.MEDIA_CONTROLLER);if(n){const t=c.getElementById(n);(i=t==null?void 0:t.associateElement)==null||i.call(t,this)}}disconnectedCallback(){var i;if(this.getAttribute(o.MEDIA_CONTROLLER)){const t=c.getElementById(mediaControllerId);(i=t==null?void 0:t.unassociateElement)==null||i.call(t,this)}}attributeChangedCallback(n,i,t){var s,a;if(["time",o.MEDIA_PREVIEW_IMAGE,o.MEDIA_PREVIEW_COORDS].includes(n)&&this.update(),n===o.MEDIA_CONTROLLER){if(i){const e=c.getElementById(i);(s=e==null?void 0:e.unassociateElement)==null||s.call(e,this)}if(t){const e=c.getElementById(t);(a=e==null?void 0:e.associateElement)==null||a.call(e,this)}}}update(){const n=this.getAttribute(o.MEDIA_PREVIEW_COORDS),i=this.getAttribute(o.MEDIA_PREVIEW_IMAGE);if(!(n&&i))return;const t=this.offsetWidth,s=this.shadowRoot.querySelector("img"),[a,e,m,b]=n.split(/\s+/).map(I=>+I),h=i,d=t/m||1,r=()=>{s.style.width=`${d*s.naturalWidth}px`,s.style.height=`${d*s.naturalHeight}px`};s.src!==h&&(s.onload=r,s.src=h,r()),r(),s.style.left=`-${d*a}px`,s.style.top=`-${d*e}px`}}p("media-thumbnail-preview",u);export default u;
