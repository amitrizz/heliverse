import React, { useEffect, useState } from 'react'
import axios from "axios"
import './DashBoard.css'
import { useDispatch, useSelector } from "react-redux"
import { ChangeData, PreviousButtonState } from '../features/dashbaordSlice'

function DashBoard() {
    const data = useSelector(state => state.data)
    const isbuttonDisble = useSelector(state => state.currentstate)
    const [fileContent, setFileContent] = useState(false);

    const [skip, setSkip] = useState(1);

    const dispatch = useDispatch();

    const AddMoreDataToTable = async () => {
        try {
            // console.log(skip);
            setFileContent(false);
            const response = await axios.post(`http://localhost:7000/api/dashboard/loaddata`, { skip: skip + 1 });
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
            let response = await axios.delete(`http://localhost:7000/api/dashboard/deleteuser/${id}`);
            console.log(response.data);
            alert(response.data.result)
            response = await axios.get(`http://localhost:7000/api/dashboard/loaddata`);
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
            const response = await axios.post(`http://localhost:7000/api/dashboard/loaddata`, { skip: skip - 1 });
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

    useEffect(() => {

        const fetchData = async () => {
            try {
                // Send the request with the configured headers
                const response = await axios.get(`http://localhost:7000/api/dashboard/loaddata`);
                dispatch(ChangeData(response.data.data))
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
                        {
                            data.map((obj) => {
                                return (
                                    <div class="card" >
                                        <img src={obj.avatar} width={"50px"} height={"50px"}  alt="..."/>
                                            <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <button onClick={()=>DeleteUserbyId(obj._id)} class="btn btn-primary">Delete User</button>
                                            </div>
                                            <li key={obj.id}> {obj.id} </li>
                                    </div>
                                )
                            })
                        }
                        <button onClick={RemoveMoreDataToTable} disabled={isbuttonDisble}>Pre PAge</button>
                        <button onClick={AddMoreDataToTable}>Next PAge</button>
                    </div>
                    : <div className='dashloading'>Loading..</div>}
            </div>
        </div>
    )
}

export default DashBoard
