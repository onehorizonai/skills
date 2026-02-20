#!/usr/bin/env node
/**
 * Validate that both Cursor and Claude plugin packages are complete and in sync.
 */

import { readdirSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

let errors = 0

function fail(msg) {
  console.error(`  ✗ ${msg}`)
  errors++
}

function pass(msg) {
  console.log(`  ✓ ${msg}`)
}

function check(condition, passMsg, failMsg) {
  condition ? pass(passMsg) : fail(failMsg)
}

function parseFrontmatter(filePath) {
  const content = readFileSync(filePath, 'utf8')
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const result = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim()
    if (key) result[key] = value
  }
  return result
}

// ── Shared skills ────────────────────────────────────────────────────────────
console.log('\nChecking shared skills...')
const sharedSkillsDir = join(root, 'shared', 'skills')
const sharedSkills = readdirSync(sharedSkillsDir).filter(
  f => !f.startsWith('.')
)

for (const skill of sharedSkills) {
  const skillMd = join(sharedSkillsDir, skill, 'SKILL.md')
  if (!existsSync(skillMd)) {
    fail(`shared/${skill}/SKILL.md is missing`)
    continue
  }
  pass(`shared/${skill}/SKILL.md exists`)
  const fm = parseFrontmatter(skillMd)
  check(fm.name === skill, `shared/${skill}: name matches folder`, `shared/${skill}: name "${fm.name}" does not match folder "${skill}"`)
  check(!!fm.description, `shared/${skill}: description present`, `shared/${skill}: description is missing`)
}

// ── Package checks ───────────────────────────────────────────────────────────
const packages = [
  { name: 'Cursor', dir: join(root, 'cursor'), manifest: '.cursor-plugin/plugin.json' },
  { name: 'Claude', dir: join(root, 'claude'), manifest: '.claude-plugin/plugin.json' },
]

for (const pkg of packages) {
  console.log(`\nChecking ${pkg.name} package...`)

  // Manifest
  const manifestPath = join(pkg.dir, pkg.manifest)
  if (!existsSync(manifestPath)) {
    fail(`${pkg.manifest} is missing`)
    continue
  }
  pass(`${pkg.manifest} exists`)

  // Validate manifest fields
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  check(!!manifest.name, 'manifest: name present', 'manifest: name is missing')
  check(!!manifest.description, 'manifest: description present', 'manifest: description is missing')
  check(!!manifest.keywords?.length, 'manifest: keywords present', 'manifest: keywords missing (helps discoverability)')
  if (manifest.author?.url) fail('manifest: author.url is not a valid field (use email or top-level homepage)')
  if (manifest.icon) fail('manifest: "icon" is not a valid field (not in plugin spec)')

  // MCP config
  const mcpPath = join(pkg.dir, '.mcp.json')
  check(existsSync(mcpPath), `.mcp.json exists`, `.mcp.json is missing`)

  // Skills parity
  const pkgSkillsDir = join(pkg.dir, 'skills')
  if (!existsSync(pkgSkillsDir)) {
    fail(`skills/ directory is missing`)
    continue
  }

  const pkgSkills = readdirSync(pkgSkillsDir).filter(f => !f.startsWith('.'))

  const missingInPkg = sharedSkills.filter(s => !pkgSkills.includes(s))
  const extraInPkg = pkgSkills.filter(s => !sharedSkills.includes(s))

  if (missingInPkg.length === 0) {
    pass(`All ${sharedSkills.length} shared skills are present`)
  } else {
    for (const s of missingInPkg) fail(`Missing skill: ${s}`)
  }

  if (extraInPkg.length > 0) {
    for (const s of extraInPkg) fail(`Extra skill not in shared: ${s} (run sync-skills.sh)`)
  }

  // Each skill has SKILL.md with valid frontmatter
  for (const skill of pkgSkills) {
    const skillMd = join(pkgSkillsDir, skill, 'SKILL.md')
    if (!existsSync(skillMd)) {
      fail(`skills/${skill}/SKILL.md is missing`)
      continue
    }
    pass(`skills/${skill}/SKILL.md exists`)
    const fm = parseFrontmatter(skillMd)
    check(fm.name === skill, `skills/${skill}: name matches folder`, `skills/${skill}: name "${fm.name}" does not match folder "${skill}"`)
    check(!!fm.description, `skills/${skill}: description present`, `skills/${skill}: description is missing`)
  }
}

// ── Result ───────────────────────────────────────────────────────────────────
console.log('')
if (errors === 0) {
  console.log('✓ All checks passed.')
} else {
  console.error(`✗ ${errors} check(s) failed. Run scripts/sync-skills.sh to fix parity issues.`)
  process.exit(1)
}
