<script lang="ts">
  import { PortableText } from '@portabletext/svelte';
  import { GithubIcon, Globe2Icon, LinkedinIcon, MailIcon, PhoneIcon } from 'lucide-svelte';
  import groq from 'groq';
  import clsx from 'clsx';

  import { Avatar, AvatarFallback, AvatarImage } from '$components/ui/avatar';
  import { Separator } from '$components/ui/separator';
  import { previewSubscription, urlForImage } from '$lib/config/sanity';

  import type { PageData } from './$types';

  export let data: PageData;

  $: ({ initialData, previewMode } = data);
  $: ({ data: liveData } = previewSubscription(
    groq`
    {
      'user': *[_type == "user"] | order(_updatedAt desc) [0],
      'experiences': *[_type == "experience"] { ..., company-> } | order(startDate desc, _updatedAt desc),
      'education': *[_type == "education"] | order(startDate desc, _updatedAt desc),
      'project': *[_type == "project"] { ..., company-> } | order(startDate desc, _updatedAt desc)
    }
  `,
    {
      initialData,
      enabled: !!previewMode
    }
  ));

  $: ({ user, experiences, education, projects } = $liveData);
  $: imageUrl = urlForImage(user?.picture).width(408).height(408).url();
  $: blurUrl = urlForImage(user?.picture).width(408).height(408).blur(100).url();
</script>

<svelte:head>
  <title>{$liveData?.user?.name} | Resume</title>
</svelte:head>

<div class="container px-4 md:px-8">
  <section class="rounded overflow-hidden m-4 border shadow max-w-[960px] mx-auto">
    <header class="bg-secondary dark:bg-black py-6 flex flex-col items-center justify-center gap-1">
      <h1 class="text-3xl sm:text-4xl font-bold">{user.name}</h1>
      <p class="font-medium md:font-normal">{user.title}</p>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-[30%_70%]">
      <!-- Sidebar -->
      <aside class="p-4 bg-purple-400/50">
        <Avatar
          class="w-48 h-48 md:w-40 md:h-40 mx-auto mb-6 shadow z-10 border-foreground border-2"
        >
          <AvatarImage src={imageUrl} alt="Jake Brazelton" />
          <AvatarFallback>
            <img src={blurUrl} alt="Jake Brazelton" />
          </AvatarFallback>
        </Avatar>
        <Separator class="mb-6" />
        <!-- Links -->
        <div class="w-full mb-6 flex items-center justify-around gap-2 md:block md:space-y-2">
          <a
            href="https://jakebrazelton.com"
            class="flex items-center gap-2 md:text-sm whitespace-nowrap hover:cursor-pointer hover:underline"
          >
            <Globe2Icon class="w-8 h-8 md:w-5 md:h-5 shrink-0 stroke-foreground" />
            <p class="hidden md:block">jakebrazelton.com</p>
          </a>
          <a
            href={'mailto:' + user?.email}
            class="flex items-center gap-2 md:text-sm whitespace-nowrap hover:cursor-pointer hover:underline"
          >
            <MailIcon
              class="w-8 h-8 md:w-5 md:h-5 shrink-0 transition-colors fill-foreground stroke-[#dfc1fd] dark:stroke-[#614586] dark:fill-foreground"
            />
            <p class="hidden md:block">{user?.email}</p>
          </a>
          <a
            href={'tel:+1' + user?.phone.replaceAll(/[^0-9]/g, '')}
            class="flex items-center gap-2 md:text-sm whitespace-nowrap hover:cursor-pointer hover:underline"
          >
            <PhoneIcon
              class="w-8 h-8 md:w-5 md:h-5 shrink-0 fill-foreground dark:stroke-none dark:fill-foreground"
            />
            <p class="hidden md:block">{user?.phone}</p>
          </a>
          {#if user?.links?.github}
            <a
              href={user?.links?.github}
              class="flex items-center gap-2 md:text-sm whitespace-nowrap hover:cursor-pointer hover:underline"
            >
              <div
                class="relative rounded-full w-8 h-8 md:w-5 md:h-5 overflow-hidden bg-foreground dark:bg-white"
              >
                <GithubIcon
                  class="absolute -bottom-[2.7px] md:-bottom-[1.5px] left-1/2 -translate-x-1/2 w-7 h-7 md:w-4 md:h-4 stroke-[#dfc1fd] fill-[#dfc1fd] dark:stroke-[#614586] dark:fill-[#614586]"
                />
              </div>
              <p class="hidden md:block">
                {user?.links?.github.replace(/https:\/\/(www\.)?/i, '')}
              </p>
            </a>
          {/if}
          {#if user?.links?.linkedin}
            <a
              href={user?.links?.linkedin}
              class="flex items-center gap-2 md:text-sm whitespace-nowrap hover:cursor-pointer hover:underline"
            >
              <LinkedinIcon
                class="w-8 h-8 md:w-5 md:h-5 shrink-0 stroke-foreground fill-foreground dark:stroke-foreground dark:fill-foreground"
              />
              <p class="hidden md:block">
                {user?.links?.linkedin.replace(/https:\/\/(www\.)?/i, '')}
              </p>
            </a>
          {/if}
        </div>
        <!-- Languages -->
        <div class="w-full text-start mb-6">
          <p class="text-xl md:text-lg font-bold mb-2">Languages</p>
          <ul class="space-y-2">
            {#each user?.languages ?? [] as { language, native }}
              <li class="font-medium md:font-normal">
                {language}
                {#if native}
                  <p class="inline ml-1 text-foreground/75">(Native)</p>
                {/if}
              </li>
            {/each}
          </ul>
        </div>
        <!-- Interests -->
        <div class="w-full text-start mb-6">
          <p class="text-xl md:text-lg font-bold mb-2">Interests</p>
          <ul class="space-y-2">
            {#each user?.interests ?? [] as interest}
              <li class="font-medium md:font-normal">{interest}</li>
            {/each}
          </ul>
        </div>
        <!-- Skills -->
        <div class="w-full text-start mb-6">
          <p class="text-xl md:text-lg font-bold mb-2">Skills</p>
          <ul class="space-y-2">
            {#each user?.skills ?? [] as skill}
              <li class="font-medium md:font-normal">{skill}</li>
            {/each}
          </ul>
        </div>
      </aside>
      <!-- Main Block -->
      <section class="p-4 md:p-6 dark:bg-secondary space-y-6">
        <!-- Experiences -->
        <div class="w-full text-start">
          <h2 class="text-2xl md:text-xl font-bold uppercase tracking-wider">Experiences</h2>
          <Separator class="mb-4" />
          <ul class="space-y-10 md:space-y-6">
            {#each experiences ?? [] as experience}
              <li>
                <div class="flex mb-2">
                  <span>
                    <p class="text-lg leading-snug font-semibold">{experience.title}</p>
                    <a
                      href={experience.company.website}
                      class="md:text-sm text-foreground/75 underline decoration-dotted md:no-underline hover:cursor-pointer hover:underline"
                      >{experience.company.name}</a
                    >
                  </span>
                  <p class="inline md:text-sm text-foreground/75 ml-auto">
                    {#if !experience.endDate}
                      {new Date(experience.startDate).getFullYear()} - Present
                    {:else if experience.startDate.split('-')[0] === experience.endDate.split('-')[0]}
                      {new Date(experience.startDate).getFullYear()}
                    {:else}
                      {new Date(experience.startDate).getFullYear()} - {new Date(
                        experience.endDate
                      ).getFullYear()}
                    {/if}
                  </p>
                </div>
                <div class="contents text-sm">
                  <PortableText value={experience.description} />
                </div>
                <ul class="flex gap-x-4 gap-y-4 md:gap-x-2 md:gap-y-2 flex-wrap mt-4 md:mt-2">
                  {#each experience?.skills ?? [] as skill}
                    <li class="bg-accent px-3 py-[0.2rem] text-sm rounded-full">{skill}</li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        </div>
        <!-- Education -->
        <div class="w-full text-start">
          <h2 class="text-2xl md:text-xl font-bold uppercase tracking-wider">Education</h2>
          <Separator class="mb-4" />
          <ul class="space-y-10 md:space-y-6">
            {#each education ?? [] as degree}
              <li>
                <div class="flex mb-2">
                  <span>
                    <p class="text-lg leading-snug font-semibold">{degree.degree}</p>
                    <p class="md:text-sm text-foreground/75">
                      {degree.school}
                    </p>
                  </span>
                  <p class="inline md:text-sm text-foreground/75 ml-auto">
                    {#if !degree.endDate}
                      {new Date(degree.startDate).getFullYear()} - Present
                    {:else if degree.startDate.split('-')[0] === degree.endDate.split('-')[0]}
                      {new Date(degree.startDate).getFullYear()}
                    {:else}
                      {new Date(degree.startDate).getFullYear()} - {new Date(
                        degree.endDate
                      ).getFullYear()}
                    {/if}
                  </p>
                </div>
                <p class="list-item text-sm text-foreground/75 before:content-['•'] before:mr-1">
                  {degree.note}
                </p>
              </li>
            {/each}
          </ul>
        </div>
        <!-- Projects -->
        <div class="w-full text-start">
          <h2 class="text-2xl md:text-xl font-bold uppercase tracking-wider">Projects</h2>
          <Separator class="mb-4" />
          <ul class="space-y-10 md:space-y-6">
            {#each projects ?? [] as project}
              <li>
                <div class="flex flex-col items-start mb-2">
                  <svelte:element
                    this={project.link ? 'a' : 'p'}
                    href={project.link}
                    class={clsx('text-lg leading-snug font-semibold', {
                      'underline decoration-dotted md:no-underline hover:cursor-pointer hover:underline':
                        project.link
                    })}
                  >
                    {project.name}
                  </svelte:element>
                  {#if project.company}
                    <a
                      href={project.company.website}
                      class="md:text-sm text-foreground/75 underline decoration-dotted md:no-underline hover:cursor-pointer hover:underline"
                    >
                      {project.company.name}
                    </a>
                  {/if}
                </div>
                <div class="contents text-sm">
                  <PortableText value={project.description} />
                </div>
                <ul class="flex gap-x-4 gap-y-4 md:gap-x-2 md:gap-y-2 flex-wrap mt-4 md:mt-2">
                  {#each project?.skills ?? [] as skill}
                    <li class="bg-accent px-3 py-[0.2rem] text-sm rounded-full">{skill}</li>
                  {/each}
                </ul>
              </li>
            {/each}
          </ul>
        </div>
      </section>
    </div>
  </section>
</div>
