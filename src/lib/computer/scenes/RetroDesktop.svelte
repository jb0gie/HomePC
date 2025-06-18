<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'
  import { onMount } from 'svelte'

  let selectedIcon = 0
  const icons = [
    { name: 'Network Manager', action: () => computer.update(c => ({ ...c, state: 'network' })) },
    { name: 'File Manager', action: () => {} },
    { name: 'System Info', action: () => {} },
    { name: 'Games', action: () => {} },
    { name: 'Shutdown', action: () => computer.update(c => ({ ...c, state: 'off' })) }
  ]

  function handleKeydown(e: KeyboardEvent) {
    switch(e.key) {
      case 'ArrowUp':
        selectedIcon = Math.max(0, selectedIcon - 1)
        break
      case 'ArrowDown':
        selectedIcon = Math.min(icons.length - 1, selectedIcon + 1)
        break
      case 'Enter':
        icons[selectedIcon].action()
        break
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  })

  function getDesktopContent() {
    return `╔══════════════════════════════════════════════════════════════════════════════╗
║                                MS-DOS 6.22                                  ║
║                              HOMEPC-386 Desktop                             ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║                                                                              ║
║    ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐        ║
║    │   [Network]     │    │   [Files]       │    │   [System]      │        ║
║    │   Manager       │    │   Manager       │    │   Info          │        ║
║    └─────────────────┘    └─────────────────┘    └─────────────────┘        ║
║                                                                              ║
║                                                                              ║
║    ┌─────────────────┐    ┌─────────────────┐                               ║
║    │   [Games]       │    │   [Shutdown]    │                               ║
║    │                 │    │                 │                               ║
║    └─────────────────┘    └─────────────────┘                               ║
║                                                                              ║
║                                                                              ║
║                                                                              ║
║  Use ↑↓ arrows to navigate, [ENTER] to select                               ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝`
  }
</script>

<T.Group position={[0, 1.4, 0.01]} rotation={[0, 0, 0]}>
  <!-- Screen background -->
  <T.Mesh>
    <T.PlaneGeometry args={[1.6, 1.2]} />
    <T.MeshBasicMaterial color="#008080" />
  </T.Mesh>
  
  <!-- Desktop content -->
  <Text
    fontSize={0.018}
    color="#ffffff"
    anchorX="50%"
    anchorY="50%"
    text={getDesktopContent()}
    position={[0, 0, 0.001]}
    font="/fonts/Beef'd.ttf"
  />
  
  <!-- Selection highlight -->
  {#if selectedIcon === 0}
    <T.Mesh position={[-0.4, 0.15, 0.002]}>
      <T.PlaneGeometry args={[0.3, 0.15]} />
      <T.MeshBasicMaterial color="#ffff00" transparent opacity={0.3} />
    </T.Mesh>
  {:else if selectedIcon === 1}
    <T.Mesh position={[0, 0.15, 0.002]}>
      <T.PlaneGeometry args={[0.3, 0.15]} />
      <T.MeshBasicMaterial color="#ffff00" transparent opacity={0.3} />
    </T.Mesh>
  {:else if selectedIcon === 2}
    <T.Mesh position={[0.4, 0.15, 0.002]}>
      <T.PlaneGeometry args={[0.3, 0.15]} />
      <T.MeshBasicMaterial color="#ffff00" transparent opacity={0.3} />
    </T.Mesh>
  {:else if selectedIcon === 3}
    <T.Mesh position={[-0.4, -0.15, 0.002]}>
      <T.PlaneGeometry args={[0.3, 0.15]} />
      <T.MeshBasicMaterial color="#ffff00" transparent opacity={0.3} />
    </T.Mesh>
  {:else if selectedIcon === 4}
    <T.Mesh position={[0, -0.15, 0.002]}>
      <T.PlaneGeometry args={[0.3, 0.15]} />
      <T.MeshBasicMaterial color="#ffff00" transparent opacity={0.3} />
    </T.Mesh>
  {/if}
</T.Group>