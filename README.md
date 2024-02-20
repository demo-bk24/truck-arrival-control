# Demo project for truck arrival control

A project for managing truck arrival control, based on web application. Built with [Angular](https://angular.io/), [Express.js](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/)

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Setup

1. Clone the repository:

```bash
git clone https://github.com/demo-bk23/truck-arrival-control.git
```

2. Navigate to the project directory:

```bash
cd truck-arrival-control
```

## Server Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Setup MongoDB:

- Install MongoDB
- Start MongoDB Service

4. Create a `.env` file in the server directory and add the following:

```makefile
PORT=3000
DB_CNN_STRING=your-mongodb-connection-string
JWT_KEY=your-secret-key
```

Replace your-mongodb-connection-string with your MongoDB connection string and your-secret-key with your JWT secret key.

5. Run the server:

```bash
npm run dev
```

## Admin Setup

1. Navigate to the admin directory:

```bash
cd admin
```

2. Install dependencies:

```bash
npm install
```

3. Run the admin app:

```bash
ng serve
```

## Client Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Run the client app:

```bash
ng serve --port=ANY_PORT
```

Replace `ANY_PORT` with your desired port number.
