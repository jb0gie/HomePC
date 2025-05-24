import Boot from './Boot.svelte'
import Desktop from './Desktop.svelte'
import Program from './Program.svelte'
import Shutdown from './Shutdown.svelte'
import type { ComputerScene } from '../objects/types'

export const scenes: ComputerScene[] = [
  {
    id: 'boot',
    name: 'Boot',
    component: Boot,
    description: 'Boot sequence'
  },
  {
    id: 'off',
    name: 'Shutdown',
    component: Shutdown,
    description: 'Shutdown scene'
  },
  {
    id: 'menu',
    name: 'Desktop',
    component: Desktop,
    description: 'Main desktop'
  },
  {
    id: 'running',
    name: 'Program',
    component: Program,
    description: 'Sample program scene'
  },
  {
    id: 'game-over',
    name: 'Game Over',
    component: Boot,
    description: 'Game over scene (placeholder)'
  },
  {
    id: 'level-complete',
    name: 'Level Complete',
    component: Boot,
    description: 'Level complete scene (placeholder)'
  }
]
