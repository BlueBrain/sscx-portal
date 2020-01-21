FROM alpine:3.5

ARG plugins=http.git

RUN apk update && apk add caddy

WORKDIR /var/www/sscx-portal
COPY index.html /var/www/sscx-portal
COPY Caddyfile /etc/caddy/Caddyfile

ENTRYPOINT ["/usr/sbin/caddy"]
CMD ["--conf", "/etc/caddy/Caddyfile", "--log", "stdout"]
EXPOSE 8080