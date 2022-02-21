
# New Bubbl(e) APIs

## Instructions

    To use the new API backend, import the 'endpoint' variable from the 'endpoint.ts' file into the component(s) your are developing.

    When relying on the 'POST' or login route use the 'azureEndpoint'.

## API routes

### Profile ingestion

- **POST** /profile.json  --use azureEndpoint
- **GET** /profile/{pid}.json
- **GET** /profile/{pid}/following.json
- **GET** /profile/{pid}/followers.json
- **PATCH** /profile/{pid}/following.json
- **PATCH** /profile/{pid}/followers.json


### Post ingestion

- **POST** /post.json --use azureEndpoint
- **GET** /post.json


### Comment ingestion

- **POST** /{psid}/comment.json --use azureEndpoint
- **GET** /{psid}.json

### Login
- **PATCH** /login --use azureEndpoint