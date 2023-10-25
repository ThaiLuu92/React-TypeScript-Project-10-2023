
import React, { useState } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material';
import PaymentMethodModal from '../PaymentMethodModal/PaymentMethodModal';

interface PaymentProps {
    open: boolean;
    handleClose: () => void;
    handleSaveAndContinue: () => void;
    customerName: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    address: string ; 
    setCustomerName: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    setEmail: (value: string) => void;
    setBirthDate: (value: string) => void;
    setAddress: (value: string) => void;
}


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%', // Đặt kích thước modal
    display: 'flex',
};

// CSS cho phần bên trái
const leftSideStyle = {
    flex: 1,
    padding: '20px',
    backgroundColor: '#f1f1f1', // Màu nền bên trái
    // Thiết lập một khoảng cách ngoài cùng và padding
    // Định dạng cho trường nhập
    '& .MuiTextField-root': {
        marginBottom: '20px', // Khoảng cách giữa các trường nhập
    },

    // Định dạng cho nút "Lưu thông tin và tiếp tục"
    '& .MuiButton-root': {
        backgroundColor: 'blue',
        color: 'white',
    },
};

// CSS cho phần bên phải
const rightSideStyle = {
    flex: 0.7,
    padding: '20px',
    backgroundColor: '#ffffff', // Màu nền bên phải
};
function Payment(props: PaymentProps) {

    const {
        open,
        handleClose,
        handleSaveAndContinue,
        customerName,
        phoneNumber,
        email,
        birthDate,
        address,
        setCustomerName,
        setPhoneNumber,
        setEmail,
        setBirthDate,
        setAddress,
    } = props;

    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);

    const handleClosePaymentMethodModal = () => {
        setShowPaymentMethodModal(false);
    };


  return (
    <>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
          <Box sx={modalStyle}>
              <Box sx={leftSideStyle}>
                  <form>
                      <h2 className="modal-title fs-5">Thông tin khách hàng</h2><br></br>
                      <TextField
                          label="Tên khách hàng"
                          fullWidth
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                      />
                      <TextField
                          label="Số điện thoại"
                          fullWidth
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <TextField
                          label="Email"
                          fullWidth
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      <TextField
                          label="Ngày sinh"
                          type="date"
                          fullWidth
                          value={birthDate}
                          onChange={(e) => setBirthDate(e.target.value)}
                          InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                          label="Địa chỉ"
                          fullWidth
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                      />

                  </form>
                  <div className="modal-payment-btn">
                      <Button onClick={handleClose} color="secondary">Đóng</Button>
                          <Button onClick={() => {
                              setShowPaymentMethodModal(true);
                              handleClose(); // Đóng modal Payment
                          }} color="primary">
                              Lưu thông tin và tiếp tục
                          </Button>
                  </div>
              </Box>
              <Box sx={rightSideStyle}>
                  <div className="card-course">

                      <h2 className="modal-title fs-5">Thông tin đơn hàng</h2><br></br>

                      <div className="card-course-content" id="pay-course-card">
                          <div className="course-name">Khóa học N5</div>
                          <div className="course-detail">
                              <div><span><b>Học phí :</b></span><span>100.000</span></div>
                              <div><span><b>Thời hạn :</b></span><span>100.000</span></div>
                              <div><span><b>Mã số :</b></span><span>100.000</span></div>
                          </div>
                          <div className="course-discount-code">
                              <input type="text" placeholder="Mã giảm giá" /><button>Áp dụng</button>
                          </div>
                          <div className="total-payment"><span>Tổng tiền:</span> <span>100.000</span></div>
                      </div>
                  </div>
              </Box>
          </Box>
      </Modal>
       <PaymentMethodModal
                open={showPaymentMethodModal}
                handleClose={handleClosePaymentMethodModal}
            />
      </>
  )
}

export default Payment

