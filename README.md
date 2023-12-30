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
  "role":["customer","admin", "super_admin"],
  "password": "123456",
  "phoneNumber": "011111111114",
  "email":"example@gmail.com",
  "isEmailVerified":false,

}
```

## Token Decoded Data

```json
"userId":"03294ujdjf",
"role":"customer" | "admin" | "super_admin",
"email":"expample@gmail.com",
```

## Laundry Service list

- Wash & Iron
- Wash & Fold
- Iron & Fold
- Dry Cleaning
- Spotless Wash & Iron
- SoftWash & Iron
- Ironing and Pressing
- Stain Removal
- Eco-Friendly Cleaning
- Spot Removal
- Deep Wash
- Normal Wash
- Crystal Clear Cleaning
- Iron and Fold

## Services data pattern.

```json
"title":"Wash & Iron"
"img":"img-url"
"dettails":["","",""],
"reviews:[{name,review}]

```
