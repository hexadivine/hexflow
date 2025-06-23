FROM kalilinux/kali-rolling

RUN apt update && apt install -y iputils-ping nodejs npm wordlists nmap ffuf dirb
RUN apt install -y curl seclists
# RUN apt update && apt install -y iputils-ping nodejs npm kali-linux-default

COPY package*.json .
RUN npm install .

EXPOSE 8080
COPY . .

CMD [ "node", "./server.js" ]
