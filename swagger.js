const m2s = require('mongoose-to-swagger');
const User = require('./models/user.model');
const Product = require('./models/product.model');

exports.options = {
    "openapi": "3.1.0",
    "info": {
        "version": "1.0.0",
        "title": "Products CRUD API",
        "description": "Products and Users apllication",
        "constact": {
            "name": "Coding Factory",
            "url": "https://www.example.com",
            "email":"support@example.com"
        }
    },
    "components": {
        "schemas": {
            User: m2s(User),
            Product: m2s(Product)
        }
    },
    "servers": [
        {
            url: "http://localhost:3000",
            description: "Local Server"
        },
        {
            url: "https://www.example.com",
            description: "Testing Server"
        }
    ],
    "tags":[
        {
            "name": "Users",
            "description": "Requests for user"
        },
        {
            "name":"Users and Products",
            "description": "Requests for user's products"
        },
        {
            "name":"Products",
            "description":"Requests for products"
        }
    ],
    "paths": {
        "/api/users":{
            "get": {
                "tags": ["Users"],
                "description": "Returns all users",
                "responses": {
                    "200": {
                        "description": "List of all users",
                        "content":{
                            "application/json":{
                                "schema":{
                                    "type":"array",
                                    "items": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "post": {
                "tags": ["Users"],
                "description": "Creates new user",
                "requestBody": {
                    "description": "Data for user that we create",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type":"object",
                                "properties": {
                                    "username": {"type": "string"},
                                    "password": {"type": "string"},
                                    "name": {"type": "string"},
                                    "surname": {"type": "string"},
                                    "email": {"type":"string"},
                                    "address":{
                                        "type":"object",
                                        "properties": {
                                            "area": {"type": "string"},
                                            "road": {"type":"string"}
                                        }
                                    },
                                    "phone":{
                                        "type":"array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "type": {"type": "string"},
                                                "number": {"type": "string"}
                                            }
                                        }
                                    }
                                },
                                "required": ["username", "password", "name", "surname"]
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "New user is created"
                    }
                }
            }
        },
        "/api/users/{username}":{
            "get":{
                "tags": ["Users"],
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required": true,
                        "description": "Username of user that we want to find",
                        "type":"string"
                    }
                ],
                "description": "Get user with specific username",
                "responses": {
                    "200":{
                        "description": "User result",
                        "schema":{
                            "$ref": "#/components/schemas/User"
                        }
                    }
                }
            },
            "patch":{
                "tags":["Users"],
                "description": "Update user",
                "parameters":[
                    {
                        "name": "username",
                        "in": "path",
                        "required": true,
                        "description": "Username of user that we want to update",
                        "type":"string"
                    }
                ],
                "requestBody":{
                    "description": "User to update",
                    "content":{
                        "application/json":{
                            "schema":{
                                "type":"object",
                                "properties":{
                                    "name":{"type":"string"},
                                    "surname":{"type":"string"},
                                    "email": {"type":"string"},
                                    "address":{
                                        "type":"object",
                                        "properties":{
                                            "area":{"type":"string"},
                                            "road":{"type":"string"}
                                        }
                                    }
                                },
                                "required":["email"]
                            }
                        }
                    }
                },
                "responses":{
                    "200":{
                        "description": "Update user",
                        "schema":{
                            "$ref":"#/components/schema/User"
                        }
                    }
                }
            },
            "delete":{
                "tags":["Users"],
                "description": "Deletes user",
                "parameters":[
                    {
                        "name":"username",
                        "in":"path",
                        "required":true,
                        "description": "Username of user that we want to delete",
                        "type":"string"
                    }
                ],
                "responses":{
                    "200":{
                        "description":"Delete a user"
                    }
                }
            }
        },
        "/api/user-product/users/products":{
            "get":{
                "tags":["Users and Products"],
                "description":"Return all users with their products",
                "responses":{
                "200":{
                    "description":"All users with their products"
                }
            }
        }
    },
    "/api/user-product/{username}/products":{
        "get":{
            "tags":["Users and Products"],
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user to find products",
                    "type":"string"
                }
            ],
            "description":"Username and Products",
            "responses":{
                "200":{
                    "description":"User and Products to find"
                }
            }
        },
        "post":{
            "tags":["Users and Products"],
            "description": "Add new products to user",
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description":"Username of user to find products",
                    "type":"string"
                }
            ],
            "requestBody":{
                "description": "Data to add products",
                "content":{
                    "application/json":{
                        "schema":{
                            "type":"object",
                            "properties":{
                                "username":{"type":"string"},
                                "products":{
                                    "type":"array",
                                    "items":{
                                        "type":"object",
                                        "properties":{
                                            "product":{"type":"string"},
                                            "cost":{"type":"number"},
                                            "quantity":{"type":"number"}
                                        }
                                    }
                                }
                            },
                            "required":["quantity"]
                            
                        }
                    }
                }
            },
            "responses":{
                "200":{
                    "description":"New products to user"
                }
            }
        }
    },
    "/api/users-products/{username}/products/{id}":{
        "patch":{
            "tags":["Users and Products"],
            "description": "Update users product",
            "parameters":[
                {
                    "name":"username",
                    "in":"path",
                    "required":true,
                    "description": "Username of user",
                    "type":"string"
                },
                {
                "name":"id",
                "in":"path",
                "required":true,
                "description":"Id of product to update",
                "type":"string"
                }

            ],
            "requestBody":{
                "description":"Quantity of product to update",
                "content":{
                    "application/json":{
                        "schema":{
                            "type":"object",
                            "properties":{
                                "product":{
                                    "type":"object",
                                    "properties":{
                                        "quantity":{"type":"number"}
                                    }
                                }
                            }
                         }
           
                    }
                }
            },
            "responses":{
                "200":{
                    "description":"Update product from user",
                }
            }
        }
    },

    "/api/product": {
        "get": {
            "tags": ["Products"],
            "description": "Returns all products",
            "responses": {
                "200": {
                    "description": "List of all products",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "array",
                                "items": {
                                    "$ref": "#/components/schemas/Product"
                                }
                            }
                        }
                    }
                }
            }
        },
        "post": {
            "tags": ["Products"],
            "description": "Creates new product",
            "requestBody": {
                "description": "Data for product that we create",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "product": {"type": "string"},
                                "cost": {"type": "number"},
                                "description": {"type": "string"},
                                "quantity": {"type": "number"}
                            },
                            "required": ["product", "cost", "quantity"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "New product is created",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Product"
                            }
                        }
                    }
                }
            }
        }
    },
    "/api/product/{id}": {
        "get": {
            "tags": ["Products"],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Id of product that we want to find",
                    "schema": { "type": "string" }
                }
            ],
            "description": "Get product with specific id",
            "responses": {
                "200": {
                    "description": "Product result",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Product"
                            }
                        }
                    }
                }
            }
        },
        "patch": {
            "tags": ["Products"],
            "description": "Update product",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Id of product that we want to update",
                    "schema": { "type": "string" }
                }
            ],
            "requestBody": {
                "description": "Product to update",
                "content": {
                    "application/json": {
                        "schema": {
                            "type": "object",
                            "properties": {
                                "product": {"type": "string"},
                                "cost": {"type": "number"},
                                "description": {"type": "string"},
                                "quantity": {"type": "number"}
                            },
                            "required": ["product"]
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "Update product",
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/Product"
                            }
                        }
                    }
                }
            }
        },
        "delete": {
            "tags": ["Products"],
            "description": "Deletes product",
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "required": true,
                    "description": "Id of product that we want to delete",
                    "schema": { "type": "string" }
                }
            ],
            "responses": {
                "200": {
                    "description": "Delete a product"
                }
            }
        }
    }
}
}