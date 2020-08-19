# SmartBrain-api

The backend part of smart-brain, a web app that detects human faces in a image provided with the image url.

- Backend web development using [Node.js](https://nodejs.org/en/), [Express.js](https://expressjs.com/), [PostgreSQL](https://www.postgresql.org/), and [Clarifai API](https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection).

- The full version of the app is deployed [here](https://smartbrain-mern.herokuapp.com/).

- You can find the code for the front-end part [here](https://github.com/mandar242/SmartBrain).

## How to run on your local computer
From your command line:

```bash
# Clone this repository
$ git clone https://github.com/sharvarikhedkar/SmartBrain-api.git

# Go into the repository
$ cd SmartBrain-api

# Remove current origin repository
$ git remote remove origin

```

Then you can install the dependencies using NPM and start the development server:

```bash
# Install dependencies
$ npm install

# Start development server
$ npm start
```

## NOTE:<br /> 
You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.<br />
You can grab Clarifai API key [here](https://www.clarifai.com/).

- Folder Structure
```
SmartBrain-api
├── README.md
├── package.json
├── package-lock.json
├── server.js
└── controllers
    ├── signin.js
    ├── register.js
    ├── profile.js
    └── image.js        
```

### NPM Packages Used
- Bcrypt
- Postgresql
- knex
- body parser
- cors
- express
