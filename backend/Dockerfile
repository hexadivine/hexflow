FROM kalilinux/kali-rolling

RUN apt update && apt -y install nmap ffuf nodejs npm
RUN apt install -y iputils-ping

COPY package*.json .
RUN npm install .

EXPOSE 8080
COPY . .

CMD [ "node", "./server.js" ]
