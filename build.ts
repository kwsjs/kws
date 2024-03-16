import { existsSync, rmSync } from 'fs'
import pkg from './package.json'

// Generating types
const typesDir = './types'
if (existsSync(typesDir)) rmSync(typesDir, { recursive: true })

Bun.spawn(['bun', 'x', 'tsc'], {
  stdout: 'inherit',
  stderr: 'inherit',
})

const distDir = './dist'
if (existsSync(distDir)) rmSync(distDir, { recursive: true })

Bun.build({
  format: 'esm',
  target: 'node',
  outdir: distDir,
  minify: true,
  entrypoints: ['./src/index.ts'],
  external: Object.keys(pkg.dependencies),
})
