<script lang="ts">
  import type { ListItemComponentProps } from '@portabletext/svelte';

  // Property custom marks receive from @portabletext/svelte when redered
  export let portableText: ListItemComponentProps;

  // Remember to make your variables reactive so that they can reflect prop changes
  // See: https://svelte.dev/docs#3_$_marks_a_statement_as_reactive
  $: ({ value } = portableText);
</script>

<li>
  <slot />
</li>
