<script lang="ts">
  import { renderStudio, defineConfig, type StudioProps } from 'sanity';
  import { onMount } from 'svelte';

  export let config: StudioProps['config'];

  let studioEl: HTMLDivElement;

  onMount(() => {
    if (studioEl) {
      const sanityConfig = defineConfig(config);

      renderStudio(studioEl, sanityConfig);
    }
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <meta name="robots" content="noindex" />
  <meta name="referrer" content="same-origin" />
</svelte:head>

<div class="h-screen">
  <div bind:this={studioEl} class="h-full" />
</div>
