<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import clsx from 'clsx';

  import { Button } from '$components/ui/button';

  let className: string | undefined | null = undefined;
  export { className as class };

  type Theme = 'light' | 'dark';

  const dispatch = createEventDispatcher();
  let currentTheme: Theme = 'light';

  onMount(() => {
    currentTheme = <Theme>localStorage.getItem('theme') ?? 'light';
  });
  const toggle = () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    (document.body.parentNode as HTMLElement).classList.toggle('dark');
    if (currentTheme === 'dark') {
      document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
      document.documentElement.style.removeProperty('color-scheme');
    }
    dispatch('change', { theme: currentTheme });
  };
</script>

<Button
  on:click={toggle}
  type="button"
  variant="secondary"
  class={clsx('inline-flex items-center justify-center rounded-full bg-transparent p-2', className)}
  aria-label="Toggle theme"
>
  <span>
    {#if currentTheme === 'dark'}
      <svg
        in:fly={{ x: -5 }}
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
        />
      </svg>
    {:else}
      <svg
        in:fly={{ x: 5 }}
        class="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    {/if}
  </span>
</Button>
