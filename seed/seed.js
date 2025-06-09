const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const mongoose = require("mongoose");
const fs = require("fs");

// Determine connection URI (supports MONGO_URI or REMOTE_DB_URL)
const MONGO_URI = process.env.MONGO_URI || process.env.REMOTE_DB_URL;
if (!MONGO_URI) {
	console.error(
		"❌ No MongoDB URI defined. Please set MONGO_URI or REMOTE_DB_URL in .env and retry."
	);
	process.exit(1);
}

// 1) Connect to MongoDB
mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => {
		console.error("❌ MongoDB connection error:", err);
		process.exit(1);
	});

// 2) Load your models
const Company = require("../models/Company");
const Product = require("../models/Product");
const Job = require("../models/Job");
// ... require other models as needed (Applicant, DonateMoney, etc.)

// 3) Generic JSON loader
const loadJson = (relativeFilePath) => {
	const filePath = path.join(__dirname, "../sampledata", relativeFilePath);
	const raw = fs.readFileSync(filePath, "utf-8");
	try {
		return JSON.parse(raw);
	} catch (err) {
		console.error(`Error parsing JSON in ${relativeFilePath}:`, err);
		return [];
	}
};

// 4) Seed functions per model
const seedCompany = async () => {
	const docs = loadJson("Company.txt");
	await Company.deleteMany();
	if (docs.length) {
		await Company.insertMany(docs);
		console.log(`  • Seeded ${docs.length} companies`);
	}
};

const seedJobs = async () => {
	const docs = loadJson("Job.txt");
	await Job.deleteMany();
	if (docs.length) {
		await Job.insertMany(docs);
		console.log(`  • Seeded ${docs.length} jobs`);
	}
};

const seedProducts = async () => {
	const productFiles = [
		path.join("Product", "Bag.txt"),
		path.join("Product", "Bottle Art.txt"),
		path.join("Product", "Diyas.txt"),
		path.join("Product", "Frames.txt"),
		path.join("Product", "Jewellery.txt"),
		path.join("Product", "Pen Stand.txt"),
		path.join("Product", "Wall Hanging.txt"),
	];

	let allProducts = [];
	productFiles.forEach((f) => {
		const docs = loadJson(f);
		if (Array.isArray(docs)) allProducts = allProducts.concat(docs);
	});

	await Product.deleteMany();
	if (allProducts.length) {
		await Product.insertMany(allProducts);
		console.log(
			`  • Seeded ${allProducts.length} products from ${productFiles.length} files`
		);
	}
};

// TODO: add other seed functions (Applicants, DonateMoney, etc.)

// 5) Main runner
const run = async () => {
	try {
		console.log("🔄 Starting data import...");
		await seedCompany();
		await seedProducts();
		await seedJobs();
		// ... await other seeds
		console.log("🎉 Data import complete");
	} catch (err) {
		console.error("Error during seeding:", err);
	} finally {
		await mongoose.disconnect();
	}
};

run();
