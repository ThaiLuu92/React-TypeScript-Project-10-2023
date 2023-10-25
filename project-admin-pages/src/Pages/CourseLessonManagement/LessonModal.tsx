import React, { useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SlideBar from '../../Components/SlideBar/SlideBar';
import { Box } from '@mui/material';
import { I_Lesson } from '../CourseLessonManagement/LessonData';
import Button from '@mui/material/Button';
import {
    Modal,
    Paper,
    Typography,
} from '@mui/material';
import { createData, updateData } from '../../Service/API';

interface CoursesModalProps {
    lesson: I_Lesson | null;
    open: boolean;
    onClose: () => void;
    action: string
    fetchLessons: Function
}

const LessonModal: React.FC<CoursesModalProps> = ({ lesson, open, onClose, action, fetchLessons }) => {
    const [formData, setFormData] = useState<I_Lesson>({
        id: '',
        lessonName: '',
        materials: [],
        isAssignment: false,
        image: '',
        video: '',
        exercise: '',
    })
    const handleAddCourse = async () => {
        const newCourse = {
            id: formData.id,
            lessonName: formData.lessonName,
            materials: formData.materials,
            image: formData.image,
            video: formData.video,
            exercise: formData.exercise,
        };
        await createData("lessons", newCourse)
        fetchLessons();
        onClose();


    }

    const handleUpdateCourse = async () => {
        // Tạo đối tượng mới chứa thông tin cần sửa
        const updatedCourse = {

            id: formData.id,
            lessonName: formData.lessonName,
            materials: formData.materials,
            image: formData.image,
            video: formData.video,
            exercise: formData.exercise,
        };


        await updateData("lessons", formData.id, updatedCourse);
        fetchLessons()

        alert('Sửa bài học thành công');


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
        if (lesson) {
            setFormData(lesson)
        } else {
            setFormData({
                id: '',
                lessonName: '',
                materials: [],
                isAssignment: false,
                image: '',
                video: '',
                exercise: '',
            })
        }

    }, [lesson]);

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
                    Thông tin bài học
                </Typography>

                <Paper sx={{ p: 2, maxWidth: '800px', maxHeight: '600px', overflow: 'auto' }}>
                    <form>
                        {/* <div style={{ marginBottom: 10 }}>
                            <label htmlFor="id">Mã số khóa học</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                onChange={handleInputChange}
                                value={formData.id}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}

                            />
                        </div> */}
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="lessonName">Tên bài học</label>
                            <input
                                type="text"
                                id="lessonName"
                                name="lessonName"
                                onChange={handleInputChange}
                                value={formData.lessonName}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}

                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="materials">Tài liệu</label>
                            <input
                                type="text"
                                id="materials"
                                name="materials"
                                value={formData.materials.join(",")}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9, minHeight: '100px' }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="image">Hình Ảnh</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="video">Video</label>
                            <input
                                type="text"
                                id="video"
                                name="video"
                                value={formData.video}
                                onChange={handleInputChange}
                                style={{ width: '100%', fontSize: 16, padding: 9 }}
                            />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <label htmlFor="exercise">Bài tập</label>
                            <input
                                type="text"
                                id="exercise"
                                name="exercise"
                                value={formData.exercise}
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

export default LessonModal
