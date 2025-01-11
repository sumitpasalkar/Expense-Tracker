/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { setExp } from "../api/ExpenseType";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

export const AddExpense = () => {
  const [expense, setExpense] = useState([]);  
  const [selectedExpenseType, setSelectedExpenseType] = useState({expense_type:''});
  const [formData , setFormData] = useState({amount:'',description:'', date:''});
  const [alertVisible , setAlertVisible] = useState({visibility : false , message : '' , severity :''});
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchExpenseType = async () => {
      try {
        const response = await fetch("http://localhost/expense_api/expense_type.php");
        const data = await response.json();
        setExpense(data.data); 
      } catch (error) {
        console.error("Error fetching expense types:", error);
      }
    };
    fetchExpenseType();
  }, []);

  const handleExpense = (e) => {
    setSelectedExpenseType({[e.target.name ] :e.target.value});
    console.log(e.target.value);
  };


  const handleInput = (e) =>{
    e.preventDefault();
    setFormData({...formData , [e.target.name] : e.target.value});
    console.log({...formData , [e.target.name] : e.target.value});
  }

  const submitForm = async (e) =>{
    e.preventDefault();

    const expenseData = {
        userId : localStorage.getItem("userId") ,
        expense_type : selectedExpenseType.expense_type ,
        amount : formData.amount,
        description : formData.description ,
        date : formData.date
    }
    try{

      const res = await setExp(expenseData);
      console.log('Response:', res);
    if(res.success){
        setAlertVisible({visibility : true , message :'Expense added successfully', severity :'success'});
        setFormData({amount:'', description:'', date:''});
        setSelectedExpenseType({expense_type:''});
        setTimeout(()=>{
          navigate("/expenseList");
        },1000)
    }else{
        setAlertVisible({visibility : true , message : 'Failed to add expense', severity :'error'});
    }
    }  catch(error){
        console.error('Error during form submission:', error);
        setAlertVisible({
          visibility: true,
          message: 'Something went wrong, please try again.',
          severity: 'error'
        });    
    }
    

    

  }


  return (
    <>
<div className="container mt-5">
        <h3 className="card-title">Add Expense</h3>
        {
                      alertVisible && (
                          <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
                      )
                  }
     
               <form onSubmit={submitForm} className="forms-sample">
        <div className="form-group">
          <label htmlFor="expense_type">Expense Type</label>
          <select
            className="form-control"
            id="formGroupExampleInput"
            name="expense_type"
            value={selectedExpenseType.expense_type}
            onChange={handleExpense}
            required
          >
            <option value="">Select an Expense Type</option>
            {expense.map((type , index) => (
              <option key={index} value={type.exp_type}>
                {type.exp_type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="text" className="form-control" id="amount" value={formData.amount} required onChange={handleInput} name="amount" placeholder="Amount" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name="description" value={formData.description} required onChange={handleInput} id="description" placeholder="Description" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInput} required id="date" placeholder="date" />
        </div>
        <div>
          <Button type="submit" variant="contained"  >ADD</Button>
        </div>
      </form>
          </div>


    </>
    
  );
};
