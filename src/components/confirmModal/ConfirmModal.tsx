import './confirmModal.css'


interface ConfirmModalProps {
  modalStep: "step1" | "step2" | null;
  handleNextModal: () => void;
  handleFinalLogOut: () => void;
  handleClose: () => void;
}

export const ConfirmModal = ({ 
  modalStep, 
  handleNextModal, 
  handleFinalLogOut, 
  handleClose 
}: ConfirmModalProps) => {
  if (!modalStep) return null;

  const handleYesClick = () => {
    if (modalStep === 'step1') {
      handleNextModal();
    } else if (modalStep === 'step2') {
      handleFinalLogOut();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-window">
        <button className="modal-close-btn" onClick={handleClose}>
          ✕
        </button>

        {modalStep === 'step1' && <p className="modal-text">Ви впевнені?</p>}
        {modalStep === 'step2' && <p className="modal-text">Ви дійсно хочете вийти?</p>}
        
        <div className="modal-buttons">
          <button className="modal-btn modal-btn-yes" onClick={handleYesClick}>ТАК</button>
          <button className="modal-btn modal-btn-no" onClick={handleClose}>НІ</button>
        </div>
      </div>
    </div>
  );
};







