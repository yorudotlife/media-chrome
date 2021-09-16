import{defineCustomElement as b}from"./utils/defineCustomElement.js";import{Window as o,Document as p}from"./utils/server-safe-globals.js";import{MediaUIEvents as u,MediaUIAttributes as v}from"./constants.js";import{nouns as c}from"./labels/labels.js";const m=p.createElement("template");m.innerHTML=`
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

    :host([user-inactive]:not([${v.MEDIA_PAUSED}]):not([audio])) slot:not([media]) ::slotted(*) {
      opacity: 0;
      transition: opacity 1s;
    }

    slot:not([media]) ::slotted(media-control-bar)  {
      width: 100%;
    }
  </style>
  <slot name="media"></slot>
  <slot></slot>
`;class h extends o.HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});this.shadowRoot.appendChild(m.content.cloneNode(!0));const i=(t,g)=>{const l=this.media;for(let a of t)a.type==="childList"&&(a.removedNodes.forEach(n=>{if(n.slot=="media"&&a.target==this){let r=a.previousSibling&&a.previousSibling.previousElementSibling;if(!r||!l)this.mediaUnsetCallback(n);else{let d=r.slot!=="media";for(;(r=r.previousSibling)!==null;)r.slot=="media"&&(d=!1);d&&this.mediaUnsetCallback(n)}}}),l&&a.addedNodes.forEach(n=>{n==l&&this.mediaSetCallback(n)}))};new MutationObserver(i).observe(this,{childList:!0,subtree:!0})}static get observedAttributes(){return["autohide"].concat(super.observedAttributes||[])}get media(){return this.querySelector(":scope > [slot=media]")}mediaSetCallback(e){if(!e||!e.play)return console.error('<media-chrome>: Media element set with slot="media" does not appear to be compatible.',e),!1;const i=e.nodeName.toLowerCase();return i.includes("-")&&!o.customElements.get(i)?(o.customElements.whenDefined(i).then(()=>{this.mediaSetCallback(e)}),!1):(this._mediaClickPlayToggle=s=>{console.log("_mediaClickPlayToggle"),console.log(s.composed),console.log(s.composedPath());const t=e.paused?u.MEDIA_PLAY_REQUEST:u.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new o.CustomEvent(t,{composed:!0,bubbles:!0,cancelable:!0}))},e.addEventListener("click",this._mediaClickPlayToggle,!0),!0)}mediaUnsetCallback(e){e.removeEventListener("click",this._mediaClickPlayToggle)}connectedCallback(){const i=this.getAttribute("audio")!=null?c.AUDIO_PLAYER():c.VIDEO_PLAYER();this.setAttribute("role","region"),this.setAttribute("aria-label",i),this.media&&this.mediaSetCallback(this.media);const s=()=>{this.removeAttribute("user-inactive"),o.clearTimeout(this.inactiveTimeout),!(this.autohide<0)&&(this.inactiveTimeout=o.setTimeout(()=>{this.setAttribute("user-inactive","user-inactive")},this.autohide*1e3))};this.addEventListener("keyup",t=>{s()}),this.addEventListener("keyup",t=>{this.setAttribute("media-keyboard-control","media-keyboard-control")}),this.addEventListener("mouseup",t=>{this.removeAttribute("media-keyboard-control")}),this.addEventListener("mousemove",t=>{t.target!==this&&(this.removeAttribute("user-inactive"),o.clearTimeout(this.inactiveTimeout),t.target===this.media&&s())}),this.addEventListener("mouseout",t=>{this.autohide>-1&&this.setAttribute("user-inactive","user-inactive")})}set autohide(e){e=Number(e),this._autohide=isNaN(e)?0:e}get autohide(){return this._autohide===void 0?2:this._autohide}}b("media-container-temp",h);export default h;
