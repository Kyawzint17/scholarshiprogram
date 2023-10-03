// components/Profile.js
import styles from "../styles/Profile.module.css";
import utilStyle from "../styles/Utils.module.css"


const Profile = ({ user }) => {
  return (
    <div className={utilStyle["html"]}>
      <div className={styles["profile-page"]}>
        <div className={styles["profile-image"]}>
          <img 
          src={user.profileImage} 
           alt={`${user.name}'s profile`} 
           style={{marginTop: '20px'}}
           />
        </div>
        <div className="profile-details">
         <h1>{user.name}</h1>
         <p>{user.id}</p>
         <p>Email: {user.email}</p>
         {/* Add more profile information */}
       </div>
      </div>
    </div>
  );
};

export default Profile;
