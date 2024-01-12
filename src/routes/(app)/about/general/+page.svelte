<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-svelte';
  import groq from 'groq';

  import { previewSubscription } from '$lib/config/sanity';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Separator } from '$lib/components/ui/separator';
  import { PortableText } from '$lib/components/portable-text';

  import type { PageData } from './$types';

  export let data: PageData;

  let { initialData, previewMode, seo } = data;
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0] {
        email,
        phone,
        links,
        languages,
        bio
      },
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ user } = $liveData);
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
  <h2 class="text-3xl font-semibold">General</h2>
</header>

<div in:fly={{ delay: 150, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">About</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <PortableText value={user.bio} />
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 200, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Connect</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <ul
        class="grid grid-cols-4 items-center justify-center justify-items-center sm:block sm:space-y-4"
      >
        <li>
          <a
            href={'mailto:' + user?.email}
            class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
          >
            <MailIcon
              class="h-8 w-8 shrink-0 fill-foreground stroke-background transition-colors dark:fill-foreground dark:stroke-background md:h-6 md:w-6"
            />
            <p class="hidden sm:block">{user?.email}</p>
          </a>
        </li>
        <li>
          <a
            href={'tel:+1' + user?.phone.replaceAll(/[^0-9]/g, '')}
            class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
          >
            <PhoneIcon
              class="h-8 w-8 shrink-0 fill-foreground dark:fill-foreground dark:stroke-none md:h-6 md:w-6"
            />
            <p class="hidden sm:block">{user?.phone}</p>
          </a>
        </li>
        {#if user?.links?.github}
          <li>
            <a
              href={user?.links?.github}
              class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
            >
              <div
                class="relative h-8 w-8 overflow-hidden rounded-full bg-foreground dark:bg-white md:h-6 md:w-6"
              >
                <GithubIcon
                  class="absolute -bottom-[2.7px] left-1/2 h-7 w-7 -translate-x-1/2 fill-background stroke-background dark:fill-background dark:stroke-background md:-bottom-[2px] md:h-5 md:w-5"
                />
              </div>
              <p class="hidden sm:block">
                {user?.links?.github.replace(/https:\/\/(www\.)?/i, '')}
              </p>
            </a>
          </li>
        {/if}
        {#if user?.links?.linkedin}
          <li>
            <a
              href={user?.links?.linkedin}
              class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
            >
              <LinkedinIcon
                class="h-8 w-8 shrink-0 fill-foreground stroke-foreground dark:fill-foreground dark:stroke-foreground md:h-6 md:w-6"
              />
              <p class="hidden sm:block">
                {user?.links?.linkedin.replace(/https:\/\/(www\.)?/i, '')}
              </p>
            </a>
          </li>
        {/if}
      </ul>
    </CardContent>
  </Card>
</div>

<div in:fly={{ delay: 250, duration: 300, easing: quintOut, y: 200 }}>
  <Card class="mb-8 bg-muted/25">
    <CardHeader class="flex p-4 md:p-6">
      <CardTitle class="text-2xl">Languages</CardTitle>
    </CardHeader>
    <Separator class="mb-4" />
    <CardContent class="p-4 !pt-0 md:p-6">
      <ul class="space-y-4">
        {#each user?.languages ?? [] as { language, native }}
          <li class="font-medium md:font-normal">
            {language}
            {#if native}
              <p class="ml-1 inline text-foreground/75">(Native)</p>
            {/if}
          </li>
        {/each}
      </ul>
    </CardContent>
  </Card>
</div>
