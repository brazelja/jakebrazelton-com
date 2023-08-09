<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { BookMarkedIcon, GitForkIcon, StarIcon } from 'lucide-svelte';
  import clsx from 'clsx';

  import { formatNumber } from '$lib/utils/format-number';
  import { Separator } from '$components/ui/separator';
  import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '$components/ui/card';
  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ topArtists, repositories, videoGames, comics, horrorMovies } = data);
</script>

<header class="mb-6">
  <h2 class="text-3xl font-semibold">Interests</h2>
</header>

<div in:fly={{ delay: 150, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Music</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <div class="grid grid-cols-5 justify-items-center gap-2">
        {#each topArtists as artist (artist.id)}
          <a
            href={artist.external_urls.spotify}
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
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 200, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Starred Repositories</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <div class="grid grid-cols-2 gap-4">
        {#each repositories as repo (repo.id)}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="contents">
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
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 250, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Video Games</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <div class="grid grid-cols-5 justify-items-center gap-2">
        {#each videoGames as game (game.name)}
          <a href={game.url} class="rounded overflow-hidden hover:cursor-pointer" title={game.name}>
            <Avatar class="w-44 h-auto aspect-[6.6/10] as rounded-none">
              <AvatarImage src={game.image} alt={game.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 300, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Comics</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <div class="grid grid-cols-5 justify-items-center gap-y-4">
        {#each comics as comic (comic.name)}
          <a
            href={comic.url}
            class="rounded overflow-hidden hover:cursor-pointer"
            title={comic.name}
          >
            <Avatar class="w-44 h-auto aspect-[6.6/10] as rounded-none">
              <AvatarImage src={comic.image} alt={comic.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 350, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Horror Movies</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent>
      <div class="grid grid-cols-5 justify-items-center gap-y-4">
        {#each horrorMovies as movie (movie.name)}
          <a
            href={movie.url}
            class="rounded overflow-hidden hover:cursor-pointer"
            title={movie.name}
          >
            <Avatar class="w-44 h-auto aspect-[6.6/10] as rounded-none">
              <AvatarImage src={movie.image} alt={movie.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>
