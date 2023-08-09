<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { SearchIcon } from 'lucide-svelte';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import { Input } from '$components/ui/input';
  import { Avatar, AvatarImage } from '$components/ui/avatar';
  import { Card, CardContent, CardHeader, CardTitle } from '$components/ui/card';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'skills': *[_type == "skills"] | order(_updatedAt desc) [0],
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ skills } = $liveData);

  let filter = '';

  $: sections = [
    {
      label: 'Languages',
      items: skills?.languages ?? []
    },
    {
      label: 'Frontend Frameworks',
      items: skills?.frontendFrameworks ?? []
    },
    {
      label: 'GraphQL',
      items: skills?.graphql ?? []
    },
    {
      label: 'State Management',
      items: skills?.stateManagement ?? []
    },
    {
      label: 'Backend Frameworks',
      items: skills?.backendFrameworks ?? []
    },
    {
      label: 'Databases',
      items: skills?.databases ?? []
    },
    {
      label: 'Version Control Systems',
      items: skills?.versionControlSystems ?? []
    },
    {
      label: 'Automation',
      items: skills?.automation ?? []
    },
    {
      label: 'Cloud Platforms',
      items: skills?.cloud ?? []
    },
    {
      label: 'Containerization',
      items: skills?.containerization ?? []
    }
  ];

  let ready = false;
  onMount(() => (ready = true));
</script>

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Skills</h2>
</header>

<div class="mx-auto mb-4 flex gap-2 w-full">
  <div class="relative grow">
    <Input type="search" bind:value={filter} placeholder="Filter..." />
    {#if !filter}
      <SearchIcon class="absolute right-2 top-2 h-5 w-5 stroke-2 opacity-50" />
    {/if}
  </div>
</div>

<div in:fly={{ delay: 150, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Qualifications</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <ul class="grid grid-cols-3 gap-4">
        {#each (skills.qualifications ?? []).filter((s) => s.name
            .toLowerCase()
            .includes(filter.toLowerCase())) as item (item.name)}
          <li class="font-medium md:font-normal border rounded p-3 flex items-center gap-2">
            {item.name}
          </li>
        {/each}
      </ul>
    </CardContent>
  </Card>
</div>

{#each sections as { label, items }, i (label)}
  {#if ready}
    <div in:fly={{ delay: 150 + i * 50, duration: 300, easing: quintOut, y: 200 }}>
      <Card class="mb-8 bg-muted/25">
        <CardHeader class="flex">
          <CardTitle class="text-2xl">{label}</CardTitle>
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent>
          <ul class="grid grid-cols-3 gap-4">
            {#each items.filter((s) => s.name
                .toLowerCase()
                .includes(filter.toLowerCase())) as item (item.name)}
              <a href={item.link} class="content">
                <li
                  class="font-medium md:font-normal border rounded p-3 flex items-center gap-2 hover:bg-muted/50"
                >
                  <Avatar class="w-8 h-8 border bg-muted">
                    <AvatarImage
                      src={urlForImage(item.image).width(50).height(50).url()}
                      alt={item.name}
                    />
                  </Avatar>
                  {item.name}
                </li>
              </a>
            {/each}
          </ul>
        </CardContent>
      </Card>
    </div>
  {/if}
{/each}