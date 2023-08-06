<script lang="ts">
  import groq from 'groq';
  import { BookMarkedIcon, GitForkIcon, StarIcon } from 'lucide-svelte';
  import clsx from 'clsx';

  import { previewSubscription } from '$lib/config/sanity';
  import { formatNumber } from '$lib/utils/format-number';
  import { Separator } from '$components/ui/separator';
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$components/ui/card';
  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode, topArtists, repositories } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0] { interests },
    }
  `,
    { initialData: { user: initialData.user }, enabled: !!previewMode }
  ));

  $: ({ user } = $liveData);
</script>

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Interests</h2>
</header>

<section class="rounded overflow-hidden border p-4 mb-6">
  <h3 class="text-2xl font-semibold mb-2">Music</h3>
  <Separator class="mb-4" />
  <div class="grid grid-cols-5 justify-items-center gap-2">
    {#each topArtists as artist}
      <a
        href={artist.href}
        target="_blank"
        rel="noopener noreferrer"
        class="w-fit p-4 rounded transition-colors bg-muted/50 hover:bg-muted hover:cursor-pointer"
      >
        <Avatar class="w-36 h-36 mb-4">
          <AvatarImage src={artist.images[0].url} alt={artist.name} />
          <AvatarFallback>
            <img src={artist.images.at(-1)?.url ?? ''} alt={artist.name} />
          </AvatarFallback>
        </Avatar>
        <p class="font-semibold text-start mb-1">{artist.name}</p>
        <p class="text-sm text-foreground/50 font-semibold text-start">Artist</p>
      </a>
    {/each}
  </div>
</section>

<section class="rounded overflow-hidden border p-4 mb-6">
  <h3 class="text-2xl font-semibold mb-2">Starred Repositories</h3>
  <Separator class="mb-4" />
  <div class="grid grid-cols-2 gap-4">
    {#each repositories as repo}
      <a href={repo.html_url} class="contents">
        <Card class="flex flex-col transition-colors hover:bg-muted/50">
          <CardHeader class="p-3">
            <CardTitle class="flex items-center gap-2">
              <BookMarkedIcon class="w-6 h-6" />
              {repo.full_name}
              <span class="text-sm leading-snug text-foreground/50 border rounded-full px-2">
                Public
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent class="p-3 pt-0">
            <p class="text-sm text-foreground/50">{repo.description}</p>
          </CardContent>
          <CardFooter class="mt-auto p-3 pt-0 text-foreground/50">
            <span class="inline-flex items-center gap-1">
              <span
                class={clsx('rounded-full border w-3 h-3', {
                  'bg-[#3178c6]': repo.language === 'TypeScript',
                  'bg-[#f1e05a]': repo.language === 'JavaScript',
                  'bg-[#e34c26]': repo.language === 'HTML',
                  'bg-[#dea584]': repo.language === 'Rust',
                  'bg-[#555555]': repo.language === 'C'
                })}
              />
              {repo.language}
            </span>
            <span class="ml-4 inline-flex items-center gap-1">
              <StarIcon class="w-5 h-5" />
              {formatNumber(repo.stargazers_count, 1)}
            </span>
            <span class="ml-4 inline-flex items-center gap-1">
              <GitForkIcon class="w-5 h-5" />
              {formatNumber(repo.forks_count, 1)}
            </span>
          </CardFooter>
        </Card>
      </a>
    {/each}
  </div>
</section>

<section class="rounded overflow-hidden border p-4 mb-6">
  <ul class="space-y-2">
    {#each user?.interests ?? [] as interest}
      <li class="font-medium md:font-normal">{interest}</li>
    {/each}
  </ul>
</section>
