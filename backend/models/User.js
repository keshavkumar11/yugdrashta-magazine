const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:true,
            trim:true
        },
        email: {
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowercase:true
        },

        phone:{
            type:String,
            required:true
        },

        whatsappNumber:{
            type:String,
            required:true
        },

        bloodGroup:{
            type:String
        },

        password:{
            type:String,
            required:true
        },

        role:{
            type:String,
            enum : ["user","admin"],
            default:"user"
        },

        address: {
            country:String,
            state:String,
            district:String,
            taluka:String,
            villageOrCity:String,

            houseNo: String,
            societyOrStreet:String,
            areaorLandmark:String,
            pincode:String
        },

        subscription:{
            active:{
                type:Boolean,
                default:false
            },
            planType: String,
            startDate:Date,
            endDate: Date
        }
    },
    {timestamps:true}
);

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    next();
})

module.exports = mongoose.model("User",userSchema);