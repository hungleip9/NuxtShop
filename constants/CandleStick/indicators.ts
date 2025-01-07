export function VOL_CUSTOM (calcParams: any) {
  return {
    name: 'VOL_CUSTOM',
    shortName: 'Volume',
    series: 'volume',
    calcParams: calcParams,
    shouldFormatBigNumber: true,
    precision: 0,
    minValue: 0,
    figures: [
      { key: 'ma20', title: 'MA20: ', type: 'line' },
      {
        key: 'volume',
        title: 'Volume: ',
        type: 'bar',
        baseValue: 0,
        styles: function (data: any, indicator: any, defaultStyles: any) {
            var kLineData = data.current.kLineData as any;
            var color;
            if (kLineData) {
              if (kLineData.close > kLineData.open) {
                  color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
              }
              else if (kLineData.close < kLineData.open) {
                  color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
              }
              else {
                  color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
              }
            }
            return { color: color };
        }
      }
    ],
    regenerateFigures: function (params: any) {
      var figures = params.map(function (p: any, i: any) {
          return { key: "ma".concat(i + 1), title: "MA".concat(p, ": "), type: 'line' };
      });
      figures.push({
          key: 'volume',
          title: 'VOLUME: ',
          type: 'bar',
          baseValue: 0,
          styles: function (data :any, indicator: any, defaultStyles: any) {
              var kLineData = data.current.kLineData as any;
              var color;
              if (kLineData) {
                if (kLineData.close > kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].upColor);
                }
                else if (kLineData.close < kLineData.open) {
                    color = formatValue(indicator.styles, 'bars[0].downColor', (defaultStyles.bars)[0].downColor);
                }
                else {
                    color = formatValue(indicator.styles, 'bars[0].upColor', (defaultStyles.bars)[0].noChangeColor);
                }
              }
              return { color: color };
          }
      });
      return figures;
    },
    calc: function (dataList: any, indicator: any) {
      var params = indicator.calcParams, figures = indicator.figures;
      var volSums = [] as any;
      return dataList.map(function (kLineData: any, i: any) {
        var _a;
        var volume = (_a = kLineData.volume) !== null && _a !== void 0 ? _a : 0;
        var vol = { volume: volume } as any;
        params.forEach(function (p: any, index: number) {
          var _a, _b;
          volSums[index] = ((_a = volSums[index]) !== null && _a !== void 0 ? _a : 0) + volume;
          if (i >= p - 1) {
              vol[figures[index].key] = volSums[index] / p;
              volSums[index] -= ((_b = dataList[i - (p - 1)].volume) !== null && _b !== void 0 ? _b : 0);
          }
        });
        return vol;
      });
    },
    createTooltipDataSource: function (params: any) {
      return {
        name: false,
      }
    }
  }
}
export function MA_CUSTOM (selectedMa: any, figures: any) {
  if (!selectedMa || !figures) return
  return {
    name: 'MA_CUSTOM',
    shortName: '',
    series: 'price',
    shouldFormatBigNumber: true,
    calcParams: selectedMa,
    shouldOhlc: true,
    figures: figures,
    precision: 2,
    // Calculation results
    calc: (kLineDataList: any, { calcParams, figures }: any) => {
      return getCalc(kLineDataList, { calcParams, figures })
    }
  }
}
export const RSI_CUSTOM = {
  name: 'RSI_CUSTOM',
  shortName: 'RSI',
  calcParams: [14],
  shouldFormatBigNumber: true,
  figures: [
    { key: 'rsi14', title: 'RSI14: ', type: 'line' },
  ],
  regenerateFigures: function (params: any) { // Viết label
    return params.map(function (_: any, index: number) {
      var num = index + 1 as any;
      return { key: "rsi".concat(num), title: "RSI".concat(num, ": "), type: 'line' };
    });
  },
  calc: function (dataList: any) { // Tính RIS
    let rsiABSEma = 0;
    let rsiMaxEma = 0;
    return dataList.map(function (kLineData: any, index: number) {
      let rsi = {} as any;
      const prevClose = (dataList[index - 1] ? dataList[index - 1] : kLineData)?.close;
      const hieuClose = kLineData.close - prevClose;
      if (index == 0) {
        rsi['rsi14'] = 0;
        rsiABSEma = 0;
        rsiMaxEma = 0;
      } else {
        const rMax = Math.max(0, hieuClose);
        const rAbs = Math.abs(hieuClose);
        rsiMaxEma = (rMax + (14 - 1) * rsiMaxEma) / 14;
        rsiABSEma = (rAbs + (14 - 1) * rsiABSEma) / 14;
        rsi['rsi14'] = (rsiMaxEma / rsiABSEma) * 100;
      }
      if (index < 13) {
        rsi['rsi14'] = 0;
      }
      return rsi;
    });
  },
  createTooltipDataSource: function (params: any) {
    return {
      name: false,
    }
  }
};
export const RS_CUSTOM = {
  name: 'RS_CUSTOM',
  shortName: 'RS',
  calcParams: [14],
  shouldFormatBigNumber: true,
  figures: [
    {
      key: 'rs',
      title: 'RS: ',
      type: 'line',
      styles: function() {
        return { color: '#FF00FF' };
      }
    },
  ],
  regenerateFigures: function (params: any) { // Viết label
    return params.map(function (_: any, index: number) {
      var num = index + 1 as any;
      return { key: "rs".concat(num), title: "RS".concat(num, ": "), type: 'line' };
    });
  },
  calc: function (dataList: any) { // Tính RIS
    let rsiABSEma = 0;
    let rsiMaxEma = 0;
    return dataList.map(function (kLineData: any, index: number) {
      let rsi = {} as any;
      const prevClose = (dataList[index - 1] ? dataList[index - 1] : kLineData)?.close;
      const hieuClose = kLineData.close - prevClose;
      if (index == 0) {
        rsi['rs'] = 0;
        rsiABSEma = 0;
        rsiMaxEma = 0;
      } else {
        const rMax = Math.max(0, hieuClose);
        const rAbs = Math.abs(hieuClose);
        rsiMaxEma = (rMax + (14 - 1) * rsiMaxEma) / 14;
        rsiABSEma = (rAbs + (14 - 1) * rsiABSEma) / 14;
        rsi['rs'] = (rsiMaxEma / rsiABSEma) * 100;
      }
      if (index < 13) {
        rsi['rs'] = 0;
      }
      rsi['rs']= 100 / (100 - rsi['rs']) - 1
      return rsi;
    });
  },
  createTooltipDataSource: function (params: any) {
    return {
      name: false,
    }
  }
};
function getCalc (kLineDataList: any, { calcParams, figures }: any) {
  const closeSums = [] as any
  const arr = kLineDataList.map((kLineData: any, i: number) => {
    const ma = {} as any
    const close = kLineData.close
    calcParams.forEach((param: any, j: number) => {
      closeSums[j] = (closeSums[j] || 0) + close
      if (i >= param - 1) {
        ma[figures[j].key] = isnum((closeSums[j] / param).toFixed(2))
        closeSums[j] -= kLineDataList[i - (param - 1)].close
      }
    })
    return ma
  })
  return arr
}
function formatValue(data: any, key: any, defaultValue: any) {
  const rePropName = RegExp('[^.[\\]]+' + '|' +
    '\\[(?:' +
    '([^"\'][^[]*)' + '|' +
    '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
    ')\\]' + '|' +
    '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g');
    if (isValid(data)) {
        var path_1 = [] as any;
        key.replace(rePropName, function (subString: any) {
            var args = [] as any;
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var k = subString;
            if (isValid(args[1])) {
              // k = args[2].replace(reEscapeChar, '$1');
            }
            else if (isValid(args[0])) {
                k = args[0].trim();
            }
            path_1.push(k);
            return '';
        });
        var value = data;
        var index = 0;
        var length_1 = path_1.length;
        while (isValid(value) && index < length_1) {
            value = value === null || value === void 0 ? void 0 : value[path_1[index++]];
        }
        return isValid(value) ? value : (defaultValue !== null && defaultValue !== void 0 ? defaultValue : '--');
    }
    return defaultValue !== null && defaultValue !== void 0 ? defaultValue : '--';
}
function isValid(value: any) {
  return value !== null && value !== undefined;
}
