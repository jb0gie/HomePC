<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'

  function goBack() { computer.update(c => ({ ...c, state: 'menu' })) }
</script>

<T.Group position={[0, 1.1, 1.15]}>
  <T.Mesh
    on:click={goBack}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && goBack()}
    role="button"
    tabindex="0"
    position={[0, -0.8, 0]}
  >
    <T.BoxGeometry args={[2, 0.6, 0.1]} />
    <T.MeshBasicMaterial color="#888" />
    <Text fontSize={0.2} color="#fff" anchorX="50%" anchorY="50%" text="Back to Desktop" position={[0, 0, 0.01]} />
  </T.Mesh>
  <Text
    fontSize={0.4}
    color="#0ff"
    anchorX="50%"
    anchorY="50%"
    text="Your Program Here!"
    position={[0, 0.5, 0.01]}
  />
</T.Group>
