<script lang="ts">
  import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-svelte';

  import { Avatar, AvatarImage, AvatarFallback } from '$components/ui/avatar';
  import { urlForImage } from '$lib/config/sanity';

  import type { PageData } from './$types';

  export let data: PageData;

  const user = data.user;
  const imageUrl = urlForImage(user?.picture).width(408).height(408).url();
  const blurUrl = urlForImage(user?.picture).width(408).height(408).blur(100).url();
</script>

<svelte:head>
  <title>Jake Brazelton - Software Developer</title>
</svelte:head>

<section>
  <div class="container relative h-[calc(100vh_-_7rem_-_1px)]">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center"
    >
      <div class="relative">
        <Avatar class="w-52 h-52 shadow z-10">
          <AvatarImage src={imageUrl} alt="Jake Brazelton" />
          <AvatarFallback>
            <img src={blurUrl} alt="Jake Brazelton" />
          </AvatarFallback>
        </Avatar>
        <div
          class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-[13rem] bg-gradient-to-br from-purple-600 to-yellow-600 w-72 h-72 rounded-full filter blur-3xl z-0 origin-[0_0] motion-safe:animate-revolve"
        ></div>
      </div>
      <h1 class="mt-4 text-4xl font-bold text-center z-10">{user?.name}</h1>
      <h2 class="mt-2 text-lg sm:text-2xl whitespace-nowrap font-medium text-center z-10">
        {user?.title}
      </h2>
      <div class="flex gap-4 mt-4 z-10">
        {#if user?.links?.github}
          <a
            href={user?.links?.github}
            class="relative rounded-full w-8 h-8 overflow-hidden transition-colors bg-foreground hover:cursor-pointer dark:bg-white dark:hover:bg-purple-400"
          >
            <GithubIcon
              class="absolute -bottom-[2.2px] left-1/2 -translate-x-1/2 w-7 h-7 stroke-background fill-background dark:stroke-background dark:fill-background"
            />
          </a>
        {/if}
        {#if user?.links?.linkedin}
          <a
            href={user?.links?.linkedin}
            class="flex items-center justify-center rounded-sm w-8 h-8 transition-colors bg-foreground hover:cursor-pointer dark:bg-white dark:hover:bg-purple-400"
          >
            <LinkedinIcon
              class="w-7 h-7 stroke-background fill-background dark:stroke-background dark:fill-background"
            />
          </a>
        {/if}
        <a
          href={'mailto:' + user?.email}
          class="group flex items-center justify-center rounded-full w-8 h-8 transition-colors bg-foreground hover:cursor-pointer dark:bg-white dark:hover:bg-purple-400"
        >
          <MailIcon
            class="w-7 h-7 transition-colors fill-background dark:stroke-white dark:fill-background dark:group-hover:stroke-purple-400"
          />
        </a>
        <a
          href={'tel:' + user?.phone}
          class="flex items-center justify-center rounded-full w-8 h-8 transition-colors bg-foreground hover:cursor-pointer dark:bg-white dark:hover:bg-purple-400"
        >
          <PhoneIcon class="w-6 h-6 fill-background dark:stroke-background dark:fill-background" />
        </a>
      </div>
    </div>
  </div>
</section>
