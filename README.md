## Installation

### Set up environment variables

Need two `.env` files. One in `/backend/` and one in `/frontend/`
You can find these in the [private repo](https://github.com/team-nov/project-team-nov/tree/main/envFiles).
For the backend make sure you uncomment the `dotenv` import and change the `HOST` environment variable to `http://localhost:5000`

To start frontend

```
cd frontend
npm install
npm start
```

starts on `http://localhost:3000/`

To start backend

```
cd backend
npm install
npm start
```

starts on `http://localhost:5000/`

You must have both frontend and backend running for the app to work

## Motivation

Our objective is to build a user-friendly e-learning web-app to assist startups during the incubation phase. Our app will include key virtual classroom features such as video conferencing tools, calendars, and discussion boards. In addition, users will also have quick access to any new information and guidance.

## Contributing

Pull requests are encouraged. Please open an issue for major changes to discuss what you would like to change.

Please make sure to test your code thoroughly before merging.

Please follow git flow practices for branching.

Name feature branches using the feature name and hotfixes prefixed with "Hotfix".
