<script lang="ts">
  import { toPlainText, type BlockComponentProps } from '@portabletext/svelte';
  import { LinkIcon } from 'lucide-svelte';
  import type { PortableTextBlock } from 'sanity';

  import { slugify } from '$lib/utils/slugify';
  import { cn } from '$lib/utils';

  export let portableText: BlockComponentProps;

  $: ({ value, indexInParent: index, global } = portableText);
  $: ({ style } = value);

  $: precededByHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(
    (global.ptBlocks as unknown as PortableTextBlock[])[index - 1]?.style as string
  );

  $: anchorId = slugify(toPlainText(value));
  $: tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(style ?? '') ? style : null;
</script>

{#if tag}
  <svelte:element
    this={tag}
    id={anchorId}
    class={cn('group mt-4 scroll-m-20 tracking-tight', {
      'text-4xl font-extrabold lg:text-5xl': tag === 'h1',
      'border-b pb-2 text-3xl font-semibold transition-colors first:mt-0': tag === 'h2',
      'text-2xl font-semibold': tag === 'h3',
      'text-xl font-semibold': tag === 'h4',
      'text-lg font-semibold': tag === 'h5',
      'text-base font-semibold': tag === 'h6',
      'mt-6': precededByHeading
    })}
  >
    <slot />
    <a href="#{anchorId}">
      <span class="sr-only">Link to this heading</span>
      <LinkIcon class="ml-2 hidden h-4 w-4 text-muted-foreground group-hover:inline-block" />
    </a>
  </svelte:element>
{:else}
  <slot />
{/if}
