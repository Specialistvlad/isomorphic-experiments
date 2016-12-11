FROM nginx:1.11
RUN rm /etc/nginx/conf.d/default.conf
RUN mkdir /app
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

WORKDIR /app
COPY package.json /app
RUN npm i

COPY frontend /app/frontend
RUN cd frontend/admin && ../../node_modules/.bin/webpack
COPY frontend/admin/static/* /app/frontend/admin/build

COPY etc/nginx/nginx.conf /etc/nginx/nginx.conf
COPY etc/nginx/admin-api.conf /etc/nginx/sites-enabled/admin-api.conf

CMD nginx -g 'daemon off;'
