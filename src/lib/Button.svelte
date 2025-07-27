<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  type ButtonVariant = "primary" | "outline";

  type Props = HTMLButtonAttributes & {
    variant?: ButtonVariant;
    size?: "normal" | "large";
  };

  let { variant, size = "normal", children, ...props }: Props = $props();
</script>

<button class={[variant != "outline" && "surface", variant, size]} {...props}>
  {@render children?.()}
</button>

<style>
  button {
    padding: var(--padding-2) var(--padding-4);
    border: none;
    font-weight: var(--weight-medium);
    color: var(--clr-text-2);
    border-radius: 9999px;
    font-size: var(--size-regular);
  }

  button.large {
    font-size: var(--size-large);
  }

  button.primary {
    background-color: var(--clr-primary);
    color: var(--clr-bg-2);
  }

  button.outline {
    background-color: transparent;
    border: 1px solid var(--clr-bg-3);
  }
</style>
