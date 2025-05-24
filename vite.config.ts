import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from '@unocss/svelte-scoped/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		UnoCSS(),
		sveltekit()
	],
	optimizeDeps: {
		exclude: [
			'@threlte/core',
			'@threlte/extras',
			'three',
			'three/examples/jsm/loaders/GLTFLoader.js',
			'three/examples/jsm/loaders/DRACOLoader.js',
			'three/examples/jsm/libs/meshopt_decoder.module.js',
			'three/examples/jsm/loaders/KTX2Loader.js',
			'three-viewport-gizmo',
			'three/examples/jsm/controls/OrbitControls.js',
			'three/examples/jsm/controls/TrackballControls.js',
			'three/examples/jsm/shaders/HorizontalBlurShader.js',
			'three/examples/jsm/shaders/VerticalBlurShader.js',
			'three/examples/jsm/loaders/HDRCubeTextureLoader.js',
			'three/examples/jsm/loaders/EXRLoader.js',
			'three/examples/jsm/loaders/RGBELoader.js',
			'three/examples/jsm/objects/GroundedSkybox.js',
			'three/examples/jsm/utils/BufferGeometryUtils.js',
			'three/examples/jsm/controls/TransformControls.js',
			'three/examples/jsm/objects/Sky.js',
			'three/examples/jsm/csm/CSM.js',
			'three-mesh-bvh',
			'three/examples/jsm/geometries/TextGeometry.js',
			'three/examples/jsm/loaders/FontLoader.js',
			'three/examples/jsm/effects/AsciiEffect.js',
			'troika-three-text',
			'@threejs-kit/instanced-sprite-mesh',
			'mitt'
		]
	},
	build: {
		commonjsOptions: {
			include: [/tweakpane/]
		},
		target: 'esnext'
	},
	test: {
		workspace: [
			{
				extends: './vite.config.ts',
				plugins: [svelteTesting()],
				test: {
					name: 'client',
					environment: 'jsdom',
					clearMocks: true,
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
