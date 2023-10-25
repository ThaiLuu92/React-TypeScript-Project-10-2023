export interface I_JapaneseCourse {
  id:string;
  courseName: string;
  description: string;
  level: string;
  category: string;
  lessons: string[];
  price: number;
  enrollmentDurationInMonths: number;
  coverImage: string;
  isActive: boolean;
}

// export const japaneseCourses: I_JapaneseCourse[] = [
//   {
//     courseId: 1,
//     courseName: "Học Online N5",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N5",
//     category: "JLPT",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 990000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 2,
//     courseName: "Học Online N4",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N4",
//     category: "JLPT",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1290000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 3,
//     courseName: "Học Online N3",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N3",
//     category: "JLPT",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1590000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 11,
//     courseName: "Học Kaiwa Sơ cấp",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "Beginner",
//     category: "Kaiwa",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1190000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 12,
//     courseName: "Học Kaiwa Trung cấp",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "Intermediate",
//     category: "Kaiwa",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1190000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 21,
//     courseName: "Luyện đề N5",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N5",
//     category: "Shiken",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 390000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 22,
//     courseName: "Luyện đề N4",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N4",
//     category: "Shiken",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 490000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 23,
//     courseName: "Luyện đề N3",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "N3",
//     category: "Shiken",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1590000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 31,
//     courseName: "Tiếng Nhật Doanh Nghiệp Sơ cấp",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "Beginner",
//     category: "Business",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1490000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
//   {
//     courseId: 32,
//     courseName: "Tiếng Nhật Doanh Nghiệp Trung cấp",
//     description: "Khóa học giúp bạn học tiếng Nhật từ cơ bản",
//     level: "Intermediate",
//     category: "Business",
//     lessons: ["Bài học 1", "Bài học 2", "Bài học 3"],
//     price: 1790000,
//     enrollmentDurationInMonths: 6,
//     coverImage: "course1.jpg",
//   },
// ];