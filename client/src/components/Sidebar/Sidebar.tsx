
import { Link, useLocation } from 'react-router-dom'
import { Button, Divider } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SettingsIcon from "@mui/icons-material/Settings";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
import RefreshIcon from "@mui/icons-material/Refresh";

import "./Sidebar.css";
import { useDispatch } from 'react-redux';
import { ModalActionTypes } from '../../redux/reducers/modalReducer';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
 
  const { headless, messagesCount, pageLink } = useTypedSelector((state) => state.setting)

  const handleOpenModal = () => {
    dispatch({
      type: ModalActionTypes.OPEN_MODAL,
      payload: {
        title: 'Хотите обновить данные?',
        text: 'Запустится парсинг страниц, пока данные не обновятся, можно продолжать работу.',
        btnOk: 'Обновить',
        btnCancel: 'Отмена',
        settings: {
          pageLink,
          messagesCount,
          headless,
        }
      }
    })
  }

  return (
    <div className="sidebar">
      <Link to='/'>
        <Button
          variant="text"
          startIcon={<Inventory2Icon />}
          className="sidebar__button"
          style={location.pathname === '/' ? { color: "var(--main-color)" } : { color: "var(--dark-color)" }}
        >
          Товары
        </Button>
      </Link>

      <Link to='/users'>
        <Button
          variant="text"
          startIcon={<PeopleAltIcon />}
          className="sidebar__button"
          style={location.pathname === '/users' ? { color: "var(--main-color)" } : { color: "var(--dark-color)" }}
        >
          Пользователи
        </Button>
      </Link>

      <Divider style={{ margin: 15 }} />

      <Link to='/settings'>
        <Button
          variant="text"
          startIcon={<SettingsIcon />}
          className="sidebar__button"
          style={location.pathname === '/settings' ? { color: "var(--main-color)" } : { color: "var(--dark-color)" }}
        >
          Настройки
        </Button>
      </Link>

      {/* <Link to='/dashboard'>
        <Button
          variant="text"
          startIcon={<EqualizerIcon />}
          className="sidebar__button"
          style={location.pathname === '/dashboard' ? { color: "var(--main-color)" } : { color: "var(--dark-color)" }}
        >
          Активность
        </Button>
      </Link> */}

      <Divider style={{ margin: 15 }} />
      <Button
        variant="text"
        startIcon={<RefreshIcon />}
        className="sidebar__button"
        style={{ color: "var(--dark-color)" }}
        onClick={handleOpenModal}
      >
        Обновить данные
      </Button>
    </div>
  );
};

export default Sidebar;
