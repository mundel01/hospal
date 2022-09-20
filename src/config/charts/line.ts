export const LINE_CHART_CONFIG: any = {
  series: [],
  chart: {
    height: 450,
    type: 'line',
    zoom: {
      enabled: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
  },
  // title: {
  //   text: 'Progress Report',
  //   align: 'left',
  // },
  grid: {
    row: {
      colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  xaxis: {},
};
