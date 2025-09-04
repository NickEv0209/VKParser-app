import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';

declare global {
  interface Window {
    electron: {
      getUsers(settings: Settings): User[];
      getProducts(settings: Settings): Product[];
      updateData: (settings: Settings) => Promise<void>;
    };
  }
}

import { ModalActionTypes } from '../../../redux/reducers/modalReducer';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Settings } from '../../../redux/reducers/settingsReducer';
import { User } from '../../../redux/reducers/userReducer';
import { Product } from '../../../redux/reducers/productReducer';
import { LoadingActionTypes } from '../../../redux/reducers/loadingReducer';

const Modal = () => {

  const dispatch = useDispatch()

  const { text, title, btnOk, btnCancel,  isVisible, settings } = useTypedSelector((state) => state.modal)

  const updateData = async () => {
    dispatch({type: LoadingActionTypes.LOADING_ACTIVE})
    dispatch({type: ModalActionTypes.CLOSE_MODAL})
    await window.electron.updateData(settings);
  }

  const handleClose = () => {
    dispatch({type: ModalActionTypes.CLOSE_MODAL})
  }

  return (
    <>
      <Dialog
        open={isVisible}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {btnCancel !== '' &&
          <Button onClick={handleClose} style={{color: 'var(--main-color)'}}>
            {btnCancel}
          </Button>
          }
          {btnOk !== '' &&
          <Button onClick={updateData} autoFocus style={{color: 'var(--main-color)'}}>
            {btnOk}
          </Button>
          }
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Modal;
