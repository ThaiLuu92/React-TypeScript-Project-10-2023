import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AuthState, logout } from '../../Redux/Slice/AuthSlice';


const settings = ['Profile', 'Dashboard', 'Logout'];

function Header() {
   
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const dispatch = useDispatch();
    // Chuyển trang
    const navigate = useNavigate();

    // Đổi trạng thái sau khi login
    const userLogin = useSelector((state: { auth: AuthState }) => state.auth);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleMenuItemClick = (setting:string) => {
        // Xử lý hành động tương ứng với từng menu item
        if (setting === 'Profile') {
            // Điều hướng đến trang Profile
            navigate('/User');
        } else if (setting === 'Account') {
            // Xử lý hành động cho menu item 'Account'
            // Thêm mã xử lý tại đây
        } else if (setting === 'Dashboard') {
            // Xử lý hành động cho menu item 'Dashboard'
            // Thêm mã xử lý tại đây
        } else if (setting === 'Logout') {
            dispatch(logout());
            localStorage.removeItem("loggedIn");
            navigate('/Login');
        }
        handleCloseUserMenu()

    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // const handleOpenUserProfile = (acction: string) => {
    //     setAnchorElUser(null);
    //     if (acction === 'Profile') {
    //         navigate('/UserProfile'); // Điều hướng người dùng về trang đăng nhập
    //     }
    // };
   

    return (
        <AppBar position="static" >
            <Container >
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                      TRANG CHỦ
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            
                                <MenuItem onClick={() => navigate('/Courses')} >
                                <Typography textAlign="center">Danh sách khóa học</Typography>
                                </MenuItem>
                           
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO 
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                      
                            <Button
                               
                                onClick={() => navigate('')}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                            Giới thiệu
                            </Button>
                        <Button

                            onClick={() => navigate('/Courses')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Danh sách khóa học
                        </Button>   
                        <Button

                            onClick={() => navigate('')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Liên hệ
                        </Button>   
                       
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {userLogin.isLoggedIn === false ? (
                            <>
                                <Button
                                    sx={{ marginRight: '20px' }}
                                    variant="contained"
                                    color="warning"
                                    onClick={() => navigate('/Register')}
                                >
                                    Đăng Ký
                                </Button>
                                <Button variant="contained" color="success" onClick={() => navigate('/Login')}>
                                    Đăng Nhập
                                </Button>
                            </>
                        ) : (
                            <>
                                    {/* <Button variant="contained" sx={{ marginRight: '20px' }}  color="success" onClick={handleLogout}>
                                        Đăng Xuất
                                    </Button> */}
                                    <Tooltip title="Open settings">

                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                            </>
                        )}
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;