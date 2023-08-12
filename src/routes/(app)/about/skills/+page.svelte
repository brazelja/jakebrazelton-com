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

  let { initialData, previewMode, seo } = data;
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

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <link rel="canonical" href={seo.url} />
  <!-- OpenGraph -->
  <meta property="og:title" content={seo.title} />
  <meta property="og:description" content={seo.description} />
  <meta property="og:image" content={seo.image} />
  <meta property="og:url" content={seo.url} />
  <!-- Twitter Meta Tags -->
  <meta property="twitter:title" content={seo.title} />
  <meta property="twitter:description" content={seo.description} />
  <meta property="twitter:image" content={seo.image} />
</svelte:head>

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Skills</h2>
</header>

<div class="mx-auto mb-4 flex w-full gap-2">
  <div class="relative grow">
    <Input type="search" bind:value={filter} placeholder="Filter..." />
    {#if !filter}
      <SearchIcon class="absolute right-2 top-1/4 h-5 w-5 stroke-2 opacity-50" />
    {/if}
  </div>
</div>

<div in:fly={{ delay: 150, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Qualifications</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        {#each (skills.qualifications ?? []).filter((s) => s.name
            .toLowerCase()
            .includes(filter.toLowerCase())) as item (item.name)}
          <li class="flex items-center gap-2 rounded border p-3 font-medium md:font-normal">
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
        <CardHeader class="flex p-4 md:p-6">
          <CardTitle class="text-2xl">{label}</CardTitle>
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent class="p-4 !pt-0 md:p-6">
          <ul class="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {#each items.filter((s) => s.name
                .toLowerCase()
                .includes(filter.toLowerCase())) as item (item.name)}
              <a href={item.link} class="content">
                <li
                  class="flex h-full items-center gap-2 rounded border p-3 text-sm font-medium hover:bg-muted/50 sm:text-base md:font-normal"
                >
                  <Avatar class="h-8 w-8 border bg-muted">
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
