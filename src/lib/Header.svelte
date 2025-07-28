<script lang="ts">
  import { globalState } from "../global.svelte";

  const iconType = $derived(
    globalState.colorScheme === "dark" ? "sun" : "moon"
  );
</script>

<header class="surface">
  <img
    src="/src/assets/images/logo-{globalState.colorScheme}.svg"
    alt="Extensions"
    class="logo"
  />
  <button
    onclick={() =>
      (globalState.colorScheme =
        globalState.colorScheme === "light" ? "dark" : "light")}
    class="color-scheme-btn"
    aria-label="Color Scheme Button"
  >
    <img src="/src/assets/images/icon-{iconType}.svg" alt="" />
  </button>
</header>

<style>
  header.surface {
    display: flex;
    justify-content: space-between;
    padding: var(--padding-2);
    border-radius: 0.5em;
    border: none;
  }

  .color-scheme-btn {
    border-radius: 0.5em;
    background-color: var(--clr-bg-2);
    border: none;
    padding: var(--padding-3);
  }
</style>
