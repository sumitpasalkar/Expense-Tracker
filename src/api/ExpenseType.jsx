/* eslint-disable react-refresh/only-export-components */

import axios from "axios";


export const setExp = async (expenseData)=>{
const response =  await axios.post("http://localhost/expense_api/expense_type.php",expenseData);
return response.data;
}

export const getExp = async (id)=>{
    const response = await axios.get("http://localhost/expense_api/get_expense.php",{params : {id}});
    return response.data;
}


export const editExp = async (id)=>{
    const response = await axios.get("http://localhost/expense_api/edit_expense.php",{params : {id}});
    // console.log('API Response:', response.data);  // Log the full response to inspect its structure
    return response.data;
}


export const UpdateExp = async (expenseData)=>{
    const response = await axios.post("http://localhost/expense_api/edit_expense.php",expenseData , {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}