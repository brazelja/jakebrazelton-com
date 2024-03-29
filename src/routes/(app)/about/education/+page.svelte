<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$lib/components/ui/separator';
  import { Avatar, AvatarImage, AvatarFallback } from '$lib/components/ui/avatar';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
  } from '$lib/components/ui/card';
  import { PortableText } from '$lib/components/portable-text';

  import type { PageData } from './$types';

  export let data: PageData;

  let { initialData, previewMode, seo } = data;
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'education': *[_type == "education"] { ..., school-> } | order(startDate desc, _updatedAt desc),
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ education } = $liveData);

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
  <h2 class="text-3xl font-semibold">Education</h2>
</header>

{#each education as edu, i}
  {#if ready}
    <div in:fly={{ delay: 150 + i * 50, duration: 300, easing: quintOut, y: 200 }}>
      <Card class="mb-8 bg-muted/25">
        <CardHeader class="flex w-full flex-row flex-wrap justify-between p-4 md:p-6">
          <div class="space-y-2">
            <CardTitle class="text-2xl">{edu.degree}</CardTitle>
            <CardDescription class="flex items-center gap-2 text-sm md:text-lg">
              <Avatar class="h-8 w-8">
                <AvatarImage
                  src={urlForImage(edu.school.logo).width(200).height(200).url()}
                  alt={edu.school.name}
                />
                <AvatarFallback>
                  <img
                    src={urlForImage(edu.school.logo).width(50).height(50).blur(5).url()}
                    alt={edu.school.name}
                  />
                </AvatarFallback>
              </Avatar>
              <a href={edu.school.website} class="hover:underline">
                {edu.school.name} - {edu.school.address?.city}, {edu.school.address?.state}
              </a>
            </CardDescription>
          </div>
          <p class="grow text-end text-muted-foreground">
            {#if edu.startDate.slice(0, 4) === edu.endDate?.slice(0, 4)}
              {edu.startDate.slice(0, 4)}
            {:else}
              {edu.startDate.slice(0, 4)} - {edu.endDate ? edu.endDate.slice(0, 4) : 'Present'}
            {/if}
          </p>
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent class="p-4 !pt-0 md:p-6">
          <PortableText value={edu.details} />
        </CardContent>
      </Card>
    </div>
  {/if}
{/each}
