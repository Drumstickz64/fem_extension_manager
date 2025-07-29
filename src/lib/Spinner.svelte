<div class="spinner">
  <div class="spinner-inner"></div>
</div>

<style>
  .spinner {
    display: inline-block;
    position: relative;
    width: var(--size, 3.5rem);
    height: var(--size, 3.5rem);
  }

  .spinner-inner {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top-color: var(--color, var(--clr-primary));
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
