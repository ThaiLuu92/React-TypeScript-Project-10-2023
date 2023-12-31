import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Redux/Slice/AuthSlice';
import { I_UserPay } from '../../Types/types';


const steps = ['Điền thông tin', 'Thông tin thanh toán', 'Chi tiết đơn hàng'];

function getStepContent(step: number, formData: I_UserPay, setFormData: Function) {
    switch (step) {
        case 0:
            return <AddressForm setFormData={setFormData} formData={formData} />;
        case 1:
            return <PaymentForm setFormData={setFormData} formData={formData} />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

export default function Checkout() {
    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.user);
    const [formData, setFormData] = useState<I_UserPay>({
        email: '',
        fullname: '',
        phone: '',
        address: '',
        created_at: '',
        cardName:'',
        numberCard:"",
        expDate:'',
    });
   useEffect(()=>{
       setFormData(loggedInUser)
   },[])
    


    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
  
   

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Thanh toán
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Cảm ơn bạn đã mua khóa học
                            </Typography>
                            
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                                {getStepContent(activeStep, formData, setFormData)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
            </Container>
        </React.Fragment>
    );
}