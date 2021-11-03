# Birthday API

A backend service (API) for a birthday app. 

Default User Docs (user/12345678), the documentation use swagger or access documentation with **File Postman** that include in the repository.

---
## Requirements

- Node.js
- Docker
- Redis
- Postgre

---

## Install

    $ git clone https://github.com/sulthonmb/birthday-app.git
    $ cd birthday-app
    $ npm install

## Configure app

Open `.env` then edit it with your settings. You will need:

- copy .env.example to .env;;
- configure variable;

## Running the project

For Development:

    $ docker-compose -f docker-compose.dev.yml up --build

For Production:
    
    $ docker-compose -f docker-compose.prod.yml up --build

## Documentation

Swagger Documentation:

- Open [your_base_url]/docs
- Auth with User and Pass that you configure on ENV, (Default: user/12345678)

Postman Documentation:

- Import file postman collection
