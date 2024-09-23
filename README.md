## Purpose
**In short:** Overwatch is a security and telemetry monitoring system that facilitates the management of users and devices with features like JWT-based authentication, access control, and real-time telemetry via MQTT.

## Project Overview
Overwatch is a lightweight applicaiton that provides real-time monitoring of various sensors and generates alerts based on pre-configured rules. 
The system is built on using Typescript on the NestJS framework (which itself models itself a great deal after Angular)
It includes features for both backend services and frontend interfaces and injests MQTT data.
Was created as part of a security keypad authentication system originally and morphed into a more broad MQTT injestion and logging platform at which point it was also used it to
log various sensor data from rasberry pi devices such as temp/humidity/wind sensors.
Note An intercom component was started but NOT FINISHED! Ditto for the Frontend poriton. 
This project works as is, but can be considered in the Alpha stage. Essentially abandoned for the time being unless someone wants to collaborate on finishing this up with me.

## Core Features:
Authentication: Users authenticate via email/password, and devices via unique pins, with JWT tokens for session security.
User/Device Management: Supports registration, authentication, and entry/egress tracking aka access control of users and devices. Pin code based devices are meant be integrated with this.
Telemetry Monitoring: Monitors device events and state changes in real-time using MQTT, triggering necessary actions.
Security: Ensures secure communication via Bearer tokens and logs all unauthorized attempts.
API Documentation: Uses Swagger for generating comprehensive API docs.
Database: Built with TypeORM to manage entities like users and devices in a PostgreSQL database, with support for migrations.
This system is ideal for organizations needing secure user and device management, with support for real-time telemetry and robust security features.

## Infastructure
Uses docker via docker-compose, NestJS, swagger, TypeORM, PostgreSQL, MQTT.

## Details
Authentication Strategies:
  JwtStrategy: Implements JSON Web Token (JWT) based authentication for users. It validates JWTs from the Authorization header, ensuring they are not expired and correspond to a valid user in the system.
  PinStrategy: Handles authentication for devices using a PIN code. It verifies PINs and checks if the associated device is registered.

Authentication Service (AuthService):
    Token Generation: Creates JWTs for both users and devices, granting them access to the system.
    Credential Validation: Verifies user login credentials (email and password) against stored user data.
    PIN Validation: Checks if a provided PIN matches any registered user's PIN.
    Context Management: Sets and retrieves authorized user and device information from the application's context, likely for use in other parts of the system.

Authentication Controller (AuthController):
    User Login: Handles user login requests, validates credentials, and returns a JWT for successful logins.
    PIN Access: Processes requests for device access using a PIN, validating the PIN and returning the associated user information.
    User Registration: Allows new users to register in the system.
    Device Registration: Enables the registration of new devices.
    Current User Retrieval: Provides a protected endpoint to get information about the currently logged-in user.

Data Transfer Objects (DTOs):
    Define the structure of data exchanged between different parts of the system, such as login payloads, PIN payloads, and user/device information.

S3 integration hasn't been tested.
