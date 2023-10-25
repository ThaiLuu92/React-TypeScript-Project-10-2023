import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { UserEntity } from '../../../Entity/User.Entity';
import { useNavigate } from 'react-router-dom';
import { createData, getData } from '../../../Services/API';
import "./style.scss"


const validationSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Tên tài khoản là bắt buộc')
        .min(6, 'Tên tài khoản phải có ít nhất 6 ký tự'),
    email: Yup.string()
        .required('Email là bắt buộc')
        .email('Email không hợp lệ'),
    password: Yup.string()
        .required('Mật khẩu là bắt buộc')
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: Yup.string()
        .required('Nhập mật khẩu là bắt buộc')
        .oneOf([Yup.ref('password'),], 'Mật khẩu phải trùng khớp')
});

const Register = () => {

    const initialValues = {
        id: uuidv4(),
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        status:true,
        role: false,
        avatar: '',
        phone:'',
        address:'',
        created_at: new Date().toLocaleDateString(),
        updated_at: "",
        myCourses: []
    };
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
    const checkEmail = async (email: string) => {
        const users = await getData("users")
        const existingUsers = users.find((user: any) => user.email === email);
        return existingUsers

    };

    const handleSubmit = async (values: {
        id: string;
        userName: string;
        email: string;
        password: string;
        confirmPassword: string;
        status:boolean;
        // role: false;
        // avatar: string;
        // phone: string;
        // address: string;
        // created_at: string;
        // updated_at: string;
        // myCourses: [];
    }) => {

        const emailAlreadyExists = await checkEmail(email);

        if (emailAlreadyExists) {
            setEmailExists(true);

            return alert('Địa chỉ email đã tồn tại.');
            
        } else {

            setEmailExists(false);
            const registrationData = {
                email: values.email, 
                id: uuidv4(), 
                userName: values.userName, 
                password: values.password, 
                role: false,
                status: true,
                fullname:'',
                avatar: '',
                phone: '',
                address: '',
                created_at: new Date().toLocaleDateString(),
                updated_at: "",
                myCourses: []
            };
           const createUser = await createData("users", registrationData)
            navigate("/Login")
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '3px 3px 3px 4px rgba(0, 0, 0, 0.1)',
            padding: 2,
            marginBottom: 15,
            borderRadius: 5,
        }}>
            <CssBaseline />
            <div>
                <Typography component="h1" variant="h3">
                    Đăng ký
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Tên tài khoản"
                                        name="userName"
                                        autoComplete="user-name"
                                    />
                                    <ErrorMessage name="userName" component="div" className="error" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Địa chỉ email"
                                        name="email"
                                        autoComplete="email"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Mật khẩu"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Nhập lại mật khẩu"
                                        name="confirmPassword"
                                        type="password"
                                        autoComplete="new-password"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="error" />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                Đăng ký
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/Login" variant="body2">
                            Bạn đã có tài khoản chưa? Đăng nhập
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}></Box>
        </Container>
    );
};

export default Register;
