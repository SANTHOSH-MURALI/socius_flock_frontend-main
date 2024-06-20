import { useEffect, useState } from 'react';
import './Skills.css'
import Swal from 'sweetalert2';
import { observer } from 'mobx-react';
import { instance, skill_delete_url, skills_fetch_url } from '../../types/GlobalConfig';
import SkillsCreate from '../SkillsCreate/SkillsCreate';


const Skills: React.FC = () => {

  const [showWarehouseCreateModal, setShowWarehouseCreateModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [skills, setSkils] = useState<any>([])

  const triggerFetch = async () => {
    try {
      const result: any = await instance.post(skills_fetch_url, {
        'search_query': searchQuery
      });
      setSkils(result.data.data.skills)
    }
    catch (error: any) {
      Swal.fire({
        title: 'Error Occured',
        text: 'Error Occured During the Data Fetching',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }

  }

  const deleteSkill = async (id: string) => {
    try {
      const result = await instance.delete(skill_delete_url + '/'+id);
      Swal.fire({
        title: 'Skill Removed',
        text: 'The skill removed from your data',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      await triggerFetch()
    }
    catch (error: any) {
      Swal.fire({
        title: 'Error Occured',
        text: 'Error Occured During the Data Fetching',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  useEffect(() => {
    triggerFetch()
  }, [searchQuery]);


  const handleOpenWarehouseCreateModal = () => {
    setShowWarehouseCreateModal(true);
  };

  const handleCloseWarehouseCreateModal = () => {
    setShowWarehouseCreateModal(false);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="warehouse-main">
      <SkillsCreate showModal={showWarehouseCreateModal} onCloseModal={handleCloseWarehouseCreateModal} /> 
      <div className="warehouse-search-container">
        <input type="text" value={searchQuery} onChange={handleSearchInputChange}></input>
        <button className='button-9' onClick={handleOpenWarehouseCreateModal}>Create</button>
      </div>
      <table className="warehouse-main-table">
        <thead className="table-head">
          <tr>
            <th className="table-head-data">Skill Name</th>
            <th className="table-head-data">Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {skills.map((skill: any) => (
            <tr key={skill.id}>
              <td>{skill.skill_name}</td>
              <td>
                <div className="action-cls">
                  <button type='button' className='button-10' onClick={() => { deleteSkill(skill.id) }}>Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div >
  )
};

export default (Skills);
