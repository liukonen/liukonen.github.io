import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const isWatch = process.argv.includes('--watch');

const buildOptions = {
  entryPoints: ['src/index.tsx'],
  outdir: '..',
  bundle: true,
  minify: !isWatch,
  sourcemap: isWatch,
  target: ['es2020'],
  plugins: [sassPlugin()],
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  define: {
    'process.env.NODE_ENV': JSON.stringify(isWatch ? 'development' : 'production'),
  }
};

if (isWatch) {
  const ctx = await esbuild.context(buildOptions);
  await ctx.watch();
  console.log('✅ Watching for changes...');
} else {
  await esbuild.build(buildOptions);
  console.log('✅ Build complete.');
}
