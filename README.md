# Vi Coding Assignment

This project is designed to demonstrate the implementation of a caching
mechanism for movie credits using Node.js and Express. It includes functionality
to fetch movie credits, cache them, and update the cache periodically to ensure
data consistency.

## Tools

- Jest for testing
- Supertest for HTTP assertions
- Express for server-side logic
- Node.js for runtime environment
- Axios for HTTP requests

## Getting Started

### Install dependencies

Before starting to code, don't forget to install all dependencies.

```shell
yarn
```

### Running tests

Run all tests once:

```shell
yarn test
```

### How to use

To start the server and use the endpoints, follow these steps:

Start the Server:

```shell
yarn start
```

This will start the server on the port specified in your environment variables or default to port 3000.

### Endpoints

```shell
GET /moviesPerActor
```
Purpose: Fetches the list of actors and the movies they have acted in.

####Example Request:
```shell
curl -X GET http://localhost:3000/moviesPerActor
```

####Example Response:
```shell
{
  "Robert Downey Jr.": ["Iron Man", "The Avengers", "Iron Man 3"],
  "Chris Evans": ["Captain America: The First Avenger", "The Avengers"]
}
```

```shell
GET /actorsWithMultipleCharacters
```
Purpose: Fetches the list of Actors and their associated characters and movies.

####Example Request:
```shell
curl -X GET http://localhost:3000/actorsWithMultipleCharacters
```

####Example Response:
```shell
{
  "Robert Downey Jr.": [
    {"movieName": "Iron Man", "characterName": "Tony Stark"},
    {"movieName": "The Avengers", "characterName": "Tony Stark"}
  ],
  "Chris Evans": [
    {"movieName": "Captain America: The First Avenger", "characterName": "Steve Rogers"},
    {"movieName": "The Avengers", "characterName": "Steve Rogers"}
  ]
}
```

```shell
GET /charactersWithMultipleActors
```
Purpose: Fetches the list of characters and their associated movies and actors.

####Example Request:
```shell
curl -X GET http://localhost:3000/charactersWithMultipleActors
```

####Example Response:
```shell
{
  "Tony Stark": [
    {"movieName": "Iron Man", "actorName": "Robert Downey Jr."},
    {"movieName": "The Avengers", "actorName": "Robert Downey Jr."}
  ],
  "Steve Rogers": [
    {"movieName": "Captain America: The First Avenger", "actorName": "Chris Evans"},
    {"movieName": "The Avengers", "actorName": "Chris Evans"}
  ]
}
```

### Project Structure

`index.js`: Entry point of the application. Sets up the server and schedules cache updates.

`routes.js`: Defines the API endpoints and their corresponding controllers.

`cache.js`: Implements the caching mechanism and provides functions to access cached data.

`controllers`: Contains the logic for handling API requests:

`moviesPerActor.js`: Handles requests to fetch movies per actor.

`actorsWithMultipleCharacters.js`: Handles requests to fetch actors with multiple characters.

`charactersWithMultipleActors.js`: Handles requests to fetch characters with multiple actors.

`dataForQuestions.js`: Contains the list of Marvel movies and actors.

`tests`: Contains the test files for the application:

`actorsWithMultipleCharacters.test.js`: Tests for the /actorsWithMultipleCharacters endpoint.

`charactersWithMultipleActors.test.js`: Tests for the /charactersWithMultipleActors endpoint.

`moviesPerActor.test.js`: Tests for the /moviesPerActor endpoint.