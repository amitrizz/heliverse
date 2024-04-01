import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState, SetUserIdForUpdate } from '../../features/dashbaordSlice'

function DashBoard() {

    const navigate = useNavigate()

    const data = useSelector(state => state.data)
    const isbuttonDisble = useSelector(state => state.currentstate)
    const [fileContent, setFileContent] = useState(false);

    const [skip, setSkip] = useState(1);

    const dispatch = useDispatch();

    const AddMoreDataToTable = async () => {
        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`https://heliverse-mg68.onrender.com/api/dashboard/loaddata`, { skip: skip + 1 });
            setSkip(skip + 1);
            dispatch(ChangeData(response.data.data))
            dispatch(PreviousButtonState(false));
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const DeleteUserbyId = async (id) => {
        try {
            // console.log(skip);
            setFileContent(false);
            let response = await axios.delete(`https://heliverse-mg68.onrender.com/api/dashboard/deleteuser/${id}`);
            console.log(response.data);
            alert(response.data.result)
            response = await axios.get(`https://heliverse-mg68.onrender.com/api/dashboard/loaddata`);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
            // setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const RemoveMoreDataToTable = async () => {

        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`https://heliverse-mg68.onrender.com/api/dashboard/loaddata`, { skip: skip - 1 });
            setSkip(skip - 1);
            dispatch(ChangeData(response.data.data))
            if (response.data.data[0].id == 1) {
                dispatch(PreviousButtonState(true));
            }
            setFileContent(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const RedirectToUpdate = (id) => {
        dispatch(SetUserIdForUpdate(id));
        navigate("/updateuser")
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`https://heliverse-mg68.onrender.com/api/dashboard/loaddata`);
                dispatch(ChangeData(response.data.data))
                console.log(response.data.data[0].avatar);
                if (response.data.data[0].id == 1) {
                    dispatch(PreviousButtonState(true));
                }
                setFileContent(true);
                //   setAllemployee(response)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className='DashBoard'>
            <div className='Dashbody'>
                {fileContent ?
                    <div className='dashcontent'>
                        <button onClick={RemoveMoreDataToTable} disabled={isbuttonDisble}>Pre PAge</button>
                        <button onClick={AddMoreDataToTable}>Next PAge</button>
                        {
                            data.map((obj) => {
                                return (
                                    <div class="card" style={{ "margin": "10px" }}>
                                        <img src={obj.avatar} width={"50px"} height={"50px"} alt="..." />
                                        <div class="card-body">
                                            <div>
                                                <h5 class="card-title">Name : {obj.first_name} {obj.last_name}</h5>
                                                <h5 class="card-title">Email: {obj.email}</h5>
                                                <h5 class="card-title">Gender: {obj.gender}</h5>
                                                <h5 class="card-title">Domain: {obj.domain}</h5>
                                            </div>
                                            <div>

                                                <button onClick={() => DeleteUserbyId(obj._id)} class="btn btn-primary">Delete User</button>
                                                <button style={{ "marginLeft": "10px" }} onClick={() => RedirectToUpdate(obj._id)} class="btn btn-primary">Update User</button>
                                            </div>
                                        </div>
                                        {/* <li key={obj.id}> {obj.id} </li> */}
                                    </div>
                                )
                            })
                        }

                    </div>
                    : <div className='dashloading'>Loading..</div>}
            </div>
        </div>
    )
}

export default DashBoard
