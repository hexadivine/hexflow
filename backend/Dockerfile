FROM kalilinux/kali-rolling

RUN apt update && apt install -y kali-linux-default
RUN apt install -y curl seclists iputils-ping nodejs npm 
RUN cd /opt \
    && git clone https://github.com/arthaud/git-dumper.git \
    && cd git-dumper \
    && pip3 install . --break-system-packages

COPY package*.json .
RUN npm install .

EXPOSE 8080
COPY . .

CMD [ "node", "./server.js" ]
