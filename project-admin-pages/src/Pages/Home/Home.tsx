import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SlideBar from '../../Components/SlideBar/SlideBar'
import { Box, Card, CardContent, Link } from '@mui/material'
import Typography from '@mui/material/Typography';
import NavBar from '../../Components/NavBar/NavBar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Orders from './Orders';
import Title from './Title';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Home() {
  const [userData, setUserData] = useState<any[]>([]);
  const [courseData, setCourseData] = useState<any[]>([]);
  const [lessonData, setLessonData] = useState<any[]>([]);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [catagoryData, setCatagoryData] = useState<any[]>([]);
  useEffect(() => {
    // Địa chỉ URL của JSON server cho từng tài nguyên
    const userApiUrl = 'http://localhost:3000/users';
    const courseApiUrl = 'http://localhost:3000/japaneseCourses';
    const lessonApiUrl = 'http://localhost:3000/lessons';
    const orderApiUrl = 'http://localhost:3000/oder';
    const catagoryApiUrl = 'http://localhost:3000/categorys';


    // Hàm lấy dữ liệu từ API bằng Axios
    const fetchData = async (apiUrl: string, setData: React.Dispatch<React.SetStateAction<any[]>>) => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Gọi hàm fetchData để lấy dữ liệu từ các tài nguyên
    fetchData(userApiUrl, setUserData);
    fetchData(courseApiUrl, setCourseData);
    fetchData(lessonApiUrl, setLessonData);
    fetchData(orderApiUrl, setOrderData);
    fetchData(catagoryApiUrl, setCatagoryData);

  }, []);

  // Tính toán tổng users, japaneseCourses, lessons và doanh thu
  const totalUsers = userData.length;
  const totalJapaneseCourses = courseData.length;
  const totalLessons = lessonData.length;
  const totalCategory = catagoryData.length;
  const totalOrder = orderData.length;
  const totalRevenue = orderData.reduce((total, order) => {
    return total + parseInt(order.price, 10);
  }, 0);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>

        <SlideBar />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Title> Tổng Số Học Viên</Title>
                  <Typography component="p" variant="h4">
                    {totalUsers}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/userManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Title>Tổng Danh mục</Title>
                  <Typography component="p" variant="h4">
                    {totalCategory}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/catagoryManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Khóa Học</Title>
                  <Typography component="p" variant="h4">
                    {totalJapaneseCourses}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/coursesManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Title>Tổng Số Bài Học</Title>
                  <Typography component="p" variant="h4">
                    {totalLessons}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/courseLessonManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title>Tổng Doanh thu</Title>
                  <Typography component="p" variant="h4">
                    {totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'VND' })}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('vi-VN')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/oderManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card>
                <CardContent>
                  <Title> Tổng Số Khóa học đã mua</Title>
                  <Typography component="p" variant="h4">
                    {totalOrder}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    {new Date().toLocaleDateString('en-US')}
                  </Typography>
                  <div>
                    <Link color="primary" component={RouterLink}
                      to="/oderManagement" >
                      Xem chi tiết
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Orders />
              </Paper>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default Home

