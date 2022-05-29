#!/bin/sh
echo "Linting Cloud Functions..."
yarn lint
echo "Building Cloud Functions..."
tsc