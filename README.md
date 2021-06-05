# Meal Delivery API

A backend service (API) for a food delivery app. 

[Demo App](https://itsavirus.sulthon.xyz/)

If cannot access the url, for alternative use http://103.41.204.112:3111/ as Base URL but you cannot access Swagger Docs, so for the documentation use Postman.

Default User Docs (user/12345678), the documentation use swagger, **note: sometimes need some page refresh** 

[Documentation App](https://itsavirus.sulthon.xyz/docs)

Or access documentation with **File Postman** that include in the repository.

---
## Requirements

- Node.js
- Docker
- Redis
- Postgre
- Import file **Raw Data** in **Dataset** directory, Raw Data will seed automatically with Sequelize ORM.

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
