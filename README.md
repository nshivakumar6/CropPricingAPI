# CropPricingAPI

This is the repo for the Crop Pricing API. 
The API is meant to store data gathered from [National Farmers Information Service of Kenya (NAFIS)](http://www.nafis.go.ke/category/market-info/)
and allow data retrieval from a database for use in our Crop Pricing App.

The API stores the data in a Google BigQuery database. For security purposes, the credentials are not stored in the repo. Instead, Google
provides a service account file in the form of a JSON file. Google requires a path to the file in environment variables. Thus, in our .env:

```
GOOGLE_APPLICATION_CREDENTIALS="./service-account-file.json"
```

As indicated above, there must be a file `service-account-file.json` in the root directory of this project. This is the file you can acquire
by following Google's Documentation [here](https://cloud.google.com/bigquery/docs/reference/libraries#linux-or-macos) under "Setting up Authentication".


# Local API Testing
If you need to test the API or make changes locally, one way to do it is by doing the following:

- pull this git repo
- get the `service-account-file.json` from our Super Secret shared drive
- run `npm install` to get all the dependencies installed
- make changes, test them by running `npm run server`

When locally testing, please mind the hostname. If you're running the server on the same computer you're making requests from, you should be able to use `localhost` just fine. Otherwise use the local IP of the device you're running the server on.

Ex: a GET request to `http://localhost:5000/api/cropprices/all`

---
## Get Crop Pricing Listings
At the moment (after moving from MongoDB to PostgreSQL), there are six GET routes defined.

### GET ALL PRODUCTS
> `/api/cropprices/all`

Without any arguments, this route will GET ALL products. One can add the following in the request body to limit the number of results:

```json
{
    "limit": 5
}
```
Replace `5` with whatever number of results you wish.

### GET by Product
> `/api/cropprices/product`

This requires a request body like so:
```json
{
    "product": "egg"
}
```
Note: `"egg"` is *not* case sensitive. 

You can also add a `"limit"` argument to the request body. This ***must*** be the **last** parameter in the request body.
```json
{
    "product": "egg",
    "limit": 2
}
```

### GET by Variety
> `/api/cropprices/variety`

This requires a request body like so:
```json
{
    "variety": "ex"
}
```
Note: `"egg"` is *not* case sensitive. 

You can also add a `"limit"` argument to the request body. This ***must*** be the **last** parameter in the request body.
```json
{
    "variety": "ex",
    "limit": 2
}
```

### GET by Category
> `/api/cropprices/category`

This requires a request body like so:
```json
{
    "category": "animal"
}
```
Note: `"animal"` is *not* case sensitive. 

You can also add a `"limit"` argument to the request body. This ***must*** be the **last** parameter in the request body.
```json
{
    "category": "animal",
    "limit": 2
}
```

### GET by Market
> `/api/cropprices/market`

This requires a request body like so:
```json
{
    "market": "naku"
}
```
Note: `"naku"` is *not* case sensitive. 

You can also add a `"limit"` argument to the request body. This ***must*** be the **last** parameter in the request body.
```json
{
    "market": "naku",
    "limit": 2
}
```

### GET by Market, Product, Variety, and/or Category
> `/api/cropprices/`

This route can have a varying request body. The possible columns to search by are `"market", "category", "product", "variety"`. For example:

```json
{
	"market": "naku",
	"category": "animal"
}
```
Will query by market and category. You can also add `"limit"` as a parameter with an argument. Please make this the ***LAST*** one in the request body.
```json
{
	"market": "naku",
	"category": "animal",
	"limit": 2
}
```
---

## Register, Login, and Authenticate Users
Documentation & Implementation Coming Soon (?)

This part may not be implemented until later. We discussed potentially using OAuth2 and sessions to maintain user accounts, profile, and authentication. We'll worry about this down the road, though.