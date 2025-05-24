## Captain Login Endpoint

### Protocol

- **Protocol:** HTTP/HTTPS  
- **Content-Type:** `application/json`

---

### Endpoint

`POST /captains/login`

Authenticates a captain (driver) and returns a JWT token for future authenticated requests.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "email": "john.doe@example.com",
  "password": "yourPassword123"
}
```

#### **Field Details**

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 6 characters.

---

### **Responses**

| Status Code | Description                                 | Response Body Example                                 |
|-------------|---------------------------------------------|-------------------------------------------------------|
| 200         | Login successful                            | `{ "message": "Login successful", "token": "<jwt_token>", "captain": { ...captainData } }` |
| 400         | Validation error or missing/invalid fields  | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` |
| 401         | Invalid email or password                   | `{ "message": "Invalid email or password" }`          |

---

### **Example Test Case**

**Request:**

```http
POST /captains/login
Content-Type: application/json

{
  "email": "jane.smith@example.com",
  "password": "strongPassword123"
}
```

**Successful Response:**

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
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

### **Notes**

- Always use HTTPS in production for secure data transmission.
- The returned JWT token should be used for all authenticated captain requests.
- All fields are required unless stated otherwise.
- For further details, refer to the codebase or contact the maintainer.

---