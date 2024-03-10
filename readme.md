# Document Db speedcheck

A simplified TypeScript solution that can serve as a proof-of-concept for document-db interaction and access speed measurement.
Following routes are exposed by the web server

```bash
# fetch a document
GET {{api}}/project-settings/1234

# insert big chunks of a data in a document db collection
POST {{api}}/project-settings/insertBulk

# update a document
PUT {{api}}/project-settings/1234
```

k6 tests can be run to load test retrieval of documents by multiple users, synchronously or in parallel

```bash
npm run k6:linear
npm run k6:parallel

```

Note:

- It is a prerequisite that a mongo-db connection can be made to configured endpoint in [.env](.env) file
- In case there are no documents for testing, fill mock data by using `/insertBulk` route
- Testing requests can be checked in the [req.rest](req.rest) file

## How to set-up local run

```bash
# 1. create a .env file. example content:
PORT=4000

DB_CONNECTION_POOL_SIZE=5 # Number of shared connections to the db
DB_CONNECTION_URI=mongodb://localhost:27017
DB_DATABASE_NAME=test

K6_VU_COUNT=1
K6_ENDPOINT=http://localhost:4000/api

# 2. install dependencies
npm i

# 3. start web-server and open database connection
npm start
```
