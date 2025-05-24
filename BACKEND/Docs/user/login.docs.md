## User Login Endpoint

### `POST /users/login`

Authenticates a user and returns a JWT token if credentials are valid.

---

#### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters.

---

#### **Responses**

| Status Code | Description                                      | Response Body Example                                      |
|-------------|--------------------------------------------------|------------------------------------------------------------|
| 201         | Login successful                                 | `{ "token": "<jwt_token>", "user": { ...userData } }`      |
| 400         | Validation error or missing required fields       | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }`  |
| 401         | Invalid email or password                        | `{ "message": "Invalid email or password" }`               |

---

#### **Example Test Case**

**Request:**

```http
POST /users/login
Content-Type: application/json

{
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

**Invalid Credentials Example:**

```json
{
  "message": "Invalid email or password"
}
```

---

For more details, see the codebase or contact the maintainer.