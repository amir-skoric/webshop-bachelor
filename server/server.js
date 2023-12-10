const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongo = require("./mongo");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

//middleware
const corsConfig = {
  origin: true,
  credentials: true,
};

app.set("trust proxy", 1);

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 3600000, //1 hour
    },
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);

//imports
//AUTH
const login = require("./controllers/auth/login");
const register = require("./controllers/auth/register");
const signout = require("./controllers/auth/signout");
const deleteUser = require("./controllers/auth/deleteUser");
const setAuth = require("./controllers/auth/setAuth");
const authCheck = require("./controllers/auth/authCheck");

//WEBSHOP
const getWebshops = require("./controllers/webshop/getWebshops");
const getWebshop = require("./controllers/webshop/getWebshop");
const addWebshop = require("./controllers/webshop/addWebshop");
const deleteWebshop = require("./controllers/webshop/deleteWebshop");
const updateWebshop = require("./controllers/webshop/updateWebshop");

//PRODUCT
const addProduct = require("./controllers/product/addProduct");
const getProducts = require("./controllers/product/getProducts");
const getProduct = require("./controllers/product/getProduct");
const deleteProduct = require("./controllers/product/deleteProduct");

app.get("/", cors(), (req, res) => {
  res.json("You shouldn't be here...");
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

//AUTH
//register
app.post("/register", register);

//login
app.post("/login", login);

//signout
app.get("/signout", signout);

//delete user
app.delete("/deleteUser", authCheck, deleteUser);

//auth check
app.get("/setAuth", setAuth);

//WEBSHOP
//get all by user
app.get("/getWebshops", getWebshops);

//get one webshop
app.get("/getWebshop:webshop", getWebshop);

//add webshop
app.post("/addWebshop", authCheck, addWebshop);

//delete webshop
app.delete("/deleteWebshop", authCheck, deleteWebshop);

//update webshop
app.put("/updateWebshop", authCheck, updateWebshop);

//PRODUCT
//get all products by webshop
app.get("/getProducts", getProducts);

//get one product
app.get("/getProduct:product", getProduct);

//add
app.post("/addProduct", authCheck, addProduct);

//delete product
app.delete("/deleteProduct", authCheck, deleteProduct);
