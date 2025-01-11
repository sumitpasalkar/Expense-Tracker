import { useState } from "react"
import { setInc } from "../api/Income";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
export const DailyIncome = () => {
    const [income , setIncome] = useState({date:'', amount:''});
    const [alert , setAlert] = useState({visible:false , severity :'' , message :''});
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setIncome({...income , [e.target.name] : e.target.value});
    }

    const AddIncome = async (e) =>{
        e.preventDefault();

        const formData = {amount:income.amount, date:income.date , user_id : userId};
        const res = await setInc(formData);

        if(res.success){
            setAlert({visible:true,severity:'success',message:'Income Added Successfully'});
            setIncome({date:'' , amount:''})
            setTimeout(()=>{
                navigate('/incomelist');
            },2000);
        }else{
            setAlert({visible:false,severity:'error',message:'Failed to add income'});
        }

    }

    return (
        <>
        <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{width:"50rem"}}>
                    <div className="card-body">
                    <h2 className="card-title">Daily Income</h2>
                    {
                        alert && (
                            <Alert severity={alert.severity}>{alert.message}</Alert>
                        )
                    }
                     <form onSubmit={AddIncome} className="forms-sample">
                  
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" name="amount" value={income.amount} onChange={handleInput} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" value={income.date} onChange={handleInput} className="form-control" />
                    </div>
                    <Button type="submit" variant="contained">Add</Button>
                </form>
                    </div>

                </div>
        </div>
            <div className="container mt-5">
               
            </div>
        </>
    )
}