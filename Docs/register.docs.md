# Uber Clone Backend API

## User Registration Endpoint

### `POST /users/register`

Registers a new user in the system.

---

#### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

- `fullName.firstName` (string, required): Must be at least 3 characters.
- `fullName.lastName` (string, optional): If provided, must be at least 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters.

---

#### **Responses**

| Status Code | Description                                      | Response Body Example                                      |
|-------------|--------------------------------------------------|------------------------------------------------------------|
| 201         | User registered successfully                     | `{ "token": "<jwt_token>", "user": { ...userData } }`      |
| 400         | Validation error or missing required fields       | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }`  |

---

#### **Example Test Case**

**Request:**

```http
POST /users/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "Alice",
    "lastName": "Smith"
  },
  "email": "alice.smith@example.com",
  "password": "securePass123"
}
```

**Successful Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "665f1e2b8c1a2b0012345678",
    "fullName": {
      "firstName": "Alice",
      "lastName": "Smith"
    },
    "email": "alice.smith@example.com",
    "socketId": null,
    "createdAt": "2024-06-10T12:34:56.789Z",
    "updatedAt": "2024-06-10T12:34:56.789Z",
    "__v": 0
  }
}
```

**Validation Error Example:**

```json
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

For any questions or issues, please refer to the codebase or contact the maintainer.