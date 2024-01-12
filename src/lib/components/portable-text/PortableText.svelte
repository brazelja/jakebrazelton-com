<script lang="ts">
  import type { ComponentProps } from 'svelte';
  import { PortableText } from '@portabletext/svelte';

  import Paragraph from './Paragraph.svelte';
  import Quote from './Quote.svelte';
  import Heading from './Heading.svelte';
  import Code from './Code.svelte';
  import Link from './Link.svelte';
  import List from './List.svelte';
  import ListItem from './ListItem.svelte';

  export let value: ComponentProps<PortableText>['value'];
</script>

<PortableText
  {value}
  components={{
    block: {
      normal: Paragraph,
      blockquote: Quote,
      h1: Heading,
      h2: Heading,
      h3: Heading,
      h4: Heading,
    },
    marks: {
      code: Code,
      link: Link,
    },
    list: {
      bullet: List,
      number: List,
    },
    listItem: {
      normal: ListItem,
    },
  }}
/>
