# Builder stage
FROM node:12-alpine AS builder

ARG NEXUS_TOKEN
WORKDIR /tmp/sscx
COPY . /tmp/sscx
RUN yarn && yarn build

# Final stage
FROM alpine:3.5

ARG plugins=http.git
RUN apk update && apk add caddy
WORKDIR /var/www/sscx-portal
COPY --from=builder /tmp/sscx/dist/ /var/www/sscx-portal
COPY Caddyfile /etc/caddy/Caddyfile
ENTRYPOINT ["/usr/sbin/caddy"]
CMD ["--conf", "/etc/caddy/Caddyfile", "--log", "stdout"]
EXPOSE 8080