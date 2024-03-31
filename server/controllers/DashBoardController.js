import DataModel from '../models/DashBoard.js';


class DashBoardController {
    static loadUser = async (req, res, next) => {
        try {
            const noOfPage = 20;
            let { skip } = req.body;
            if (!skip) {
                skip = 1;
            }
            const nextresult = (skip - 1) * noOfPage
            // console.log(skip);
            const results = await DataModel.find().skip(nextresult).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static filterdata = async (req, res, next) => {
        try {
            const noOfPage = 20;
            let { skip, fieldtype } = req.body;
            if (!skip) {
                skip = 1;
            }
            console.log(fieldtype);

            let sortCriteria = {};
            sortCriteria[fieldtype] = 1
            // const type = fieldtype;
            const nextresult = (skip - 1) * noOfPage
            // console.log(skip);
            const results = await DataModel.find().sort(sortCriteria).skip(nextresult).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });

        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }


    static showData = async (req, res) => {
        try {
            const noOfPage = 30;
            const { skip } = req.body;
            const nextresult = (skip - 1) * noOfPage
            // console.log(skip);
            const results = await DataModel.find().skip(nextresult).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }

    static getUser = async (req, res) => {
        try {
            const noOfPage = 20;
            const { name } = req.body;
            // console.log(name);

            // Construct a regular expression object using the searchTerm variable
            const regexPattern = new RegExp(name, 'i');
            const results = await DataModel.find({ first_name: { $regex: regexPattern } }).limit(noOfPage);
            // console.log(results);
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static getUserByid = async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            const results = await DataModel.find({ id: id });
            console.log(results);
            res.send({ data: "data", data: results });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static Adduser = async (req, res) => {
        try {

            const { id, first_name, last_name, email, gender, avatar, domain, available } = req.body;
            // console.log(id);

            const newData = new DataModel({
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                avatar: avatar,
                domain: domain,
                available: available,
            });
            await newData.save();
            res.send({ data: "data", result: "result submitted" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static updateUserByid = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(id);
            const { first_name, last_name, email, gender, avatar, domain, available } = req.body;

            const user = await DataModel.findOne({ _id: id });
            console.log(user);
            const newData = {
                id:user.id,
                first_name: first_name,
                last_name: last_name,
                email: email,
                gender: gender,
                avatar: avatar,
                domain: domain,
                available: available,
            }
            const updatedUser = await DataModel.findByIdAndUpdate(id, newData, { new: true });

            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.send({ data: "data", result: "Update Sucessfully" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }
    static deleteUserByid = async (req, res) => {
        try {
            const id = req.params.id
            // const user = await DataModel.findOne({ id: id });
            console.log(id);
            const deletedUser = await DataModel.findByIdAndDelete({ _id:id });

            if (!deletedUser) {
                return res.status(404).json({ error: 'User not found' });
            }

            // res.json({ message: 'User deleted successfully' });
            res.send({ data: "data", result: "User deleted successfully" });
            // return res.status(201).send({ sataus: "success", message: " successfully registered", user: saved_user, token: token });
        }
        catch (error) {
            console.log(error);
            res.send({ error: "something is misssing in db" })
            // res.redirect("/error")
            // return res.status(500).send({ status: "failed", message: "Uable to register" });
        }
    }

}
export default DashBoardController;