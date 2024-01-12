<script lang="ts">
  import { page } from '$app/stores';
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';
  import { ModeWatcher } from 'mode-watcher';

  import PreviewBanner from '$lib/components/PreviewBanner.svelte';
  import type { LayoutData } from './$types';
  import '../app.css';

  inject({ mode: dev ? 'development' : 'production' });

  export let data: LayoutData;

  /**
   * Only show the preview banner on the following route id's.
   */
  const previewRouteIds = ['/(app)/about'];

  $: ({ previewMode, previewModeEmbed: embedded } = data);
  $: showPreviewBanner = previewMode && previewRouteIds.includes($page.route.id || '');
</script>

<svelte:head>
  <script>
    // script to set theme based on user selected theme if present
    // or based on system default theme
    // it's important to put it in the head section to avoid bad UX to theme changing
    // from dark to light or vise versa on page load
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.removeProperty('color-scheme');
    }
  </script>
</svelte:head>

{#if showPreviewBanner}
  <PreviewBanner {embedded} />
{/if}

<ModeWatcher />
<slot />
