import { Button, Divider, FormControl, FormControlLabel, Slider, Switch, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

import './styles/SettingPage.css'

import { useDispatch } from 'react-redux';
import { ModalActionTypes } from '../redux/reducers/modalReducer';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { SettingsActionTypes } from '../redux/reducers/settingsReducer';


const SettingPage = () => {
  const dispatch = useDispatch()

  const { pageLink, messagesCount, headless } = useTypedSelector((state) => state.setting)
  
  const [statePageLink, setPageLink] = useState(pageLink);
  const [stateMessagesCount, setMessagesCount] = useState(messagesCount);
  const [isVisibleBrowser, setIsVisibleBrowser] = useState(!headless);
  
 
  const handleChangeMess = () => {
    setIsVisibleBrowser(!isVisibleBrowser)
  }

  const handlePageLink = (e: ChangeEventHandler<HTMLInputElement>) => {
    {/* @ts-expect-error is necessary */}
    setPageLink(e.target.value)
  }

  const handleMessagesCount = (e: ChangeEventHandler<HTMLInputElement>) => {
    {/* @ts-expect-error is necessary */}
    setMessagesCount(Number(e.target.value))
  }

  const setSettingsValues = () => {
    const updateSettings = {
      pageLink: statePageLink,
      messagesCount: stateMessagesCount > 200 ? 200 : stateMessagesCount,
      headless: !isVisibleBrowser,
    }


    dispatch({
      type: SettingsActionTypes.SET_SETTINGS,
      payload: {
        pageLink: statePageLink,
        messagesCount: stateMessagesCount,
        headless: !isVisibleBrowser,
      }
    })

    localStorage.setItem('parserSettings', JSON.stringify(updateSettings));

    dispatch({
      type: ModalActionTypes.OPEN_MODAL,
      payload: {
        title: 'Настройки применены',
        text: 'Можете закрыть окно или сразу обновить данные',
        btnOk: 'Обновить данные',
        btnCancel: 'Закрыть',
        settings: updateSettings,
      }
    })
  }

  const changeMainColor = (color: string, colorRgb: string) => {
    document.documentElement.style.setProperty('--main-color', color);
    document.documentElement.style.setProperty('--main-color-rgb', colorRgb);
    localStorage.setItem('mainColor', color);
    localStorage.setItem('mainColor-rgb', colorRgb);
  };


  return (
    <div className="setting-page">
      <div className="setting-page__title-block">
        <h1 className="setting-page__title">Настройки</h1>
      </div>

      <div className="setting-page__content">
        <div className="select-color">
          <h2 className="select-color__title">Изменить основной цвет</h2>
          <p className="select-color__description">
            В выбранный цвет будут окрашены все кнопки, выделения и заголовок страницы.
          </p>
          <div className="select-color__colors">
            <div className="color select-color-blue" onClick={() => changeMainColor('#2f9eef', '47, 158, 239')}></div>
            <div className="color select-color-light-green" onClick={() => changeMainColor('#059ea1', '5, 158, 161')}></div>
            <div className="color select-color-green" onClick={() => changeMainColor('#008062', '0, 128, 98')}></div>
            <div className="color select-color-purple" onClick={() => changeMainColor('#9708d4', '151, 8, 212')}></div>
            <div className="color select-color-orange" onClick={() => changeMainColor('#d45d08', '212, 93, 8')}></div>
            <div className="color select-color-red" onClick={() => changeMainColor('#c2053b', '194, 5, 59')}></div>
          </div>
        </div>

        <div className="parsing-link">
          <h2 className="parsing-link__title">Изменить данные парсинга</h2>
          <h3 className="parsing-link__title">Изменить ссылку</h3>
          <p className="parsing-link__description">Ссылка должна указывать на конференцию ВК, которая содержит ссылки товаров из маркетплейсов.</p>
          {/* <input className="parsing-link__input" value={statePageLink} onChange={handlePageLink}/> */}
          {/* @ts-expect-error is necessary */}
          <TextField id="outlined-basic" variant="outlined" onChange={handlePageLink} value={statePageLink} style={{width: '500px', marginTop: '10px'}}/>

          
          <br />
          <Divider />
          <br />

          <h3 className="parsing-link__title">Изменить кол-во сообщений</h3>
          <p className="parsing-link__description">Укажите кол-во сообщений которые хотите прогрузить (от <b>1</b> до <b>200</b>).</p>
          <div className="parsing-link__container">
            {/* @ts-expect-error is necessary */}
            <Slider defaultValue={1} value={stateMessagesCount} aria-label="Default" valueLabelDisplay="auto" onChange={handleMessagesCount} max={200} min={1} color='primary'/>
            {/* @ts-expect-error is necessary */}
            <input className="parsing-link__input" value={stateMessagesCount} type='number' max={200} min={1} onChange={handleMessagesCount} style={{width: '50px'}}/>
            {/* <TextField id="outlined-basic" label="Кол-во" variant="filled" onChange={handleMessagesCount} value={stateMessagesCount} style={{width: '100px'}} type='number' max={200} min={1}/> */}
          </div>

            <FormControl>
              <FormControlLabel 
                control={<Switch
                  checked={isVisibleBrowser}
                  onChange={handleChangeMess}
                  inputProps={{ 'aria-label': 'controlled' }}

                />}
                label={<span className="parsing-link__description">Отображать браузер при парсинге</span>}
              />
            </FormControl>
          <Button style={{color: 'var(--main-color)', width: 'fit-content'}} className='sidebar__button' onClick={setSettingsValues}>Применить</Button>
        </div>
      </div>
    </div>
  )
}

export default SettingPage

//'https://vk.com/al_im.php?sel=c13'