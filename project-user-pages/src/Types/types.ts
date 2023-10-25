export interface I_JapaneseCourse {
  id: string;
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

export interface I_Category {
  id: string;
  category_name: string;
  description: string;
  status: boolean;
  courses: [];
}

export interface I_User {
  id: string;
  userName: string;
  email: string;
  fullname: string | "";
  status: boolean;
  password?: string;
  avatar?: string | "";
  phone: string | "";
  address: string | "";
  created_at: string;
  myCourses: any[];
};

export interface I_UserPay {
  email: string;
  fullname: string;
  phone: string;
  address: string;
  created_at: string;
  cardName: string;
  numberCard: string;
  expDate: string;
}


