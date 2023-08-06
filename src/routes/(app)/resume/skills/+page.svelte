<script lang="ts">
  import { SearchIcon } from 'lucide-svelte';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import { Input } from '$components/ui/input';
  import { Avatar, AvatarImage } from '$components/ui/avatar';

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

<section class="rounded overflow-hidden border p-4 mb-4 bg-muted/25">
  <h3 class="text-2xl font-semibold mb-2">Languages</h3>
  <Separator class="mb-4" />
  <ul class="grid grid-cols-3 gap-4">
    {#each skills.languages.filter((s) => s.name
        .toLowerCase()
        .includes(filter.toLowerCase())) as language}
      <a href={language.link} class="content">
        <li
          class="font-medium md:font-normal border rounded p-3 flex items-center gap-2 hover:bg-muted/50"
        >
          <Avatar class="w-8 h-8 border bg-muted">
            <AvatarImage
              src={urlForImage(language.image).width(50).height(50).url()}
              alt={language.name}
            />
          </Avatar>
          {language.name}
        </li>
      </a>
    {/each}
  </ul>
</section>

<section class="rounded overflow-hidden border p-4 mb-4 bg-muted/25">
  <h3 class="text-2xl font-semibold mb-2">Frameworks</h3>
  <Separator class="mb-4" />
  <ul class="grid grid-cols-3 gap-4">
    {#each skills.frameworks.filter((s) => s.name
        .toLowerCase()
        .includes(filter.toLowerCase())) as language}
      <a href={language.link} class="content">
        <li
          class="font-medium md:font-normal border rounded p-3 flex items-center gap-2 hover:bg-muted/50"
        >
          <Avatar class="w-8 h-8 border bg-muted">
            <AvatarImage
              src={urlForImage(language.image).width(50).height(50).url()}
              alt={language.name}
            />
          </Avatar>
          {language.name}
        </li>
      </a>
    {/each}
  </ul>
</section>

<!-- <section class="rounded overflow-hidden border p-4 mb-4 bg-muted/25">
  <h3 class="text-2xl font-semibold mb-2">Frameworks</h3>
  <Separator class="mb-4" />
  <ul class="grid grid-cols-3 gap-4">
    {#each filteredSkills.filter((s) => s.type === 'framework') as skill}
      <li class="font-medium md:font-normal border rounded p-3">
        {skill.name}
      </li>
    {/each}
  </ul>
</section>

<section class="rounded overflow-hidden border p-4 mb-4 bg-muted/25">
  <h3 class="text-2xl font-semibold mb-2">Databases</h3>
  <Separator class="mb-4" />
  <ul class="grid grid-cols-3 gap-4">
    {#each filteredSkills.filter((s) => s.type === 'database') as skill}
      <li class="font-medium md:font-normal border rounded p-3">
        {skill.name}
      </li>
    {/each}
  </ul>
</section>

<section class="rounded overflow-hidden border p-4 mb-4 bg-muted/25">
  <h3 class="text-2xl font-semibold mb-2">GraphQL</h3>
  <Separator class="mb-4" />
  <ul class="grid grid-cols-3 gap-4">
    {#each filteredSkills.filter((s) => s.type === 'graphql') as skill}
      <li class="font-medium md:font-normal border rounded p-3">
        {skill.name}
      </li>
    {/each}
  </ul>
</section> -->
