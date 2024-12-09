const express = require("express");
const bcrypt = require("bcrypt");
var cors = require("cors");
const jwt = require("jsonwebtoken");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var adapter = new FileSync("./database.json");
var db = low(adapter);

// Initialize Express app
const app = express();

// Define a JWT secret key. This should be isolated by using env variables for security
const jwtSecretKey = "start";

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Đảm bảo thư mục tồn tại
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = "uploads/avatars";
      if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath); // Đường dẫn lưu ảnh
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Tên file duy nhất
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // Giới hạn 50MB cho mỗi file tải lên
  }
});

console.log(jwtSecretKey);
// Set up CORS and JSON middlewares
app.use(cors());
// Tăng kích thước tối đa của request body (dành cho các JSON)
app.use(express.json({ limit: '50mb' }));  // Giới hạn 50MB
// Tăng giới hạn kích thước cho các form data (dành cho upload file)
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Basic home route for the API
app.get("/", (_req, res) => {
  res.send(
    "Auth API.\nPlease use POST /auth & POST /verify for authentication"
  );
});

// Register a new user
app.post("/register", (req, res) => {
  const { email, password, name, phone } = req.body;

  // Look up the user entry in the database
  const user = db
    .get("users")
    .value()
    .filter((user) => email === user.email);

  if (user.length === 0) {
    bcrypt.hash(password, 10, function (_err, hash) {
      db.get("users")
        .push({
          email,
          password: hash,
          phone,
          name,
        })
        .write();
      res.status(200).json({
        message: "success",
        data: { email, password: hash, phone, name },
      });
    });
  } else {
    res.status(400).json({ message: "User already exists" });
  }
});

// The auth endpoint that creates a new user record or logs a user based on an existing record
app.post("/auth", (req, res) => {
  const { email, password } = req.body;

  // Look up the user entry in the database
  const user = db
    .get("users")
    .value()
    .filter((user) => email === user.email);

  // If found, compare the hashed passwords and generate the JWT token for the user
  if (user.length === 1) {
    bcrypt.compare(password, user[0].password, function (_err, result) {
      if (!result) {
        return res.status(401).json({ message: "Invalid password" });
      } else {
        let loginData = {
          email,
          signInTime: Date.now(),
        };

        const token = jwt.sign(loginData, jwtSecretKey);
        console.log("login:", user);

        payload = {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          phone: user[0].phone,
          gender: user[0]?.gender,
          dob: user[0]?.dob,
          avatar: user[0]?.avatar
        };

        res.status(200).json({ message: "success", token, payload });
      }
    });
    // If no user is found, hash the given password and create a new entry in the auth db with the email and hashed password
  } else if (user.length === 0) {
    bcrypt.hash(password, 10, function (_err, hash) {
      console.log({ email, password: hash });
      db.get("users").push({ email, password: hash }).write();

      let loginData = {
        email,
        signInTime: Date.now(),
      };

      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: "success", token });
    });
  }
});

// The verify endpoint that checks if a given JWT token is valid
app.post("/verify", (req, res) => {
  const tokenHeaderKey = "jwt-token";
  const authToken = req.headers[tokenHeaderKey];
  console.log("tess: ", authToken);
  try {
    const verified = jwt.verify(authToken, jwtSecretKey);
    if (verified) {
      return res.status(200).json({ status: "logged in", message: "success" });
    } else {
      // Access Denied
      return res.status(401).json({ status: "invalid auth", message: "error" });
    }
  } catch (error) {
    // Access Denied
    return res.status(401).json({ status: "invalid auth", message: "error" });
  }
});

// An endpoint to see if there's an existing account for a given email address
app.post("/check-account", (req, res) => {
  const { email } = req.body;

  console.log(req.body);

  const user = db
    .get("users")
    .value()
    .filter((user) => email === user.email);

  console.log(user);

  res.status(200).json({
    status: user.length === 1 ? "User exists" : "User does not exist",
    userExists: user.length === 1,
  });
});

app.post("/update-account", (req, res) => {
  const {
    name,
    email,
    phone,
    gender,
    avatar,
    dob: { day, month, year },
  } = req.body;
  console.log(req.body);
  const user = db
    .get("users")
    .value()
    .filter((user) => email === user.email);

  if (user.length === 1) {
    const dataToUpdate = {
      name,
      phone,
      gender,
      avatar,
      dob: { day, month, year },
    };

    const updatedUser = { ...user[0], ...dataToUpdate };
    db.get("users").find({ email }).assign(updatedUser).write();
    console.log("updatedUser", updatedUser);
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
});

app.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  console.log("Body:", req.body);
  console.log("File:", req.file);
  try {
      if (!req.file) {
          return res.status(400).json({ message: "Không có file nào được tải lên." });
      }

      // Trả về URL của file
      const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
      res.status(200).json({ avatarUrl });
  } catch (error) {
      console.error("Lỗi trong khi tải lên avatar:", error); // Log lỗi chi tiết
      res.status(500).json({ message: "Lỗi khi xử lý file tải lên." });
  }
});

app.post("/update-shop", (req, res) => {
  const { shopName, email, phoneNumber, pickupAddresses, tax, ID, initSaved } = req.body;
  // console.log(shopName, email, phoneNumber, pickupAddresses, tax, ID, initSaved); 

  // Kiểm tra xem email có tồn tại trong database không
  const user = db.get("users").find({ email }).value();
  // console.warn(user);


  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const seller = db.get("sellers").find({ email }).value();

  if (!seller) {
    // Initialize a new seller if not found
    const initSeller = {
      email,
      shopName,
      phoneNumber,
      pickupAddresses,
      tax,
      ID,
      initSaved,
    };

    // Save new seller to the database
    db.get("sellers").push(initSeller).write();

    // Respond with success message
    res.status(201).json({ message: "Seller initialized successfully", seller: initSeller });
  }
  else{
    const updatedSeller = {
      ...seller,
      shopName,
      phoneNumber,
      pickupAddresses,
      tax,
      ID,
      initSaved
    };

    // Lưu thông tin vào cơ sở dữ liệu
    db.get("sellers")
      .find({ email })
      .assign(updatedSeller)
      .write();

    res.status(200).json({ message: "Seller info updated successfully", data: updatedSeller });
  }
});


app.post("/get-user", (req, res) => {
  const { email } = req.body;

  const user = db;
  user
    .get("users") 
    .find({ email })
    .value();
  if (user.length === 1) {
    res.status(200).json({ message: "success", user });
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
});

// Route để kiểm tra người dùng đã đăng ký bán hàng chưa
app.post("/check-seller", (req, res) => {
  const { email } = req.body;  // Lấy email từ request body

  // Kiểm tra trong cơ sở dữ liệu xem người dùng đã đăng ký bán chưa
  const seller = db
    .get("sellers")
    .find({ email })
    .value();

  if (seller) {
    // Nếu tìm thấy, trả về thông tin người dùng
    res.status(200).json({
      success: true,
      data: seller,
    });
  } else {
    // Nếu không tìm thấy, trả về lỗi
    res.status(404).json({
      success: false,
      message: "Seller not found",
    });
  }
});

// Endpoint để lưu món hàng
app.post("/save-item", (req, res) => {
  const {avatar, email, id, images, itemName, price, description, toppings } = req.body;

  // Kiểm tra các trường dữ liệu có đầy đủ không
  if (!itemName || !price || !description) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Tạo item mới
  const newItem = {
    avatar,
    email,
    id,
    images,
    itemName,
    price,
    description,
    toppings
  };

  // Lưu vào database hoặc file
  db.get("items")
    .push(newItem)
    .write();

  res.status(200).json({ message: "Item saved successfully", item: newItem });
});

// Endpoint để lấy thông tin món hàng theo ID
app.get("/get-item/:id", (req, res) => {
  const { id } = req.params;

  // Lấy món hàng từ database

  
  const item = db.get("items").find({ id }).value();
  if (item) {
    const user = db.get("users").find({ email: item.email }).value();
    if (user) {
      const seller = db.get("sellers").find({ email: user.email }).value();
      if (seller) {
        res.status(200).json({item:{
          ...item,
          shopName: seller.shopName,
          avatar: user.avatar,
        }});
      }
    }
    res.status(404).json({ message: "Item not found" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

app.get("/get-items", (req, res) => {

  // Lấy món hàng từ database
  const items = db.get("items").value();
  // console.log("ddts",items)
  if (items) {
    res.status(200).json({ items });
  } else {
    res.status(404).json({ message: "Items not found" });
  }
});

app.get("/get-items-seller/:email", (req, res) => {
  const { email } = req.params;
  // Lấy người dùng từ database
  const items = db.get("items").filter({ email }).value();
  if (items) {  
    res.status(200).json({ items });
  } else {
    res.status(404).json({ message: "items not found" });
  }
});

app.listen(3080);


