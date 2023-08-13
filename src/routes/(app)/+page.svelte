<script lang="ts">
  import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-svelte';

  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';
  import { urlForImage } from '$lib/config/sanity';

  import type { PageData } from './$types';

  export let data: PageData;

  let { user, seo } = data;
  const imageUrl = urlForImage(user?.picture).width(408).height(408).url();
  const blurUrl = urlForImage(user?.picture).width(408).height(408).blur(100).url();
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

<section>
  <div
    class="relative mx-auto min-h-[calc(100dvh_-_8.5rem_-_1px)] w-full max-w-[1400px] px-6 md:px-8"
  >
    <div
      class="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center"
    >
      <div class="relative">
        <Avatar class="relative z-10 h-52 w-52 shadow">
          <AvatarImage src={imageUrl} alt="Jake Brazelton" />
          <AvatarFallback>
            <img src={blurUrl} alt="Jake Brazelton" />
          </AvatarFallback>
        </Avatar>
        <div
          class="absolute left-1/2 top-1/2 z-0 h-72 w-72 origin-[0_0] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-600 to-yellow-600 leading-[13rem] blur-3xl filter motion-safe:animate-revolve"
        />
        <div
          class="absolute left-1/2 top-1/2 z-0 h-72 w-72 origin-[0_0] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-l from-purple-600 to-yellow-600 leading-[13rem] blur-[96px] filter motion-safe:-animate-revolve dark:from-purple-600/50 dark:to-yellow-600/50"
        />
      </div>
      <h1 class="z-10 mt-4 text-center text-4xl font-bold">{user?.name}</h1>
      <h2 class="z-10 mt-2 whitespace-nowrap text-center text-lg font-medium sm:text-2xl">
        {user?.title}
      </h2>
      <div class="z-10 mt-4 flex gap-6 md:gap-4">
        {#if user?.links?.github}
          <a
            href={user?.links?.github}
            class="group relative h-8 w-8 overflow-hidden rounded-full bg-foreground transition-colors hover:!bg-purple-400 dark:bg-foreground"
            aria-label="Github"
          >
            <GithubIcon
              class="absolute -bottom-[2.5px] left-1/2 h-7 w-7 -translate-x-1/2 fill-background stroke-background dark:fill-background dark:stroke-background"
            />
          </a>
        {/if}
        {#if user?.links?.linkedin}
          <a
            href={user?.links?.linkedin}
            class="group flex h-8 w-8 items-center justify-center rounded-sm bg-foreground transition-colors hover:!bg-purple-400 dark:bg-foreground"
            aria-label="LinkedIn"
          >
            <LinkedinIcon
              class="h-7 w-7 fill-background stroke-background dark:fill-background dark:stroke-background"
            />
          </a>
        {/if}
        <a
          href={'mailto:' + user?.email}
          class="group flex h-8 w-8 items-center justify-center rounded-full bg-foreground transition-colors hover:!bg-purple-400 dark:bg-foreground"
          aria-label="Email"
        >
          <MailIcon
            class="h-7 w-7 fill-background transition-colors group-hover:stroke-purple-400 dark:fill-background dark:stroke-white dark:group-hover:stroke-purple-400"
          />
        </a>
        <a
          href={'tel:' + user?.phone}
          class="group flex h-8 w-8 items-center justify-center rounded-full bg-foreground transition-colors hover:!bg-purple-400 dark:bg-foreground"
          aria-label="Phone"
        >
          <PhoneIcon
            class="h-6 w-6 fill-background transition-colors group-hover:stroke-purple-400 dark:fill-background dark:stroke-background group-hover:dark:stroke-background"
          />
        </a>
      </div>
    </div>
  </div>
</section>
