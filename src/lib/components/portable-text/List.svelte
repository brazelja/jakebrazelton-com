<script lang="ts">
  import type { ListComponentProps } from '@portabletext/svelte';

  // Property custom marks receive from @portabletext/svelte when redered
  export let portableText: ListComponentProps;

  // Remember to make your variables reactive so that they can reflect prop changes
  // See: https://svelte.dev/docs#3_$_marks_a_statement_as_reactive
  $: ({ value } = portableText);
  $: ({ listItem = 'bullet' } = value);
</script>

{#if listItem === 'bullet'}
  <ul class="my-6 ml-6 list-disc [&>li]:mt-2">
    <slot />
  </ul>
{:else if listItem === 'number'}
  <ol class="my-6 ml-6 list-decimal [&>li]:mt-2">
    <slot />
  </ol>
{:else}
  <slot />
{/if}
