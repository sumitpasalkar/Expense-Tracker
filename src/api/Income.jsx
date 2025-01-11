import axios from "axios";


export const setInc = async (data) =>{
    const result = await axios.post("http://localhost/expense_api/add_income.php",data);
    return  result.data;

}

export const getInc = async (id) =>{
    const result = await axios.get("http://localhost/expense_api/income_list.php",{params : {id}});
    return  result.data;

}

export const indvIncome = async (id)=>{
    const result = await axios.get("http://localhost/expense_api/edit_income.php",{params : {id}});
    return result.data;
}

export const editInc = async (data)=>{
    const result = await axios.post("http://localhost/expense_api/edit_income.php",data);
    return result.data;
}

export const delInc = async (id) => {
    const result = await axios.delete("http://localhost/expense_api/edit_income.php", { data: { id } });
    return result.data;
}
