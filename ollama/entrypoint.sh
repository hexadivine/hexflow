#!/bin/bash

ollama serve &

until curl http://localhost:11434 > /dev/null; do
    echo 'Waiting for ollama server to start...'
    sleep 1
done

ollama pull deepseek-r1

sleep infinity