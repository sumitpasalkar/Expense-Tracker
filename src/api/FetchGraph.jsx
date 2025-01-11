import axios from "axios";


export const DailyGraph = async(id) =>{
    const response = await axios.get("http://localhost/expense_api/Graph.php",{params:{id}});

    return response.data;
}

export const MonthGraph = async(user_id) =>{
    const response = await axios.post(`http://localhost/expense_api/Graph.php?user_id=${user_id}`);
    return response.data;
}