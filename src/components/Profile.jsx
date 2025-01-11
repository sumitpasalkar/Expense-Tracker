import { useEffect, useState } from "react";
import { fetchProf } from "../api/RegisterUser";
import { upProf } from "../api/RegisterUser";
import { Alert, Button } from "@mui/material";

export const Profile = () => {
    const [profile, setProfile] = useState({ name: '', income: '', email: '', password: '', contact: '' });
    const [alert, setAlert] = useState({ visibility: false, severity: '', message: '' });
    const id = localStorage.getItem("userId");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const res = await fetchProf(id);

        if (res.success) {
            setProfile(res.data);
        } else {
            console.error('Failed to fetch profile');
        }
    };

    const handleInput = (e) => {
        e.preventDefault();
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const setProf = async (e) => {
        e.preventDefault();
        const { name, contact, income, email, password } = profile;
        
        // Basic validation before submitting
        if (!name || !contact || !income || !email || !password) {
            setAlert({ visibility: true, severity: 'error', message: 'All fields are required' });
            return;
        }

        const formData = { name, contact, income, email, password, id };
        const res = await upProf(formData);
        
        if (res.success) {
            setAlert({ visibility: true, severity: 'success', message: 'Profile Updated' });
        } else {
            setAlert({ visibility: true, severity: 'error', message: 'Failed To Update' });
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card" style={{ width: "100%", maxWidth: "50rem" }}>
                    <div className="card-body">
                        <h2 className="card-title">Profile</h2>
                        {alert.visibility && (
                            <Alert severity={alert.severity}>{alert.message}</Alert>
                        )}
                        <form onSubmit={setProf}>
                            <div className="form-group">
                                <label htmlFor="name">Name: </label>
                                <input type="text" className="form-control" value={profile.name} onChange={handleInput} name="name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="income">Monthly Income</label>
                                <input type="number" className="form-control" value={profile.income} onChange={handleInput} name="income" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <input type="text" className="form-control" value={profile.contact} onChange={handleInput} name="contact" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" value={profile.email} onChange={handleInput} name="email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" value={profile.password} onChange={handleInput} name="password" />
                            </div>
                            <div>
                                <Button variant="contained" type="submit">Update</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
