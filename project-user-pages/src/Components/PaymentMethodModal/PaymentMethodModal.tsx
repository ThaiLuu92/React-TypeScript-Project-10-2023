// PaymentMethodModal.tsx
import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import "./PaymentMethodModal.scss"
import CreditCardForm from '../CreditCardForm/CreditCardForm';

interface PaymentMethodModalProps {
    open: boolean;
    handleClose: () => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ open, handleClose }) => {
    const [showCreditCardForm, setShowCreditCardForm] = useState(false);

    const handleCreditCardOptionChange = () => {
        setShowCreditCardForm(true);
    };
    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="payment-method-modal-title"
           
        >
           <div>
                    <Box className="payment-method-modal">
                        <h2>Chọn phương thức thanh toán</h2>
                        <form>
                            <div className="payment-option">
                                <label>
                                    <input type="radio" name="paymentOption" value="bankTransfer" />
                                    Chuyển khoản ngân hàng
                                </label>
                            </div>
                            <div className="payment-option">
                                <label>
                                    <input type="radio" name="paymentOption" value="creditCard" onChange={handleCreditCardOptionChange} />
                                    Thẻ tín dụng
                                </label>
                            </div>
                        </form>
                        <Button onClick={handleClose}>Đóng</Button>
                    </Box>
                    {showCreditCardForm && <CreditCardForm open={showCreditCardForm} handleClose={() => setShowCreditCardForm(false)} />}
           </div>
        </Modal>
        </>
    );
};

export default PaymentMethodModal;
