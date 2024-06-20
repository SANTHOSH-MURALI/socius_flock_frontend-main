import { observer } from 'mobx-react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import pageStore from '../../Store/PageStore';
import Skills from '../Skills/Skills';
import { instance, skill_create_url } from '../../types/GlobalConfig';

interface FormData {
  name: string;
}

interface SkillsCreateProps {
  showModal: boolean;
  onCloseModal: () => void;
}

const SkillsCreate: React.FC<SkillsCreateProps> = ({ showModal, onCloseModal }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
  });

  const [errors, setErrors] = useState({
    name: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let valid = true;
    if (formData.name === '') {
      newErrors.name = 'Enter the skill name';
      valid = false;
    }
    setErrors(newErrors);
    if (!valid) {
      return;
    }
    try {
      await instance.post(skill_create_url, {
        'skill_name': formData.name
      })
      Swal.fire({
        title: 'Created',
        text: 'Skill created successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      setFormData({ name: '' });
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        Swal.fire({
          title: 'Already Exist',
          text: 'The Entered Skill is Already Exists',
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
  pageStore.setState(Skills)
  onCloseModal();
};

return (
  <div>
    {showModal && (
      <div className="modal-overlay">
        <div className="modal">
          <span className="close" onClick={onCloseModal}>
            &times;
          </span>
          <h2>Create New Interests</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Interest Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <button type="submit" className='button-9'>Create</button>
          </form>
        </div>
      </div>
    )}
  </div>
)}

export default observer(SkillsCreate);
