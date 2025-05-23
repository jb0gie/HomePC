import { writable } from 'svelte/store'

export type ComputerState = 'off' | 'menu' | 'running' | 'game-over' | 'level-complete'

export const computer = writable({
  state: 'off' as ComputerState,
  score: 0,
  levelIndex: 0,
  baseColor: '#fff',
  arcadeMachineScene: null as unknown | null
}) 