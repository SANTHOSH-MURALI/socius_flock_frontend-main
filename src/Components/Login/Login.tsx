import { useState } from "react";
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { observer } from "mobx-react";
import loginStore from "../../Store/LoginStore";
import Swal from "sweetalert2";
import pageStore from "../../Store/PageStore";
import userStore from "../../Store/UserStore";
// import Products from "../Products/Products";


const Login: React.FC = observer(() => {


  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { ...errors };

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(formData.email.trim())) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }
    if (formData.password.trim().length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      loginStore.setLoginData(formData.email, formData.password);
      const response: any = await loginStore.makeLogin();
      if (response.status) {
        Swal.fire(response.data)
        await userStore.fetchData()
      }
      else{
        Swal.fire(response.data)
      }
    }
  };

  return (

    
    <div className="signup-login-class">
      <form onSubmit={handleSubmit}>
        <div className="sigup-login-form-class">
          <h3 className="signup-login-header">Login</h3>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type={type} id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <p className="error">{errors.password}</p>}
            <span className="flex justify-around items-center" onClick={handleToggle}>
              <Icon className="absolute mr-10" icon={icon} size={15} />
            </span>
          </div>
          <button type="submit" className="button-9">Login</button>
        </div>
      </form>
    </div>
  );
});

export default Login;
