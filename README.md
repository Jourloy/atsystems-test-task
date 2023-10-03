# atsystems-test-task

## Description

Need to create service for login and getting balance.

I usually use **Nest.JS** for backend, so my code may looks little bit crazy :)

I tried make architecture like in **Nest.JS** because it more simple for me

I used **puppeteer** for login ang getting auth and **axios** for get profile data.

## How to use

-   `/auth` - send **login** and **password** in body. Puppeeter login on website and collect auth token.
-   `/balance` - send **login** as query (`?login=`). Axios make request and return balance. Auth token will be taken from Redis.
-   `/balance/auth` - send **login** and **auth** as query (`?login=&auth=`). This endpoint used if you know auth token, because somethimes auth via puppeter in not work.

## Getting started

### Install

```bash
$ bun install
```

### ENV

You must create `.env` file. Look into `.env.sample` for more info.

### Run

#### Docker compose

```bash
$ docker-compose up -d
```
