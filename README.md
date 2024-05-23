# Node.js & Next.js + Vue.js & Nuxt demo

This project is a full stack javascript/typescript demo, built using the following components:

Backend:
- Node.js
- Next.js
- PostgreSQL
- GraphQL

Frontend:
- Vue.js
- Nuxt
- Tailwind


## Project setup


### Backend


#### Installation

- Copy `.env.example` to `.env`
- Run `docker-compose up` to start the dev environment
- Run `npm install` to start the dev environment


#### Run the application

- Start the docker application to get the database up and running: `docker-compose up -d`
- Start the backend server: `npm run start:dev`

Migrations will be automatically executed at the startup.


#### Tests

Run the test using: `npm run test`


### Frontend


## Installation

- Copy `.env.example` to `.env`
- Run `npm install`


## Run the application

- Start the frontend server: `npm run dev`
- You can consume your application by navigating to http://localhost:3000
