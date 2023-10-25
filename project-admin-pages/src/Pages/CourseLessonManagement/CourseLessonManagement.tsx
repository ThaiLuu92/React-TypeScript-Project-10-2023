import React, { useState, useEffect, ChangeEvent } from 'react';
import SlideBar from '../../Components/SlideBar/SlideBar'
import { Box, TextField } from '@mui/material'
import NavBar from '../../Components/NavBar/NavBar';
import { I_Lesson } from '../CourseLessonManagement/LessonData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { createData, deleteData, getData, updateData } from '../../Service/API';
import LessonModal from './LessonModal';
import { removeUnicode } from '../../Utils/RemoveUnicode';
function CourseLessonManagement() {
    const [lessons, setLessons] = useState<I_Lesson[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<I_Lesson | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [action, setAction] = useState("")
    const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
    const [originalLesson, setOriginalLesson] = useState<I_Lesson[]>([]); // Sao lưu danh sách Course gốc
    const lessonColumns: GridColDef[] = [
   
        { field: 'id', headerName: 'Mã số khóa học', width: 100, headerAlign: 'center', align: 'center' },
        { field: 'lessonName', headerName: 'Tên bài học', width: 150, headerAlign: 'center', align: 'center' },
        { field: 'exercise', headerName: 'Bài tập', width: 150, headerAlign: 'center', align: 'center' },
        {
            field: 'image',  // Cột hình ảnh
            headerName: 'Hình ảnh',
            width: 150,
            headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <img
                    src={params.value}  // URL hình ảnh
                    alt={params.row.lessonName}
                    style={{ maxWidth: '250px', maxHeight: '100%', objectFit: "cover",  }}
                />
            ),
        },
        {
            field: 'video',
            headerName: 'Video',
            width: 150,
            headerAlign: 'center', align: 'center',
            renderCell: (params) => (
                <video
                    src={params.value}  // URL video
                    controls
                    style={{ maxWidth: '250px', maxHeight: '100%', objectFit: "cover", }}
                />
            ),
        },
        {
            field: 'action',
            headerName: 'Hành động',
            width: 250,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        onClick={() => handleViewLessonDetails(params.row.id)}
                        variant="contained"
                        style={{
                            backgroundColor: 'blue',
                            color: 'white',
                            cursor: 'pointer',
                        }}
                    >
                        Xem
                    </Button>
                    <Button
                        onClick={() => handleOpenEditLesson(params.row.id)}
                        variant="contained"
                        color="primary"
                        style={{
                            marginLeft: 5,
                            cursor: 'pointer',
                        }}
                    >
                        Sửa
                    </Button>
                    <Button
                        onClick={() => handleDeleteLesson(params.row.id)}
                        variant="contained"
                        color="secondary"
                        style={{
                            marginLeft: 5,
                            cursor: 'pointer',
                        }}
                    >
                        Xóa
                    </Button>
                </div>
            ),
        },
    ];
    useEffect(() => {
        fetchLessons();

    }, []);
    // Hàm để lấy danh sách bài học
    async function fetchLessons() {
        const getLessions = await getData("lessons");
        setLessons(getLessions);
        setOriginalLesson(getLessions)
    }

    // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
    const handleSearch = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setSearchTerm(value);
    };
    // Hàm xử lý khi nhấn nút "Clear"
    const handleClear = () => {
        setSearchTerm(""); // Xóa giá trị tìm kiếm
        setLessons(originalLesson); // Đặt lại danh sách đơn hàng bằng danh sách gốc
    };


    const handleOpenEditLesson = async (id: string) => {
        const lesson = lessons.find((lesson) => lesson.id === id);
        setAction("edit");
        setSelectedLesson(lesson || null);
        setModalOpen(true);
    };

    const handleAddModalLesson = async () => {
        setModalOpen(true);
        setAction("add")
    }

    const hanldeClose = () => {
        setModalOpen(false)
        setSelectedLesson(null);
        setAction("")
    }
    const handleDeleteLesson = async (id: string) => {
        await deleteData("lessons", id);
        fetchLessons();
    };
    const handleViewLessonDetails = (id: string) => {
        const lesson = lessons.find((lesson) => lesson.id === id);
        if (lesson) {
            setAction("view");
            setSelectedLesson(lesson);
            setModalOpen(true);
        }
    };

    useEffect(() => {
        // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
        const filteredCoures = originalLesson.filter((lesson) => {
            if (lesson && lesson.lessonName) {
                return removeUnicode(lesson.lessonName.toLowerCase()).includes(removeUnicode(searchTerm.toLowerCase()));
            }
            return false; // Nếu user hoặc user.username không xác định, bỏ qua
        });
        setLessons(filteredCoures); // Cập nhật danh sách người dùng
    }, [searchTerm, originalLesson]);
   

    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>

                <SlideBar />

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <h1>Quản lý bài học</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '160px', marginBottom: '10px' }}>
                    <Button variant="contained" color="primary"  onClick={handleAddModalLesson}>
                        Thêm  bài học
                    </Button>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
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
                    <div style={{ width: '138px' }}>
                    </div>
                    </div>
                    
                    <div style={{ height: 700, width: '100%' }}>
                        <DataGrid

                            className='disabled-focus'
                            rows={lessons}
                            columns={lessonColumns}
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
            <LessonModal open={isModalOpen} onClose={hanldeClose} lesson={selectedLesson} action={action} fetchLessons={fetchLessons} />
        </>
    )
}

export default CourseLessonManagement