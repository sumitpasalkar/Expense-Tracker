import { useEffect, useState } from "react"
import { Alert, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { indvIncome ,editInc} from "../api/Income";
export const EditIncome = () => {
    const [income , setIncome] = useState({date:'', amount:''});
    const [alert , setAlert] = useState({visible:false , severity :'' , message :''});
    const {id} = useParams();
    const navigate = useNavigate();

    const handleInput = (e)=>{
        setIncome({...income , [e.target.name] : e.target.value});
    }

    useEffect(()=>{
        fetchIncome();
    },[id])
    const fetchIncome = async () =>{
        const res =  await indvIncome(id);
        if(res.success){
            setIncome(res.data);
        }else{
            console.error("error");
        }
    }

    const editIncome = async (e)=>{
        e.preventDefault();
        const formData = {amount:income.amount , date:income.date , id: id}
        const res = await editInc(formData);
        if(res.success){
            setAlert({visible:true , message :'Income Edited' , severity : 'success'})
            setTimeout(()=>{
                navigate("/incomelist");
            },1000);
        }else{
            setAlert({visible:true , message :'Failed to edit' , severity : 'error'})
            // setTimeout(()=>{
            //     navigate("/incomelist");
            // },1000);       
         }
    }

    return (
        <>
            <div className="container mt-5">
                <form onSubmit={editIncome}>
                    <h2>Edit Income</h2>
                    {
                        alert && (
                            <Alert severity={alert.severity}>{alert.message}</Alert>
                        )
                    }
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="text" name="amount" value={income.amount} onChange={handleInput} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" value={income.date} onChange={handleInput} className="form-control" />
                    </div>
                    <Button type="submit" variant="contained">Edit</Button>
                </form>
            </div>
        </>
    )
}