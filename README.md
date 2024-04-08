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

### Create your envelopes: 

Endpoint:

```txt
POST /envelopes

URL Example:

localhost:4001/envelopes

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
GET /:envelope

URL Example:

localhost:4001/1

```

Input format:

```txt

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
GET /

URL Example:

localhost:4001/

```

Input format:

```txt

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

### Update specific envelopes and balances 

Endpoint:

```txt
PUT /x

URL Example::

localhost:4001/1

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
PUT /x

URL Example::

localhost:4001/1

```

Input format:

```txt

```

Expected output:

```txt

```

### Transfer budgets from different envelopes 

Endpoint:

```txt
POST /envelopes/transfer/<envelope-1>/<envelope-2>

URL Example:

localhost:4001/envelopes/transfer/1/2

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
