FROM node:16-alpine
RUN curl -L https://pnpm.js.org/pnpm.js | node - add --global pnpm@7
RUN pnpm install
RUN pnpm -F nuxt-ripple-cli build
RUN pnpm install ./packages/nuxt-ripple-cli --global
RUN pnpm -F nuxt-app run build
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["pnpm", "run", "start:mock"]
