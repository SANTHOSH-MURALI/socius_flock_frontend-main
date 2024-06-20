import { observer } from 'mobx-react';
import './JobsRecommmender.css'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { instance, recommend_job_url } from '../../types/GlobalConfig';

const JobsRecommmender: React.FC = () => {


  const [jobs, setJobDetails] = useState([]);

  const triggerFetch = async () => {
    try{
      const result = await instance.get(recommend_job_url)
      setJobDetails(result.data.data)
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

  useEffect(() => {
    triggerFetch()
  }, []);

  const handleSearch = () => {
    triggerFetch()
  };



  return (
    <div className="movement-main">
      <table className="movement-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">Job Title</th>
            <th className="table-head-data">Job link</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {jobs.map((job : any, index) => (
            <tr key={index}>
              <td className="table-head-data">{job.job_title}</td>
              <td className="table-head-data"><a href={job.job_link} target="_blank" rel="noopener noreferrer">{job.job_link}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default observer(JobsRecommmender);