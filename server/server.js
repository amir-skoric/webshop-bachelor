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
app.use(express.json());
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
const authCheck = require("./controllers/auth/authCheck");

//WEBSHOP
const addWebshop = require("./controllers/webshop/addWebshop");
const getWebshops = require("./controllers/webshop/getWebshops");
const getWebshop = require("./controllers/webshop/getWebshop");

//PRODUCT
const addProduct = require("./controllers/product/addProduct");

app.get("/", cors(), (req, res) => {
  res.send("You shouldn't be here...");
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

//auth check
app.get("/authCheck", authCheck);

//WEBSHOP
//get all by user
app.get("/getWebshops", getWebshops)

//get one webshop
app.get("/getWebshop:webshop", getWebshop)

//add
app.post("/addWebshop", addWebshop);

//PRODUCT
//add
app.post("/addProduct", addProduct);
