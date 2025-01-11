import { useEffect, useState } from "react";
import { delInc, getInc  } from "../api/Income";
import { Alert, Button } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const IncomeList = () => {
    const [getIncome, setIncome] = useState([]);
    const userId = localStorage.getItem("userId");
    const [alertVisible, setAlertVisible] = useState({ visibility: false, message: '', severity: '' });

    useEffect(() => {
        if(userId){
   fetchIncome();
        }
    }, [userId]);

    const fetchIncome = async () => {
        const res = await getInc(userId);
        console.log("Income response:", res);  
        if (res.success) {
            setIncome(res.data);
                // setAlertVisible({ visibility: true, message: res.message, severity: 'success' });
        } else {
            // setAlertVisible({ visibility: true, message: 'No income data available.', severity: 'error' });
        }
    };
    const handleDelete = async (delId) => {
        const res = await delInc(delId);

        if(res.success){
            setAlertVisible({ visibility: true, message: 'Income Deleted Successfully', severity: 'success' });
            fetchIncome();
        }else{
            setAlertVisible({ visibility: true, message: 'Failed to delete', severity: 'error' });
        }
    }
    return (
        <>
            <div className="container mt-5">
                <h2>Income List</h2>
                {
                    alertVisible.visibility &&
                    <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
                }
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            getIncome.map((inc, index) => (
                                <tr key={inc.id}>
                                    <th scope="row">{index + 1}</th>
                                    <th>{inc.amount}</th>
                                    <th>{inc.date}</th>
                                    <th>
                                        <Link to={"/editIncome/"+inc.id} ><EditIcon/></Link>
                                        <Button onClick={ () =>handleDelete(inc.id)} ><DeleteIcon/></Button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};
