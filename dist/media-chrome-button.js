import{MediaUIAttributes as r}from"./constants.js";import{defineCustomElement as m}from"./utils/defineCustomElement.js";import{Window as f,Document as a}from"./utils/server-safe-globals.js";const d=a.createElement("template");d.innerHTML=`
<style>
  :host {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    background-color: var(--media-control-background, rgba(20,20,30, 0.7));

    /* Default width and height can be overridden externally */
    padding: 10px;
    

    /* Vertically center any text */
    font-size: 14px;
    line-height: 1;
    font-weight: bold;

    /* Min icon size is 24x24 */
    min-height: 24px;
    min-width: 24px;

    transition: background-color 0.15s linear;
  }

  /*
    Only show outline when keyboard focusing.
    https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
  */
  :host-context([media-keyboard-control]):host(:focus),
  :host-context([media-keyboard-control]):host(:focus-within) {
    box-shadow: inset 0 0 0 2px rgba(27, 127, 204, 0.9);
  }

  :host(:hover) {
    background-color: var(--media-control-hover-background, rgba(50,50,70, 0.7));
  }

  /* Undo the default button styles and fill the parent element */
  .button {
    width: 100%;
    vertical-align: middle;
    border: none;
    margin: 0;
    padding: 0;
    text-decoration: none;
    background: transparent;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 14px;
    line-height: 24px;
    font-weight: bold;
    font-family: Arial, sans-serif;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .button:hover {}
  .button:focus {
    outline: 0;
  }
  .button:active {}

  svg, img, ::slotted(svg), ::slotted(img) {
    width: var(--media-button-icon-width, 24px);
    height: var(--media-button-icon-height);
    transform: var(--media-button-icon-transform);
    transition: var(--media-button-icon-transition);
    fill: var(--media-icon-color, #eee);
    vertical-align: middle;
  }
</style>

<div class="button"></div>
`;const l=["Enter"," "];class h extends f.HTMLElement{static get observedAttributes(){return[r.MEDIA_CONTROLLER]}constructor(i={}){super();const n=this.attachShadow({mode:"open"}),e=d.content.cloneNode(!0);this.nativeEl=e.querySelector("div"),this.setAttribute("role","button"),this.setAttribute("aria-live","polite"),this.setAttribute("tabindex",0);let o=i.slotTemplate;o||(o=a.createElement("template"),o.innerHTML=`<slot>${i.defaultContent||""}</slot>`),this.nativeEl.appendChild(o.content.cloneNode(!0)),n.appendChild(e),this.addEventListener("click",t=>{this.handleClick(t)});const s=t=>{const{key:c}=t;if(!l.includes(c)){this.removeEventListener("keyup",s);return}this.handleClick(t)};this.addEventListener("keydown",t=>{const{metaKey:c,altKey:u,key:b}=t;if(c||u||!l.includes(b)){this.removeEventListener("keyup",s);return}this.addEventListener("keyup",s)})}attributeChangedCallback(i,n,e){var o,s;if(i===r.MEDIA_CONTROLLER){if(n){const t=a.getElementById(n);(o=t==null?void 0:t.unassociateElement)==null||o.call(t,this)}if(e){const t=a.getElementById(e);(s=t==null?void 0:t.associateElement)==null||s.call(t,this)}}}connectedCallback(){var n;const i=this.getAttribute(r.MEDIA_CONTROLLER);if(i){const e=a.getElementById(i);(n=e==null?void 0:e.associateElement)==null||n.call(e,this)}}disconnectedCallback(){var n;if(this.getAttribute(r.MEDIA_CONTROLLER)){const e=a.getElementById(mediaControllerId);(n=e==null?void 0:e.unassociateElement)==null||n.call(e,this)}}handleClick(){}}m("media-chrome-button",h);export default h;
