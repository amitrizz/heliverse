import DataModel from '../models/DashBoard.js';
import TeamDataModel from '../models/Team.js'

class TeamController {
    static getAllTeam = async (req, res, next) => {
        try {
            const noOfPage = 20;
            let { skip } = req.body;
            if (!skip) {
                skip = 1;
            }

            const nextresult = (skip - 1) * noOfPage
            console.log(skip);
            const results = await TeamDataModel.find().skip(nextresult).limit(noOfPage);
            console.log(results);
            res.send({ data: "data", data: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static addTeam = async (req, res, next) => {
        try {
            const { id, team_name, teamUser } = req.body;
            // console.log(id);

            const team=await TeamDataModel.find({id:id});
            if(team){
                res.send({ data: "data", result: "Already Exist" });
                return;
            }

            const newData = new TeamDataModel({
                id: id,
                team_name: team_name,
                team_member: teamUser,
            });
            await newData.save();
            res.send({ data: "data", result: "result submitted" });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static getTeambyid = async (req, res, next) => {
        try {
            const id = req.params.id;

            const results = await TeamDataModel.findOne({ id: id });
            // console.log(results.team_member);
            let userList = [];
            results.team_member.forEach((obj) => {
                userList.push(obj.id)
            });
            await DataModel.find({ id: { $in: userList } })
                .then(result => {
                    userList=result;
                })
                .catch(err => {
                    console.error('Error:', err);
                });
            res.send({ data: "data", data: results,userList:userList });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
}
export default TeamController;