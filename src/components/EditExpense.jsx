import { useEffect, useState  } from "react";
import { editExp, UpdateExp } from "../api/ExpenseType";
import Alert from '@mui/material/Alert';
import { useNavigate , useParams } from "react-router-dom";
import { Button } from "@mui/material";

export const EditExpense = () =>{
    const [expense, setExpense] = useState([]);  
    const [selectedExpenseType, setSelectedExpenseType] = useState({expense_type:''});
    const [formData , setFormData] = useState({amount:'',description:'', date:''});
    const [alertVisible , setAlertVisible] = useState({visibility : false , message : '' , severity :''});
    const navigate = useNavigate();
    const {id} = useParams();


    
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
    const fetchExpenseData = async () =>{
        try{
            const res = await editExp(id);
            if(res.success){
                setFormData({
                    amount: res.data[0].amount,
                    description: res.data[0].description,
                    date: res.data[0].date
                  });
                
                  setSelectedExpenseType({ expense_type: res.data[0].expense_type });
                }else{
                console.log('error');
            }
        }catch(error){
            console.log(error);
        }
    }
    fetchExpenseData();
    fetchExpenseType();
  }, [id]);
  const handleExpense = (e) => {
    setSelectedExpenseType({[e.target.name ] :e.target.value});
    // console.log(e.target.value);
  };

  

  const handleInput = (e) =>{
    e.preventDefault();
    setFormData({...formData , [e.target.name] : e.target.value});
    // console.log({...formData , [e.target.name] : e.target.value});
  }


  
    const submitForm = async (e) =>{
      e.preventDefault();
  
      const expenseData = {
         id : id ,
          expense_type : selectedExpenseType.expense_type ,
          amount : formData.amount,
          description : formData.description ,
          date : formData.date
      }
      try{
  
        const res = await UpdateExp(expenseData);
        console.log('Response:', res);
      if(res.success){
          setAlertVisible({visibility : true , message :'Expense Updated successfully', severity :'success'});
          setTimeout(()=>{
            navigate("/expenseList");
          },1000)
      }else{
          setAlertVisible({visibility : true , message : 'Failed to Update expense', severity :'error'});
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

<h2>Edit Expense</h2>
  {
                      alertVisible && (
                          <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
                      )
                  }
<form onSubmit={submitForm}>
        <div className="form-group">
          <label htmlFor="expense_type">Expense Type</label>
          <select
            className="form-control"
            id="formGroupExampleInput"
            name="expense_type"
            value={selectedExpenseType.expense_type}
            onChange={handleExpense}
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
          <input type="text" className="form-control" id="amount" value={formData.amount} onChange={handleInput} name="amount" placeholder="Amount" />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input type="text" className="form-control" name="description" value={formData.description} onChange={handleInput} id="description" placeholder="Description" />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" name="date" value={formData.date} onChange={handleInput} id="date" placeholder="date" />
        </div>
        <div>
          <Button type="submit" variant="contained">UPDATE</Button>
        </div>
      </form>
</div>
        </>
    )
}