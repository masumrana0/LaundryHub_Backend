# LaundryHub_Backend

LaundryHub is a user-friendly platform that simplifies and enhances the laundry service experience. Whether you're a busy professional, a student, or someone looking for quality laundry services, LaundryHub has you covered.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Role wise power](#userRole) 4.[All_Routes](#all_routes) 5.[Data Pattern](#data-pattern)
4. [Getting Started](#getting-started)
   - [User Registration and Login](#user-registration-and-login)
   - [Service Selection](#service-selection)
   - [Booking Services](#booking-services)
5. [Technology Stack](#technology-stack)

## Features

- **User Registration and Authentication:** Secure user registration and login to access the full range of LaundryHub services.

- **Service Selection:** A variety of laundry services with detailed descriptions and pricing information.

- **Booking Services:** Easy and intuitive booking process, allowing users to choose a convenient date and time for their service.

- **User Interaction:**

  - **Service Reviews and Ratings:** Users can add reviews and ratings for the services they have availed, helping others make informed decisions.
  - **Feedback:** Users can provide feedback on their overall experience, allowing us to continually improve our services.
  - **Profile Management:** Users have the ability to change their profile information, ensuring accurate and up-to-date details.

- **Administrator Dashboard:** Powerful dashboard for administrators to manage user accounts, service listings, booking records, and user interactions.

## Role Wise Power

- **Customer:**
  -- **Service Reviews , Ratings,Feedback and Booking:** Only Customer can add reviews , ratings and Booking .
  -- **Profile Management:** Every User (admin,super admin, Customer) can change their Profile information.Secically Only super_admin and admin can modifiy Customer personal information.
  -- **Booking shedule :** customer can booking service with shedule and when booking will be pening the he/she cencel booking. and Only admin can approved or reshedule booking. Customer fatech their own bookings.. admin can fetched all customer booking.

- **User Registration and Login:** Only Customer can register theri account .

- **Admin / Super_admin:**
  -- **register and login:** Super admin can only crate admin account. super_admin and admin both can login their account .
  -- **Frontend content Controll:** Super_admin can only controll fontend showing content.like fqa. create service and create laundryCleaning Product.

## Data Pattern

- **Register Customer:**

```json
{
  "name": {
    "firstName": "Masum",
    "lastName": "Rana"
  },
  "role": ["customer,admin,super_admin"],
  "phoneNumber": "0124462231",
  "email": "toceso9928@ubinert.com",
  "password": "123456"
}
```

- **Login:**

```json
{
"email":"expample@gmail.com",
"password:"123456"
}
```

- **Booking:**

```json
{
  "user": "65928c5727aec5cc14beabe5",
  "services": [
    {
      "service": "65928c5727aec5cc14beabe5",
      "cleaningProduct": "65901e764b27c10abeb0bfb7",
      "cleaningProductItem": 1
    }
  ],
  "grandPrice": 250,
  "bookingDate": "2023-12-31",
  "deliveryDate": "2024-01-03",
  "address": "Lakshmipur & Raipur"
}
```

- **service:**

```json
{
  "title": "Clothing Alterations",
  "images": [
    "https://img.freepik.com/free-photo/front-view-young-male-with-ironing-board-blue-surface_140725-154687.jpg?w=1060&t=st=1704595759~exp=1704596359~hmac=ff96aee5531803bc23da160fc42ece3cfa789375fcf88cf532242155612427f2",
    "https://img.freepik.com/free-vector/abstract-green-background-with-bubbles_1017-20108.jpg?w=740&t=st=1704595696~exp=1704596296~hmac=7d069cae74a239d924c3d868aaf1c77ae94356185a3f84b9299fefa94805889c",
    "https://img.freepik.com/free-vector/promotion-banner-liquid-detergent-laundry-with-washing-machine-soap-bubbles_1441-1627.jpg?w=740&t=st=1704596103~exp=1704596703~hmac=3af37b336915836ccb7cd14b29353798b9e2deac16a00d5520c554db17d9914f"
  ],
  "details": [
    "Top Clean service typically involves a comprehensive cleaning process followed by careful ironing to ensure clothes come out looking neat and professionally pressed. This service is designed to cater to individuals seeking convenience and a polished finish for their garments without the hassle of doing it themselves.",
    "The process begins with separating clothes based on their fabric type and care instructions. Then, they undergo a thorough washing cycle, ensuring the removal of stains, dirt, and odors. After the washing phase, each garment is meticulously ironed, paying close attention to fabric type and heat settings to prevent damage and ensure a smooth finish.",
    "The goal is to provide customers with impeccably cleaned and pressed clothing, ready to wear straight from the laundry service. This service often appeals to busy professionals, families, or anyone looking to save time while maintaining a sharp, well-groomed appearance."
  ]
}
```

-- **Review:**

```json
{
  "service": "65982ac4eed34ae0a2063ebe",
  "review": "it's a good service"
}
```

-- **Rating:**

```json
{
  "service": "65982ac4eed34ae0a2063ebe",
  "rating": 3
}
```

- **CleanigProduct:**

```json
{
  "category": "woman",
  "name": "Saree (Plain Cotton / Plain Silk / Cotton Design)",
  "price": 100
}
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

## Cleaning Product list

## Cleaning Product demo data

```json
"category":"home | men | woman,
"name":"Top Wear (Shirt / T-shirt / Fatua)",
"price":150
```
