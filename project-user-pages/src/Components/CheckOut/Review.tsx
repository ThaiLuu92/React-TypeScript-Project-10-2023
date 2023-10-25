import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { I_JapaneseCourse, I_UserPay } from '../../Types/types'; // Import your interfaces
import { useLocation } from 'react-router-dom';
import { getData } from '../../Services/API';

export default function Review() {
    const navigate = useNavigate(); // Fixed typo in variable name
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const checkOutId = searchParams.get("id");
    const [japaneseCourses, setJapaneseCourses] = useState<I_JapaneseCourse | null>(null);
    const [userPayment, setUserPayment] = useState<I_UserPay | null>();

    useEffect(() => {
        const fetchCourses = async () => {
            if (checkOutId) {
                const response = await getData("japaneseCourses", { id: checkOutId });
                if (response[0]) {
                    const courseData = response[0];
                    setJapaneseCourses(courseData);              
                }
            }
        }
        fetchCourses();
    }, [checkOutId]);

    

    // You need to fetch user payment information as well, similar to how you fetched course information.

    return (
        <React.Fragment>
            {japaneseCourses && (
                <Typography variant="h6" gutterBottom>
                    Thông tin khóa học
                </Typography>
            )}
            <List disablePadding>
                {japaneseCourses && (
                    <ListItem sx={{ py: 1, px: 0 }}>
                        <ListItemText primary="Tên khóa học"  />
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{japaneseCourses?.courseName}</Typography>
                    </ListItem>
                )}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Giá" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {japaneseCourses?.price.toLocaleString()} VND
                    </Typography>
                </ListItem>
            </List>
            {/* <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Thông tin người dùng
                    </Typography>
                    <Typography gutterBottom>{userPayment?.fullname}</Typography>
                    <Typography gutterBottom>{userPayment?.address}</Typography>
                </Grid>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Chi tiết thanh toán
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{userPayment?.cardName}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{userPayment?.numberCard}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid> */}
        </React.Fragment>
    );
}
