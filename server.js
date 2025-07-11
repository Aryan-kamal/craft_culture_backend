// const express = require("express");
// const cors = require("cors");
// const db = require("./db");
// const userRouter = require("./routes/userRouter");
// const productRouter = require("./routes/productRouter");
// const orderRouter = require("./routes/orderRouter");
// const companyRouter = require("./routes/companyRouter");
// const jobRouter = require("./routes/jobRouter");
// const donateMoneyRouter = require("./routes/donateMoneyRouter");
// const donateProductRouter = require("./routes/donateProductRouter");
// const applicantRouter = require("./routes/applicantRouter");
// const dashboardRouter = require("./routes/dashboardRouter");

// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(
// 	cors({
// 		origin: [
// 			"http://localhost:3000",
// 			"https://craft-culture-frontend.vercel.app",
// 		],
// 		optionsSuccessStatus: 200,
// 		withCredentials: true,
// 	})
// );

// // Routes
// app.use("/api/users", userRouter);
// app.use("/api/products", productRouter);
// app.use("/api/orders", orderRouter);
// app.use("/api/companies", companyRouter);
// app.use("/api/jobs", jobRouter);
// app.use("/api/applicants", applicantRouter);
// app.use("/api/donate-money", donateMoneyRouter);
// app.use("/api/donate-product", donateProductRouter);
// app.use("/api/dashboard", dashboardRouter);

// // Start Server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const cors = require("cors");
const db = require("./db");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRouter");
const companyRouter = require("./routes/companyRouter");
const jobRouter = require("./routes/jobRouter");
const donateMoneyRouter = require("./routes/donateMoneyRouter");
const donateProductRouter = require("./routes/donateProductRouter");
const applicantRouter = require("./routes/applicantRouter");
const dashboardRouter = require("./routes/dashboardRouter");

require("dotenv").config();

const app = express();
// const PORT = process.env.PORT || 5000;
const PORT = 8080;

// ✅ CORS Middleware – FIXED
const allowedOrigins = [
	"http://localhost:3000",
	"https://craft-culture-frontend.vercel.app",
];

app.use(
	cors({
		origin: allowedOrigins,
		withCredentials: true, // ✅ correct option name
		optionsSuccessStatus: 200,
	})
);

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/companies", companyRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applicants", applicantRouter);
app.use("/api/donate-money", donateMoneyRouter);
app.use("/api/donate-product", donateProductRouter);
app.use("/api/dashboard", dashboardRouter);

// ✅ Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
