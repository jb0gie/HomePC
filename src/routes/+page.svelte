<script lang="ts">
  import { extend } from '@threlte/core'
  import { Canvas, T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  extend({ Canvas, OrbitControls })

  import Scene from '$lib/computer/Scene.svelte'
</script>

<main class="relative h-screen w-screen bg-black flex items-center justify-center">
  <!-- 3D Computer Model -->
  <Canvas>
    <T.PerspectiveCamera position={[0, 2, 5]} fov={50} makeDefault>
      <OrbitControls target={[0, 1.5, 0]} enableDamping />
    </T.PerspectiveCamera>
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

