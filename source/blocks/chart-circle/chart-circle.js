import './chart-circle.scss';

class ChartCircle {
  constructor(block) {
    this.block = block;
    this.blockName = this.block.classList[0];
    this._initialize();
    this._bindEventListeners();
  }

  updateChart({ chartWeight, dataList }) {
    if (chartWeight) {
      this.state.chartWeight = chartWeight;
    }
    if (dataList) {
      this.state.dataList = dataList;
      this.paths.forEach((path) => {
        path.remove();
      });
      this.paths = [];
      this.circle.remove();
      this._populateLabelsAndLegend();
    }
    this._renderState();
  }

  _initialize() {
    this.container = this.block.querySelector(`.js-${this.blockName}__container`);
    this.svg = this.block.querySelector(`.js-${this.blockName}__svg`);
    this.totalValue = this.block.querySelector(`.js-${this.blockName}__total-value`);
    this.legend = this.block.querySelector(`.js-${this.blockName}__legend`);
    this.labels = this.block.querySelectorAll(`.js-${this.blockName}__label`);
    this.paths = [];
    this._setState();
    this._renderState();
  }

  _bindEventListeners() {
    this.svg.addEventListener('mouseover', (event) => this._handlePathMouseOver(event));
    this.svg.addEventListener('mouseout', () => this._handlePathMouseOut());
  }

  _handlePathMouseOver(event) {
    const currentPath = Number(event.target.dataset.pathIndex);
    const rect = this.svg.getBoundingClientRect();
    if (currentPath) {
      const currentLabel = this.labels[currentPath - 1];
      currentLabel.style.left = `${event.clientX - rect.left}px`;
      currentLabel.style.top = `${event.clientY - rect.top}px`;
      currentLabel.classList.add(`${this.blockName}__label_active`);
      this.paths[currentPath - 1].classList.add(`${this.blockName}__path_active`);
    }
  }

  _handlePathMouseOut() {
    this.labels.forEach((label) => {
      label.classList.remove(`${this.blockName}__label_active`);
    });
    this.paths.forEach((path) => {
      path.classList.remove(`${this.blockName}__path_active`);
    });
  }

  _setState() {
    this.state = {
      chartWeight: Number(this.block.dataset.chartWeight),
      dataList: [],
    };
    const chartValues = this.block.dataset.chartValues.split(',');
    const chartTitles = this.block.dataset.chartTitles.split(',');
    chartValues.forEach((val, i) => {
      if (val) {
        this.state.dataList.push({ value: Number(val), title: chartTitles[i] });
      }
    });
  }

  _renderState() {
    this._updateTotalValue();
    this._getPercents();
    this._drawChart();
  }

  _updateTotalValue() {
    this.state.totalValue = this.state.dataList.map((data) => data.value)
      .reduce((acc, val) => acc + val, 0);
    if (this.totalValue) {
      this.totalValue.textContent = this.state.totalValue;
    }
  }

  _getPercents() {
    this.state.dataList.forEach((data) => {
      const d = data;
      d.percent = data.value / this.state.totalValue;
    });
  }

  _drawChart() {
    const getCoordinates = (percent) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };
    let totalPercent = 0;

    this.state.dataList.forEach((data, index) => {
      const [startX, startY] = getCoordinates(totalPercent);
      totalPercent += data.percent;
      const [endX, endY] = getCoordinates(totalPercent);
      const largeArcFlag = data.percent > 0.5 ? 1 : 0;
      const pathData = [
        'M 0 0',
        `L ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        'L 0 0',
      ];
      const $path = $(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
      $path.attr({
        class: `${this.blockName}__path ${this.blockName}__path_${index + 1}`,
        d: pathData.join(' '),
        'data-path-index': index + 1,
      });
      $path.appendTo(this.svg);
      this.paths.push($path[0]);
    });

    if (this.state.chartWeight > 0 && this.state.chartWeight < 1) {
      const $circle = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
      $circle.attr({
        class: `${this.blockName}__circle`,
        cx: 0,
        cy: 0,
        r: 1 - this.state.chartWeight,
      });
      $circle.appendTo(this.svg);
      this.circle = $circle;
    }
  }

  _populateLabelsAndLegend() {
    this.labels.forEach((label) => {
      label.remove();
    });
    this.labels = [];
    if (this.legend) {
      this.legend.innerHTML = '';
    }

    this.state.dataList.forEach((data, index) => {
      const $legendMark = $(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
      $legendMark.attr({
        class: `${this.blockName}__legend-mark`,
        viewBox: '-1 -1 2 2',
      });
      const $legendMarkCircle = $(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));
      $legendMarkCircle.attr({
        class: `${this.blockName}__path_${index + 1}`,
        cx: 0,
        cy: 0,
        r: 1,
      });
      $legendMarkCircle.appendTo($legendMark);

      const $label = $('<span>', {
        class: `${this.blockName}__label js-${this.blockName}__label`,
        'data-path-index': index + 1,
        html: $legendMark,
      });
      const $labelText = $(document.createTextNode(`${data.title ? data.title : ''}: ${data.value}`));
      $labelText.appendTo($label);
      $label.appendTo(this.container);
      this.labels.push($label[0]);

      if (this.legend) {
        const $legendItem = $('<li>', {
          class: `${this.blockName}__legend-item`,
          html: $legendMark.clone(true),
        });
        const $legendText = $(document.createTextNode(`${data.title ? data.title : ''}`));
        $legendText.appendTo($legendItem);
        $legendItem.appendTo(this.legend);
      }
    });
  }
}

export default ChartCircle;
