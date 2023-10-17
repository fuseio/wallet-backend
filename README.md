# Wallet Backend

This document provides a comprehensive guide on the Wallet backend, a white-label backend built on top of the Fuse APIs. It outlines the architecture, prerequisites, and steps to integrate Firebase into your application.

## Architecture

The backend is built on the Nest.js framework and utilizes a microservices architecture. The services communicate with each other through TCP. This architecture allows for high scalability and maintainability, making it suitable for large-scale applications.

The backend consists of four services:

- **API service**: This service exposes RESTful APIs for communication with other services.
- **Auth service**: This service is responsible for user authentication using Firebase authentication.
- **Notification service**: This service handles user subscription to the Fuse notification API and dispatches push notifications to subscribers via Firebase Cloud Messaging (FCM).
- **User service**: Handles CRUD operations related to user data.

## **Prerequisites**

Before you start, ensure you have the following prerequisites set up:

**Fuse Developers platform**

- Create a project in [Fuse developers platform](https://developers.fuse.io/).

**Firebase:**

- Create a [Firebase project](https://console.firebase.google.com/).
- Enable authentication in the project.
- Once authentication is enabled, enable the Phone provider under "Sign-in providers."
- Generate a service account by going to your project's settings, navigating to the "Service accounts" tab, and clicking "Generate private key." This will download a JSON file that we'll need later, so keep it in a safe place.

**Setting up the environment file**

To start, create a copy of the `.env.example` file and name it `.env` by running the command `cp .example.env .env`.

Set `JWT_SECRET` - A random string private key. 

Each service has its own `.env` file. So, whenever you want to add a new environment variable, you should add it into the corresponding `.env` file.
To keep things simple, you can add your new variable into the `.env` in the root
and use the command below to sync all `.env` files.

```
cp .env apps/api-gateway-service/.env && cp .env apps/auth-service/.env && cp .env apps/notification-service/.env && cp .env apps/user-service/.env
```

>**Never reveal that to the public or inject inside the JWT token.**

Next, we need to add our Firebase project values, which can be found in the previously downloaded JSON file.

`FIREBASE_PROJECT_ID` should be set to the value of `project_id`.

`FIREBASE_PRIVATE_KEY` should be set to the value of `private_key`.

`FIREBASE_CLIENT_EMAIL` should be set to the value of `client_email`.

You can find `FUSE_SECRET_KEY` and `FUSE_PUBLIC_API_KEY` in your project on the Fuse developers platform.

To create a webhook for the Fuse project you have created, follow these steps:

1. Learn more about webhooks by checking out [this guide](https://docs.fuse.io/docs/notification-api/notifications-api#what-are-webhooks).
2. Go to our [API references](https://docs.fuse.io/docs/notification-api/create-webhook) and make an API call to create a webhook.
3. Provide the project's `apiKey`, `API-SECRET`, and your `projectId` in the Fuse developers platform (which can be found in the URL of the project after `projects/`).
4. Lastly, provide the `webhookUrl`. Which will receive the incoming webhook: http://localhost:3000/api/notifications/webhooks/token-transfers.

Make sure to set `FUSE_WEBHOOK_ID` to the value of `_id` that you receive after creating the webhook.

## Installation and Running the Project

To install and run the project, follow these steps:

1. Clone the repository: `git clone https://github.com/fuseio/wallet_backend.git`
2. Navigate to the project directory: `cd wallet_backend`
3. Install the dependencies: `npm install`
4. Run the project: `npm start`
5. Run with docker:

```bash
# development in watch mode
$ yarn docker:debug

# production WIP
$ yarn docker:staging
```

## Testing the endpoints
To test the endpoints, you can import [this](docs/postman/Fuse%20Wallet%20Backend.postman_collection.json) Postman collection.

## License

This project is licensed under the [MIT License](LICENSE).
