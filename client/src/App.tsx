import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { lazy, useEffect, Suspense } from 'react';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
// import ProductPage from './pages/ProductPage';
// import UserPage from './pages/UserPage';
// import SettingPage from './pages/SettingPage';
// import DashboardPage from './pages/DashboardPage';

// const Header = lazy(() => import('./components/Header/Header'))
// const Sidebar = lazy(() => import('./components/Sidebar/Sidebar'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const UserPage = lazy(() => import('./pages/UserPage'))
const SettingPage = lazy(() => import('./pages/SettingPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))

import './App.css';
import Modal from './components/UI/Modal/Modal';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  components: {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: 'var(--main-color)', // Цвет ползунка в активном состоянии
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: 'var(--main-color)', // Цвет трека в активном состоянии
          },
        },
        track: {
          backgroundColor: '#e0e0e0', // Цвет трека в неактивном состоянии
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: 'var(--main-color)', // Основной цвет
        },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(var(--main-color-rgb), .16)', // Визуализация при фокусе
          },
          '&.Mui-active': {
            boxShadow: '0 0 0 16px rgba(var(--main-color-rgb), .16)', // Визуализация при активном состоянии
          },
        },
        track: {
          backgroundColor: 'var(--main-color)',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          justifyContent: 'center', // Центрирование пагинации
          display: 'flex',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          // color: 'var(--main-color)', // Цвет текста элементов
          '&.Mui-selected': {
            backgroundColor: 'var(--main-color)', // Цвет фона выбранного элемента
            color: '#fff', // Цвет текста выбранного элемента
            '&:hover': {
              backgroundColor: 'rgba(var(--main-color-rgb), 0.8)', // Цвет при наведении
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              // borderColor: 'var(--main-color)', // Цвет границы
            },
            '&:hover fieldset': {
              borderColor: 'rgba(var(--main-color-rgb), 0.8)', // Цвет границы при наведении
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--main-color)', // Цвет границы в фокусе
              borderWidth: '2px', // Толщина границы в фокусе
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            // borderColor: 'var(--main-color)', // Цвет границы
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(var(--main-color-rgb), 0.8)', // Цвет границы при наведении
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--main-color)', // Цвет границы в фокусе
            borderWidth: '1px', // Толщина границы в фокусе
          },
        },
        icon: {
          // color: 'var(--main-color)', // Цвет иконки раскрытия
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: '8px', // Высота прогресс-бара
          backgroundColor: 'rgba(var(--main-color-rgb), 0.2)', // Цвет фона
        },
        bar: {
          backgroundColor: 'var(--main-color)', // Основной цвет прогресса
        },
      },
    },
  },
});


function App() {
  const location = useLocation();

  useEffect(() => {
    const savedColor = localStorage.getItem('mainColor');
    const savedColorRgb = localStorage.getItem('mainColor-rgb');
    if (savedColor) {
      document.documentElement.style.setProperty('--main-color', savedColor);
      document.documentElement.style.setProperty('--main-color-rgb', savedColorRgb);
    }
  }, []);

  return (
    <div className="app">
      <Header />
      <Sidebar />
      <div className="content">
        <TransitionGroup>
          <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes location={location}>
                <Route path="/" element={<ProductPage />} />
                <Route path="/users" element={<UserPage />} />
                <Route path="/settings" element={<SettingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </Suspense>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <Modal />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </Router>
  );
}
