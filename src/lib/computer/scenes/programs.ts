import RetroBoot from './RetroBoot.svelte'
import RetroDesktop from './RetroDesktop.svelte'
import HomeNetworkOS from './HomeNetworkOS.svelte'
import Shutdown from './Shutdown.svelte'
import type { ComputerScene } from '../objects/types'

export const scenes: ComputerScene[] = [
  {
    id: 'boot',
    name: 'Boot',
    component: RetroBoot,
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
    component: RetroDesktop,
    description: 'Main desktop'
  },
  {
    id: 'network',
    name: 'Network Manager',
    component: HomeNetworkOS,
    description: 'Home network management system'
  },
  {
    id: 'running',
    name: 'Program',
    component: HomeNetworkOS,
    description: 'Sample program scene'
  },
  {
    id: 'game-over',
    name: 'Game Over',
    component: RetroBoot,
    description: 'Game over scene (placeholder)'
  },
  {
    id: 'level-complete',
    name: 'Level Complete',
    component: RetroBoot,
    description: 'Level complete scene (placeholder)'
  }
]