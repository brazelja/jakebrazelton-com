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

  let { topArtists, repositories, books, videoGames, comics, horrorMovies, seo } = data;
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
  <h2 class="text-3xl font-semibold">Interests</h2>
</header>

<div in:fly={{ delay: 150, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex">
      <CardTitle class="text-2xl">Music</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid auto-rows-fr grid-cols-2 justify-items-center gap-6 md:grid-cols-5">
        {#each topArtists as artist (artist.id)}
          <a
            href={artist.external_urls.spotify}
            class="w-full max-w-[11.5rem] rounded bg-muted/50 p-4 transition-colors hover:cursor-pointer hover:bg-muted"
          >
            <Avatar class="mx-auto mb-4 h-28 w-28 md:h-36 md:w-36">
              <AvatarImage src={artist.images[0].url} alt={artist.name} />
              <AvatarFallback>
                <img src={artist.images.at(-1)?.url ?? ''} alt={artist.name} />
              </AvatarFallback>
            </Avatar>
            <div class="min-h-[4rem]">
              <p class="pb-1 text-start text-sm font-semibold md:text-base">{artist.name}</p>
              <p class="text-start text-xs font-semibold text-foreground/50">Artist</p>
            </div>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 200, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Starred Repositories</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        {#each repositories as repo (repo.id)}
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" class="contents">
            <Card class="flex flex-col transition-colors hover:bg-muted/50">
              <CardHeader class="p-3">
                <CardTitle class="flex items-center gap-2">
                  <BookMarkedIcon class="h-6 w-6" />
                  {repo.full_name}
                  <span
                    class="rounded-full border px-2 text-xs leading-snug text-foreground/50 sm:text-sm"
                  >
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
                    class={clsx('h-3 w-3 rounded-full border', {
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
                  <StarIcon class="h-5 w-5" />
                  {formatNumber(repo.stargazers_count, 1)}
                </span>
                <span class="ml-4 inline-flex items-center gap-1">
                  <GitForkIcon class="h-5 w-5" />
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
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Books</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid auto-rows-fr grid-cols-2 justify-items-center gap-6 md:grid-cols-5">
        {#each books as book (book.name)}
          <a href={book.url} class="overflow-hidden rounded" title={book.name}>
            <Avatar class="as aspect-[6.6/10] h-auto w-36 rounded-none sm:w-44">
              <AvatarImage src={book.image} alt={book.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 300, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Video Games</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid auto-rows-fr grid-cols-2 justify-items-center gap-6 md:grid-cols-5">
        {#each videoGames as game (game.name)}
          <a href={game.url} class="overflow-hidden rounded" title={game.name}>
            <Avatar class="as aspect-[6.6/10] h-auto w-36 rounded-none sm:w-44">
              <AvatarImage src={game.image} alt={game.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 350, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Comics</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid auto-rows-fr grid-cols-2 justify-items-center gap-6 md:grid-cols-5">
        {#each comics as comic (comic.name)}
          <a href={comic.url} class="overflow-hidden rounded" title={comic.name}>
            <Avatar class="as aspect-[6.6/10] h-auto w-36 rounded-none sm:w-44">
              <AvatarImage src={comic.image} alt={comic.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 400, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Horror Movies</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <div class="grid auto-rows-fr grid-cols-2 justify-items-center gap-6 md:grid-cols-5">
        {#each horrorMovies as movie (movie.name)}
          <a href={movie.url} class="overflow-hidden rounded" title={movie.name}>
            <Avatar class="as aspect-[6.6/10] h-auto w-36 rounded-none sm:w-44">
              <AvatarImage src={movie.image} alt={movie.name} />
            </Avatar>
          </a>
        {/each}
      </div>
    </CardContent>
  </Card>
</div>
