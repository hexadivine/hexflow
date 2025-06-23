#!/bin/bash
echo "[+] Finding hostname for $1"
location=$(curl -sI http://$1 | grep -i '^Location:' | awk '{print $2}' | tr -d '\r')

if [ -n "$location" ]; then
    domain=$(echo "$location" | awk -F/ '{print $3}')

    if ! grep -q "$domain" /etc/hosts; then
        echo "[+] Adding $domain to /etc/hosts..."
        echo "$1 $domain" | tee -a /etc/hosts > /dev/null
        echo "[+] Using $domain host onwards"
        echo "[!] $domain"
    else
        echo "[+] $domain already exists in /etc/hosts."
        echo "[!] $domain"
    fi
else
    echo "[+] Location header not found."
fi