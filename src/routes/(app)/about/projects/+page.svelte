<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { PortableText } from '@portabletext/svelte';
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
  import { UnorderedList, ListItem } from '$components/portable-text';
  import { cn } from '$lib/utils';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
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

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Education</h2>
</header>

{#each projects as project, i}
  {#if ready}
    <div in:fly={{ delay: 150 + i * 50, duration: 300, easing: quintOut, y: 200 }}>
      <Card class="mb-8 bg-muted/25">
        <CardHeader class="flex flex-row w-full justify-between">
          <div class="space-y-2">
            <CardTitle class="text-2xl">
              {project.name}
            </CardTitle>
            <CardDescription class="flex items-center gap-2 text-lg">
              <Avatar class="w-8 h-8">
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
            <a href={project.link} class="h-fit text-muted-foreground hover:underline">
              {project.link}
            </a>
          {/if}
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent>
          <PortableText
            value={project.description}
            components={{
              list: {
                // @ts-ignore
                bullet: UnorderedList
              },
              listItem: {
                // @ts-ignore
                normal: ListItem
              }
            }}
          />
          {#if project?.images && project.images.length > 0}
            <div class="flex h-40 gap-4 mt-4">
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
          <ul class="flex gap-x-4 gap-y-4 md:gap-x-2 md:gap-y-2 flex-wrap mt-4 md:mt-2">
            {#each project?.skills ?? [] as skill}
              <li
                class={cn('bg-accent pl-1 pr-3 py-[0.1rem] rounded-full flex items-center gap-2', {
                  'pl-3': !skill.image
                })}
              >
                {#if skill.image}
                  <Avatar class="w-7 h-7">
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
                <p class="h-8 flex items-center">{skill.name}</p>
              </li>
            {/each}
          </ul>
        </CardFooter>
      </Card>
    </div>
  {/if}
{/each}
