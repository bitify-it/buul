FROM maven:3.8.2-jdk-11
MAINTAINER Automa <automa@bitify.it>

WORKDIR /fioraio-be
COPY . .
RUN mvn clean install -DskipTests
CMD mvn spring-boot:run

