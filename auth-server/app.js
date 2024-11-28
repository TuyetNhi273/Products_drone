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
const upload = multer({ storage });

console.log(jwtSecretKey);
// Set up CORS and JSON middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

  console.log("info", req.body);

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


app.post("/get-user", (req, res) => {
  const { email } = req.body;

  const user = db;
  user
    .get("users") //.find({ email })
    .find({ email })
    .value();
  if (user.length === 1) {
    res.status(200).json({ message: "success", user });
  } else {
    res.status(400).json({ message: "User does not exist" });
  }
});

app.listen(3080);
