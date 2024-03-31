import { createSlice } from "@reduxjs/toolkit"

// Define initial state without data
const initialState = {
    data: [],
    currentstate:true,
    userid:"none",
};

// Fetch data outside the initial state and update state once data is fetched



export const dashboardSlice = createSlice({
    name: "MaintainState",
    initialState,
    reducers: {
        ChangeData: (state, actions) => {
            state.data = actions.payload;
        },
        PreviousButtonState: (state, actions) => {
            state.currentstate = actions.payload;
        }
    }
})

export const { ChangeData,PreviousButtonState } = dashboardSlice.actions
export default dashboardSlice.reducer