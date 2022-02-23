
# New Bubbl(e) APIs

## Instructions

    To use the new API backend, import the 'firebaseEndpoint' variable from the 'endpoints.ts' file into the component(s) your are developing.

    When relying on the 'POST' or login route use the 'azureEndpoint'.

## API routes

<br>

<<<<<<< HEAD
- **POST** /profile  --use azureEndpoint
=======
### <u>Profile ingestion</u>

#### Using **azureEndpoint**:
- **POST** /profile  --use azureEndpoint

#### Using **firebaseEndpoint**:
>>>>>>> 137ebbd470e5dce3fb480188febd52c4856ee70c
- **GET** /profile/{pid}.json
- **GET** /profile/{pid}/following.json
- **GET** /profile/{pid}/followers.json
- **PATCH** /profile/{pid}/following.json
- **PATCH** /profile/{pid}/followers.json

<br>

### <u>Post ingestion</u>

<<<<<<< HEAD
- **POST** /post --use azureEndpoint
=======
#### Using **azureEndpoint**:
- **POST** /post  --use azureEndpoint

#### Using **firebaseEndpoint**:
>>>>>>> 137ebbd470e5dce3fb480188febd52c4856ee70c
- **GET** /post.json

<br>

### <u>Comment ingestion</u>

<<<<<<< HEAD
- **POST** /{psid}/comment --use azureEndpoint
=======
#### Using **azureEndpoint**:
- **POST** /comment

#### Using **firebaseEndpoint**:
>>>>>>> 137ebbd470e5dce3fb480188febd52c4856ee70c
- **GET** /{psid}.json

<br>

### <u>Login</u>

#### Using **azureEndpoint**:
- **PATCH** /login