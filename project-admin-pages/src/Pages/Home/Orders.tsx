import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { I_Oder } from '../OderManagement/OderData';
import { getData } from '../../Service/API';
import { useNavigate } from 'react-router-dom';
export default function Orders() {
    const [orders, setOrders] = useState<I_Oder[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOders()
    }, []);

    async function fetchOders() {
        const getOder = await getData("oder")
        setOrders(getOder)
       

    }

    const preventDefault = (event: React.MouseEvent) => {
        event.preventDefault();
        navigate('/oderManagement');
    };

    return (
        <React.Fragment>
            <Title>Lịch sử mua khóa học</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Ngày mua</TableCell>
                        <TableCell>Tên khóa học</TableCell>
                        <TableCell>ID mua khóa học</TableCell>
                        
                        <TableCell align="right">Giá tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.slice(-10).map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.create_at}</TableCell>
                            <TableCell>{order.course_name}</TableCell>
                            <TableCell>{order.user_id}</TableCell>
                            
                            <TableCell align="right">{`${parseFloat(order.price).toLocaleString()}VND`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                Xem thêm
            </Link>
        </React.Fragment>
    );
}
