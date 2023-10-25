import React, { useState, useEffect, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Box, TextField } from "@mui/material";
import NavBar from "../../Components/NavBar/NavBar";
import { I_Category } from "./CatagoryData";
import { I_JapaneseCourse } from "../CoursesManagement/CoursesData";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import axios from "axios";
import { createData, deleteData, getData, updateData } from "../../Service/API";
import { removeUnicode } from "../../Utils/RemoveUnicode";
import CatagoryModal from "./CatagoryModal";

function CatagoryManagement() {
  const [japaneseCourses, setJapaneseCourses] = useState<I_JapaneseCourse[]>(
    []
  );
  const [catagorys, setCatagorys] = useState<I_Category[]>([]);
  const [selectedCatagory, setSelectedCatagory] = useState<I_Category | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu trữ từ khóa tìm kiếm
  const [originalCatagorys, setOriginalCatagorys] = useState<I_Category[]>([]); // Sao lưu danh sách Course gốc

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Mã khóa học",
      width: 280,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category_name",
      headerName: "Tên danh mục",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Mô tả",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "action",
      headerName: "Hành động",
      width: 250,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => handleViewDetails(params.row.id)}
            variant="contained"
            style={{
              backgroundColor: "blue",
              color: "white",
              cursor: "pointer",
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
              cursor: "pointer",
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
              cursor: "pointer",
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
    fetchCatagorys();
  }, []);

  async function fetchCourses() {
    const getCourse = await getData("japaneseCourses");
    setJapaneseCourses(getCourse);
  }

  async function fetchCatagorys() {
    const getCatagory = await getData("categorys");
    setCatagorys(getCatagory);
    setOriginalCatagorys(getCatagory);
  }
  // Hàm xử lý khi có sự thay đổi trên trường tìm kiếm
  const handleSearch = (event: { target: { value: any } }) => {
    const { value } = event.target;
    setSearchTerm(value);
  };
  // Hàm xử lý khi nhấn nút "Clear"
  const handleClear = () => {
    setSearchTerm(""); // Xóa giá trị tìm kiếm
    setCatagorys(originalCatagorys); // Đặt lại danh sách đơn hàng bằng danh sách gốc
  };

  const handleOpenEdit = async (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    setAction("edit");
    setSelectedCatagory(catagory || null);
    setModalOpen(true);
  };

  const handleAddModal = async () => {
    setModalOpen(true);
    setAction("add");
  };

  const hanldeClose = () => {
    setModalOpen(false);
    setSelectedCatagory(null);
    setAction("");
  };

  const handleDeleteCourse = async (id: string) => {
    await deleteData("categorys", id);
    fetchCatagorys();
  };

  const handleViewDetails = (id: string) => {
    const catagory = catagorys.find((catagory) => catagory.id === id);
    if (catagory) {
      setAction("view");
      setSelectedCatagory(catagory);
      setModalOpen(true);
    }
  };

  useEffect(() => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm
    const filteredCoures = originalCatagorys.filter((catagory) => {
      if (catagory && catagory.category_name) {
        return removeUnicode(catagory.category_name.toLowerCase()).includes(
          removeUnicode(searchTerm.toLowerCase())
        );
      }
      return false; // Nếu user hoặc user.username không xác định, bỏ qua
    });
    setCatagorys(filteredCoures); // Cập nhật danh sách người dùng
  }, [searchTerm, originalCatagorys]);

  return (
    <>
      <NavBar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <SlideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Quản lý danh mục</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "160px",
              marginBottom: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddModal}
            >
              Thêm danh mục
            </Button>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <TextField
                label="Tìm kiếm"
                value={searchTerm}
                onChange={handleSearch}
                variant="outlined"
                size="small"
              />
              <Button variant="contained" color="primary" onClick={handleClear}>
                Clear
              </Button>
            </div>
            <div style={{ width: "155px" }}></div>
          </div>

          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              className="disabled-focus"
              rows={catagorys}
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
      <CatagoryModal
        catagory={selectedCatagory}
        open={isModalOpen}
        onClose={hanldeClose}
        japaneseCourses={japaneseCourses}
        action={action}
        fetchCatagorys={fetchCatagorys}
      />
    </>
  );
}
export default CatagoryManagement;
