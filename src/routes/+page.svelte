<script lang="ts">
  import { extend } from '@threlte/core'
  import { Canvas, T } from '@threlte/core'
  extend({ Canvas })

  import Scene from '$lib/computer/Scene.svelte'
</script>

<main class="relative h-screen w-screen bg-black flex items-center justify-center">
  <!-- 3D Computer Model -->
  <Canvas>
    <T.PerspectiveCamera position={[0, 15, 30]} fov={35} />
    <T.AmbientLight intensity={1.5} />
    <T.DirectionalLight position={[0, 10, 10]} intensity={2} />
    <T.PointLight position={[0, 10, 10]} intensity={1} />
    <Scene />
  </Canvas>
</main>
yes 
<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: #000;
    overflow: hidden;
  }
</style>

