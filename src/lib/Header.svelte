<script lang="ts">
  import { globalState } from "../global.svelte";
  import moonIcon from "/src/assets/images/icon-moon.svg";
  import sunIcon from "/src/assets/images/icon-sun.svg";
  import logoDark from "/src/assets/images/logo-dark.svg";
  import logoLight from "/src/assets/images/logo-light.svg";

  const logo = $derived(
    globalState.colorScheme === "dark" ? logoDark : logoLight
  );

  const themeIcon = $derived(
    globalState.colorScheme === "dark" ? sunIcon : moonIcon
  );
</script>

<header class="surface">
  <img src={logo} alt="Extensions" width="179" height="41" class="logo" />
  <button
    onclick={() =>
      (globalState.colorScheme =
        globalState.colorScheme === "light" ? "dark" : "light")}
    class="color-scheme-btn"
    aria-label="Color Scheme Button"
  >
    <img src={themeIcon} alt="" width="22" height="22" />
  </button>
</header>

<style>
  header.surface {
    display: flex;
    justify-content: space-between;
    padding: var(--padding-3);
    border-radius: 1em;
    border: none;
  }

  .color-scheme-btn {
    border-radius: 0.5em;
    background-color: var(--clr-bg-2);
    border: none;
    padding: var(--padding-3);
  }

  .color-scheme-btn:hover {
    background-color: var(--clr-bg-3);
  }
</style>
