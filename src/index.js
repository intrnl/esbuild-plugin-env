import * as url from 'url';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as esbuild from 'esbuild';
import escalade from 'escalade';

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const injectScript = path.join(__dirname, './inject.js');

/**
 * @returns {esbuild.Plugin}
 */
export default function envPlugin (options = {}) {
	const {
		mode = process.env.NODE_ENV ?? 'development',
		shim = true,
	} = options;

	const envFiles = [
		`.env.${mode}.local`,
		`.env.${mode}`,
		`.env.local`,
		`.env`,
	];

	return {
		name: '@intrnl/esbuild-plugin-env',
		async setup (build) {
			const define = build.initialOptions.define = { ...build.initialOptions.define };

			// Catch-all for undefined variables
			if (shim) {
				const inject = build.initialOptions.inject = [...build.initialOptions.inject || []];

				inject.push(injectScript);
			}

			// Grab from process env
			for (const key in process.env) {
				const value = process.env[key];
				define[`process.env.${key}`] ??= JSON.stringify(value);
			}

			// Grab from dotfiles
			for (const file of envFiles) {
				const filename = await escalade('.', (_, names) => {
					return names.includes(file) && file;
				});

				if (!filename) {
					continue;
				}

				const source = await fs.readFile(filename, 'utf-8');
				const parsed = dotenv.parse(source);

				dotenvExpand({ parsed, ignoreProcessEnv: true });

				for (const key in parsed) {
					const value = parsed[key];
					define[`process.env.${key}`] ??= JSON.stringify(value);
				}
			}
		},
	};
}
