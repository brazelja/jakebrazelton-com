<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { PortableText } from '@portabletext/svelte';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$components/ui/card';
  import { UnorderedList, ListItem } from '$components/portable-text';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
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

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Education</h2>
</header>

{#each education as edu, i}
  {#if ready}
    <div in:fly={{ delay: 150 + i * 50, duration: 300, easing: quintOut, y: 200 }}>
      <Card class="mb-8 bg-muted/25">
        <CardHeader class="flex flex-row w-full justify-between">
          <div class="space-y-2">
            <CardTitle class="text-2xl">{edu.degree}</CardTitle>
            <CardDescription class="flex items-center gap-2 text-lg">
              <Avatar class="w-8 h-8">
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
          <p class="text-muted-foreground">
            {edu.startDate.slice(0, 4)} - {edu.endDate ? edu.endDate.slice(0, 4) : 'Present'}
          </p>
        </CardHeader>
        <Separator class="mb-4" />
        <CardContent>
          <PortableText
            value={edu.details}
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
        </CardContent>
      </Card>
    </div>
  {/if}
{/each}
