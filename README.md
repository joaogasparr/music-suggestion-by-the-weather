<h1 align="center">
  <img alt="inGaia" title="inGaia" src=".github/inGaia.png" width="200px" />
</h1>

<h3 align="center">
  Back-end Developer Challenge
</h3>

<p align="center">
  <img alt = "Github Last Confirmation" src = "https://img.shields.io/github/last-commit/joaogasparr/music-suggestion-by-the-weather">
  <img alt = "GitHub Main Language" src = "https://img.shields.io/github/languages/top/joaogasparr/music-suggestion-by-the-weather">
  <img alt="GitHub Language Count" src="https://img.shields.io/github/languages/count/joaogasparr/music-suggestion-by-the-weather?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/joaogasparr/music-suggestion-by-the-weather/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/joaogasparr/music-suggestion-by-the-weather?style=social">
  </a>
</p>

## :rocket: Getting Started

The following instructions show the walkthrough of how to copy the project to run on local machine for development and testing purposes.

### Prerequisites

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/install/)
- [OpenWeatherMaps API](https://openweathermap.org/api)
- [Spotify API](https://developer.spotify.com/documentation/web-api/)

### Installing

A step by step series of examples that tell you how to get a development env running

```
# Run the following command in a local directory to copy the project.

$> git clone https://github.com/joaogasparr/music-suggestion-by-the-weather.git
```

### :books: Databases

The first thing you must do is configure all database settings. To do this, follow the steps below at the terminal.

```
$> docker run --name postgresql -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:11
```

### :gear: Back-end

```
# First install back-end dependencies
$> cd ./backend/ && yarn

# Create the .env file by copying from .env.example and replace the information
$> cp .env.example .env

# Create database table structure
$> yarn sequelize db:migrate

# Start back-end service
$> yarn dev

# Start automated tests
$> yarn test --runInBand

```

### :computer: Online service

```
https://ingaia-challenge.herokuapp.com/

● POST - /users
  - Register a new user to the service
  - Fields:
    - name *
    - email *
    - password *

● POST - /sessions
  - Authenticate a user to the service to access private routes
  - Fields:
    - email *
    - password *

● PUT - /users/:id
  - Private route
  - Change user information in the service
  - Fields:
    - name *
    - email *
    - oldPassword
    - password
    - confirmPassword

● POST - /weathers
  - Private route
  - Search a playlist by current weather
  - Query Params:
    - city *
    - metrics

* Required fields
```

---

## :memo: Licença

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

Made with ♥ by João Vitor Gaspar :wave: [See my linkedin!](https://www.linkedin.com/in/jo%C3%A3o-vitor-gaspar-b1b527170/)
