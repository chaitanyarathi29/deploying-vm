FROM oven/bun:1

WORKDIR /usr/src/app

COPY . .

RUN bun install
RUN bun run db:migrate

EXPOSE 8081

CMD ["bun", "run", "start:ws"]