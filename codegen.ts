import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	overwrite: true,
	schema: "https://arweave.net/graphql",
	documents: "src/**/*.{graphql,js,ts,jsx,tsx}",
	generates: {
		"src/generated/": {
			preset: "client",
			plugins: []
		}
	},
	watch: true
};

export default config;
