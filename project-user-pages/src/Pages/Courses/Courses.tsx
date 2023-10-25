import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Collapse,
    Input,
    Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClearIcon from '@mui/icons-material/Clear'; // Import icon Clear
import { getData } from '../../Services/API';
import { removeUnicode } from '../../Utils/RemoveUnicode';
import "./Courses.scss";
import { Link } from 'react-router-dom';
import { I_JapaneseCourse, I_Category } from '../../Types/types';

export default function Courses() {
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const [japaneseCourses, setJapaneseCourses] = useState<I_JapaneseCourse[]>([]);
    const [categorys, setCategorys] = useState<I_Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCourses();
        fetchCategory();
    }, []);

    async function fetchCourses() {
        const getCourse = await getData("japaneseCourses");
        setJapaneseCourses(getCourse);
    }

    async function fetchCategory() {
        const getLession = await getData("categorys");
        setCategorys(getLession);
    }

    const handleSearch = (event: { target: { value: any } }) => {
        const { value } = event.target;
        setSearchTerm(removeUnicode(value)); // Gọi hàm removeUnicode ở đây để loại bỏ dấu và các ký tự đặc biệt
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const handleExpandClick = (courseId: string) => {
        setExpandedCard(courseId === expandedCard ? null : courseId);
    };

    return (
        <div className="main-center-bg">
            <Container>
                <div className="main-center container">
                    <div className="main-center-title">
                        <Typography variant="h4">Danh mục sản phẩm</Typography>
                        <div className="search-bar">
                            <div className="search-input">
                                <Input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                                {searchTerm && (
                                    <Button
                                        onClick={clearSearch}

                                        startIcon={<ClearIcon />} // Icon Clear
                                    >

                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <ul className="main-center-tabs" id="course-center-tabs">
                        {categorys.map((category) => (
                            <li key={category.id}>
                                <a href="#">
                                    <span>{category.category_name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="list-courses">
                    {categorys.map((category) => (
                        <div className="main-menu-1 container jlpt" key={category.id}>
                            <div className="main-menu-title" style={{ marginTop: '20px' }}>
                                <Typography variant="h4">{category.category_name}</Typography>
                            </div>

                            <div className="list-courses-card">
                                {category.courses.map((courseId) => {
                                    const course = japaneseCourses.find((c) => c.id === courseId);
                                    if (course) {
                                        const isExpanded = courseId === expandedCard;
                                        const courseName = course.courseName.toLowerCase();
                                        const searchTermLower = removeUnicode(searchTerm.toLowerCase());
                                        if (searchTermLower && !courseName.includes(searchTermLower)) {
                                            return null; // Không khớp với từ khóa tìm kiếm
                                        }
                                        return (
                                            <Card key={course.id} sx={{ maxWidth: 270 }}>
                                                <CardHeader className="custom-card-header" title={course.courseName} />
                                                <CardMedia
                                                    className="custom-card-media"
                                                    component="img"
                                                    height="194"
                                                    image={course.coverImage}
                                                    alt="Học Online N5"
                                                />
                                                <CardContent className="custom-card-content">
                                                    <Typography variant="body1" color="text.secondary">
                                                        Giá VND: <span>{course.price}</span>
                                                    </Typography>
                                                    <div className="centered-button">
                                                        <Button style={{ fontSize: '16px', fontWeight: 700 }}>
                                                            Mua ngay
                                                        </Button>
                                                    </div>
                                                    <Link style={{ fontSize: '16px', fontWeight: 700 }}  to={`/japaneseCourses/${course.id}`}>Xem chi tiết</Link>
                                                </CardContent>
                                                <CardActions disableSpacing>
                                                    <IconButton aria-label="add to favorites">
                                                        <FavoriteIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="share">
                                                        <ShareIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleExpandClick(courseId)}
                                                        aria-expanded={isExpanded}
                                                        aria-label="show more"
                                                    >
                                                        <ExpandMoreIcon />
                                                    </IconButton>
                                                </CardActions>
                                                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                                    <CardContent>
                                                        <Typography paragraph sx={{ fontSize: 18, fontWeight: 700 }}>
                                                            Thông tin khóa học:
                                                        </Typography>
                                                        <Typography paragraph>
                                                            Thời gian: <span>{course.enrollmentDurationInMonths}</span>
                                                        </Typography>
                                                        <Typography paragraph>
                                                            Số bài học: <span>{course.lessons.length} bài</span>
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>
                                            </Card>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}
