import React, { useEffect, useState } from 'react'
import "./MyCourse.scss"
import { I_User } from '../../Types/types';
import { getData } from '../../Services/API';
import { AuthState } from '../../Redux/Slice/AuthSlice';
import { useSelector } from 'react-redux';

function MyCourse() {
    const [users, setUsers] = useState<I_User | null>(null);
    const loggedInUser = useSelector((state: { auth: AuthState }) => state.auth.user);

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const fetchedUsers = (await getData("users"));

        if (loggedInUser && fetchedUsers) {
            const matchingUser = fetchedUsers.find((u: I_User) => u.email === loggedInUser.email);
            if (matchingUser) {
                console.log(2222222, matchingUser);
                
                setUsers(matchingUser);
            }
        }
    }

  return (
    <div>
          <h1>MyCourse</h1>
          <div className='list-mycourses'>
         
          {users?.myCourses.map((course) => (
              <div key={course.id} className="mycourses-container">
                  <div className="mycourses-card">
                      <img src={course.image} alt="" />
                  </div>
                  <div className="mycourses-name">{course.courseName}</div>

              </div>
          ))}
          </div>
    </div>
  )
}

export default MyCourse
