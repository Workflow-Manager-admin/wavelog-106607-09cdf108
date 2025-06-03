#!/bin/bash
cd /home/kavia/workspace/code-generation/wavelog-106607-09cdf108/wave_log
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

