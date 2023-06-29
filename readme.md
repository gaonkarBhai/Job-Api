# JOB-API

## Installation and Run locally
```bash
  git clone https://github.com/gaonkarBhai/Job-Api.git
  cd Job-Api
```
Run with npm
```bash
  npm i
  npm start
```

## API Endpoints

API endpoints related to user authentication.

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| POST   | /auth/register | Register a new user  |
| POST   | /auth/login    | Log in with user     |

### Register

Create a new user account.

- Method: POST
- Endpoint: `/auth/register`

#### Request Body

The request body should be a JSON object with the following properties:

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| name     | string | User's name          |
| email    | string | User's email address |
| password | string | User's password      |



### Login

Log in with user credentials.

- Method: POST
- Endpoint: `/auth/login`

#### Request Body

The request body should be a JSON object with the following properties:

| Field    | Type   | Description          |
| -------- | ------ | -------------------- |
| email    | string | User's email address |
| password | string | User's password      |




### For JOB


| Endpoint           | Method | Description                       |
|--------------------|--------|-----------------------------------|
| `/job/:id`         | GET    | Get a specific job by ID          |
| `/job`             | GET    | Get all jobs                      |
| `/job`             | POST   | Create a new job                  |
| `/job/:id`         | PATCH  | Update a job by ID                |
| `/job/:id`         | DELETE | Delete a job by ID                |
