<script>
  import Button from "./Button.svelte";

  const { iconsSrc, title, description } = $props();
</script>

<article class="surface">
  <div class="content">
    <img src={iconsSrc} alt="" class="icon" />
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  </div>
  <div class="btns">
    <Button variant="outline">Remove</Button>
    <input
      type="checkbox"
      name="active-switch"
      id="active-switch"
      aria-label="Toggle this extension on or off"
    />
  </div>
</article>

<style>
  article {
    padding: var(--padding-3);
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
    margin-top: 1.5rem;
  }
</style>
