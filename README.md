## live-weller &nbsp; [![CircleCI](https://circleci.com/gh/TritonSE/live-weller.svg?style=svg)](https://circleci.com/gh/TritonSE/live-weller)
An internal market evaluation tool for the [UCSD Center for Community Health](https://ucsdcommunityhealth.org)'s [Live Well Community Market program](https://ucsdcommunityhealth.org/work/livewellcommunitymarketprogram/).

### Build Instructions
Feel free to use `yarn ...` instead of `npm run ...`, but make sure not to commit the `yarn.lock`.

1. Clone the repository: `git clone https://github.com/tritonse/live-weller`.
2. Navigate to the directory: `cd live-weller`.
3. Install the necessary dependencies: `npm install`.
5. Create a new `.env` file using `.env.example` as a template: `cp .env.example .env`.
6. Fill out the `.env`. See the [example file below](#sample-env).
7. Run the containerized service(s), e.g. MongoDB: `docker-compose up -d`.
8. Start the Node app: `npm run dev`.

#### Sample `.env`
```
MONGO_URI=mongodb://localhost:27017/live-weller
```
**Note**: For Windows users, `localhost` won't work&mdash;you'll need to set the host to [the Docker Machine's IP address](https://docs.docker.com/machine/reference/ip/).

#### Useful Commands
+ `docker-compose up -d` to configure and run any required services
+ `npm install` to install the necessary dependencies
+ `npm run dev` to run the Node app with [Nodemon](https://nodemon.io/)
+ `npm run lint` to lint the Node app with [ESLint](https://eslint.org/) (without `--fix`)
+ `npm run test` to run the test suite with [Jest](https://jestjs.io/)
+ `npm run lint:fix` to handle the simple linter issues automatically
+ `docker exec -it mongo.tse.local mongo` to access MongoDB

Take a look at [`package.json`](https://github.com/tritonse/live-weller/blob/master/package.json) for the actual commands.
