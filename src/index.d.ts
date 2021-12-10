import { Plugin } from 'esbuild';


export default function envPlugin (options?: PluginOptions): Plugin;

export interface PluginOptions {
	mode?: string;
	/** Inject shim that handles undefined environment variables */
	shim?: boolean;
	/** Filter which environment variables are injected */
	filter?: (key: string, filename: string | null) => boolean;
}
