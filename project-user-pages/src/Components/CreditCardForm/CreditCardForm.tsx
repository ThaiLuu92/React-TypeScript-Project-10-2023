import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Box, TextField, Button } from '@mui/material';
import "./CreditCardForm.scss"
interface CreditCardFormProps {
    open: boolean;
    handleClose: () => void;
}
const validationSchema = yup.object({
    cardNumber: yup
        .string()
        .required('Số thẻ là trường bắt buộc')
        .matches(/^\d{16}$/, 'Số thẻ phải có 16 chữ số'),
    expirationDate: yup
        .string()
        .required('Ngày hết hạn là trường bắt buộc')
        .matches(/^\d{2}\/\d{2}$/, 'Ngày hết hạn phải có định dạng MM/YY'),
    cvv: yup.string().required('CVV là trường bắt buộc').matches(/^\d{3,4}$/, 'CVV phải có 3 hoặc 4 chữ số'),
});

function CreditCardForm({ open, handleClose }: CreditCardFormProps) {
    const formik = useFormik({
        initialValues: {
            cardNumber: '',
            expirationDate: '',
            cvv: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            console.log(values);
        },
    });

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="credit-card-modal-title">
            <Box className="credit-card-modal-content">
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        label="Số Thẻ"
                        id="cardNumber"
                        name="cardNumber"
                        value={formik.values.cardNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                        helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                    />
                    <TextField
                        fullWidth
                        label="Ngày Hết Hạn (MM/YY)"
                        id="expirationDate"
                        name="expirationDate"
                        value={formik.values.expirationDate}
                        onChange={formik.handleChange}
                        error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
                        helperText={formik.touched.expirationDate && formik.errors.expirationDate}
                    />
                    <TextField
                        fullWidth
                        label="CVV"
                        id="cvv"
                        name="cvv"
                        value={formik.values.cvv}
                        onChange={formik.handleChange}
                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                        helperText={formik.touched.cvv && formik.errors.cvv}
                    />
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
}

export default CreditCardForm;

