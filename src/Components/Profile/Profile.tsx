import { observer } from "mobx-react";
import userStore from "../../Store/UserStore";
import React from "react";
import './Profile.css'

const Profile :React.FC = observer(() => {
  return (
    <div className="profile-main">
      <h3 className="profile-head">Profile</h3>
      <div className="profile-body">
        <div className="profile-data-container">
          <div> Name : </div>
          <div>{userStore.userData?.name}</div>
        </div>
        <div className="profile-data-container">
          <div> Email Id : </div>
          <div>{userStore.userData?.email_id}</div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
