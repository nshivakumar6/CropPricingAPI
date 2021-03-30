# CropPricingAPI

This is the repo for the Crop Pricing API. 
The API is meant to store data gathered from [National Farmers Information Service of Kenya (NAFIS)](http://www.nafis.go.ke/category/market-info/)
and allow data retrieval from a database for use in our Crop Pricing App.

The API stores the data in a PostgreSQL database. For security purposes, the credentials are not stored in the repo. Instead, they are stored in an .env file
located in the root of the directory. This .env file contains:

```
DB_USER=database user
DB_HOST=domain or ip of database host
DB_NAME=name of database
DB_PASS=password for user with access to database
DB_PORT=5432 (this is the default port for PostgreSQL)
```
## Get Crop Pricing Listings
At the moment (after moving from MongoDB to PostgreSQL), there are six GET routes defined.

### GET ALL PRODUCTS
> `/api/cropprices/all`

Without any arguments

## Register, Login, and Authenticate Users
Documentation & Implementation Coming Soon (?)

This part may not be implemented until later. We discussed potentially using OAuth2 and sessions to maintain user accounts, profile, and authentication. We'll worry about this down the road, though.