<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';
  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
  } from '$components/ui/card';

  import type { PageData } from './$types';
  import { cn } from '$lib/utils';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'experiences': *[_type == "experience"] { ..., company-> } | order(startDate desc, _updatedAt desc),
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ experiences } = $liveData);
</script>

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Experience</h2>
</header>

{#each experiences as experience}
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex flex-row w-full justify-between">
      <div class="space-y-2">
        <CardTitle class="text-2xl">{experience.title}</CardTitle>
        <CardDescription class="flex items-center gap-2 text-lg">
          <Avatar class="w-8 h-8">
            <AvatarImage
              src={urlForImage(experience.company.logo).width(200).height(200).url()}
              alt={experience.company.name}
            />
            <AvatarFallback>
              <img
                src={urlForImage(experience.company.logo).width(50).height(50).blur(5).url()}
                alt={experience.company.name}
              />
            </AvatarFallback>
          </Avatar>
          <a href={experience.company.website} class="hover:underline"
            >{experience.company.name} - {experience.company.address?.city}, {experience.company
              .address?.state}
            {experience.remote ? '(Remote)' : ''}</a
          >
        </CardDescription>
      </div>
      <p class="text-muted-foreground">
        {experience.startDate.slice(0, 4)} - {experience.endDate
          ? experience.endDate.slice(0, 4)
          : 'Present'}
      </p>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <PortableText value={experience.description} />
    </CardContent>
    <CardFooter>
      <ul class="flex gap-x-4 gap-y-4 md:gap-x-2 md:gap-y-2 flex-wrap mt-4 md:mt-2">
        {#each experience?.skills ?? [] as skill}
          <li
            class={cn('bg-accent pl-1 pr-3 py-[0.2rem] rounded-full flex items-center gap-2', {
              'pl-3': !skill.image
            })}
          >
            {#if skill.image}
              <Avatar class="w-8 h-8">
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
{/each}
