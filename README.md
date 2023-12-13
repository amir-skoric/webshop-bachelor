# Webshop Builder

This is a webshop builder I've created as my bachelor project in web development.

## WARNING: MUST BE RUN ON A HTTPS SERVER



## Installation

How to install after cloning:

```bash
  cd server
  npm i
  cd..
  cd client
  npm i
```
### Environment Variables
#### Server
PORT = 4000

DATABASE_URL = "mongodb+srv://[username:password@]host[?options]]"

SESSION_SECRET = "secret session key"

#### Client 

VITE_CLOUDINARY_CLOUD_NAME = "name of your cloudinary cloud"

VITE_CLOUDINARY_PRESET = "name of your cloudinary preset"

VITE_API_URL = "api url (default: "http://localhost:4000/")
