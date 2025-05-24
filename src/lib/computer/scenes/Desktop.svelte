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

<T.Group position={[0, 1.4, 0.05]} rotation={[0, 0, 0]}>
  <T.Mesh
    on:click={launchProgram}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && launchProgram()}
    role="button"
    tabindex="0"
    position={[-0.3, 0, 0]}
  >
    <T.BoxGeometry args={[0.25, 0.25, 0.02]} />
    <T.MeshBasicMaterial color="#3498db" />
    <Text fontSize={0.04} color="#fff" anchorX="50%" anchorY="50%" text="Program" position={[0, 0, 0.01]} />
  </T.Mesh>
  <T.Mesh
    on:click={shutdown}
    on:keydown={(e: KeyboardEvent) => e.key === 'Enter' && shutdown()}
    role="button"
    tabindex="0"
    position={[0.3, 0, 0]}
  >
    <T.BoxGeometry args={[0.25, 0.25, 0.02]} />
    <T.MeshBasicMaterial color="#e74c3c" />
    <Text fontSize={0.04} color="#fff" anchorX="50%" anchorY="50%" text="Shutdown" position={[0, 0, 0.01]} />
  </T.Mesh>
</T.Group>
