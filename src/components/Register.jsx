import { useState } from "react"
import { postData } from "../api/RegisterUser";
import { useNavigate } from "react-router-dom"; 
import { Link  } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { Button } from "@mui/material";

export const Register = ()=>{

    const [value , setValue ] = useState({ email:'',address:'',password:'',date:'' , name:'' , income:'' , contact:'' });
    const [alertVisible , setAlertVisible] = useState({visibility : false , message : '' , severity :''});

    const navigate = useNavigate();
    const handleInput = (e) => {
        e.preventDefault();
        setValue({...value , [e.target.name] : e.target.value})
        // console.log({...value , [e.target.name] : e.target.value});
    }


    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = {email:value.email , address:value.address , password:value.password , date:value.date , name:value.name , income : value.income , contact:value.contact};
        try{
   const res = await postData(formData);


        if(res.success){
            setAlertVisible({visibility : true , message : res.message || 'User Register Successfully' , severity :'success'});
            setValue({email :'',address:'', password:'', date:'' ,name:'',income:'', contact:''});
            setTimeout(()=>{
                navigate("/login");
            },1000)
        }else{
            setAlertVisible({visibility : true , message : res.message || 'Email already exist' , severity :'error'});
 
        }
        // eslint-disable-next-line no-unused-vars
        }catch(error){
            setAlertVisible({visibility : true , message :  'Failed to register user' , severity :'error'});
        }
     
    }
    
    return(
        <>
      <div className="d-flex justify-content-center align-items-center vh-100"  style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100vh", 
        }}>
  <div className="card" style={{ width: "40rem" }}>
    <div className="card-body">
      <h2 className="card-title">Register</h2>
      {alertVisible && (
        <Alert severity={alertVisible.severity}>{alertVisible.message}</Alert>
      )}
      <form onSubmit={handleSubmit} className="forms-sample">
      <div className="row">
            <div className="col-md-6">
                <div className="form-group ">
                        <label htmlFor="name">Name</label>   
                                <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                onChange={handleInput}
                value={value.name}
                required
            />
                </div>
            </div>

            <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            onChange={handleInput}
            value={value.email}
            required
          />
                </div>
            </div>
      </div>

<div className="row">
      <div className="col-md-6">
            <div className="form-group">
                 <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            onChange={handleInput}
            value={value.address}
            required
          />
            </div>
      </div>
      <div className="col-md-6">
            <div className="form-group">
                 <label htmlFor="contact">Contact</label>
          <input
            type="text"
            className="form-control"
            id="contact"
            name="contact"
            onChange={handleInput}
            value={value.contact}
            required
          />
            </div>
      </div>
</div>


<div className="row">
      <div className="col-md-6">
            <div className="form-group">
                 <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleInput}
            value={value.password}
            required
          />
            </div>
      </div>
      <div className="col-md-6">
            <div className="form-group">
                  <label htmlFor="income">Monthly Income</label>
          <input
            type="number"
            className="form-control"
            id="income"
            name="income"
            onChange={handleInput}
            value={value.income}
            required
          />
            </div>
      </div>
</div>

<div className="row">
      <div className="col-md-6">
            <div className="form-group">
        <label htmlFor="date">Date</label>
                <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    onChange={handleInput}
                    value={value.date}
                required
                />
            </div>
      </div>
</div>
        <div className="buttons text-center mt-4">
          <Button type="submit" variant="contained">
            REGISTER
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
  <Button variant="contained">
    LOGIN
  </Button>
</Link>
        </div>
      </form>
    </div>
  </div>
</div>

           
        </>
    )
}