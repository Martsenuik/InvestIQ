import logo from '../../images/icons/logo.svg'
import userAvatar from "../../images/icons/userAvatar.svg"
import logout from "../../images/icons/logout.svg"
import "./Header.css"

export const Header = () => {
  return (
    <section className='header'>
      
        <img src={logo} alt="logo" className='header-logo' />
       <div>
      <img src={userAvatar} alt="userAvatar" className='header-user-avatar' />
      <img src={logout} alt="logout" className='header-logout-icon' />
      <p className='header-p-user-name'>User Name</p>
        <p className='header-log-out'>Вийти</p>
         </div>
    </section>
  );
};
