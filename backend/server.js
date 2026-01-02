const express = require("express")
const cors  = require("cors")
const connectDB = require("./config/db")

const app = express();

connectDB();
console.log(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/subscriptions", require("./routes/subscriptionRoutes"));
app.use("/api/magazines", require("./routes/magazineRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/admin/dashboard", require("./routes/adminDashboardRoutes"));



app.get("/",(req,res)=>{
    res.send("yugdrashta backend running")
})

const PORT  = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})