import React, { useState } from 'react'; // Added useState import
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
    const navigate = useNavigate();
    // This is the line that was missing:
    const [serverError, setServerError] = useState(null); 

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().min(3, "Too short!").required("Required"),
            password: Yup.string().min(8, "Must be 8+ chars").required("Required"),
            password_confirmation: Yup.string()
                .oneOf([Yup.ref('password'), null], "Passwords must match")
                .required("Required"),
        }),
        onSubmit: (values) => {
            setServerError(null);
            fetch('/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            })
            .then((res) => {
                if (res.ok) {
                    navigate('/login');
                } else {
                    // This updates the serverError state if the backend rejects the signup
                    res.json().then((err) => setServerError(err.errors ? err.errors[0] : "Signup failed"));
                }
            });
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
            <div style={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                padding: '40px', 
                borderRadius: '12px', 
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '400px',
                color: '#333' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Join PawsStay</h2>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Create an account to manage stays.</p>
                
                {/* Error Banner */}
                {serverError && (
                    <div style={{ 
                        color: '#721c24', 
                        backgroundColor: '#f8d7da', 
                        border: '1px solid #f5c6cb', 
                        padding: '10px', 
                        borderRadius: '4px', 
                        marginBottom: '15px', 
                        textAlign: 'center' 
                    }}>
                        {serverError}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Username</label>
                        <input
                            name="username"
                            type="text"
                            {...formik.getFieldProps('username')}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {formik.touched.username && formik.errors.username ? <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{formik.errors.username}</div> : null}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password</label>
                        <input
                            name="password"
                            type="password"
                            {...formik.getFieldProps('password')}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {formik.touched.password && formik.errors.password ? <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{formik.errors.password}</div> : null}
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm Password</label>
                        <input
                            name="password_confirmation"
                            type="password"
                            {...formik.getFieldProps('password_confirmation')}
                            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                        {formik.touched.password_confirmation && formik.errors.password_confirmation ? <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{formik.errors.password_confirmation}</div> : null}
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;