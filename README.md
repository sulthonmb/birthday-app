# Meal Delivery API

A backend service (API) for a food delivery app. 

[Demo App](https://itsavirus.sulthon.xyz/)

Default User Docs (user/12345678)

[Documentation App](https://itsavirus.sulthon.xyz/docs)

---
## Requirements

- Node.js
- Docker
- Redis
- Postgre
- Import file **Raw Data** in **Dataset** directory

---

## Install

    $ git clone https://github.com/sulthonmb/meal-delivery.git
    $ cd meal-delivery
    $ npm install

## Configure app

Open `.env` then edit it with your settings. You will need:

- copy .env.example to .env;;
- configure variable;

## Running the project

For Development:

    $ docker-compose -f docker-compose.dev.yml up -d

For Production:
    
    $ docker-compose -f docker-compose.prod.yml up -d

## Documentation

Swagger Documentation:

- Open [your_base_url]/docs
- Auth with User and Pass that you configure on ENV, (Default: user/12345678)

Postman Documentation:

    $ Import file postman collection
