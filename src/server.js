require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();

app.use(express.json());
connectDB();

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/books", require("./routes/book.routes"));
app.use("/api/reservations", require("./routes/reservation.routes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
