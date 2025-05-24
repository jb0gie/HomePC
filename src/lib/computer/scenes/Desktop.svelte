<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'

  function launchProgram() {
    computer.update(c => ({ ...c, state: 'running' }))
  }

  function shutdown() {
    computer.update(c => ({ ...c, state: 'off' }))
  }
</script>

<T.Group position={[0, 1.1, 1.15]}>
  <T.Mesh
    on:click={launchProgram}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && launchProgram()}
    role="button"
    tabindex="0"
    position={[-1.5, 0, 0]}
  >
    <T.BoxGeometry args={[1, 1, 0.1]} />
    <T.MeshBasicMaterial color="#3498db" />
    <Text fontSize={0.2} color="#fff" anchorX="50%" anchorY="50%" text="Program" position={[0, 0, 0.01]} />
  </T.Mesh>
  <T.Mesh
    on:click={shutdown}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && shutdown()}
    role="button"
    tabindex="0"
    position={[1.5, 0, 0]}
  >
    <T.BoxGeometry args={[1, 1, 0.1]} />
    <T.MeshBasicMaterial color="#e74c3c" />
    <Text fontSize={0.2} color="#fff" anchorX="50%" anchorY="50%" text="Shutdown" position={[0, 0, 0.01]} />
  </T.Mesh>
</T.Group>
