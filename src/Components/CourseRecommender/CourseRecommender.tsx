import { useEffect, useState } from 'react';
import './CourseRecommender.css'
import { observer } from 'mobx-react';
import Swal from 'sweetalert2';
import { course_recommendation_url, instance } from '../../types/GlobalConfig';

const Products: React.FC = () => {

  const [courses,setCourses] = useState<any>([])


  useEffect(() => {
    triggerFetch()
  }, []);

  const openInNewTab = (url : string) =>{
    window.open(url)
  }
  const triggerFetch = async () => {
    try{
      const response : any = await instance.get(course_recommendation_url)
      setCourses(response.data.data)
    }catch(error : any){
      if (error.response && error.response.status === 404) {
        Swal.fire({
          title: 'Insufficient Data',
          text: 'Please Create minimum five of your interests',
          icon: 'info',
          confirmButtonText: 'OK'
        })
      }
      else {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred during login',
          icon: 'error',
          confirmButtonText: 'OK'
        })
      };
    }
  }

  return (
    <div className="product-main">

      <table className="product-main-table">
        <thead className="table-head">
          <tr>
            <th className='table-head-data'>Course Name</th>
            <th className="table-head-data">Course Search Link</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {courses.map((course : any) => (
            <tr key={course.id}>
              <td className="table-head-data">{course.course_name}</td>
              <td className="table-head-data external-link" onClick={()=>openInNewTab(course.course_url)}>Open</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default observer(Products);