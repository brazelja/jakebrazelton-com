<script lang="ts">
  import { cn } from '$lib/utils';
  import type { ListComponentProps } from '@portabletext/svelte';

  // Property custom marks receive from @portabletext/svelte when redered
  export let portableText: ListComponentProps;

  // Remember to make your variables reactive so that they can reflect prop changes
  // See: https://svelte.dev/docs#3_$_marks_a_statement_as_reactive
  $: ({ value } = portableText);
</script>

<ul
  class={cn('list-inside', {
    'list-disc': value.listItem === 'bullet',
    'list-decimal': value.listItem === 'number'
  })}
>
  <slot />
</ul>
