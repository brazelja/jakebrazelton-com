<script lang="ts">
  import type { BlockComponentProps } from '@portabletext/svelte';

  export let portableText: BlockComponentProps;

  $: ({ value } = portableText);
  $: ({ style = 'normal' } = value);
</script>

{#if style === 'normal'}
  <p class="py-2"><slot /></p>
{:else}
  <slot />
{/if}
