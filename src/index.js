import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import axios from 'axios';
import './style/style.css';
import './global-data.js';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

const globalData = document.createElement('global-data');
const lastUpdate = document.querySelector('.last-update');
const globalDataContainer = document.querySelector('.global-summary .col-md-9');
const summaryTitle = document.querySelector('.summary-title');
const searchField = document.querySelector('.search-field input');
const searchButton = document.querySelector('.search-button');

axios.get('https://covid19.mathdro.id/api/')
  .then((res) => {
    const globalSummary = res.data;
    lastUpdate.textContent = `Last update: ${globalSummary.lastUpdate.slice(0, 9)}`;
    globalData.setAttribute('confirmed', globalSummary.confirmed.value.toLocaleString('en-US'));
    globalData.setAttribute('deaths', globalSummary.deaths.value.toLocaleString('en-US'));
    globalData.setAttribute('recovered', globalSummary.recovered.value.toLocaleString('en-US'));

    globalDataContainer.appendChild(globalData);
  });
searchField.addEventListener('input', () => {
  if (searchField.value == '') {
    axios.get('https://covid19.mathdro.id/api/')
      .then((res) => {
        const globalSummary = res.data;
        summaryTitle.textContent = 'Global Summary';
        lastUpdate.textContent = `Last update: ${globalSummary.lastUpdate.slice(0, 9)}`;
        globalData.setAttribute('confirmed', globalSummary.confirmed.value.toLocaleString('en-US'));
        globalData.setAttribute('deaths', globalSummary.deaths.value.toLocaleString('en-US'));
        globalData.setAttribute('recovered', globalSummary.recovered.value.toLocaleString('en-US'));

        globalDataContainer.appendChild(globalData);
      });
  }
});
searchButton.addEventListener('click', () => {
  if (searchField.value.toLowerCase() !== '') {
    axios.get(`https://covid19.mathdro.id/api/countries/${searchField.value.toLowerCase()}`)
      .then((res) => {
        console.log(res.data);
        summaryTitle.textContent = `${searchField.value} Summary`;
        const countrySummary = res.data;
        lastUpdate.textContent = `Last update: ${countrySummary.lastUpdate.slice(0, 9)}`;
        globalData.setAttribute('confirmed', countrySummary.confirmed.value.toLocaleString('en-US'));
        globalData.setAttribute('deaths', countrySummary.deaths.value.toLocaleString('en-US'));
        globalData.setAttribute('recovered', countrySummary.recovered.value.toLocaleString('en-US'));
      })
      .catch((err) => {
        summaryTitle.textContent = 'Country is not found!';
        lastUpdate.textContent = 'Please type the country correctly';
        globalData.setAttribute('confirmed', 0);
        globalData.setAttribute('deaths', 0);
        globalData.setAttribute('recovered', 0);
      });
  }
});
console.log(searchButton);

const myChart = document.getElementById('myChart').getContext('2d');
const gradient = myChart.createLinearGradient(0, 0, 0, 1025);
gradient.addColorStop(0.5, 'rgba(75, 104, 176, 1)');
gradient.addColorStop(0.1, 'rgba(113, 172, 240, 0.97)');
const barChart = new Chart(myChart, {
  type: 'bar',
  data: {
    labels: ['US', 'India', 'Brazil', 'United Kingdom', 'Russia', 'France', 'Turkey', 'Iran', 'Argentina', 'Colombia'],
    datasets: [{
      label: 'Confirmed',
      data: [
        42931259,
        33652745,
        21351972,
        7700358,
        7313112,
        7085607,
        7039470,
        5533520,
        5250402,
        4951675,
      ],
      backgroundColor: gradient,
    },
    {
      label: 'Deaths',
      data: [
        688032,
        446918,
        594443,
        136529,
        200245,
        117182,
        63166,
        119360,
        114862,
        126145,
      ],
      backgroundColor: 'rgba(113, 172, 240, 1)',
    },
    ],
  },
  options: {},
});
