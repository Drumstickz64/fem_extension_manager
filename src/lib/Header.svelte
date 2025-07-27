<script lang="ts">
  import { colorScheme } from "../global.svelte";

  const iconType = $derived(colorScheme === "dark" ? "sun" : "moon");
</script>

<header class="surface">
  <img src="/src/assets/images/logo.svg" alt="Extensions" class="logo" />
  <button class="color-scheme-btn" aria-label="Color Scheme Button">
    <img src="/src/assets/images/icon-{iconType}.svg" alt="" />
  </button>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    padding: var(--padding-2);
    border-radius: 0.5em;
  }

  .color-scheme-btn {
    border-radius: 0.5em;
    background-color: var(--clr-bg-2);
    border: none;
    padding: var(--padding-3);
  }
</style>
