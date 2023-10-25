import React, { useState, useEffect } from 'react';
import SlideBar from '../../Components/SlideBar/SlideBar'
import { Box } from '@mui/material'
import NavBar from '../../Components/NavBar/NavBar';
import { I_Oder } from './OderData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { Switch, FormControlLabel } from '@mui/material';
import {
    Modal,
    Paper,
    Typography,
    TextField,
} from '@mui/material';
import { getData, updateData } from '../../Service/API';
import { removeUnicode } from '../../Utils/RemoveUnicode';



function OderManagement() {
    const [oders, setOders] = useState<I_Oder[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOder, setSelectedOder] = useState<I_Oder | null>(null);
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
    const [originalOder, setOriginalOder] = useState<I_Oder[]>([]); // Sao lưu danh sách users gốc
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
        { field: 'user_id', headerName: 'ID người dùng', width: 130, headerAlign: 'center', align: 'center' },
        { field: 'price', headerName: 'Giá', width: 150, headerAlign: 'center', align: 'center' },
        {
            field: 'create_at',
            headerName: 'Ngày mua',
            width: 200,
            headerAlign: 'center',
            align: 'center',
           
        },
        { field: 'course_id', headerName: 'ID khóa học', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'course_name', headerName: 'Tên khóa học', width: 250, headerAlign: 'center', align: 'center' },
        {
            field: 'action',
            headerName: 'Action',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => handleViewDetails(params.row.id)}
                        variant="contained"
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        Xem thông tin
                    </Button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        fetchOders()

    }, []);

    async function fetchOders() {
        const getOder = await getData("oder")
        setOders(getOder)
        setOriginalOder(getOder)

    }

    // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
    const handleSearch = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    // Hàm xử lý khi nhấn nút "Clear"
    const handleClear = () => {
        setSearchTerm(""); // Xóa giá trị tìm kiếm
        setOders(originalOder); // Đặt lại danh sách đơn hàng bằng danh sách gốc
    };

    const handleViewDetails = (id: string) => {
        const oder = oders.find((oder) => oder.id === id);
        if (oder) {
            setSelectedOder(oder);
            setModalOpen(true);
        }

    };

    useEffect(() => {
        // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
        const filteredUsers = originalOder.filter((oder) => {
            if (oder && oder.course_name) {
                return removeUnicode(oder.course_name.toLowerCase()).includes(removeUnicode(searchTerm.toLowerCase()));
            }
            return false; // Nếu user hoặc user.username không xác định, bỏ qua
        });
        setOders(filteredUsers); // Cập nhật danh sách người dùng
    }, [searchTerm, originalOder]);



  return (
      <>
          <NavBar />
          <Box height={30} />
          <Box sx={{ display: 'flex' }}>
              <SlideBar />
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <h1>Quản lý mua khóa học</h1>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <TextField
                          label="Tìm kiếm"
                          value={searchTerm}
                          onChange={handleSearch}
                          variant="outlined"

                          size="small"

                      />
                      <Button
                          variant="contained"
                          color="primary"
                          onClick={handleClear}
                      >
                          Clear
                      </Button>
                  </div>
                  <div style={{ height: 700, width: '100%' }}>
                      <DataGrid
                          className='disabled-focus'
                          rows={oders}
                          columns={columns}
                          getRowId={(row) => row.id}
                          initialState={{
                              pagination: {
                                  paginationModel: { page: 0, pageSize: 10 },
                              },
                          }}
                          pageSizeOptions={[10, 15]}
                      />
                  </div>

              </Box>
          </Box>
          <OderDetailsModal oder={selectedOder} open={isModalOpen} onClose={() => setModalOpen(false)} />
      </>
  )
}

export default OderManagement


// UserDetailsModal.tsx
interface OderDetailsModalProps {
    oder: I_Oder | null;
    open: boolean;
    onClose: () => void;
}
const OderDetailsModal: React.FC<OderDetailsModalProps> = ({ oder, open, onClose }) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin khóa học đã mua
                </Typography>
                {oder && (
                    <Paper sx={{ p: 2 }}>
                        <form>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="id">ID</label>
                                <input
                                    type="text"
                                    id="id"
                                    value={oder.id}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="user_id">ID Khách hàng</label>
                                <input
                                    type="text"
                                    id="user_id"
                                    value={oder.user_id}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="price">Giá của khóa học</label>
                                <input
                                    type="text"
                                    id="price"
                                    value={oder.price}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="create_at">Thời gian mua</label>
                                <input
                                    type="text"
                                    id="create_at"
                                    value={oder.create_at}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="course_id">Mã khóa học đã mua</label>
                                <input
                                    type="text"
                                    id="course_id"
                                    value={oder.course_id}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                            <div style={{ marginBottom: 10 }}>
                                <label htmlFor="course_name">Tên khóa học đã mua</label>
                                <input
                                    type="text"
                                    id="course_name"
                                    value={oder.course_name}
                                    style={{ width: '100%', fontSize: 16, padding: 9 }}
                                    readOnly
                                />
                            </div>
                        </form>
                    </Paper>
                )}
                <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={onClose}>
                    Đóng
                </Button>
            </Box>
        </Modal>
    );
};