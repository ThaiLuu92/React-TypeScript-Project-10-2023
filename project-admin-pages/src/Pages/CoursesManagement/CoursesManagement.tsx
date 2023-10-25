import React, { useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SlideBar from '../../Components/SlideBar/SlideBar';
import { Box, TextField } from '@mui/material';
import NavBar from '../../Components/NavBar/NavBar';
import { I_JapaneseCourse } from './CoursesData';
import { I_Lesson } from '../CourseLessonManagement/LessonData';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import { createData, deleteData, getData, updateData } from '../../Service/API';
import CoursesModal from './CourseModal';
import { removeUnicode } from '../../Utils/RemoveUnicode';



function CoursesManagement() {
  const [japaneseCourses, setJapaneseCourses] = useState<I_JapaneseCourse[]>([]);
  const [lessons, setLessons] = useState<I_Lesson[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<I_JapaneseCourse | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("")
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalCourse, setOriginalCourse] = useState<I_JapaneseCourse[]>([]); // Sao lưu danh sách Course gốc

  const columns: GridColDef[] = [

    { field: 'courseName', headerName: 'Tên khóa học', width: 280, headerAlign: 'center', align: 'center' },
    { field: 'level', headerName: 'Cấp độ', width: 120, headerAlign: 'center', align: 'center' },
    { field: 'category', headerName: 'Danh mục', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'price', headerName: 'Giá', width: 100, headerAlign: 'center', align: 'center' },
    {
      field: 'action',
      headerName: 'Hành động',
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
            Xem
          </Button>
          <Button
            onClick={() => handleOpenEdit(params.row.id)}
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
            onClick={() => handleDeleteCourse(params.row.id)}
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
    fetchCourses();
    fetchLesson()

  }, []);

  async function fetchCourses() {
    const getCourse = await getData("japaneseCourses")
    setJapaneseCourses(getCourse)
    setOriginalCourse(getCourse)

  }

  async function fetchLesson() {
    const getLession = await getData("lessons")
    setLessons(getLession)

  }
  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setJapaneseCourses(originalCourse); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };


  const handleOpenEdit = async (id: string) => {
    const course = japaneseCourses.find(course => course.id === id);
    setAction("edit")
    setSelectedCourse(course || null);
    setModalOpen(true);
  }

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add")
  }

  const hanldeClose = () => {
    setModalOpen(false)
    setSelectedCourse(null);
    setAction("")
  }

  const handleDeleteCourse = async (id: string) => {

    await deleteData("japaneseCourses", id);
    fetchCourses();
  };




  const handleViewDetails = (id: string) => {
    const course = japaneseCourses.find(course => course.id === id);
    if (course) {
      setAction("view")
      setSelectedCourse(course);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filteredCoures = originalCourse.filter((coures) => {
      if (coures && coures.courseName) {
        return removeUnicode(coures.courseName.toLowerCase()).includes(removeUnicode(searchTerm.toLowerCase()));
      }
      return false; // Nếu user hoặc user.username không xác định, bỏ qua
    });
    setJapaneseCourses(filteredCoures); // Cập nhật danh sách người dùng
  }, [searchTerm, originalCourse]);



  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: 'flex' }}>
        <SlideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý khóa học</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '160px', marginBottom: '10px' }}>
            <Button variant="contained" color="primary"  onClick={handleAddModal}>
              Thêm khóa học
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
            <div style={{ width: '155px' }}>

            </div>
          
          </div>

          <div style={{ height: 700, width: '100%' }}>
            <DataGrid

              className='disabled-focus'
              rows={japaneseCourses}
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
      <CoursesModal course={selectedCourse} open={isModalOpen} onClose={hanldeClose} lessons={lessons} action={action} fetchCourses={fetchCourses} />
    </>
  );
}

export default CoursesManagement;


