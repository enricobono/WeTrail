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


#### Installation

- Copy `.env.example` to `.env`
- Run `npm install`


#### Run the application

- Start the frontend server: `npm run dev`
- You can consume your application by navigating to http://localhost:3000


## Screenshots

Travels list page:
![01](https://github.com/enricobono/WeTrail/assets/2254482/1654d60f-79f5-4263-a410-0cf0fd4a2f98)

Travel detail page:
![02](https://github.com/enricobono/WeTrail/assets/2254482/6f41bb17-7c2e-4603-8995-b0b9c010921a)

Checkout page:
![03](https://github.com/enricobono/WeTrail/assets/2254482/b892bf2c-e675-48db-9464-95f5598ebc41)

Checkout page with payment details:
![04](https://github.com/enricobono/WeTrail/assets/2254482/ea4b7e14-250c-41b3-a570-8d1cf7240e91)

Payment confirmation page:
![05](https://github.com/enricobono/WeTrail/assets/2254482/e7519c0d-c67a-4fb0-b76b-a839c2442abe)

