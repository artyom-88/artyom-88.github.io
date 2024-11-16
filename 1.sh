#!/bin/bash
VERSION_OUTPUT=$(pnpm exec playwright --version)
PLAYWRIGHT_VERSION=$(echo $VERSION_OUTPUT | grep -o '[0-9]\+\.[0-9]\+' | head -1)
echo "PLAYWRIGHT_VERSION=$PLAYWRIGHT_VERSION"