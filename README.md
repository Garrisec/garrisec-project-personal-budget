# Portfolio Project: Personal Budget I

## Description

This is a portfolio project to showcase my skills in build a Back-End with Express.js. This software allows customers to create and manage a personal budget. Using the principles of Envelope Budgeting, the API allows users to manage budget envelopes and track the balance of each envelope.

What I learned:

- Create an API using Node.js and Express
- Be able to create, read, update and delete data
- Use Git version control to keep track of work
- Use the command line to navigate your files and folders
- Use Postman to test API endpoints

## Features

- Create your envelopes
- Retrieve all your envelopes
- Retrieve specific envelopes
- Update specific envelopes and balances
- Delete specific envelopes
- Transfer budgets from different envelopes

## How to use

### Setting Up

Clone repository:

```shell
git clone <link-to-this-repository>
```

This command installs a package and any packages that it depends on:

```shell
npm install
```

Use an API testing application such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/download).

### Create your envelopes: 

Endpoint:

```txt
localhost:6000/envelopes
```

Input format:

```txt
{
    "title": "title",
    "budget": 100
}
```

Expected output:

```txt
{
    "title": "title",
    "budget": 100,
    "id": x
}
```

### Retrieve specific envelopes 

Endpoint:

```txt
localhost:6000/envelopes/1
```

Input format:

```txt
1,2,3...
```

Expected output:

```txt
{
    "title": x,
    "budget": x,
    "id": x
}
```

### Retrieve all your envelopes: 

Endpoint:

```txt
localhost:6000/envelopes/
```

Expected output:

```txt
{
    title: "Gas",
    budget: 150,
    id: 1
},
{
    title: "Clothes",
    budget: 250,
    id: 2
},
{
    title: "Transport",
    budget: 250,
    id: 3
}
```

### Update specific envelopes and balances (remove value from envelope)

Endpoint:

```txt
localhost:6000/envelopes/2
```

Input format:

```txt
{
    "budget": 50
}
```

Expected output:

```txt
{
    "title": x,
    "budget": x,
    "id": x
}
```

### Delete specific envelopes 

Endpoint:

```txt
localhost:6000/envelopes/1
```

### Transfer budgets from different envelopes 

Endpoint:

```txt
localhost:6000/envelopes/transfer/2/3
```

Input format:

```txt
{
    "value": 50
}
```

Expected output:

```txt
[
    {
        "title": "Title",
        "budget": x,
        "id": x
    },
    {
        "title": "Title",
        "budget": x,
        "id": x
    }
]
```

## Technologies

- Nodejs: Allows code to be executed outside the browser
- Expressjs: Javascript structure that facilitates back-end creation
