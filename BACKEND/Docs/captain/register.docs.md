## Captain Registration Endpoint

### Protocol

- **Protocol:** HTTP/HTTPS  
- **Content-Type:** `application/json`

---

### Endpoint

`POST /captains/register`

Registers a new captain (driver) with vehicle details in the system.

---

### **Request Body**

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourPassword123",
  "vehicle": {
    "color": "red",
    "plateNumber": "UP 11 BA 7634",
    "capacity": 4,
    "type": "car"
  }
}
```

#### **Field Details**

- `fullName.firstName` (string, required): Captain's first name (min 3 characters).
- `fullName.lastName` (string, required): Captain's last name (min 3 characters).
- `email` (string, required): Must be a valid and unique email address.
- `password` (string, required): Must be at least 6 characters.
- `vehicle.color` (string, required): Vehicle color (min 3 characters).
- `vehicle.plateNumber` (string, required): Vehicle's plate number (min 3 characters).
- `vehicle.capacity` (number, required): Number of seats/capacity (min 1).
- `vehicle.type` (string, required): Type of vehicle. Allowed values: `"auto"`, `"moto"`, `"car"`.

---

### **Responses**

| Status Code | Description                                 | Response Body Example                                 |
|-------------|---------------------------------------------|-------------------------------------------------------|
| 200         | Captain registered successfully             | `{ "message": "Captain Registered", "token": "<jwt_token>" }` |
| 400         | Validation error or missing/invalid fields  | `{ "errors": [ { "msg": "...", "param": "...", ... } ] }` or `{ "message": "...", ... }` |
| 409         | Email already exists                        | `{ "message": "Captain already Exists" }`             |

---

### **Example Test Case**

**Request:**

```http
POST /captains/register
Content-Type: application/json

{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "strongPassword123",
  "vehicle": {
    "color": "blue",
    "plateNumber": "DL 8C AA 1234",
    "capacity": 4,
    "type": "car"
  }
}
```

**Successful Response:**

```json
{
  "message": "Captain Registered",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation Error Example:**

```json
{
  "errors": [
    {
      "msg": "Vehicle plate number is required",
      "param": "vehicle.plateNumber",
      "location": "body"
    }
  ]
}
```

**Duplicate Email Example:**

```json
{
  "message": "Captain already Exists"
}
```

---

### **Notes**

- Always use HTTPS in production for secure data transmission.
- The returned JWT token should be used for authenticated requests.
- All fields are required unless stated otherwise.
- For further details, refer to the codebase or contact the maintainer.

---
