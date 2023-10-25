import React, { useState, useEffect } from 'react';
import SlideBar from '../../Components/SlideBar/SlideBar'
import { Box} from '@mui/material'
import NavBar from '../../Components/NavBar/NavBar';
import { I_User } from './UserData';
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


function UserManagement() {
  const [users, setUsers] = useState<I_User[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<I_User | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalUser, setOriginalUser] = useState<I_User[]>([]); // Sao lưu danh sách users gốc

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'userName', headerName: 'Username', width: 130, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'Email', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'created_at', headerName: 'Create Date', width: 150, headerAlign: 'center', align: 'center' },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FormControlLabel
            control={
              <Switch
                checked={params.value}
                onChange={() => handleToggleStatus(params.row.id)} 
                name="status-toggle"
              />
            }
            label={params.value ? 'Active' : 'Blocked'}
          />
        </div>
      ),
    },
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
    fetchUsers()
    
  }, []);

  async function fetchUsers() {
    const getUser = await getData("users")
    setUsers(getUser)
    setOriginalUser(getUser)

  }

 

  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setUsers(originalUser); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };
  const handleToggleStatus = async (userId: string) => {
    try {
      // Tìm người dùng theo `userId`
      const userToToggle = users.find((user) => user.id === userId);
      if (userToToggle) {
        // Thực hiện cập nhật trạng thái tại máy chủ thông qua API (sử dụng axios hoặc fetch)
        await updateData("users", userId, { status: !userToToggle.status });

        // Cập nhật trạng thái trong danh sách `users` sau khi hoàn thành cập nhật trạng thái tại máy chủ
        userToToggle.status = !userToToggle.status;
        fetchUsers()
        // Bạn cũng có thể cập nhật trạng thái ngay tại máy khách nếu không sử dụng API
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };
  const handleViewDetails = (id: string) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setSelectedUser(user);
      setModalOpen(true);
    }
   
  };
  
  
  useEffect(() => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filteredUsers = originalUser.filter((user) => {
      if (user && user.userName) {
        return removeUnicode(user.userName.toLowerCase()).includes(removeUnicode(searchTerm.toLowerCase()));
      }
      return false; // Nếu user hoặc user.username không xác định, bỏ qua
    });
    setUsers(filteredUsers); // Cập nhật danh sách người dùng
  }, [searchTerm, originalUser]);


  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>

        <SlideBar />
        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý học viên</h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'10px', marginBottom:'10px'}}>
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
              rows={users}
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
      <UserDetailsModal user={selectedUser} open={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

export default UserManagement


// UserDetailsModal.tsx
interface UserDetailsModalProps {
  user: I_User | null;
  open: boolean;
  onClose: () => void;
}
const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, open, onClose }) => {
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
          Thông tin người dùng
        </Typography>
        {user && (
          <Paper sx={{ p: 2 }}>
            <form>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="username">Tên ID</label>
                <input
                  type="text"
                  id="username"
                  value={user.userName}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={user.email}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="fullname">Họ và tên</label>
                <input
                  type="text"
                  id="fullname"
                  value={user.fullname}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="phone">Số điện thoại</label>
                <input
                  type="text"
                  id="phone"
                  value={user.phone}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="address">Địa chỉ</label>
                <input
                  type="text"
                  id="address"
                  value={user.address}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="created_at">Ngày tạo</label>
                <input
                  type="text"
                  id="created_at"
                  value={user.created_at}
                  style={{ width: '100%', fontSize: 16, padding: 9 }}
                  readOnly
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label htmlFor="updated_at">Ngày cập nhật</label>
                <input
                  type="text"
                  id="updated_at"
                  value={user.updated_at}
                  style={{ width: '100%', fontSize: 16, padding:9 }}
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

