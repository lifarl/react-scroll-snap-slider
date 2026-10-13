const { cpSync, existsSync, mkdtempSync, rmSync } = require('fs')
const { tmpdir } = require('os')
const { join, resolve } = require('path')
const { execFileSync } = require('child_process')

const dist = resolve('dist')

if (!existsSync(dist)) {
  throw new Error('dist does not exist; run yarn build:pages first')
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), 'scroll-snap-pages-'))
const site = join(temporaryDirectory, 'site')

const git = (...args) =>
  execFileSync('git', args, {
    cwd: site,
    stdio: 'inherit',
  })

try {
  cpSync(dist, site, { recursive: true })
  git('init')
  git('checkout', '-b', 'gh-pages')
  git('config', 'user.name', 'react-scroll-snap-slider deploy')
  git('config', 'user.email', 'deploy@users.noreply.github.com')
  git('add', '.')
  git('commit', '-m', 'Deploy GitHub Pages')

  const origin = execFileSync('git', ['remote', 'get-url', 'origin'], {
    encoding: 'utf8',
  }).trim()

  git('remote', 'add', 'origin', origin)
  git('push', '--force', 'origin', 'HEAD:gh-pages')
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true })
}
