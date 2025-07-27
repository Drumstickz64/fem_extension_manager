<script lang="ts">
  import { getExtensions, populateExtensions } from "./global.svelte";
  import Button from "./lib/Button.svelte";
  import Extension from "./lib/Extension.svelte";
  import Header from "./lib/Header.svelte";
  import { toTitleCase } from "./stringUtils";
  import type { ExtensionData } from "./types";

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
</script>

<div class="container">
  <Header />

  <h1>Extensions List</h1>

  <ul class="btn-group">
    {#each ["all", "active", "inactive"] as const as filterType}
      <Button
        size="large"
        variant={filterState === filterType ? "primary" : undefined}
        onclick={() => (filterState = filterType)}
        >{toTitleCase(filterType)}</Button
      >
    {/each}
  </ul>

  {#await populateExtensions()}
    Fetching Extensions...
  {:catch err}
    <p>{err}</p>
  {/await}

  {#if getExtensions().length > 0}
    <ul class="extensions">
      {#each getExtensions() as extension (extension.id)}
        {#if shouldDisplayExtension(extension)}
          <Extension {...extension} />
        {/if}
      {/each}
    </ul>
  {/if}
</div>

<style>
  .container {
    max-width: 100ch;
    margin: 0 auto;
    padding: var(--padding-2);
  }

  h1 {
    font-size: var(--size-xl);
    font-weight: var(--weight-bold);
    color: var(--clr-text-3);
    text-align: center;
    margin-top: 1.5rem;
  }

  .btn-group {
    display: flex;
    gap: 0.5rem;
    margin: 1.5rem 0;
    justify-content: center;
    padding: 0;
  }

  .extensions {
    display: grid;
    margin: 3rem 0 0 0;
    padding: 0;
    row-gap: 0.75rem;
  }
</style>
