import type { SvelteComponent } from 'svelte'

export interface ComputerScene {
  id: string
  name: string
  component: any
  description?: string
}
