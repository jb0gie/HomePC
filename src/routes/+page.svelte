<script lang="ts">
    import { Canvas, extend } from '@threlte/core'
    import { useProgress } from '@threlte/extras'
    import { World } from '@threlte/rapier'
    import { CustGridHelper } from '../lib/cpu/objects/CustGridHelper'
    import {  } from ''

    import Scene from './Scene.svelte'
    import { WebGLRenderer } from 'three'
    const { progress, finishedOnce } = useProgress()
    $effect(() => {
      game.sound.handleMuted(game.muted)
    })
    extend({
      CustGridHelper
    })
</script>

