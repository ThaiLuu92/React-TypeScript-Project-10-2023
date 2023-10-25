import React, { useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SlideBar from '../../Components/SlideBar/SlideBar';
import { Box } from '@mui/material';
import { I_Category } from './CatagoryData';
import { I_JapaneseCourse } from '../CoursesManagement/CoursesData';
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import { createData, updateData } from '../../Service/API';

interface CoursesModalProps {
    japaneseCourses: I_JapaneseCourse[] | null;
    open: boolean;
    onClose: () => void;
    catagory: I_Category | null;
    action: string
    fetchCatagorys: Function
}

const CatagoryModal: React.FC<CoursesModalProps> = ({ japaneseCourses, open, onClose, catagory, action, fetchCatagorys }) => {
    const [formData, setFormData] = useState<I_Category>({
        id: "",
        category_name: '',
        description: '',
        courses: [],
        status: true,

    })
    const handleAddCourse = async () => {
        const newCourse = {
            id: formData.id,
            category_name: formData.category_name,
            description: formData.description,
            courses: formData.courses,
            isActive: true,
        };
        await createData("categorys", newCourse)
        fetchCatagorys();
        onClose();


    }

    const handleUpdateCourse = async () => {
        // Tạo đối tượng mới chứa thông tin cần sửa
        const updatedCourse = {
            id: formData.id,
            category_name: formData.category_name,
            description: formData.description,
            courses: formData.courses,
            isActive: true,
        };


        await updateData("categorys", formData.id, updatedCourse);
        fetchCatagorys()

        alert('Sửa danh mục thành công');


        onClose();
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (catagory) {
            setFormData(catagory)
        } else {
            setFormData({
                id: "",
                category_name: '',
                description: '',
                courses: [],
                status: true,
            })
        }

    }, [catagory]);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin khóa học
                </Typography>

                <Paper sx={{ p: 2, maxWidth: '800px', maxHeight: '600px', overflow: 'auto' }}>
                    <form>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="category_name">Tên danh mục</label>
                            <input
                                type="text"
                                id="category_name"
                                name="category_name"
                                onChange={handleInputChange}
                                value={formData.category_name}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}

                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="description">Mô tả</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9, minHeight: '100px' }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="lessons">Khóa học</label>
                            <input
                                type="text"
                                id="lessons"
                                value={formData.courses.map(item => japaneseCourses?.find((course) => course.id == item)?.courseName).join(", ") || ""}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                                readOnly
                            />
                        </div>
                    </form>
                </Paper>

                <Button variant="contained" color="primary" style={{ marginTop: 20, marginRight: 20 }} onClick={onClose}>
                    Đóng
                </Button>
                {action !== 'view' ?
                    action === 'add' ? (
                        <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleAddCourse}>
                            Thêm
                        </Button>
                    ) : (
                        <Button variant="contained" color="primary" style={{ marginTop: 20 }} onClick={handleUpdateCourse}>
                            Sửa
                        </Button>
                    )
                    : null}
            </Box>
        </Modal>
    );
};

export default CatagoryModal

