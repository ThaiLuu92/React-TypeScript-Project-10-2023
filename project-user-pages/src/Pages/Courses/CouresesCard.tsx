import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./CouresesCard.scss"
import { Button } from '@mui/material';
import { I_JapaneseCourse, I_Category } from '../../Types/types';
import { useEffect, useState } from 'react';
import { getData } from '../../Services/API';
import { removeUnicode } from '../../Utils/RemoveUnicode';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CouresesCard() {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [japaneseCourses, setJapaneseCourses] = useState<I_JapaneseCourse[]>([]);
    useEffect(() => {
        fetchCourses();

    }, []);

    async function fetchCourses() {
        const getCourse = await getData("japaneseCourses")
        setJapaneseCourses(getCourse)

    }


    return (
        <>
            {japaneseCourses.map((course) => (<Card key={course.id} sx={{ maxWidth: 270 }}>
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
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph sx={{ fontSize: 18, fontWeight: 700 }}>Thông tin khóa học:</Typography>
                        <Typography paragraph>
                            Thời gian: <span>{course.enrollmentDurationInMonths}</span>
                        </Typography>
                        <Typography paragraph>
                            Số bài học: <span>{course.lessons.length} bài</span>
                        </Typography>

                    </CardContent>
                </Collapse>
            </Card>))}
        </>
    );
}