# -LaundryHub_Backend

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

## Service Booking Data Pattern

```json
{
  "user": "6591648ebb7cf45d58620a5b",
  "services": {
    "service": "Wash & Iron",
    "cleaningProduct": "65901e764b27c10abeb0bfb7",
    "cleaningProductItem": 1
  },
  "grandPrice": 150,
  "bookingDate": "2023-12-31",
  "deliveryDate": "2024-01-03"
}
```
