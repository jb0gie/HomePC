<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'

  function powerOn() { computer.update(c => ({ ...c, state: 'off' })) }
</script>

<T.Group position={[0, 1.1, 1.15]}>
  <Text
    fontSize={0.4}
    color="#f00"
    anchorX="50%"
    anchorY="50%"
    text="Shutting Down..."
    position={[0, 0.5, 0.01]}
  />
  <T.Mesh
    on:click={powerOn}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && powerOn()}
    role="button"
    tabindex="0"
    position={[0, -0.8, 0]}
  >
    <T.BoxGeometry args={[2, 0.6, 0.1]} />
    <T.MeshBasicMaterial color="#222" />
    <Text fontSize={0.2} color="#fff" anchorX="50%" anchorY="50%" text="Power On" position={[0, 0, 0.01]} />
  </T.Mesh>
</T.Group>
