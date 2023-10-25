import React, { useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SlideBar from '../../Components/SlideBar/SlideBar';
import { Box } from '@mui/material';
import { I_JapaneseCourse } from './CoursesData';
import { I_Lesson } from '../CourseLessonManagement/LessonData';
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import { createData, updateData } from '../../Service/API';

interface CoursesModalProps {
    course: I_JapaneseCourse | null;
    open: boolean;
    onClose: () => void;
    lessons: I_Lesson[] | null;
    action: string
    fetchCourses: Function
}

 const CoursesModal: React.FC<CoursesModalProps> = ({ course, open, onClose, lessons, action, fetchCourses }) => {
    const [formData, setFormData] = useState<I_JapaneseCourse>({
        id: "",

        courseName: '',
        description: '',
        level: '',
        category: '',
        price: 0,
        enrollmentDurationInMonths: 0,
        lessons: [],
        coverImage: '',
        isActive: true,

    })
    const handleAddCourse = async () => {
        const newCourse = {
            courseName: formData.courseName,
            description: formData.description,
            level: formData.level,
            category: formData.category,
            price: formData.price,
            enrollmentDurationInMonths: formData.enrollmentDurationInMonths,
            lessons: formData.lessons,
            coverImage: formData.coverImage,
            isActive: true,
        };
        await createData("japaneseCourses", newCourse)
        fetchCourses();
        onClose();


    }

    const handleUpdateCourse = async () => {
        // Tạo đối tượng mới chứa thông tin cần sửa
        const updatedCourse = {

            courseName: formData.courseName,
            description: formData.description,
            level: formData.level,
            category: formData.category,
            price: formData.price,
            enrollmentDurationInMonths: formData.enrollmentDurationInMonths,
            lessons: formData.lessons,
            coverImage: formData.coverImage,
            isActive: true,
        };


        await updateData("japaneseCourses", formData.id, updatedCourse);
        fetchCourses()

        alert('Sửa khóa học thành công');


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
        if (course) {
            setFormData(course)
        } else {
            setFormData({
                id: "",
                courseName: '',
                description: '',
                level: '',
                category: '',
                price: 0,
                enrollmentDurationInMonths: 0,
                lessons: [],
                coverImage: '',
                isActive: true,
            })
        }

    }, [course]);

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
                            <label htmlFor="courseName">Tên khóa học</label>
                            <input
                                type="text"
                                id="courseName"
                                name="courseName"
                                onChange={handleInputChange}
                                value={formData.courseName}
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
                            <label htmlFor="level">Cấp độ</label>
                            <input
                                type="text"
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="category">Danh mục</label>
                            <select name="category" id="category"
                                value={formData.category}
                                onChange={handleInputChange}>
                                <option value="JLPT">JLPT</option>
                                <option value="Kaiwa">Kaiwa</option>
                                <option value="Shiken">Shiken</option>
                                <option value="Business">Business </option>

                            </select>


                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="price">Giá</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}

                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="enrollmentDurationInMonths">Thời gian học (tháng)</label>
                            <input
                                type="text"
                                id="enrollmentDurationInMonths"
                                name="enrollmentDurationInMonths"
                                value={formData.enrollmentDurationInMonths}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="lessons">Bài học</label>
                            <input
                                type="text"
                                id="lessons"
                                value={formData.lessons.map(item => lessons?.find((lesson) => lesson.id == item)?.lessonName).join(", ") || ""}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                                readOnly
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="coverImage">Ảnh bìa</label>
                            <input
                                type="text"
                                id="coverImage"
                                name="coverImage"
                                value={formData.coverImage}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
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

export default  CoursesModal
