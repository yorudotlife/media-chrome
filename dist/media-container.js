import{defineCustomElement as c}from"./utils/defineCustomElement.js";import{Window as a,Document as b}from"./utils/server-safe-globals.js";import{MediaUIAttributes as p}from"./constants.js";import{nouns as u}from"./labels/labels.js";const h=b.createElement("template");h.innerHTML=`
  <style>
    :host {
      box-sizing: border-box;
      position: relative;

      /* Position controls at the bottom  */
      display: inline-flex;
      flex-direction: column-reverse;

      /* Max out at 100% width for smaller screens (< 720px) */
      max-width: 100%;
      background-color: #000;
    }

    /* Video specific styles */
    :host(:not([audio])) {
      height: 480px;
      width: 720px;
    }

    /* Safari needs this to actually make the element fill the window */
    :host(:-webkit-full-screen) {
      /* Needs to use !important otherwise easy to break */
      width: 100% !important;
      height: 100% !important;
    }

    /* Position the media element to fill the container */
    ::slotted([slot=media]) {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    /* Hide controls when inactive and not paused and not audio */
    slot:not([media]) ::slotted() {
      opacity: 1;
      transition: opacity 0.25s;
      visibility: visible;
    }

    :host([user-inactive]:not([${p.MEDIA_PAUSED}]):not([audio])) slot:not([media]) ::slotted(*) {
      opacity: 0;
      transition: opacity 1s;
    }

    slot:not([media]) ::slotted(media-control-bar)  {
      width: 100%;
    }
  </style>
  <slot name="media"></slot>
  <slot></slot>
`;class m extends a.HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});this.shadowRoot.appendChild(h.content.cloneNode(!0));const i=(t,f)=>{const l=this.media;for(let o of t)o.type==="childList"&&(o.removedNodes.forEach(s=>{if(s.slot=="media"&&o.target==this){let r=o.previousSibling&&o.previousSibling.previousElementSibling;if(!r||!l)this.mediaUnsetCallback(s);else{let d=r.slot!=="media";for(;(r=r.previousSibling)!==null;)r.slot=="media"&&(d=!1);d&&this.mediaUnsetCallback(s)}}}),l&&o.addedNodes.forEach(s=>{s==l&&this.mediaSetCallback(s)}))};new MutationObserver(i).observe(this,{childList:!0,subtree:!0})}static get observedAttributes(){return["autohide"].concat(super.observedAttributes||[])}get media(){return this.querySelector(":scope > [slot=media]")}mediaSetCallback(e){if(!e||!e.play)return console.error('<media-chrome>: Media element set with slot="media" does not appear to be compatible.',e),!1;const i=e.nodeName.toLowerCase();return i.includes("-")&&!a.customElements.get(i)?(a.customElements.whenDefined(i).then(()=>{this.mediaSetCallback(e)}),!1):!0}mediaUnsetCallback(e){e.removeEventListener("click",this._mediaClickPlayToggle)}connectedCallback(){const i=this.getAttribute("audio")!=null?u.AUDIO_PLAYER():u.VIDEO_PLAYER();this.setAttribute("role","region"),this.setAttribute("aria-label",i),this.media&&this.mediaSetCallback(this.media);const n=()=>{this.removeAttribute("user-inactive"),a.clearTimeout(this.inactiveTimeout),!(this.autohide<0)&&(this.inactiveTimeout=a.setTimeout(()=>{this.setAttribute("user-inactive","user-inactive")},this.autohide*1e3))};this.addEventListener("keyup",t=>{n()}),this.addEventListener("keyup",t=>{this.setAttribute("media-keyboard-control","media-keyboard-control")}),this.addEventListener("mouseup",t=>{this.removeAttribute("media-keyboard-control")}),this.addEventListener("mousemove",t=>{t.target!==this&&(this.removeAttribute("user-inactive"),a.clearTimeout(this.inactiveTimeout),t.target===this.media&&n())}),this.addEventListener("mouseout",t=>{this.autohide>-1&&this.setAttribute("user-inactive","user-inactive")})}set autohide(e){e=Number(e),this._autohide=isNaN(e)?0:e}get autohide(){return this._autohide===void 0?2:this._autohide}}c("media-container-slider",m);export default m;
