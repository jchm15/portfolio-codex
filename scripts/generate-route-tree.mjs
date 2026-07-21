import { Generator, getConfig } from '@tanstack/router-generator';

const config = getConfig({
  routesDirectory: './src/routes',
  generatedRouteTree: './src/routeTree.gen.ts',
  autoCodeSplitting: true,
  routeTreeFileHeader: ['/* eslint-disable */', '// noinspection JSUnusedGlobalSymbols'],
  routeTreeFileFooter: ['export {}'],
});

const generator = new Generator({
  config,
  root: process.cwd(),
});

await generator.run();
