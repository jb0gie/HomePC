import { writable } from 'svelte/store'

export type ComputerState = 'off' | 'boot' | 'menu' | 'network' | 'running' | 'game-over' | 'level-complete'

export const computer = writable({
  state: 'boot' as ComputerState,
  score: 0,
  levelIndex: 0,
  baseColor: '#fff',
  computerScene: null as unknown | null
})