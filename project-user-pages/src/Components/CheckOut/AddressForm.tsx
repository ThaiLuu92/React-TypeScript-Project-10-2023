import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Redux/Slice/AuthSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { I_UserPay } from '../../Types/types';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
const addressSchema = Yup.object().shape({
    fullname: Yup.string().required('Họ và tên không được để trống'),
    address: Yup.string().required('Địa chỉ không được để trống'),
    phone: Yup.string().required('Số điện thoại không được để trống'),
    email: Yup.string().email('Email không hợp lệ').required('Email không được để trống'),
});

export default function AddressForm({ setFormData, formData }: { setFormData: Function, formData: I_UserPay }) {

    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.user);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    if (!loggedInUser) {

        return <></>
    }



    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Điền thông tin
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="fullname"
                        name="fullname"
                        label="Họ và tên"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        label="Địa chỉ"
                        fullWidth
                        autoComplete="shipping address"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        label="Số điện thoại"
                        type='number'
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        label="Email"
                        fullWidth
                        autoComplete="shipping email"
                        variant="standard"
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}