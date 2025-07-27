<script lang="ts">
  import { type ExtensionData, globalState } from "./global.svelte";
  import Button from "./lib/Button.svelte";
  import Extension from "./lib/Extension.svelte";
  import Header from "./lib/Header.svelte";
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

  {#await globalState.populateExtensions()}
    Fetching Extensions...
  {:then}
    <ul class="extensions">
      {#each filteredExtensions as extension (extension.id)}
        <Extension {...extension} />
      {/each}
    </ul>
  {:catch err}
    <p>{err}</p>
  {/await}
</div>

<style>
  .container {
    max-width: 135ch;
    margin: 0 auto;
    padding: var(--padding-2);
  }

  .split {
    display: grid;
    justify-content: center;

    margin-top: 2rem;
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

  .extensions {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(35ch, 1fr));
    margin: 1.5rem 0 0 0;
    padding: 0;
    gap: 0.75rem;
  }

  @media (min-width: 1440px) {
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
