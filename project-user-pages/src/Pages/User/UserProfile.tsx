import React, { useState, useEffect, ChangeEvent } from 'react';
import { Avatar, Box, Button, Container, Input, Paper, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { I_User } from '../../Types/types';
import "./UserProfile.scss"
import { createData, getData, updateData } from '../../Services/API';
import { useSelector } from 'react-redux';
import { AuthState } from '../../Redux/Slice/AuthSlice';

const customTheme = createTheme({
    palette: {
        background: {
            default: '#F5F5F5',
        },
    },
});

function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);
    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.user);
    const [users, setUsers] = useState<I_User | null>(null);
    const [formData, setFormData] = useState<I_User>({
        id: "",
        userName: '',
        email: '',
        fullname: '',
        status: true,
        avatar: '',
        phone: '',
        address: '',
        created_at: '',
        myCourses: [],
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const fetchedUsers = (await getData("users"));

        if (loggedInUser && fetchedUsers) {
            const matchingUser = fetchedUsers.find((u: I_User) => u.email === loggedInUser.email);
            if (matchingUser) {
                setUsers(matchingUser);
            }
        }
    }

    async function updateFormData() {
        const updatedUser = {
            id: formData.id,
            userName: formData.userName,
            fullname: formData.fullname,
            phone: formData.phone,
            address: formData.address
        };
        updateData("users", updatedUser).then(() => {

            fetchUsers();
            setIsEditing(false);

        })

    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (users) {
            setFormData(users);
        } else {
            setFormData({
                id: "",
                userName: '',
                email: '',
                fullname: '',
                status: true,
                avatar: '',
                phone: '',
                address: '',
                created_at: '',
                myCourses: [],
            });
        }
    }, [users]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            <h2>Thông tin cá nhân</h2>
            <form id="form-infor">
                <Box
                    component="table"
                    style={{
                        width: '100%',
                        borderSpacing: '0',
                        borderCollapse: 'collapse',
                        marginBottom: '20px',
                        fontSize: '15px',
                        marginTop: '50px',
                    }}
                >
                    <tbody>
                        <tr>
                            <td>Mã ID:</td>
                            <td>
                                <Input
                                    id="id"
                                    name="id"
                                    disabled
                                    value={formData.id}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Tên Tài khoản</td>
                            <td>
                                <Input
                                    id="userName"
                                    name='userName'
                                    placeholder="Nhập tên tài khoản"
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    value={formData.userName}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Họ và tên:</td>
                            <td>
                                <Input
                                    id="fullname"
                                    name='fullname'
                                    placeholder="Nhập họ và tên"
                                    disabled={!isEditing}
                                    onChange={handleInputChange}
                                    value={formData.fullname}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>
                                <Input
                                    id="email"
                                    name="email"
                                    disabled
                                    value={formData.email}
                                />
                            </td>
                        </tr>
                        <tr></tr>
                        <tr>
                            <td>Số điện thoại:</td>
                            <td>
                                <Input
                                    id="phone"
                                    name='phone'
                                    placeholder="Nhập số điện thoại"
                                    disabled={!isEditing}
                                    onChange={handleInputChange}
                                    value={formData.phone}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Địa chỉ:</td>
                            <td>
                                <Input
                                    id="address"
                                    name='address'
                                    placeholder="Nhập địa chỉ"
                                    disabled={!isEditing}
                                    onChange={handleInputChange}
                                    value={formData.address}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Ngày khởi tạo:</td>
                            <td>
                                <Input
                                    id="created_at"
                                    name='created_at'
                                    disabled
                                    value={formData.created_at}
                                />
                            </td>
                        </tr>

                    </tbody>

                </Box>
                {isEditing ? (
                    <Button
                        variant="outlined"
                        id="save-button"
                        style={{ display: 'block', marginRight: '10px' }}
                        onClick={updateFormData}
                    >
                        Lưu
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        onClick={toggleEdit}
                        id="edit-button"
                        style={{ display: 'block', marginRight: '10px' }}
                    >
                        Chỉnh Sửa
                    </Button>
                )}
            </form>
        </>

    );
}

export default UserProfile;
