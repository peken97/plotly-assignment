# Plotly GraphQL Assignment

## Installation

Make sure you have NodeJS installed locally. Please run the following command to install all dependencies:

```bash
$ npm install
```

## Running the app

Run the application with the following command:

```bash
$ npm run start:dev
```

## Test

o run unit tests, run the following command:

```bash
# unit tests
$ npm run test
```

## Using the Application

In order to make the desired queries, please run the application followed by opening `http://localhost:3000/graphql` in your browser.
You can perform the following queries:

### Get Users

```GraphQL
query {
  getUsers {
    name,
    id,
    order {
      name,
      id,
      price
    }
  }
}
```

### Get Products

```GraphQL
query {
  getProducts {
    id,
    name,
    price,
    user {
      id
    }
  }
}
```

### Create User

```GraphQL
mutation {
  createUser(createUserInput: {
    name: "123",
    email: "kenicpetar@yahoo.com",
    age: 26,
  }) {
    id, name
  }
}
```

### Create Product

```GraphQL
mutation {
  createProduct(createProductInput: {
    name: "Product 1",
    price: 12.679102312,
    userId: 1
  }) {
    id,
    name,
    price,
    user {
      name,
      id
    }
  }
}

```
