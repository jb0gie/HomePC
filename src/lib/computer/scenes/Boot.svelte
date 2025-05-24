<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'
  import { onMount } from 'svelte'

  function handleBoot() {
    computer.update(c => ({ ...c, state: 'menu' }))
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') handleBoot()
  }

  onMount(() => {
    window.addEventListener('keydown', onKeydown)
    return () => window.removeEventListener('keydown', onKeydown)
  })
</script>

<!-- Position the UI where the screen should be -->
<T.Group position={[0, 1.4, 0.1]} rotation={[0, 0, 0]}>
  <T.Mesh
    on:click={handleBoot}
    on:keydown={onKeydown}
    role="button"
    tabindex="0"
  >
    <T.PlaneGeometry args={[1.6, 1.2]} />
    <T.MeshBasicMaterial color="#000" transparent={true} opacity={0.8} />
  </T.Mesh>
  <Text
    fontSize={0.08}
    color="#0f0"
    anchorX="50%"
    anchorY="50%"
    text="Press any key or click to boot"
    position={[0, 0.1, 0.01]}
  />
  <Text
    fontSize={0.06}
    color="#fff"
    anchorX="50%"
    anchorY="50%"
    text="Boot"
    position={[0, -0.1, 0.01]}
  />
</T.Group>