#!/usr/bin/env bash
# Sync shared skills and assets into Cursor and Claude plugin packages.
# Run from the plugins/one-horizon/ directory.

set -e

ROOT="$(dirname "$0")/.."
SHARED_SKILLS="$ROOT/shared/skills"
SHARED_ASSETS="$ROOT/shared/assets"

echo "Syncing shared skills..."

for pkg in cursor claude; do
  PKG_SKILLS="$ROOT/$pkg/skills"
  PKG_ASSETS="$ROOT/$pkg/assets"

  mkdir -p "$PKG_SKILLS" "$PKG_ASSETS"

  # Remove skills that no longer exist in shared
  for dir in "$PKG_SKILLS"/*/; do
    [ -d "$dir" ] || continue
    name=$(basename "$dir")
    if [ ! -d "$SHARED_SKILLS/$name" ]; then
      echo "  Removing deleted skill: $name"
      rm -rf "$dir"
    fi
  done

  # Copy/update skills from shared
  for dir in "$SHARED_SKILLS"/*/; do
    name=$(basename "$dir")
    mkdir -p "$PKG_SKILLS/$name"
    cp "$dir/SKILL.md" "$PKG_SKILLS/$name/SKILL.md"
    echo "  ✓ skills/$name → $pkg/skills/$name"
  done

  # Copy/update assets from shared
  for file in "$SHARED_ASSETS"/*; do
    [ -f "$file" ] || continue
    cp "$file" "$PKG_ASSETS/$(basename "$file")"
    echo "  ✓ assets/$(basename "$file") → $pkg/assets/$(basename "$file")"
  done
done

echo ""
echo "Done. Both packages are in sync with shared/."
