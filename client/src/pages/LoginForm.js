import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Added this import

function LoginForm({ setUser }) {
    const navigate = useNavigate(); // Initialize the navigate hook

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    // 1. Store the JWT for session persistence
                    localStorage.setItem('jwt', data.token);
                    
                    // 2. Update the global user state in App.js
                    setUser(data.user);
                    
                    // 3. Redirect to the Pets Dashboard immediately
                    navigate('/pets'); 
                } else {
                    alert(data.error || "Login failed. Please check your credentials.");
                }
            })
            .catch(err => alert("Server error. Please try again later."));
        },
    });

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' 
        }}>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                padding: '40px', 
                borderRadius: '12px', 
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '400px',
                color: '#333' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login to PawsStay</h2>
                
                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
                        <input 
                            name="username" 
                            {...formik.getFieldProps('username')} 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '4px', 
                                border: formik.touched.username && formik.errors.username ? '2px solid red' : '1px solid #ccc' 
                            }}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{formik.errors.username}</div>
                        ) : null}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            {...formik.getFieldProps('password')} 
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '4px', 
                                border: formik.touched.password && formik.errors.password ? '2px solid red' : '1px solid #ccc' 
                            }}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{formik.errors.password}</div>
                        ) : null}
                    </div>

                    <button type="submit" style={{ 
                        padding: '12px', 
                        background: '#27ae60', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginTop: '10px'
                    }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;