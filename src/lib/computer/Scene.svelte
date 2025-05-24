<script lang="ts">
	import { T } from '@threlte/core';
  import Computer from './Computer.svelte';
  import Renderer from './Renderer.svelte';
  import { computer } from './computer';
  import { scenes } from './scenes/programs';
  import { get } from 'svelte/store';

  let computerState = get(computer);
  computer.subscribe(value => computerState = value);
  $: currentScene = scenes.find(s => s.id === computerState.state);
  $: console.log('Scene.svelte: computerState.state =', computerState.state, 'currentScene =', currentScene?.name);
</script>

<T.Group>
  <Renderer />
  <Computer>
    <svelte:fragment slot="screen-ui">
      {#if currentScene}
        <svelte:component this={currentScene.component} />
      {:else}
        <div style="color: red;">No scene found for state: {computerState.state}</div>
      {/if}
    </svelte:fragment>
  </Computer>
  <!-- <GUI /> -->
  <!-- Add more scene elements or logic here -->
</T.Group> 