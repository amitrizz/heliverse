import express from 'express';
const teamrouter = express.Router();
import TeamController from '../controllers/TeamController.js';



//public routes
teamrouter.get('/loaddata',TeamController.loadUser);
// router.post('/loaddata', DashBoardController.loadUser);


// router.post('/showdata', DashBoardController.showData);
// router.post('/filter', DashBoardController.filterdata);



export default teamrouter;