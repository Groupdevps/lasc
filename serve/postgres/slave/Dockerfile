FROM postgres:9.6-alpine
ENV GOSU_VERSION 1.10
RUN apk add --update iputils
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["postgres", "postgres"]
