# LaundryHub_Backend

## LaundryHub_Backend_Authentication Policy

- 1.Ramdom user can register and login Client site,
- 2.Super Admin can only create admin account.
- 3.admin and super admin can login Admin Pannel.

## Authentication data pattern for normal user.

```json
{
 "name": {
      "firstName": "Masud",
      "lastName": "Rana"
  }
  "role":"customer" | "admin" | "super_admin",
  "password": "123456",
  "phoneNumber": "011111111114",
  "email":"example@gmail.com",
  "isEmailVerified":false,

}
```

## Token Decoded Data

```json
userId:03294ujdjf,
"role":"customer" | "admin" | "super_admin",
email:expample@gmail.com,
```
