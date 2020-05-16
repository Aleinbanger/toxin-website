import ChartCircle from '../../blocks/chart-circle/chart-circle';

function renderBlocks() {
  const chart = new ChartCircle(document.querySelector('.js-chart-circle'));
  chart.updateChart({
    dataList: [
      { value: 130, title: 'asd' },
      { value: 65, title: 'zxc' },
      { value: 65, title: 'qwe' },
      { value: 65, title: 'rty' },
    ],
  });
}

export default renderBlocks();
