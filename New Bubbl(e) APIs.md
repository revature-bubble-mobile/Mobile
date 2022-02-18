
# New Bubbl(e) APIs

## Instructions

    To use the new API backend, import the 'endpoint' variable from the 'endpoint.ts' file into the component(s) your are developing.


## API routes

### Profile ingestion

- **POST** /profile.json
- **GET** /profile/{pid}.json
- **GET** /profile/{pid}/following.json
- **GET** /profile/{pid}/followers.json
- **PATCH** /profile/{pid}/following.json
- **PATCH** /profile/{pid}/followers.json


### Post ingestion

- **POST** /post.json
- **GET** /post.json


### Comment ingestion

- **POST** /{psid}/comment.json
- **GET** /{psid}.json