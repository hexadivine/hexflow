FROM ollama/ollama

RUN apt-get update && apt-get install -y curl

WORKDIR /app
COPY . .
EXPOSE 11434

ENTRYPOINT [ "./entrypoint.sh" ]