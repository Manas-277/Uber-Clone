## Get Captain Profile Endpoint

### Protocol

- **Protocol:** HTTP/HTTPS  
- **Content-Type:** `application/json`
- **Authentication:** Required (JWT token)

---

### Endpoint

`GET /captains/profile`

Retrieves the authenticated captain's profile information.

---

### **Authentication**

This endpoint is **protected**.  
You must include a valid JWT token in your request, either as a cookie named `token` or in the `Authorization` header as a Bearer token.

---

### **Request Example**

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

### **Responses**

| Status Code | Description              | Response Body Example                         |
|-------------|--------------------------|-----------------------------------------------|
| 200         | Profile fetched successfully | `{ ...captainData }`                         |
| 401         | Unauthorized (no/invalid token) | `{ "message": "Unauthorized" }`           |

---

### **Example Test Case**

**Request:**

```http
GET /captains/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Successful Response:**

```json
{
  "_id": "665f1e2b8c1a2b0012345678",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "vehicle": {
    "color": "blue",
    "plate": "DL 8C AA 1234",
    "capacity": 4,
    "vehicleType": "car"
  },
  "status": "active",
  "createdAt": "2024-06-10T12:34:56.789Z",
  "updatedAt": "2024-06-10T12:34:56.789Z"
}
```

**Unauthorized Example:**

```json
{
  "message": "Unauthorized"
}
```

---

### **Notes**

- Always use HTTPS in production for secure data transmission.
- The JWT token must be valid and not expired or blacklisted.
- For further details, refer to the codebase or contact the maintainer.

---