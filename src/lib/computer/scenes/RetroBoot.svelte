<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { computer } from '../computer'
  import { onMount } from 'svelte'

  let bootStage = 0
  let showCursor = true

  const bootMessages = [
    'HOMEPC-386 BIOS v2.1\nCopyright (C) 1995 Phoenix Technologies\n\nMemory Test: 640K OK\nExtended Memory: 7168K OK',
    'Detecting IDE Drives...\nPrimary Master: WDC AC2540H\nPrimary Slave: None\nSecondary Master: CD-ROM\nSecondary Slave: None',
    'Network Card Detected: NE2000 Compatible\nMAC Address: 00:50:DA:12:34:56\nI/O Port: 0x300, IRQ: 3',
    'Loading MS-DOS 6.22...\n\nStarting Windows for Workgroups 3.11\nLoading Network Drivers...\nConnecting to Network...',
    'Network Connection Established\nIP Address: 192.168.1.100\nGateway: 192.168.1.1\n\nPress any key to continue...'
  ]

  function nextBootStage() {
    if (bootStage < bootMessages.length - 1) {
      bootStage++
      setTimeout(nextBootStage, 2000)
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (bootStage === bootMessages.length - 1) {
      computer.update(c => ({ ...c, state: 'menu' }))
    }
  }

  onMount(() => {
    setTimeout(nextBootStage, 1000)
    window.addEventListener('keydown', handleKeydown)
    
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor
    }, 500)
    
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      clearInterval(cursorInterval)
    }
  })

  function getBootContent() {
    let content = bootMessages[bootStage]
    if (bootStage === bootMessages.length - 1) {
      content += showCursor ? '_' : ' '
    }
    return content
  }
</script>

<T.Group position={[0, 1.4, 0.01]} rotation={[0, 0, 0]}>
  <!-- Screen background -->
  <T.Mesh>
    <T.PlaneGeometry args={[1.4, 1.0]} />
    <T.MeshBasicMaterial color="#000000" />
  </T.Mesh>
  
  <!-- Boot text -->
  <Text
    fontSize={0.018}
    color="#ffffff"
    anchorX="50%"
    anchorY="50%"
    text={getBootContent()}
    position={[0, 0, 0.001]}
    font="/fonts/Beef'd.ttf"
  />
</T.Group>