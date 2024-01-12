<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';

  export let portableText: BlockComponentProps;

  $: ({ value } = portableText);
  $: ({ style = 'normal' } = value);
</script>

{#if style === 'normal'}
  <p class="leading-7 [&:not(:first-child)]:mt-4"><slot /></p>
{:else}
  <slot />
{/if}
