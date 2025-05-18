import { defineConfig, presetUno, presetAttributify } from 'unocss'
import extractorSvelte from '@unocss/extractor-svelte'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify()
  ],
  extractors: [
    extractorSvelte()
  ],
  rules: [
    ['animate-blink', {
      animation: 'blink 1s step-end infinite'
    }]
  ],
  shortcuts: {
    'btn': 'px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 text-[#39ff14] font-mono transition-colors duration-150'
  }
})