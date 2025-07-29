<script lang="ts">
  import { type ExtensionData, globalState } from "./global.svelte";
  import Button from "./lib/Button.svelte";
  import Extension from "./lib/Extension.svelte";
  import Header from "./lib/Header.svelte";
  import Spinner from "./lib/Spinner.svelte";
  import { toTitleCase } from "./stringUtils";

  let filterState: "all" | "active" | "inactive" = $state("all");

  function shouldDisplayExtension(extension: ExtensionData): boolean {
    switch (filterState) {
      case "all":
        return true;
      case "active":
        return extension.isActive;
      case "inactive":
        return !extension.isActive;
    }
  }

  let filteredExtensions = $derived(
    globalState.extensions.filter(shouldDisplayExtension)
  );

  $effect(() => {
    if (globalState.colorScheme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });
</script>

<div class="container">
  <Header />

  <div class="split">
    <h1>Extensions List</h1>

    <ul class="btn-group" role="tablist">
      {#each ["all", "active", "inactive"] as const as filterType}
        <Button
          size="large"
          variant={filterState === filterType ? "primary" : undefined}
          onclick={() => (filterState = filterType)}
          role="tab"
          aria-selected={filterState === filterType}
          >{toTitleCase(filterType)}</Button
        >
      {/each}
    </ul>
  </div>

  <main>
    {#await globalState.populateExtensions()}
      <div class="spinner-container">
        <Spinner />
      </div>
    {:then}
      <ul class="extensions">
        {#each filteredExtensions as extension (extension.id)}
          <Extension {...extension} />
        {/each}
      </ul>
    {:catch err}
      <p>{err}</p>
    {/await}
  </main>
</div>

<style>
  .container {
    margin-top: 1rem;
  }

  .split {
    display: grid;
    justify-content: center;

    margin-top: 2.5rem;
    gap: 0.25rem 0.5rem;
  }

  h1 {
    font-size: var(--size-xl);
    font-weight: var(--weight-bold);
    color: var(--clr-text-3);
    text-align: center;
  }

  .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
    padding: 0;
  }

  main {
    margin-top: 1rem;
  }

  .spinner-container {
    display: grid;
    justify-content: center;
    padding: 10vh;
  }

  .extensions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));
    grid-auto-rows: minmax(22.5ch, auto);
    margin: 0;
    padding: 0;
    gap: 0.75rem;
    list-style: none;
  }

  @media (min-width: 1440px) {
    .container {
      margin-top: 2rem;
    }

    .split {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .extensions {
      margin-top: 1rem;
    }
  }
</style>
