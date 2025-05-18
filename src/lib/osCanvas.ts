import { writable } from 'svelte/store'
export const osCanvas = writable<HTMLCanvasElement | null>(null) 