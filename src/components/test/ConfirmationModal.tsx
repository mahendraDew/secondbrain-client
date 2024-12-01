interface ConfirmationModalProps {
    onCancel: () => void;
    onConfirm: () => void;
  }
  
  const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onCancel, onConfirm }) => {
    return (
      <div className="confirmation-modal flex flex-col justify-center items-center">
        <p>Are you sure you want to share your content publicly?</p>
        <div className="flex gap-4">
          <button onClick={onCancel} className="btn-cancel bg-blue-800 p-1">Cancel</button>
          <button onClick={onConfirm} className="btn-confirm bg-blue-800 p-1">Confirm</button>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  