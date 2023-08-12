<script lang="ts">
  import groq from 'groq';
  import { createSelect, melt } from '@melt-ui/svelte';
  import { CheckIcon, ChevronDownIcon, MenuIcon } from 'lucide-svelte';
  import { fly } from 'svelte/transition';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';

  import type { LayoutData } from './$types';
  import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
  import { page } from '$app/stores';
  import clsx from 'clsx';
  import { cn } from '$lib/utils';

  export let data: LayoutData;

  $: ({ initialData, previewMode } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    { 
      'user': *[_type == "user"] | order(_updatedAt desc) [0] { name, title, picture } 
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ user } = $liveData);
  $: imageUrl = urlForImage(user?.picture).width(408).height(408).url();
  $: blurUrl = urlForImage(user?.picture).width(408).height(408).blur(100).url();

  const items = [
    {
      id: '/(app)/about/general',
      label: 'General'
    },
    {
      id: '/(app)/about/interests',
      label: 'Interests'
    },
    {
      id: '/(app)/about/skills',
      label: 'Skills'
    },
    {
      id: '/(app)/about/experience',
      label: 'Experience'
    },
    {
      id: '/(app)/about/education',
      label: 'Education'
    },
    {
      id: '/(app)/about/projects',
      label: 'Projects'
    }
  ];

  const {
    elements: { trigger, menu, option },
    states: { valueLabel, open, value },
    helpers: { isSelected }
  } = createSelect({ forceVisible: true });

  $: {
    value.set($page.route.id);
  }
  $: subtitle = items.find(({ id }) => $page.route.id === id)?.label;
</script>

<svelte:head>
  <title>{$liveData?.user?.name} | About | {subtitle}</title>
</svelte:head>

<div class="mx-auto w-full max-w-[1400px] px-6 md:px-8">
  <header class="flex w-full flex-col items-center justify-start py-8 md:flex-row">
    <Avatar class="h-28 w-28 shadow">
      <AvatarImage src={imageUrl} alt="Jake Brazelton" />
      <AvatarFallback>
        <img src={blurUrl} alt="Jake Brazelton" />
      </AvatarFallback>
    </Avatar>
    <div class="mt-4 flex flex-col items-center md:ml-4 md:mt-0 md:items-start">
      <h1 class="text-3xl font-bold sm:text-4xl">{user.name}</h1>
      <p class="font-medium md:font-normal">{user.title}</p>
    </div>
  </header>
</div>
<Separator class="mb-6 md:mb-12" />
<div
  class="mx-auto min-h-[calc(100dvh_-_8.5rem_-_11rem_-_3rem_-_2px)] w-full max-w-[1400px] px-6 md:px-8"
>
  <section class="grid grid-cols-1 md:grid-cols-[240px_auto] md:gap-4">
    <aside class="relative mb-4">
      <button
        class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:hidden"
        use:melt={$trigger}
        aria-label="Food"
      >
        <span class="flex items-center gap-2">
          <MenuIcon class="h-5 w-5" />
          {$valueLabel ?? ''}
        </span>
        <ChevronDownIcon class="h-5 w-5" />
      </button>
      {#if $open}
        <div
          class={cn(
            'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md slide-in-from-top-2',
            {
              'animate-in fade-in-0 zoom-in-95': open,
              'animate-out fade-out-0 zoom-out-95': !open
            }
          )}
          use:melt={$menu}
          transition:fly={{ duration: 150, y: -5 }}
        >
          {#each items as { id, label }}
            <a
              href="/about/{label.toLowerCase()}"
              class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              use:melt={$option({ value: id, label: label })}
            >
              <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {#if $isSelected(id)}
                  <CheckIcon class="h-4 w-4" />
                {/if}
              </span>
              {label}
            </a>
          {/each}
        </div>
      {/if}
      <ul class="sticky top-24 hidden auto-rows-auto text-muted-foreground md:grid">
        {#each items as { id, label }}
          <li
            class={clsx(
              'rounded transition-colors hover:cursor-pointer hover:bg-muted hover:text-foreground',
              { 'text-foreground': $page.route.id === id }
            )}
          >
            <a href="/about/{label.toLowerCase()}" class="inline-block w-full px-3 py-2">{label}</a>
          </li>
        {/each}
      </ul>
    </aside>
    <section>
      <slot />
    </section>
  </section>
</div>
