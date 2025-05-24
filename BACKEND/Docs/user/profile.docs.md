## User Profile Endpoint

### `GET /users/profile`

Retrieves the authenticated user's profile information.

---

#### **Authentication**

This endpoint is **protected**.  
You must include a valid JWT token in your request, either as a cookie named `token` or in the `Authorization` header as a Bearer token.

---

#### **Request Example**

**Headers (using Authorization header):**
```
Authorization: Bearer <your_jwt_token>
```

**OR**

**Cookie:**
```
token=<your_jwt_token>
```

---

#### **Responses**

| Status Code | Description              | Response Body Example                         |
|-------------|--------------------------|-----------------------------------------------|
| 200         | Profile fetched successfully | `{ ...userData }`                             |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`           |

---

#### **Example Test Case**

**Request:**

```http
GET /users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Successful Response:**

```json
{
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
```

**Unauthorized Example:**

```json
{
  "message": "Unauthorized"
}
```

---

#### **Notes**

- Make sure you are logged in and include your JWT token in the request.
- If you receive an "Unauthorized" message, your token may be missing, expired, or invalid.

For further details, refer to the codebase or contact the maintainer.