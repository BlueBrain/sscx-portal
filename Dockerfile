FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/
COPY data/ /usr/share/nginx/html/data/

EXPOSE 8000