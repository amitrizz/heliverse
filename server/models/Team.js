import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
    id: Number,
    team_name: String,
    team_member:[]
});

// Create the model
const TeamDataModel = mongoose.model("teamlist", dataSchema);

export default TeamDataModel;
