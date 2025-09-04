import { Search } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
// import DarkModeIcon from "@mui/icons-material/DarkMode";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CancelIcon from '@mui/icons-material/Cancel';

import "./Header.css";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { SearchActionTypes } from "../../redux/reducers/searchReducer";
import { memo } from "react";
import { ModalActionTypes } from "../../redux/reducers/modalReducer";

const Header = memo(() => {
  const dispatch = useDispatch()
  const query = useTypedSelector((state) => state.search.query)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SearchActionTypes.SET_SEARCH_QUERY, payload: event.target.value })
  }
  const clearSearchHandler = () => {
    dispatch({ type: SearchActionTypes.DEFAULT_SEARCH_QUERY })
  }

  const openScanProduct = () => {
    dispatch({
      type: ModalActionTypes.OPEN_MODAL,
      payload: {
        title: 'Сканирование товара',
        text: 'функция будет доступна в следующей версии приложения',
        btnOk: '',
        btnCancel: '',
      }
    })
  }

  return (
    <>
    {/* {isLoading &&
      <div>
        <h3 style={{color: 'var(--desc-color)', textAlign: 'center'}}>Собираем данные...</h3>
        <LinearProgress color="warning" style={{height: '50px'}}/>
      </div>
    } */}

    <div className="header">
      <div className="header__search-block">
        <div className="header__input">
          <Search style={{ color: "white" }} />
          <input
            placeholder="Поиск..."
            value={query}
            onChange={handleSearchChange}
          />
          {query.length > 0 ?
            <IconButton style={{width: '30px', height: '30px'}} onClick={clearSearchHandler}>
              <CancelIcon style={{ color: "white" }} />
            </IconButton>
            : null}

        </div>
        <Tooltip title='Сканировать товар' placement="bottom" arrow>
          <IconButton onClick={openScanProduct}>
            <QrCodeScannerIcon style={{ color: "white" }} />
          </IconButton>
        </Tooltip>
      </div>
      {/* <Tooltip title='Сменить тему' placement="bottom" arrow>
        <IconButton>
          <DarkModeIcon style={{ color: "white" }} />
        </IconButton>
      </Tooltip> */}
    </div>
    </>
  );
});

export default Header;
