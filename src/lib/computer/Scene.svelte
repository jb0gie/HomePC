<script lang="ts">
	import { T } from '@threlte/core';
  import Computer from './Computer.svelte';
  import GUI from './GUI.svelte';
  import Renderer from './Renderer.svelte';
  // Import scenes or state management as needed
</script>

<T.Group>
  <Renderer />
  <Computer />
  <!-- <GUI /> -->
  <!-- Add more scene elements or logic here -->
</T.Group> 