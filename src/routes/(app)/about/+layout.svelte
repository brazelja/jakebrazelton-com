<script lang="ts">
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from '$components/ui/select';

  import type { LayoutData } from './$types';
  import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
  import { page } from '$app/stores';
  import { cn } from '$lib/utils';
  import type { ComponentProps } from 'svelte';

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
      value: '/(app)/about/general',
      label: 'General'
    },
    {
      value: '/(app)/about/interests',
      label: 'Interests'
    },
    {
      value: '/(app)/about/skills',
      label: 'Skills'
    },
    {
      value: '/(app)/about/experience',
      label: 'Experience'
    },
    {
      value: '/(app)/about/education',
      label: 'Education'
    },
    {
      value: '/(app)/about/projects',
      label: 'Projects'
    }
  ];

  let selected: ComponentProps<Select>['selected'];

  $: {
    if ($page.route.id) {
      const item = items.find((item) => item.value === $page.route.id);
      if (item) selected = item;
    }
  }

  const isSelectOption = (value: unknown): value is ComponentProps<Select>['selected'] =>
    typeof value === 'object' && value !== null && 'value' in value && 'label' in value;
</script>

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
      <!-- Mobile -->
      <Select
        {selected}
        onSelectedChange={(v) => {
          if (isSelectOption(v)) selected = v;
        }}
      >
        <SelectTrigger class="w-full md:hidden">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {#each items as { value, label }}
              <a href="/about/{label.toLowerCase()}">
                <SelectItem {value} {label} class="py-3">
                  {label}
                </SelectItem>
              </a>
            {/each}
          </SelectGroup>
        </SelectContent>
      </Select>
      <!-- Desktop -->
      <ul class="sticky top-24 hidden auto-rows-auto text-muted-foreground md:grid">
        {#each items as { value, label }}
          <li
            class={cn(
              'rounded transition-colors hover:cursor-pointer hover:bg-muted hover:text-foreground',
              { 'text-foreground': $page.route.id === value }
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
