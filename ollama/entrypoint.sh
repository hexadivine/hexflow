#!/bin/bash

ollama serve &

until curl http://localhost:11434 > /dev/null; do
    echo 'Waiting for ollama server to start...'
    sleep 1
done

ollama run qwen3:0.6b

sleep infinity