import { useState } from "react";
import { validate } from "../api/RegisterUser";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();

  const [sendData, setSendData] = useState({ email: "", password: "" });
  // eslint-disable-next-line no-unused-vars
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [alertData, setAlertData] = useState({ visible: false, message: "", severity: "" });

  const handleInput = (e) => {
    setSendData({ ...sendData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email: sendData.email, password: sendData.password };
  
    try {
      const res = await validate(formData); 
      console.log("Login Response:", res); 
  
      if (res.success) {
        setUserId(res.userId);
        localStorage.setItem("userId", res.userId);
        
        setAlertData({ visible: true, message: "User login successful", severity: "success" });
        setSendData({ email: "", password: "" });
  
        navigate("/home");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (error) {
      setAlertData({ visible: true, message: "Failed to login user", severity: "error" });
    }
  };
  
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100vh", 
        }}
      >
        <div className="card" style={{ width: "24rem" }}>
          <div className="card-body">
            <h2 className="card-title">Login</h2>
            {alertData.visible && (
              <Alert severity={alertData.severity}>{alertData.message}</Alert>
            )}
            <form onSubmit={handleSubmit} className="forms-sample">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={sendData.email}
                  onChange={handleInput}
                  required
                />
                <small id="emailHelp" className="form-text text-muted">
                  We will never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={sendData.password}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="buttons text-center">
                <Button type="submit" variant="contained">
                  Login
                </Button>
                <Link to={"/register"} >
                <Button variant="contained">
                REGISTER
              </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
