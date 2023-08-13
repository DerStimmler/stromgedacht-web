import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		esbuildOptions: {
			plugins: [esbuildCommonjs(['ts-stromgedacht'])]
		}
	}
});
