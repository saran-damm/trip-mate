#!/bin/bash

# Start Firebase emulators
echo "Starting Firebase emulators..."
firebase emulators:start --only firestore,storage,auth

# This script will block until the emulators are stopped with Ctrl+C
