import mongoose from "mongoose";

const file = [
    {
        "id": 1,
        "first_name": "Anet",
        "last_name": "Doe",
        "email": "adoe0@comcast.net",
        "gender": "Female",
        "avatar": "https://robohash.org/sintessequaerat.png?size=50x50&set=set1",
        "domain": "Sales",
        "available": false
    }
]
// Define the schema
const dataSchema = new mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    avatar: String,
    domain: String,
    available: String,
});

// Create the model
const DataModel = mongoose.model("profile", dataSchema);

export default DataModel;
