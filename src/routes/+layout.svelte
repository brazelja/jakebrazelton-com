<script lang="ts">
  import { page } from '$app/stores';
  import type { LayoutData } from './$types';
  import '../app.css';

  import PreviewBanner from '$lib/components/PreviewBanner.svelte';

  export let data: LayoutData;

  /**
   * Only show the preview banner on the following route id's.
   */
  const previewRouteIds = ['/(app)/resume'];

  $: ({ previewMode, previewModeEmbed: embedded } = data);
  $: showPreviewBanner = previewMode && previewRouteIds.includes($page.route.id || '');
</script>

<svelte:head>
  <script>
    // script to set theme based on user selected theme if present
    // or based on system default theme
    // it's important to put it in the head section to avoid bad UX to theme changing
    // from dark to light or vise versa on page load
    if (!('theme' in localStorage)) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      let theme = localStorage.getItem('theme');
      if (theme) {
        document.documentElement.classList.add(theme);
      }
    }
  </script>
</svelte:head>

{#if showPreviewBanner}
  <PreviewBanner {embedded} />
{/if}

<slot />
