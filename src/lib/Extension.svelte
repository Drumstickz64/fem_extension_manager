<script lang="ts">
  import { fade } from "svelte/transition";
  import { globalState, type ExtensionData } from "../global.svelte";
  import Button from "./Button.svelte";
  import Switch from "./Switch.svelte";

  let {
    id,
    logo,
    name,
    description,
    isActive = $bindable(),
  }: ExtensionData = $props();

  $effect(() => {
    globalState.setExtensionStatus(id, isActive);
  });
</script>

<article class="surface" transition:fade={{ duration: 200 }}>
  <div class="content">
    <img src={logo} alt="" width="60" height="60" class="icon" />
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  </div>
  <div class="btns">
    <Button variant="outline" onclick={() => globalState.removeExtension(id)}
      >Remove</Button
    >
    <Switch
      bind:on={isActive}
      name="{id}-active-switch"
      labelText="Toggle this extension on or off"
    />
  </div>
</article>

<style>
  article {
    display: grid;
    padding: var(--padding-4);
    border-radius: 1em;
    align-content: space-between;
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
  }
</style>
