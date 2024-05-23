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
![01](https://github.com/enricobono/WeTrail/assets/2254482/04237b49-f139-4429-b44d-e395a62e10c6)

Travel detail page:
![02](https://github.com/enricobono/WeTrail/assets/2254482/2f4f0118-2f81-4d2d-ae3e-05a897fac8b9)

Checkout page:
![03](https://github.com/enricobono/WeTrail/assets/2254482/5fd148b1-02a2-412b-88f8-17b77cdbf3ca)

Checkout page with payment details:
![04](https://github.com/enricobono/WeTrail/assets/2254482/bd850ee9-9e20-44d8-ad06-afb59e7042db)

Payment confirmation page:
![05](https://github.com/enricobono/WeTrail/assets/2254482/56ab3001-5e89-4e17-9981-26288d0bdeb6)

