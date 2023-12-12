const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongo = require("../mongo");
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
      httpOnly: true,
      sameSite: "none",
      secure: true,
      domain: "https://webshop-bachelor.vercel.app/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
  })
);

//imports
//AUTH
const login = require("../src/api/auth/login");
const register = require("../src/api/auth/register");
const signout = require("../src/api/auth/signout");
const deleteUser = require("../src/api/auth/deleteUser");
const setAuth = require("../src/api/auth/setAuth");
const authCheck = require("../src/middleware/authCheck");

//WEBSHOP
const getWebshops = require("../src/api/webshop/getWebshops");
const getWebshop = require("../src/api/webshop/getWebshop");
const addWebshop = require("../src/api/webshop/addWebshop");
const deleteWebshop = require("../src/api/webshop/deleteWebshop");
const updateWebshop = require("../src/api/webshop/updateWebshop");

//CATEGORY
const addCategory = require("../src/api/category/addCategory");
const deleteCategory = require("../src/api/category/deleteCategory");

//PRODUCT
const addProduct = require("../src/api/product/addProduct");
const getProducts = require("../src/api/product/getProducts");
const getProduct = require("../src/api/product/getProduct");
const deleteProduct = require("../src/api/product/deleteProduct");
const updateProduct = require("../src/api/product/updateProduct");

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

//CATEGORY
//add category
app.post("/addCategory", authCheck, addCategory);

//delete category
app.delete("/deleteCategory", authCheck, deleteCategory);

//PRODUCT
//get all products by webshop
app.get("/getProducts", getProducts);

//get one product
app.get("/getProduct:product", getProduct);

//add product
app.post("/addProduct", authCheck, addProduct);

//delete product
app.delete("/deleteProduct", authCheck, deleteProduct);

//update product
app.put("/updateProduct", authCheck, updateProduct);
