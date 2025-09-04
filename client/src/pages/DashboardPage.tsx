import { BarChart } from '@mui/x-charts/BarChart';

import './styles/DashboardPage.css'

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page__title-block">
        <h1 className="dashboard-page__title">Активность</h1>
      </div>

      <div className="dashboard-page__visual">
        <BarChart
          xAxis={[{ scaleType: 'band', data: [
            'Wildberries',
            'Ozon',
            'Yandex market',
          ]}]}
          series={[
            { data: [3320, 2345, 3456], color: 'gray' },
          ]}
          width={850}
          height={650}
        />
      </div>

      <div className="dashboard-page__info">

      </div>
    </div>
  )
}

export default DashboardPage
