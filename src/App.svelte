<!-- 
This tells the Svelte compiler that this file is a custom element. 
We also have to include the "customElement: true" compiler setting in rollup configuration.
-->
<svelte:options tag="alert-box" />

<script>
  export let id = "";

  // Styling
  export let primary = false;
  export let success = false;
  export let warning = false;
  export let danger = false;
  export let dark = false;
 
  /*
   If fixed is passed as an attribute, the close (X) icon does not 
   show up and the user cannot close the alert-box;
   */
  export let fixed = false;

  /*
  Create a custom "close" event that is fired when the user clicks on the close (X) icon.
  Users can subscribe to this event by targeting the custom element and adding an event
  listener for this custom event. It's completely up to the end user to decide how they want to 
  handle the closing of the element. i.e hidden vs. display, apply animation, etc...
  This is demonstrated in the index.html file.
  */
  function dispatchCloseEvent(e) {

    // 1. Create the custom event.
    const event = new CustomEvent("close", {
      detail: `alert-box was closed.`,
      bubbles: true,
      cancelable: true,
      composed: true // makes the event jump shadow DOM boundary
    });

    // 2. Dispatch the custom event.
    this.dispatchEvent(event);
  }

  let closePath = `M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88
          c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242
          C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879
          s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z`

</script>

<style>
  /* 
  Setting custom css variables enables the user to use css to target a custom
  element by an attribute and change css properties that you want to expose.
  */
  div {
    border-radius: 5px;
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* Customizable Styles */
    background: var(--alert-box-bg, #e2e3e5);
    color: var(--alert-box-text, #383d41);
    width: var(--alert-box-width, auto);
  }
  :host([primary]) {
    --alert-box-bg: #cce5ff;
    --alert-box-text: #004085;
  }
  :host([success]) {
    --alert-box-bg: #d4edda;
    --alert-box-text: #155724;
  }
  :host([warning]) {
    --alert-box-bg: #fff3cd;
    --alert-box-text: #856404;
  }
  :host([danger]) {
    --alert-box-bg: #f8d7da;
    --alert-box-text: #721c24;
  }
 
  :host([dark]) {
    --alert-box-bg: #292b2c;
    --alert-box-text: #cccccc;
  }

  :host([fixed]) span {
    display: none;
  }

  span {
    margin-left: 10px;
    cursor: pointer;
  }

  svg {
    fill: var(--alert-box-text);
  }


</style>

<div role="alert">

  <slot />

  <!-- The close (X) icon -->
  <span {fixed} on:click="{dispatchCloseEvent}" role="button" >
    <slot name="close">
    <svg  height="12px" width="12px"
      viewBox="0 0 47.971 47.971" style="enable-background:new 0 0 47.971 47.971;">
      <g><path d={closePath}/></g>
   </svg>
  </slot>
  </span>

</div>
