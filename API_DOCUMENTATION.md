# KAVI API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### Register
```
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "User created",
  "userId": 1
}
```

### Login
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Transactions (Requires Authentication)

### Get All Transactions
```
GET /transactions
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "userId": 1,
    "amount": 50000,
    "type": "keluar",
    "category": "Makanan",
    "date": "2024-01-15T00:00:00.000Z",
    "note": "Makan siang",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Create Transaction
```
POST /transactions
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "amount": 50000,
  "type": "keluar",
  "category": "Makanan",
  "date": "2024-01-15",
  "note": "Makan siang"
}

Response:
{
  "id": 1,
  "userId": 1,
  "amount": 50000,
  "type": "keluar",
  "category": "Makanan",
  "date": "2024-01-15T00:00:00.000Z",
  "note": "Makan siang",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## Categories (Requires Authentication)

### Get All Categories
```
GET /categories
Authorization: Bearer {token}

Response:
[
  {
    "id": 1,
    "userId": 1,
    "name": "Transportasi",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

### Create Category
```
POST /categories
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "name": "Transportasi"
}

Response:
{
  "id": 1,
  "userId": 1,
  "name": "Transportasi",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### Delete Category
```
DELETE /categories/:id
Authorization: Bearer {token}

Response:
{
  "message": "Category deleted"
}
```

## User (Requires Authentication)

### Get User Profile
```
GET /user
Authorization: Bearer {token}

Response:
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Update User Profile
```
PUT /user
Authorization: Bearer {token}
Content-Type: application/json

Body:
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}

Response:
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "Email already exists"
}
```

### 500 Internal Server Error
```json
{
  "error": "Server error message"
}
```
