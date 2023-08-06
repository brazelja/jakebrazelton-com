<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { GithubIcon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-svelte';
  import groq from 'groq';

  import { previewSubscription } from '$lib/config/sanity';
  import { Separator } from '$components/ui/separator';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
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

<header class="mb-6">
  <h2 class="text-3xl font-semibold">General</h2>
</header>

<section class="rounded overflow-hidden border p-4 mb-6">
  <h3 class="text-2xl font-semibold mb-2">About</h3>
  <Separator class="mb-4" />
  <PortableText value={user.bio} />
</section>

<section class="rounded overflow-hidden border p-4 mb-6">
  <h3 class="text-2xl font-semibold mb-2">Connect</h3>
  <Separator class="mb-4" />
  <ul class="space-y-4 mb-4">
    <li>
      <a
        href={'mailto:' + user?.email}
        class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
      >
        <MailIcon
          class="w-8 h-8 md:w-6 md:h-6 shrink-0 transition-colors fill-foreground stroke-background dark:stroke-background dark:fill-foreground"
        />
        <p class="hidden md:block">{user?.email}</p>
      </a>
    </li>
    <li>
      <a
        href={'tel:+1' + user?.phone.replaceAll(/[^0-9]/g, '')}
        class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
      >
        <PhoneIcon
          class="w-8 h-8 md:w-6 md:h-6 shrink-0 fill-foreground dark:stroke-none dark:fill-foreground"
        />
        <p class="hidden md:block">{user?.phone}</p>
      </a>
    </li>
    {#if user?.links?.github}
      <li>
        <a
          href={user?.links?.github}
          class="flex items-center gap-2 whitespace-nowrap hover:cursor-pointer hover:underline"
        >
          <div
            class="relative rounded-full w-8 h-8 md:w-6 md:h-6 overflow-hidden bg-foreground dark:bg-white"
          >
            <GithubIcon
              class="absolute -bottom-[2.7px] md:-bottom-[2px] left-1/2 -translate-x-1/2 w-7 h-7 md:w-5 md:h-5 stroke-background fill-background dark:stroke-background dark:fill-background"
            />
          </div>
          <p class="hidden md:block">
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
            class="w-8 h-8 md:w-6 md:h-6 shrink-0 stroke-foreground fill-foreground dark:stroke-foreground dark:fill-foreground"
          />
          <p class="hidden md:block">
            {user?.links?.linkedin.replace(/https:\/\/(www\.)?/i, '')}
          </p>
        </a>
      </li>
    {/if}
  </ul>
</section>

<section class="rounded overflow-hidden border p-4">
  <h3 class="text-2xl font-semibold mb-2">Languages</h3>
  <Separator class="mb-4" />
  <ul class="space-y-4 mb-4">
    {#each user?.languages ?? [] as { language, native }}
      <li class="font-medium md:font-normal">
        {language}
        {#if native}
          <p class="inline ml-1 text-foreground/75">(Native)</p>
        {/if}
      </li>
    {/each}
  </ul>
</section>
