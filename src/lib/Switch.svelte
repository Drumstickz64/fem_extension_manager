<script lang="ts">
  type Props = {
    name: string;
    labelText: string;
    on: boolean;
  };

  let { name, labelText, on = $bindable() }: Props = $props();
</script>

<label for={name} class="switch">
  <input
    bind:checked={on}
    type="checkbox"
    {name}
    id={name}
    aria-label={labelText}
  />
</label>

<style>
  .switch {
    position: relative;
    width: 2.5em;
    height: 1.25em;
    background-color: var(--clr-bg-3);
    border-radius: 9999px;
    cursor: pointer;
  }

  .switch:hover {
    filter: opacity(0.75);
  }

  .switch:has(:focus-visible) {
    outline: 3px solid var(--clr-primary);
    outline-offset: 2px;
  }

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .switch::before {
    content: "";
    position: absolute;
    width: 1em;
    height: 1em;
    top: 50%;
    left: 5%;
    transform: translateY(-50%);
    border-radius: 9999px;
    background: var(--clr-neutral-0);
    transition: 200ms ease-in;
  }

  .switch:has(input:checked) {
    background-color: var(--clr-primary);
  }

  .switch:has(input:checked)::before {
    left: 95%;
    transform: translate(-100%, -50%);
  }
</style>
