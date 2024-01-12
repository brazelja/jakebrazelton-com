<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';

  export let portableText: BlockComponentProps;

  $: ({ value } = portableText);
  $: ({ style = 'blockquote' } = value);
</script>

{#if style === 'blockquote'}
  <blockquote class="mt-6 border-l-2 pl-6 italic"><slot /></blockquote>
{:else}
  <slot />
{/if}
