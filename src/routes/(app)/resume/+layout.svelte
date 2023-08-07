<script lang="ts">
  import groq from 'groq';

  import { previewSubscription, urlForImage } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';

  import type { LayoutData } from './$types';
  import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
  import { page } from '$app/stores';
  import clsx from 'clsx';

  export let data: LayoutData;

  $: ({ initialData, previewMode } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    { 
      'user': *[_type == "user"] | order(_updatedAt desc) [0] { name, title, picture } 
    }
  `,
    { initialData, enabled: !!previewMode }
  ));

  $: ({ user } = $liveData);
  $: imageUrl = urlForImage(user?.picture).width(408).height(408).url();
  $: blurUrl = urlForImage(user?.picture).width(408).height(408).blur(100).url();

  const items = ['General', 'Interests', 'Skills', 'Experience', 'Education', 'Projects'];

  $: subtitle = items.find((item) => $page.route.id === `/(app)/resume/${item.toLowerCase()}`);
</script>

<svelte:head>
  <title>{$liveData?.user?.name} | About | {subtitle}</title>
</svelte:head>

<div class="container">
  <header class="flex flex-col md:flex-row justify-start items-center w-full py-8">
    <Avatar class="w-28 h-28 shadow">
      <AvatarImage src={imageUrl} alt="Jake Brazelton" />
      <AvatarFallback>
        <img src={blurUrl} alt="Jake Brazelton" />
      </AvatarFallback>
    </Avatar>
    <div class="flex flex-col mt-4 items-center md:items-start md:mt-0 md:ml-4">
      <h1 class="text-3xl sm:text-4xl font-bold">{user.name}</h1>
      <p class="font-medium md:font-normal">{user.title}</p>
    </div>
  </header>
</div>
<Separator class="mb-12" />
<div class="container min-h-[calc(100dvh_-_8.5rem_-_11rem_-_3rem_-_2px)]">
  <section class="grid grid-cols-1 md:grid-cols-[240px_auto] md:gap-4">
    <aside class="relative">
      <ul class="sticky top-24 grid auto-rows-auto text-muted-foreground">
        {#each items as item}
          <li
            class={clsx(
              'rounded transition-colors hover:cursor-pointer hover:text-foreground hover:bg-muted',
              { 'text-foreground': $page.route.id === `/(app)/resume/${item.toLowerCase()}` }
            )}
          >
            <a href="/resume/{item.toLowerCase()}" class="inline-block w-full px-3 py-2">{item}</a>
          </li>
        {/each}
      </ul>
    </aside>
    <section>
      <slot />
    </section>
  </section>
</div>
