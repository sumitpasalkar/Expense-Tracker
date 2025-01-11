import { useEffect, useState } from "react"
import { getExp } from "../api/ExpenseType"
import { Link } from "react-router-dom";
import { expDel } from "../api/RegisterUser";
import { Alert, Button } from "@mui/material";
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone';
import { expExcel } from "../api/ExcelExport";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ExpenseList = () =>{

const getId = localStorage.getItem("userId");
const [getExpense , setExpense] = useState([]);
const [alertVisible , setAlertVisible] = useState({visibility : false , message : '' , severity :''});
useEffect(()=>{

        fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getId])
    const fetchExpenses = async () =>{
            
        const res = await getExp(getId);

        if(res.success){
            console.log(res.data);
            setExpense(res.data);
        }else{
            console.log(res.message);
        }
    }

const handleDelete = async (id) =>{
const res = await expDel(id);
if(res.success){
    setAlertVisible({visibility:true , message : 'Expense Deleted Successfully',severity:'success'});
    fetchExpenses();
}else{
    setAlertVisible({visibility:true , message : res.message || 'Failed to delete',severity:'error'});

}
}

const handleClick = async () => {
    try {
      await expExcel(getId); 
    } catch (error) {
      console.error("Error during file download:", error);
    }
  };

    return (
        <>
            <div className="container mt-5">
                <h2>Expense List</h2>
                {
                    alertVisible && 
                    <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
                }
                <Button variant="contained" color="success" className="mb-3  float-right" startIcon={<CloudDownloadTwoToneIcon />} onClick={handleClick} >Download</Button>

                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Sr No.</th>
                    <th scope="col">Expense Type</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getExpense.map( (exp , index )=>(
                            <tr key={exp.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{exp.expense_type}</td>
                                <td>{exp.description}</td>
                                <td>{exp.date}</td>
                                <td>{exp.amount}</td>
                                <td>
                                <Link to={"/editExpense/"+exp.id}>
                                    <EditIcon/>
                                </Link>
                                    
                                    <Button onClick={()=>handleDelete(exp.id)} >

                                    <DeleteIcon/>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
                </table>
            </div>
        </>
    )
}