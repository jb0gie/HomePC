<script lang="ts">
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { onMount } from 'svelte'
  import { computer } from '../computer'

  let currentScreen = 'main'
  let selectedDevice = 0
  let commandHistory: string[] = []
  let currentCommand = ''
  let showCursor = true

  // Mock network data
  const networkDevices = [
    { name: 'DESKTOP-PC', ip: '192.168.1.100', status: 'ONLINE', type: 'PC' },
    { name: 'LAPTOP-WORK', ip: '192.168.1.101', status: 'ONLINE', type: 'LAPTOP' },
    { name: 'PHONE-ANDROID', ip: '192.168.1.102', status: 'ONLINE', type: 'MOBILE' },
    { name: 'PRINTER-HP', ip: '192.168.1.103', status: 'OFFLINE', type: 'PRINTER' },
    { name: 'ROUTER-MAIN', ip: '192.168.1.1', status: 'ONLINE', type: 'ROUTER' },
    { name: 'SMART-TV', ip: '192.168.1.104', status: 'ONLINE', type: 'TV' }
  ]

  const systemInfo = {
    hostname: 'HOMEPC-386',
    os: 'MS-DOS 6.22',
    memory: '640K',
    network: 'NE2000 Compatible',
    gateway: '192.168.1.1'
  }

  function handleKeydown(e: KeyboardEvent) {
    if (currentScreen === 'main') {
      switch(e.key) {
        case '1':
          currentScreen = 'devices'
          break
        case '2':
          currentScreen = 'status'
          break
        case '3':
          currentScreen = 'config'
          break
        case '4':
          currentScreen = 'terminal'
          break
        case 'Escape':
          computer.update(c => ({ ...c, state: 'menu' }))
          break
      }
    } else if (currentScreen === 'devices') {
      switch(e.key) {
        case 'ArrowUp':
          selectedDevice = Math.max(0, selectedDevice - 1)
          break
        case 'ArrowDown':
          selectedDevice = Math.min(networkDevices.length - 1, selectedDevice + 1)
          break
        case 'Escape':
          currentScreen = 'main'
          break
      }
    } else if (currentScreen === 'terminal') {
      if (e.key === 'Enter') {
        if (currentCommand.toLowerCase() === 'exit') {
          currentScreen = 'main'
        } else {
          commandHistory.push(`C:\\>${currentCommand}`)
          if (currentCommand.toLowerCase() === 'ipconfig') {
            commandHistory.push('Windows IP Configuration')
            commandHistory.push('')
            commandHistory.push('Ethernet adapter:')
            commandHistory.push('   IP Address: 192.168.1.100')
            commandHistory.push('   Subnet Mask: 255.255.255.0')
            commandHistory.push('   Default Gateway: 192.168.1.1')
          } else if (currentCommand.toLowerCase() === 'ping 192.168.1.1') {
            commandHistory.push('Pinging 192.168.1.1:')
            commandHistory.push('Reply from 192.168.1.1: time<1ms')
            commandHistory.push('Reply from 192.168.1.1: time<1ms')
          } else if (currentCommand.toLowerCase() === 'help') {
            commandHistory.push('Available commands:')
            commandHistory.push('IPCONFIG - Display IP config')
            commandHistory.push('PING     - Test connectivity')
            commandHistory.push('DIR      - List directory')
            commandHistory.push('EXIT     - Return to menu')
          } else if (currentCommand.toLowerCase() === 'dir') {
            commandHistory.push('Directory of C:\\NETWORK')
            commandHistory.push('')
            commandHistory.push('CONFIG   EXE     12,345')
            commandHistory.push('NETMON   EXE     23,456')
            commandHistory.push('       2 file(s)     35,801 bytes')
          } else if (currentCommand.trim() !== '') {
            commandHistory.push(`Bad command or file name`)
          }
          commandHistory.push('')
        }
        currentCommand = ''
        // Keep only last 6 lines
        if (commandHistory.length > 6) {
          commandHistory = commandHistory.slice(-6)
        }
      } else if (e.key === 'Backspace') {
        currentCommand = currentCommand.slice(0, -1)
      } else if (e.key === 'Escape') {
        currentScreen = 'main'
      } else if (e.key.length === 1) {
        currentCommand += e.key
      }
    } else {
      if (e.key === 'Escape') {
        currentScreen = 'main'
      }
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown)
    
    // Blinking cursor
    const cursorInterval = setInterval(() => {
      showCursor = !showCursor
    }, 500)
    
    return () => {
      window.removeEventListener('keydown', handleKeydown)
      clearInterval(cursorInterval)
    }
  })

  function getScreenContent() {
    if (currentScreen === 'main') {
      return `╔════════════════════════════════════════════════════╗
║            HOME NETWORK MANAGER v2.1               ║
║                  ${systemInfo.hostname}                    ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  [1] Network Devices                               ║
║  [2] Network Status                                ║
║  [3] Configuration                                 ║
║  [4] Command Terminal                              ║
║                                                    ║
║  [ESC] Exit to Desktop                             ║
║                                                    ║
║  System: ${systemInfo.os}      Memory: ${systemInfo.memory}        ║
║  Network: ${systemInfo.network}                           ║
║  Gateway: ${systemInfo.gateway}                          ║
║                                                    ║
╚════════════════════════════════════════════════════╝`
    } else if (currentScreen === 'devices') {
      let content = `╔════════════════════════════════════════════════════╗
║                 NETWORK DEVICES                    ║
╠════════════════════════════════════════════════════╣
║                                                    ║`
      
      networkDevices.forEach((device, index) => {
        const selected = index === selectedDevice ? '►' : ' '
        const status = device.status === 'ONLINE' ? '●' : '○'
        const line = `║ ${selected} ${status} ${device.name.padEnd(12)} ${device.ip.padEnd(13)} ${device.type.padEnd(6)} ║`
        content += '\n' + line
      })
      
      content += `
║                                                    ║
║  Use ↑↓ to navigate, [ESC] to return              ║
║                                                    ║
╚════════════════════════════════════════════════════╝`
      return content
    } else if (currentScreen === 'status') {
      return `╔════════════════════════════════════════════════════╗
║                 NETWORK STATUS                     ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  Interface: NE2000 Compatible                      ║
║  Status: CONNECTED                                 ║
║  Speed: 10 Mbps                                    ║
║  Duplex: Half                                      ║
║                                                    ║
║  IP Address: 192.168.1.100                         ║
║  Subnet Mask: 255.255.255.0                        ║
║  Default Gateway: 192.168.1.1                      ║
║  DNS Server: 192.168.1.1                           ║
║                                                    ║
║  Packets Sent: 1,247                               ║
║  Packets Received: 2,891                           ║
║  Errors: 0                                         ║
║                                                    ║
║  [ESC] Return to main menu                         ║
╚════════════════════════════════════════════════════╝`
    } else if (currentScreen === 'config') {
      return `╔════════════════════════════════════════════════════╗
║               NETWORK CONFIGURATION                ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║  Network Adapter: NE2000 Compatible               ║
║  IRQ: 3                                            ║
║  I/O Port: 0x300                                   ║
║  Memory: 0xD000                                    ║
║                                                    ║
║  Protocol: TCP/IP                                  ║
║  DHCP: Disabled                                    ║
║  Static IP: 192.168.1.100                          ║
║                                                    ║
║  Workgroup: WORKGROUP                              ║
║  Computer Name: HOMEPC-386                         ║
║                                                    ║
║  File Sharing: Enabled                             ║
║  Print Sharing: Enabled                            ║
║                                                    ║
║  [ESC] Return to main menu                         ║
╚════════════════════════════════════════════════════╝`
    } else if (currentScreen === 'terminal') {
      let content = `╔════════════════════════════════════════════════════╗
║                 COMMAND TERMINAL                   ║
╠════════════════════════════════════════════════════╣
║                                                    ║`
      
      // Add command history
      commandHistory.forEach(line => {
        content += `\n║ ${line.padEnd(50)} ║`
      })
      
      // Fill remaining lines
      const remainingLines = 6 - commandHistory.length
      for (let i = 0; i < remainingLines; i++) {
        content += `\n║${' '.repeat(52)}║`
      }
      
      // Add current command line
      const cursor = showCursor ? '_' : ' '
      const commandLine = `C:\\>${currentCommand}${cursor}`
      content += `\n║ ${commandLine.padEnd(50)} ║`
      content += `
║                                                    ║
║  Type 'help' for commands, 'exit' to return       ║
╚════════════════════════════════════════════════════╝`
      return content
    }
    return ''
  }
</script>

<T.Group position={[0, 1.4, 0.01]} rotation={[0, 0, 0]}>
  <!-- Screen background -->
  <T.Mesh>
    <T.PlaneGeometry args={[1.4, 1.0]} />
    <T.MeshBasicMaterial color="#000080" />
  </T.Mesh>
  
  <!-- Main content -->
  <Text
    fontSize={0.014}
    color="#ffffff"
    anchorX="50%"
    anchorY="50%"
    text={getScreenContent()}
    position={[0, 0, 0.001]}
    font="/fonts/Beef'd.ttf"
  />
</T.Group>