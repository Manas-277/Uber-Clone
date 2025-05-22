## User Logout Endpoint

### `GET /users/logout`

Logs out the authenticated user by invalidating their JWT token.

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

| Status Code | Description                       | Response Body Example                |
|-------------|-----------------------------------|--------------------------------------|
| 200         | Logout successful                 | `{ "message": "Logged Out!" }`       |
| 401         | Unauthorized (no/invalid token)   | `{ "message": "Unauthorized" }`      |

---

#### **Example Test Case**

**Request:**

```http
GET /users/logout
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Successful Response:**

```json
{
  "message": "Logged Out!"
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

- Logging out will clear the authentication cookie (if present) and blacklist the token, making it unusable for future requests.
- Always ensure you are sending a valid JWT token with your logout request.

For further details, refer to the codebase or contact the maintainer.