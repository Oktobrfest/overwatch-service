## Purpose
**In short:** Overwatch is a security and telemetry system that facilitates the management of users and devices with features like JWT-based authentication, access control, and real-time telemetry via MQTT.

## Project Overview
Overwatch is a security and telemetry monitoring and alert system. It provides real-time monitoring of various sensors and generates alerts based on pre-configured rules. 
The system is built on using Typescript on the NestJS framework (which itself models itself a great deal after Angular)
It includes features for both backend services and frontend interfaces and injests MQTT data.
Was created as part of a security keypad authentication system originally and morphed into a more broad MQTT injestion and logging platform at which point it was also used it to
log various sensor data from rasberry pi devices such as temp/humidity/wind sensors.
Note An intercom component was started but NOT FINISHED!

## Core Features:
Authentication: Users authenticate via email/password, and devices via unique pins, with JWT tokens for session security.
User/Device Management: Supports registration, authentication, and real-time tracking of users and devices.
Telemetry Monitoring: Monitors device events and state changes in real-time using MQTT, triggering necessary actions.
Security: Ensures secure communication via Bearer tokens and logs all unauthorized attempts.
API Documentation: Uses Swagger for generating comprehensive API docs.
Database: Built with TypeORM to manage entities like users and devices in a PostgreSQL database, with support for migrations.
This system is ideal for organizations needing secure user and device management, with support for real-time telemetry and robust security features.

## Infastructure
Uses docker via docker-compose, NestJS, swagger, TypeORM, PostgreSQL, MQTT.
