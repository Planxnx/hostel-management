# Documentation
* [Health Check](#health-check)
* [Hotel List](#hotel-list)
* [Create Hotel](#create-hotel)
* [Available Hotel List](#available-hotel-list)
* [Hotel Info](#hotel-info)
* [Create Booking](#create-booking)
* [Get My Booking](#get-my-booking)
* [Login](#login)
* [Register](#register)

## Health Check
check the status of api.
```http
GET /api/v1/healthcheck
```
##### Responses
```javascript
{
  "message": "ok",
  "status": 200
}
```

## Hotel List
get hotel list.
```http
GET /api/v1/hotel
```
##### Responses
```javascript
{
  "status": 200,
  "data": [
    {
      "name": string,
      "price": int,
      "detail": {
        "status": string,
        "description": string
      }
    }
  ]
}
```

## Create Hotel
add new hotel to list. 
###### Authorization required (Bearer Token)
```http
POST /api/v1/hotel
``` 
##### Require Body
```javascript
{
    "id": int
    "name": string,
    "price": int,
    "detail": {
        "description": string
    },
    "room": {
        "available": int,
        "total": int
    },
    "map": {
        "address":string,
        "latitude":int,
        "longitude":int
    }
}
```
##### Responses
```javascript
{
  "status": int,
  "message": string
}
```

## Available Hotel List
get only available hotel list.
```http
GET /api/v1/hotel/available
```
##### Responses
```javascript
{
  "status": 200,
  "data": [
    {
      "id": int
      "name": string,
      "price": int,
      "detail": {
        "status": string,
        "description": string
      },
      "room": {
        "available": int,
        "total": int
      },
      "map":{
        "address": string,
        "latitude":int,
        "longitude":int
      }
    }
  ]
}
```

## Hotel Info
get hotel information.
```http
GET /api/v1/hotel/info/:id
```
##### Responses
```javascript
{
  "status": 200,
  "data": {
      "id": int
      "name": string,
      "price": int,
      "detail": {
        "status": string,
        "description": string
      },
      "room": {
        "available": int,
        "total": int
      },
      "map":{
        "address": string,
        "latitude":int,
        "longitude":int
      }
    }
}
```

## Create Booking
booking hotel. 
###### Authorization required (Bearer Token)
```http
POST /api/v1/hotel/booking
``` 
##### Require Body
```javascript
{
    "hotelId": int,
    "detail": {
        "roomAmount": int,
        "checkinDate": string,
        "checkoutDate": string
    }
}
```
##### Responses
```javascript
{
  "status": int,
  "message": string or "bookingId: int
}
```

## Get My Booking
get my booking list. 
###### Authorization required (Bearer Token)
```http
GET /api/v1/hotel/booking
``` 
##### Responses
```javascript
{
    "status": int,
    "data": [
        {
            "id": int,
            "username": string,
            "hotelId": int,
            "detail": {
                "roomAmount": int,
                "checkinDate": string,
                "checkoutDate": string
            }
        }
    ]
}
```

## Login
```http
POST /api/v1/auth/login
``` 
##### Require Body
```javascript
{
    "username": string,
    "password": string
}
```
##### Responses
```javascript
{
  "status": int,
  "message": string
}
```

## Register
```http
POST /api/v1/auth/register
``` 
##### Require Body
```javascript
{
    "username": string,
    "password": string,
    "repassword": string,
    "name": string,
    "lastname": string,
    "birthDate": string,
    "email": string
}
```
##### Responses
```javascript
{
  "status": int,
  "message": string
}
```
