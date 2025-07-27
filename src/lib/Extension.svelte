<script lang="ts">
  import { setExtensionStatus } from "../global.svelte";
  import type { ExtensionData } from "../types";
  import Button from "./Button.svelte";
  import Switch from "./Switch.svelte";

  let { id, logo, name, description, isActive }: ExtensionData = $props();
</script>

<article class="surface">
  <div class="content">
    <img src={logo} alt="" class="icon" />
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  </div>
  <div class="btns">
    <Button variant="outline">Remove</Button>
    <Switch
      onchange={(on) => setExtensionStatus(id, on)}
      on={isActive}
      name="active-switch"
      labelText="Toggle this extension on or off"
    />
  </div>
</article>

<style>
  article {
    padding: var(--padding-4);
    border-radius: 1em;
  }

  .content {
    display: flex;
    align-items: start;
    column-gap: 1rem;
  }

  h2 {
    color: var(--clr-text-3);
    font-weight: var(--weight-bold);
    font-size: var(--size-large);
  }

  p {
    margin-top: 0.5rem;
  }

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
  }
</style>
