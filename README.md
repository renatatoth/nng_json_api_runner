# JSON API Runner

JSON API Runner is a frontend-backend project that allows triggering various backend services based on a structured 
JSON input.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

Use Node.js to run the server.

```bash
node server.js
```

## Usage

Choosing the User Service API from the form select list will give you the following json input:

```json
[
  {
    "service": "userService",
    "method": "getUserProfile",
    "params": ["john_doe"]
  }
]
```

After clicking on Run you will get back the following data:
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "London"
}
```
Choosing the Image Service API will give you the following json input:

```json
[
  {
    "service": "imageService",
    "method": "getImageByName",
    "params": ["cat"]
  }
]
```
The cat.jpg image will be visible under the Result headline.

You can also combine multiple api calls:
```json
[
  {
    "service": "imageService",
    "method": "getImageByName",
    "params": ["cat"]
  },
  {
    "service": "userService",
    "method": "getUserProfile",
    "params": ["john_doe"]
  }
]
```
