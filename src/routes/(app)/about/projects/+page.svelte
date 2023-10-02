<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
  } from '$components/ui/card';
  import { PortableText } from '$components/portable-text';
  import { cn } from '$lib/utils';

  import type { PageData } from './$types';

  export let data: PageData;

  let { initialData, previewMode, seo } = data;
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'projects': *[_type == "project"] { ..., company-> } | order(startDate desc, _updatedAt desc)
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ projects } = $liveData);

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
  <h2 class="text-3xl font-semibold">Projects</h2>
</header>

{#each projects as project, i}
  {#if ready}
    <div in:fly={{ delay: 150 + i * 50, duration: 300, easing: quintOut, y: 200 }}>
      <Card class="mb-8 bg-muted/25">
        <CardHeader class="flex w-full flex-row flex-wrap justify-between p-4 md:p-6">
          <div class="space-y-2">
            <CardTitle class="text-2xl">
              {project.name}
            </CardTitle>
            <CardDescription class="flex items-center gap-2 text-sm md:text-lg">
              <Avatar class="h-8 w-8">
                <AvatarImage
                  src={urlForImage(project.company.logo).width(200).height(200).url()}
                  alt={project.company.name}
                />
                <AvatarFallback>
                  <img
                    src={urlForImage(project.company.logo).width(50).height(50).blur(5).url()}
                    alt={project.company.name}
                  />
                </AvatarFallback>
              </Avatar>
              <a href={project.company.website} class="hover:underline">
                {project.company.name}
              </a>
            </CardDescription>
          </div>
          {#if project.link}
            <a
              href={project.link}
              class="h-fit grow text-end text-muted-foreground hover:underline"
            >
              {project.link}
            </a>
          {/if}
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent class="p-4 !pt-0 md:p-6">
          <PortableText value={project.description} />
          {#if project?.images && project.images.length > 0}
            <div
              class="mt-4 flex h-40 flex-wrap items-center justify-center gap-4 sm:justify-start"
            >
              {#each project.images as image}
                <a href={urlForImage(image).url()} class="contents">
                  <img
                    src={urlForImage(image).height(400).url()}
                    alt={image.alt}
                    class="h-full rounded border"
                  />
                </a>
              {/each}
            </div>
          {/if}
        </CardContent>
        <CardFooter>
          <ul class="mt-4 flex flex-wrap gap-4 md:mt-2 md:gap-2">
            {#each project?.skills ?? [] as skill}
              <li
                class={cn(
                  'flex items-center gap-2 rounded-full bg-accent py-0 pl-1 pr-3 md:py-[0.1rem]',
                  {
                    'pl-3': !skill.image
                  }
                )}
              >
                {#if skill.image}
                  <Avatar class="h-6 w-6 md:h-7 md:w-7">
                    <AvatarImage
                      src={urlForImage(skill.image).width(200).height(200).url()}
                      alt={skill.name}
                    />
                    <AvatarFallback>
                      <img
                        src={urlForImage(skill.image).width(50).height(50).blur(5).url()}
                        alt={skill.name}
                      />
                    </AvatarFallback>
                  </Avatar>
                {/if}
                <p class="flex h-8 items-center text-sm md:text-base">{skill.name}</p>
              </li>
            {/each}
          </ul>
        </CardFooter>
      </Card>
    </div>
  {/if}
{/each}
