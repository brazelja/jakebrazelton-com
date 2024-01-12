<script lang="ts">
  import type { MarkComponentProps } from '@portabletext/svelte';

  export let portableText: MarkComponentProps<{ href: string }>;

  $: ({ value } = portableText);
</script>

{#if value.href}
  <a
    href={value.href}
    class="text-primary underline-offset-4 hover:underline disabled:pointer-events-none disabled:opacity-50"
  >
    <slot />
  </a>
{:else}
  <slot />
{/if}
