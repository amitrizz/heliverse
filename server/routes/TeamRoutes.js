import express from 'express';
const teamrouter = express.Router();
import TeamController from '../controllers/TeamController.js';



//public routes
teamrouter.get('/getallteam',TeamController.getAllTeam);
teamrouter.get('/teambyid/:id',TeamController.getTeambyid);
teamrouter.post('/addteam',TeamController.addTeam);


export default teamrouter;