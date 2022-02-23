
# New Bubbl(e) APIs

## Instructions

    To use the new API backend, import the 'firebaseEndpoint' variable from the 'endpoints.ts' file into the component(s) your are developing.

    When relying on the 'POST' or login route use the 'azureEndpoint'.

## API routes

<br>

### <u>Profile ingestion</u>

#### Using **azureEndpoint**:
- **POST** /profile  --use azureEndpoint

#### Using **firebaseEndpoint**:
- **GET** /profile/{pid}.json
- **GET** /profile/{pid}/following.json
- **GET** /profile/{pid}/followers.json
- **PATCH** /profile/{pid}/following.json
- **PATCH** /profile/{pid}/followers.json

<br>

### <u>Post ingestion</u>

#### Using **azureEndpoint**:
- **POST** /post  --use azureEndpoint

#### Using **firebaseEndpoint**:
- **GET** /post.json

<br>

### <u>Comment ingestion</u>

#### Using **azureEndpoint**:
- **POST** /comment

#### Using **firebaseEndpoint**:
- **GET** /{psid}.json

<br>

### <u>Login</u>

#### Using **azureEndpoint**:
- **PATCH** /login