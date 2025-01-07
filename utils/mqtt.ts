export function _getNewDataMarketInfo(message: string = '', timestamp: number) {
  // độ rộng thị trường
  let obj = {
    symbol: '',
    data: null
  } as { symbol: string, index: number, data: any }
  if (!message) return obj
  const arrmsg = typeof message === 'string' ? message.split("|") : [];
  if (!arrmsg || !arrmsg.length) return obj
  obj.symbol = arrmsg[0]
  if (obj.symbol == 'HNXUPCOMINDEX') {
    obj.symbol = 'UPINDEX'
  }
  if (!useGlobal().value.MarketInfo[obj.symbol]) return obj
  obj.data = useGlobal().value.MarketInfo[obj.symbol]
  let isChange = false;
  arrmsg.forEach((elementData: any) => {
    if (elementData.indexOf("*") < 0) return
    const _obj = elementData.split("*") || [];
    if (!_obj || !_obj.length) return
    const key = handleGetKeyMqtt(_obj[0], 3) || null
    if (!key) return
    isChange = true;
    if (key == 'Close') {
      obj.data.High = isnum(obj.data.High) ? Math.max(isnum(_obj[1]), isnum(obj.data.High)) : isnum(_obj[1])
      obj.data.Low = isnum(obj.data.Low) ? Math.min(isnum(_obj[1]), isnum(obj.data.Low)) : isnum(_obj[1])
    }
    obj.data[key] = isnum(_obj[1]);
  });
  if (!isChange) return obj
  obj.data.ModifiedDate = new Date(timestamp * 1000)
  return obj
}
export function _getNewDataMarketIntradayHistory(message: string = '') {
  if (!message) return null
  const arrmsg = typeof message === 'string' ? message.split("|") : [];
  if (!arrmsg || !arrmsg.length || !arrmsg[0] || !useGlobal().value.MarketIntradayHistory[arrmsg[0]] || !useGlobal().value.MarketIntradayHistory[arrmsg[0]].length) return null
  let objUpdate = {
    data: {
      c: 0,
      h: 0,
      l: 0,
      o: 0,
      t: 0,
      v: 0,
    },
    san: ''
  }
  objUpdate.san = arrmsg[0] || ''
  const arr = arrmsg[1].split("*") || [];
  if (!arr.length) return null
  if (!isnum(arr[5])) return null
  objUpdate.data = {
    c: isnum(arr[2]),
    h: isnum(arr[4]),
    l: isnum(arr[3]),
    o: isnum(arr[1]),
    t: Math.floor(isnum(arr[0]) / 1000),
    v: isnum(arr[5]),
  };
  return objUpdate
}