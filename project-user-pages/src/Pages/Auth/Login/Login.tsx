import * as React from 'react';
import axios from 'axios';
import FormData from 'form-data';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, AuthState } from '../../../Redux/Slice/AuthSlice'; 
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./style.scss"

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: { auth: AuthState }) => state.auth.isLoggedIn);
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: Yup.string().required('Mật khẩu là bắt buộc'),
    });

    const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const email = values.email;
        const password = values.password;

        try {
            const response = await axios.get('http://localhost:3000/users', {
                params: {
                    email,
                    password,
                },
            });

            if (response.data.length > 0) {
                delete response.data[0].password;
                localStorage.setItem("loggedIn", JSON.stringify(response.data[0].id));
                dispatch(loginSuccess(response.data[0]));
                navigate('/');
            } else {
                dispatch(loginFailure());
                alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            }
        } catch (error) {
            // Handle error
        }

        setSubmitting(false);
    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs" sx={{
                marginTop: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                boxShadow: '3px 3px 3px 4px rgba(0, 0, 0, 0.1)', // Điều chỉnh giá trị box shadow ở đây
                padding: 2, // Padding để tạo khoảng trắng xung quanh Box (tùy chọn)
                marginBottom: 24,
                borderRadius: 5,
            }}>
                <CssBaseline />
                <Box
                    
                >
                    <Typography component="h1" variant="h3">
                        Đăng nhập
                    </Typography>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                {/* Email field */}
                                <div>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="email"
                                        label="Địa chỉ email"
                                        autoComplete="email"
                                    />
                                    <ErrorMessage name="email" component="div" className="error" />
                                </div>

                                {/* Password field */}
                                <div>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        autoComplete="current-password"
                                    />
                                    <ErrorMessage name="password" component="div" className="error" />
                                </div>

                                {/* Other form fields and buttons go here */}
                                {/* ... */}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    disabled={isSubmitting}
                                >
                                    Đăng nhập
                                </Button>
                            </Form>
                        )}
                    </Formik>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Quên mật khẩu
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/Register" variant="body2" >
                                    {"Bạn đã có tài khoản chưa ? Đăng ký"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
               
              
            </Container>
        </ThemeProvider>
    );
}