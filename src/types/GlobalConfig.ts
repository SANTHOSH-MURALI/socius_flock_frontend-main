import axios from "axios";


export const base_url : string = 'http://localhost:9001'

export const login_url : string = base_url + '/api/auth/login'

export const signup_url : string = base_url + '/api/auth/signup'

export const user_details_url : string = base_url + '/api/user'

export const logout_url : string = base_url + '/api/auth/logout'

export const skill_create_url : string = base_url + '/api/skills'

export const skills_fetch_url : string = base_url + '/api/skills/all'

export const skill_delete_url : string = base_url + '/api/skills/delete'

export const course_recommendation_url : string = base_url + '/api/user/courses'

export const recommend_job_url : string = base_url + '/api/user/jobs'

export const instance = axios.create({
  withCredentials: true
});
