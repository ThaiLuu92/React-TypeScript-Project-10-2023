import React, { useState, useEffect, ChangeEvent } from 'react';
import { Avatar, Box, Button, Container, Input, Paper, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { I_User } from '../../Types/types';
import "./UserProfile.scss"
import { createData, getData, updateData } from '../../Services/API';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Redux/Slice/AuthSlice';
import UserProfile from './UserProfile';
import { Outlet, useNavigate } from 'react-router-dom';


const customTheme = createTheme({
    palette: {
        background: {
            default: '#F5F5F5',
        },
    },
});

export default function User() {
    const navigate = useNavigate()
  return (
      <ThemeProvider theme={customTheme}>
          <Container maxWidth="lg" sx={{ marginTop: '100px', marginBottom: '100px' }}>
              <Box display="flex" sx={{ padding: '20px' }}>
                  <Paper elevation={3} style={{ width: '250', padding: '30px', marginRight: '20px' }}>
                      <Avatar variant="rounded" sx={{ width: 200, height: 200, border: '0.5px solid #eee' }}>
                          <img
                              src="https://grn-admin.mpoint.vn/uploads/avatar-mac-dinh.png"
                              alt="Avatar"
                          />
                      </Avatar>
                      <input
                          type="file"
                          id="avatar-input"
                          accept="image/*"
                          style={{ display: 'none' }}
                      />
                      <Button
                          variant="outlined"
                          style={{ width: '100%' }}
                          onClick={() => document.getElementById('avatar-input')?.click()}
                      >
                          <i className="fa-solid fa-camera"></i> Thay đổi ảnh đại diện
                      </Button>
                      <div className="account-menu-left">
                          <p onClick={() => navigate("/User")}>Thông tin cá nhân</p>
                          <p onClick={() => navigate("/User/MyCourse")}>Khóa học đã mua</p>
                          <p onClick={() => navigate("/User/MyPayment")}>Lịch sử thanh toán</p>

                      </div>
                  </Paper>
                  <Paper elevation={3} style={{ flex: 1, padding: '20px' }}>
                     <Outlet/>
                  </Paper>
              </Box>
          </Container>
      </ThemeProvider>
  )
}
