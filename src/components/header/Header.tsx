import logo from '../../images/icons/logo.svg'
import userAvatar from "../../images/icons/userAvatar.svg"
import logout from "../../images/icons/logout.svg"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import "./Header.css"
import { ConfirmModal } from '../confirmModal/ConfirmModal'

export const Header = () => {
  const [modalStep, setModalStep] = useState<"step1" | "step2" | null>(null);

  const navigate = useNavigate();

  
  const handleOpenFirstModal = () => {
    setModalStep('step1')
  }
  const handleNextModal = () => {
    setModalStep('step2')
  }
  const handleFinalLogOut = () => {
    setModalStep(null);
    localStorage.removeItem("userEmail")
    navigate("/auth")
  }
  const handleClose = () => {
    setModalStep(null)
  }

  return (
    <section className='header'>
      
        <img src={logo} alt="logo" className='header-logo' />
       <div className='header-right-box'>
      <img src={userAvatar} alt="userAvatar" className='header-user-avatar' />
        <img src={logout} alt="logout" className='header-logout-icon' onClick={handleOpenFirstModal} />
        
         <p className='header-p-user-name'>User Name</p>
        <p className='header-log-out' onClick={handleOpenFirstModal}>Вийти</p>
        <ConfirmModal
          modalStep={modalStep}
          handleNextModal={handleNextModal}
          handleFinalLogOut={handleFinalLogOut}
          handleClose={handleClose}
        />
         </div>
    </section>
  );
};
