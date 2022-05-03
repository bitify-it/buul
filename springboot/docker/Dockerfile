FROM amazoncorretto:11.0.12-alpine3.14
VOLUME /tmp
EXPOSE 8080
ADD fioraio-0.0.1-SNAPSHOT-docker.jar fioraio.jar
ENTRYPOINT ["java","-jar","fioraio.jar"]
