<script lang="ts">
  import { onMount } from 'svelte'
  import { Canvas, T } from '@threlte/core'
  import Scene from '$lib/computer/Scene.svelte'
  import { PerspectiveCamera } from 'three'

  let cameraRef: PerspectiveCamera | undefined
  let animationFrameId: number

  // Max angles (radians)
  const maxYaw = 0.18 // left/right
  const maxPitch = 0.09 // up/down

  // Target and current rotation
  let targetYaw = 0
  let targetPitch = 0
  let currentYaw = 0
  let currentPitch = 0

  const target = { x: 0, y: 1.5, z: 5 } // screen center

  function handleMouseMove(event: MouseEvent) {
    const { innerWidth, innerHeight } = window
    const x = (event.clientX / innerWidth - 0.5) * 2 // -1 to 1
    const y = (event.clientY / innerHeight - 0.5) * 2 // -1 to 1
    targetYaw = -x * maxYaw
    targetPitch = -y * maxPitch
  }

  function animateCamera() {
    const ease = 0.08
    currentYaw += (targetYaw - currentYaw) * ease
    currentPitch += (targetPitch - currentPitch) * ease

    // Spherical coordinates
    const radius = 3.2 // distance from screen
    const phi = Math.PI / 2 + currentPitch // vertical
    const theta = Math.PI / 2 - currentYaw // horizontal (note: minus for correct direction)

    if (cameraRef) {
      cameraRef.position.x = target.x + radius * Math.sin(phi) * Math.cos(theta)
      cameraRef.position.y = target.y + radius * Math.cos(phi)
      cameraRef.position.z = target.z + radius * Math.sin(phi) * Math.sin(theta)
      cameraRef.lookAt(target.x, target.y, target.z)
    }
    animationFrameId = requestAnimationFrame(animateCamera)
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove)
    animateCamera()
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  })
</script>

<main class="relative h-screen w-screen bg-black flex items-center justify-center">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[0, 1.7, 3.2]}
      fov={35}
      bind:ref={cameraRef}
    />
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

