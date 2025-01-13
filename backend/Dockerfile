
FROM maven:3.9.9-amazoncorretto-21-alpine AS DEPENDENCIES
WORKDIR /opt/app
COPY billingCore/pom.xml billingCore/pom.xml
COPY pom.xml .
RUN mvn -B -e org.apache.maven.plugins:maven-dependency-plugin:3.8.1:go-offline

# Build stage
FROM maven:3.9.9-amazoncorretto-21-alpine AS BUILDER
WORKDIR /opt/app
COPY --from=DEPENDENCIES /root/.m2 /root/.m2
COPY --from=DEPENDENCIES /opt/app/ /opt/app
COPY billingCore/src /opt/app/billingCore/src
RUN mvn -B -e clean package -DskipTests

FROM openjdk:21-slim
ARG PROFILE=dev
ARG APP_VERSION=1.0.0
WORKDIR /opt/app
COPY --from=BUILDER /opt/app/billingCore/target/*.jar /opt/app/
EXPOSE 8080

ENV DB_URL=jdbc:postgresql://postgresql-billing-system:5432/billing-system-db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOST=missing_host_name
ENV EMAIL_USER=missing_user_name
ENV EMAIL_PASSWORD=missing_password

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  billingCore-${JAR_VERSION}.jar