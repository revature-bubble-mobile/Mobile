
# New Bubbl(e) APIs

## Instructions

    Import the 'firebaseEndpoint' variable (a default export) from the 'endpoints.ts' file into the component(s) needing to make any 'GET' and 'PATCH' requests (NOTE: this variable is not to be used for the Login route).

    Import the 'azureEndpoint' variable (a non-default export) from the 'endpoints.ts' file into the component(s) needing to make any 'POST' requests or to use the Login route.

## API routes

<br>

### <u>Profile ingestion</u>

#### Using **azureEndpoint**:
- **POST** /profile

#### Using **firebaseEndpoint**:
- **GET** /profile/{pid}.json
- **GET** /profile/{pid}/following.json
- **GET** /profile/{pid}/followers.json
- **PATCH** /profile/{pid}/following.json
- **PATCH** /profile/{pid}/followers.json

<br>

### <u>Post ingestion</u>

#### Using **azureEndpoint**:
- **POST** /post

#### Using **firebaseEndpoint**:
- **GET** /post.json

<br>

### <u>Comment ingestion</u>

#### Using **azureEndpoint**:
- **POST** /comment

#### Using **firebaseEndpoint**:
- **GET** /{psid}.json

<br>

### <u>Login route</u>

#### Using **azureEndpoint**:
- **PATCH** /login
