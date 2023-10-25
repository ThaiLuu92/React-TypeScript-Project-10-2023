import * as React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, AuthState } from '../../Redux/Slice/appSlice';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
interface FormDataLogin {
    email: string;
    password: string;
}
export default function Login() {
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: { app: AuthState }) => state.app.isLoggedIn);
    const onSubmit = (data: FormDataLogin) => {
       
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.email.value;
        const password = event.currentTarget.password.value;
        try {
            // Gửi yêu cầu đăng nhập đến server và kiểm tra thông tin
            const response = await axios.get('http://localhost:3000/admin', {
                params: {
                    email,
                    password,
                },
            });

            if (response.data) {
                // Đăng nhập thành công
                dispatch(loginSuccess({ email, password }));
                localStorage.setItem("loggedIn", JSON.stringify(response.data[0].id));
                alert('Đăng nhập thành công');
                navigate('/');
            } else {
                // Đăng nhập thất bại
                dispatch(loginFailure());
                alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            }
        } catch (error) {
            // Xử lý lỗi khi gửi yêu cầu đăng nhập
            console.error('Lỗi đăng nhập:', error);
            dispatch(loginFailure());
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '3px 3px 3px 4px rgba(0, 0, 0, 0.1)', // Điều chỉnh giá trị box shadow ở đây
                        padding: 2, // Padding để tạo khoảng trắng xung quanh Box (tùy chọn)
                        marginBottom: 24,
                        borderRadius: 5,
                    }}
                >
                    <Typography component="h1" variant="h3">
                        Đăng nhập
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Địa chỉ email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                        <Grid container>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}