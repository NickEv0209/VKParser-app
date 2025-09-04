import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ModalActionTypes } from "../../redux/reducers/modalReducer";
import { Divider, Tooltip } from "@mui/material";

const NotSearchProducts = () => {
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
    <>
      <div className="products__not-search">
        <h2>Товары не найдены</h2>
        <br />
        <Tooltip title='Обновить данные' placement="right" arrow>
          <h3 onClick={handleOpenModal}>Обновите данные</h3>
        </Tooltip>
        <Divider style={{margin: '5px'}}/>
        <p>
          Убедитесь, что установлены правильные
          <Tooltip title='Перейти в настройки' placement="right" arrow>
            <Link to={'/settings'} style={{marginLeft: '5px', textDecoration: 'none'}}>
              <span>настройки</span>
            </Link>
          </Tooltip>
        </p>
      </div>
    </>
  )
}

export default NotSearchProducts;
