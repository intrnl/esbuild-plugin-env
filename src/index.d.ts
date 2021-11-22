import { Plugin } from 'esbuild';


export default function envPlugin (options?: PluginOptions): Plugin;

export interface PluginOptions {
	mode?: string;
	/** Inject shim that handles undefined environment variables */
	shim?: boolean;
}
