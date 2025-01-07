export function isnum(number: any, dontGetValueError: boolean = false) { // check và trả về 1 số
  let num = 0
  if (number && isNaN(number)) {
    if (number.includes('+')) {
      number = number.replaceAll('+', '')
    }
    if (number.includes(',')) {
      number = number.replaceAll(',', '')
    }
  }
  if (!hasData(number) || isNaN(number) || number == 'Infinity') { // sai kiểu dữ liệu
    if (dontGetValueError) { // nếu muốn chuyển thành dấu '-'
      num = -999999999999
    } else { // nếu muốn lấy 0
      num = 0
    }
  } else { // kiểu dữ liệu hợp lệ
    num = Number(number)
  }
  return num;
}

export function numberFormat(number: any, getDecimal: boolean = false) {
  if (!number) return "";
  number = String(number); // chuyển về string
  if (number.indexOf(".") === -1) {
    number += ".00";
  }
  var parts = number.split(".");
  var integerPart = parts[0];
  var decimalPart = parts[1];
  // thêm dấu ',' vào giữa các phần ngàn của phần số nguyên
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  if ((!decimalPart || decimalPart === "00") && !getDecimal) {
    return integerPart;
  }
  return integerPart + "." + decimalPart;
}
export function checkTimeFormat (Time: any, TimeCheck: any, sosanh: boolean = false) {
  let check = false
  if (!Time || !TimeCheck) return false
  // Mon Aug 28 2023 08:25:26 GMT+0700 (Giờ Đông Dương) || 1693186013
  const formatTime = _getFormatTime(Time, { getOnlyTime: true, second: true })
  if (sosanh) {
    return SoSanhTime(formatTime, TimeCheck)
  }
  if (formatTime == TimeCheck) {
    check = true
  }
  return check
}
export function SoSanhTime(time: any, timsSoSanh: any) {
  if (!time || !timsSoSanh) return false
  var referenceTime = new Date(0); // Ngày cố định để tạo đối tượng Date
  var targetTime = new Date(referenceTime.toDateString() + " " + time);
  var comparisonTime = new Date(referenceTime.toDateString() + " " + timsSoSanh);
  return targetTime >= comparisonTime;
}
// =============================== Fomart Number ===============================
// format 1234000000000.234 => 1,234.23 || 1234.23 || 1.234
export function _formatDivideNumbers(data: any, selectedUnit: number = 0) {
  if (!data || data == '-') return '-';
  let num = isnum(data);
  switch (selectedUnit) {
    case 1:
      num = Math.floor(num / 1000);
      break;
    case 2:
      num = num / 1000000;
      break;
    case 3:
      num = num / 1000000000;
      break;
    case 4:
      num = num / 1000000000000;
      break;
    case 0:
    default:
      break;
  }
  return (+num.toFixed(2)).toLocaleString("en-US");
}
// format 1234000000000.234 => 1,234.23 tỷ
export function numberShortener(num: any, digits: number = 0, hidenSymbol: boolean = false) {
  const lookup = [
    { value: 0, symbol: "" },
    { value: 1, symbol: "" },
    { value: 1e6, symbol: " triệu" },
    { value: 1e9, symbol: " tỷ" }
  ] as {value: number, symbol: string}[];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup.slice().reverse().find(function (item) {
    return Math.abs(num) >= item.value;
  }) || null as {value: number, symbol: string} | null;
  if (!item) return "0"
  let soChia = 0
  if (!item.value) {
    soChia = isnum((num).toFixed(digits))
  } else {
    soChia = isnum((num / item.value).toFixed(digits))
  }
  let str = Intl.NumberFormat("en-US").format(soChia).replace(rx, "$1") + `${!hidenSymbol ? item.symbol : ''}` || '' as string
  return str
}
// format 1234000000000.234 => 1,234.23 tỷ
export function numberShortenerK(num: number, digits: number, hidenSymbol: boolean = false) {
  let str = '' as string
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
    { value: 1e12, symbol: "T" }
  ] as {value: number, symbol: string}[];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let item = lookup.slice().reverse().find(function (item) {
    return Math.abs(num) >= item.value;
  }) || {} as {value: number, symbol: string}
  if (!Object.keys(item).length) return '0'
  const soChia = (num / item.value) as number
  str = Intl.NumberFormat("en-US").format(Number((soChia).toFixed(digits))).replace(rx, "$1") + `${!hidenSymbol ? item.symbol : ''}`;
  return str
}

// format 1000000.234 => 1,000,000.23
export function numberFormatVolume(num: any, digits: number | null = null, defaults: any = 0) {
  let str = 0 as any
  let number = Number(num) as any
  if (number == 'Infinity' || !num || isNaN(number)) {
    str = defaults ? defaults : '-'
  } else {
    if (digits || digits == 0) {
      str = Intl.NumberFormat("en-US").format(number.toFixed(digits))
    } else {
      str = Intl.NumberFormat("en-US").format(number)
    }
  }
  return str
}
// format 1000000.995 => 1,000,000.99
export function numberFormatVolume2(num: any, digits: any, dontFormat: boolean = false) {
  let str = 0 as any
  let number = Number(num) as any
  if (number == 'Infinity' || !num || isNaN(number)) {
    str = 0
  } else {
    if (hasData(digits)) {
      const arr = `${number}`.split('.') || []
      if (!arr.length || arr.length < 2) return dontFormat ? Number(number) : numberFormat(number)
      if (dontFormat) {
        str = Number(arr[0] + '.' + arr[1].slice(0, digits))
      } else {
        str = numberFormat(arr[0]) + '.' + arr[1].slice(0, digits)
      }
    }
  }
  return str
}

// numberFormatPositive("+2.5") ==> '+2.5'
export function numberFormatPositive(num: any, digits: number = 2) {
  let str = Number.parseFloat(num).toFixed(digits) || '' as any
  str = new Intl.NumberFormat("en-US", {signDisplay: "exceptZero"}).format(str) as string
  return str
}

// numberFormatDivide(123456000000, 1000000000, 2) ==> 123.45
export function numberFormatDivide(num: any, divide: any = null, getDecimal: any = 0) {
  if (num) {
    let number = isNumber(num) as any;
    if (divide) {
      number = number / divide;
    }
    const numDecimal = Number(number).toFixed(getDecimal) as any;
    return Intl.NumberFormat("en-US").format(numDecimal);
  } else {
    return "";
  }
}

export function _getFormatTime(timeString: any, getOnly: any = null) {
  if (!timeString) return;
  let date = new Date(timeString) as any;
  if (date == "Invalid Date") {
    return "";
  }
  let time = date.toLocaleTimeString('en-US', {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
  });

  let dateStr = date.toLocaleDateString('en-GB');
  if (!getOnly) {
    return time + " " + dateStr;
  }
  if (getOnly.second) {
    time = date.toLocaleTimeString('en-US', {
      hour: "2-digit",
      hour12: false,
      minute: "2-digit",
      second: "2-digit",
    });
  }
  if (getOnly.getOnlyTime) {
    return time;
  }
  if (getOnly.getOnlyDate) {
    return dateStr;
  }
  return time + " " + dateStr;
}

export function _formatPriceVND(price: number) {
  return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export function _formatMonth(month: number) {
  return month < 12 ? month + ' tháng' : Math.round(month / 12 * 100) / 100 + ' năm';
}

export function classContentText(close: number, Reference: number, Ceiling: number, Floor: number, getColor = false) {
  if (!close && !Reference && !Ceiling && !Floor) {
    return `text-normal2`;
  }
  if (close == Reference) {
    return getColor ? '#CCAA00' : `text-orange2`;
  } else if (close == Ceiling) {
    return getColor ? '#FF00FF' : `text-ceiling2`;
  } else if (close == Floor) {
    return getColor ? '#00CCCC' : `text-floor2`;
  } else if (close < Reference) {
    return getColor ? '#F6465D' : `text-red2`;
  } else if (close > Reference) {
    return getColor ? '#0ECB81' : `text-green2`;
  } else {
    return getColor ? '#CCAA00' : `text-orange2`;
  }
}

// =============================== Fomart Class, Color ===============================

export function getClassColorBase(cl: number = 0, ref: number = 0, fl: number = 0, ce: number = 0) {
  if(cl == 0) return "color-ref";
  if (cl < ref) {
    return cl == fl ? "color-fl" : "color-down";
  } else if (cl > ref) {
    return cl == ce ? "color-ce" : "color-up";
  } else {
    return "color-ref";
  }
}

export function getClassColorIndex(change: number) {
  if (change < 0) {
    return "color-down";
  } else if (change > 0) {
    return "color-up";
  } else {
    return "color-ref";
  }
}

export function getClassBgColorIndex(change: number) {
  if (change < 0) {
    return "bg-down";
  } else if (change > 0) {
    return "bg-up";
  } else {
    return "bg-ref";
  }
}

export function getClassBgColorBase(cl: number, ref: number, fl: number, ce: number) {
  if (cl < ref) {
    return cl == fl ? "bg-fl" : "bg-down";
  } else if (cl > ref) {
    return cl == ce ? "bg-ce" : "bg-up";
  } else {
    return "bg-ref";
  }
}

export function getTextBuySell(change: any) {
  let c = parseFloat(change);
  if (c < 0) {
    return "bán ròng";
  } else if (c > 0) {
    return "mua ròng";
  } else {
    return "mua bán";
  }
}

export function getColorTextTheme() {
  const theme = _useCookie('theme') as any
  return theme.value == 'light' ? '#474d57' : '#EAECEF';
}
export function handleGetKeyMqtt(number: any, msgType: number) {
  let key = "";
  // Live Board, Chứng quyền
  if (msgType == 2 || msgType == 88) {
    switch (number) {
      case '101':
        key = "Open";
        break;
      case '102':
        key = "High";
        break;
      case '103':
        key = "Low";
        break;
      case '104':
        key = "AveragePrice";
        break;
      case '105':
        key = "Ceiling";
        break;
      case '106':
        key = "Floor";
        break;
      case '107':
        key = "MatchVolume";
        break;
      case '108':
        key = "Change";
        break;
      case '109':
        key = "ChangePercent";
        break;
      case '110':
        key = "BidPrice1";
        break;
      case '111':
        key = "BidVolume1";
        break;
      case '112':
        key = "BidPrice2";
        break;
      case '113':
        key = "BidVolume2";
        break;
      case '114':
        key = "BidPrice3";
        break;
      case '115':
        key = "BidVolume3";
        break;
      case '116':
        key = "OfferPrice1";
        break;
      case '117':
        key = "OfferVolume1";
        break;
      case '118':
        key = "OfferPrice2";
        break;
      case '119':
        key = "OfferVolume2";
        break;
      case '120':
        key = "OfferPrice3";
        break;
      case '121':
        key = "OfferVolume3";
        break;
      case '122':
        key = "TotalVolume";
        break;
      case '123':
        key = "OverBuy";
        break;
      case '124':
        key = "OverSell";
        break;
      case '125':
        key = "ForeignBuy";
      break;
      case '126':
        key = "ForeignSell";
      break;
      case '127':
        key = "ForeignBuyValue";
      break;
      case '128':
        key = "ForeignSellValue";
      break;
      case '129':
        key = "RemainForeignVolume";
      break;
      case '130':
        key = "Close";
        break;
      case '131':
        key = "Reference";
        break;
      case '132':
        key = 'ActiveBuyVol';
        break;
      case '133':
        key = 'ActiveSellVol';
        break;
      case '162':
        key = "TotalValue";
        break;
      default:
        key = "";
        break;
    }
  }
  // MarketInfo, MarketHistory
  if (msgType == 3 || msgType == 89) {
    switch (number) {
      case '104':
        key = "Close";
        break;
      case '105':
        key = "Change";
        break;
      case '106':
        key = "ChangeP";
        break;
      case '110':
        key = "TotalVolume";
        break;
      case '111':
        key = "TotalValue";
        break;
      case '112':
        key = "VolumeMatch";
        break;
      case '113':
        key = "ValueMatch";
        break;
      case '114':
        key = "VolumeAgree";
        break;
      case '115':
        key = "ValueAgree";
        break;
      case '117':
        key = "TotalUp";
        break;
      case '119':
        key = "TotalNoChange";
        break;
      case '120':
        key = "TotalDown";
        break;
      case '125':
        key = "VolumeForeignBuy";
        break;
      case '126':
        key = "ValueForeignBuy";
        break;
      case '127':
        key = "VolumeForeignSell";
        break;
      case '128':
        key = "ValueForeignSell";
        break;
      case '130':
        key = "CashFlowUp";
        break;
      case '132':
        key = "CashFlowDown";
        break;
      case '136':
        key = "VolumeFlowForeign";
        break;
      case '137':
        key = "ValueFlowForeign";
        break;
      case '138':
        key = "Reference";
        break;

      default:
        key = "";
        break;
    }
  }
  // Thỏa Thuận
  if (msgType == 15) {
    switch (number) {
      case '0':
        key = "agreeid";
        break;
      case '1':
        key = "DateTime";
        break;
      case '6':
        key = "Price";
        break;
      case '7':
        key = "Volume";
        break;
      case '8':
        key = "Value";
        break;

      default:
        key = "";
        break;
    }
  }
  // Hợp đồng tương lai
  if (msgType == 99) {
    switch (number) {
      case '106':
        key = "Floor";
      case '131':
        key = "Reference";
      case '105':
        key = "Ceiling";
      case '114':
        key = "BidPrice3";
        break;
      case '115':
        key = "BidVolume3";
        break;
      case '112':
        key = "BidPrice2";
        break;
      case '113':
        key = "BidVolume2";
        break;
      case '110':
        key = "BidPrice1";
        break;
      case '111':
        key = "BidVolume1";
        break;
      case '130':
        key = "Close";
        break;
      case '107':
        key = "MatchVolume";
        break;
      case '108':
        key = "Change";
        break;
      case '109':
        key = "ChangePercent";
        break;
      case '116':
        key = "OfferPrice1";
        break;
      case '117':
        key = "OfferVolume1";
        break;
      case '118':
        key = "OfferPrice2";
        break;
      case '119':
        key = "OfferVolume2";
        break;
      case '120':
        key = "OfferPrice3";
        break;
      case '121':
        key = "OfferVolume3";
        break;
      case '122':
        key = "TotalVolume";
        break;
      case '102':
        key = "High";
        break;
      case '103':
        key = "Low";
        break;
      case '125':
        key = "ForeignBuy";
        break;
      case '126':
        key = "ForeignSell";
        break;
      case '198':
        key = "ExpDate";
        break;

      default:
        key = "";
        break;
    }
  }
  return key;
}

// Orther
export function _urlApi(str: string) {
  const config = useRuntimeConfig();
  let url = ''
  if (str == 'News') {
    url = `${config.public.baseUrlNews}`
  } else if (str == 'Auth') {
    url = `${config.public.baseUrlAuth}`
  } else if (str == 'Economic') {
    url = `${config.public.baseUrlEconomic}`
  } else if (str == 'Stockexchange') {
    url = `${config.public.baseUrlStockexchange}`
  } else if (str == 'fileS3url') {
    url = `${config.public.fileS3url}`
  } else if (str == 'Websocketurl') {
    url = `${config.public.connectWebsocketurl}`
  }
  return url
}
export function priceChange(num: any) {
  const nf = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  return num > 0 ? "+"+ nf.format(num) : nf.format(num);
}

//leader default
export function checkImgLeader(url: any, domain = '') {
  if (domain) {
    return url ? domain + url : new URL(`/public/images/person-default.jpg`, import.meta.url).href;
  } else {
    return url ? url : new URL(`/public/images/person-default.jpg`, import.meta.url).href;
  }
}

export function keyLocalStorage(obj: any) {
  if (!obj.type || !obj.key || obj.key.length === 0 || obj.type.length === 0) {
    return false;
  } else {
    if (obj.type.toUpperCase() === "GET") {
      let data = localStorage.getItem(obj.key)
      if (!data) return false
      return JSON.parse(data);
    } else if (obj.type.toUpperCase() === "SET") {
      localStorage.setItem(obj.key, JSON.stringify(obj.value));
      return true;
    } else {
      return false;
    }
  }
}

export function getLimit(limitProp: any, type: string) {
  let limit = '' as any
  if (type == 'string') {
    switch (limitProp) {
      case 1:
        limit = '1d'
        break;
      case 20:
        limit = '1m'
        break;
      case 60:
        limit = '3m'
        break;
      case 120:
        limit = '6m'
        break;
      case 240:
        limit = '1y'
        break;
      case 480:
        limit = '2y'
        break;
      case 1200:
        limit = '5y'
        break;
    }
  } else {
    switch (limitProp) {
      case '1d':
        limit = 1000
        break;
      case '1m':
        limit = 20
        break;
      case '3m':
        limit = 60
        break;
      case '6m':
        limit = 120
        break;
      case '1y':
        limit = 240
        break;
      case '2y':
        limit = 480
        break;
      case '5y':
        limit = 1200
        break;
    }
  }
  return limit
}
export function hasData(data: any) {
  if (data === 0 || (data && data != 'undefined')) return true
  return false
}
export function _reload() {
  window.location.reload();
}
export function hasRule(rule: string) {
  if (!rule) return false
  const Permission = useGlobal().value.Permission ? useGlobal().value.Permission.split(',') : [] as string[]
  if (!Permission || !Permission.length) return false
  if (Permission.findIndex(e => e == rule) >= 0) {
    return true
  }
  return false
}
export function hasFeatureToggle(rule: string) {
  let check = false
  const FeatureToggle = useGlobal().value.FeatureToggle || []
  if (!rule || !FeatureToggle || !FeatureToggle.length) return false
  if (FeatureToggle.findIndex(e => e == rule) >= 0) {
    check = true
  }
  return check
}
export function dateFormat(postDate: any) {
  let pDate = new Date(postDate);
  let currentDate = new Date();
  let yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
  if (pDate.getFullYear() === yesterday.getFullYear() && pDate.getMonth() === yesterday.getMonth() && pDate.getDate() === yesterday.getDate()) {
    return `Hôm qua lúc ${plusZero(pDate.getHours())}:${plusZero(pDate.getMinutes())}`;
  }
  if (pDate.getFullYear() === currentDate.getFullYear() && pDate.getMonth() === currentDate.getMonth() && pDate.getDate() === currentDate.getDate()) {
    if (pDate.getHours() === currentDate.getHours()) {
      if (pDate.getMinutes() === currentDate.getMinutes()) {
        if (pDate.getSeconds() === currentDate.getSeconds() || (currentDate.getSeconds() - pDate.getMinutes()) < 5)
          return `Vừa xong`;
        return `${currentDate.getSeconds() - pDate.getMinutes()} giây trước`;
      }
      return `${plusZero(currentDate.getMinutes() - pDate.getMinutes())} phút trước`;
    }
    else if (pDate.getHours() + 5 >= currentDate.getHours())
      return `Khoảng ${(currentDate.getHours() - pDate.getHours())} giờ trước`;
    else
      return `Hôm nay lúc ${plusZero(pDate.getHours())}:${plusZero(pDate.getMinutes())}`
  }
  return `${plusZero(pDate.getDate())}/${plusZero(pDate.getMonth() + 1)}${pDate.getFullYear() === currentDate.getFullYear() ? '' : '/' + pDate.getFullYear()} lúc ${plusZero(pDate.getHours())}:${plusZero(pDate.getMinutes())}`;
}
export function plusZero(value: number) {
  if (value < 10)
    return '0' + value;
  return value;
}
export function positiveCheck(value: number) {
  if (!value) return (0).toFixed(2);
  if (value > 0)
    return '+' + changeToFixed(value, 2);
  return changeToFixed(value, 2);
}
export function getDateOnly(date: any) {
  if (!date) return '';
  let d = new Date(date);
  if (!d || d <= new Date(1, 1, 1, 0, 0, 0, 0)) return '';
  return `${plusZero(d.getDate())}/${plusZero(d.getMonth() + 1)}/${d.getFullYear()}`;
}
export function getTimeOnly(date: number, takeSecond = false) {
  if (!date) return '';
  let d = new Date(date);
  if (!d || d <= new Date(1, 1, 1, 0, 0, 0, 0)) return '';
  if (takeSecond)
    return `${plusZero(d.getHours())}:${plusZero(d.getMinutes())}:${plusZero(d.getSeconds())}`;
  else
    return `${plusZero(d.getHours())}:${plusZero(d.getMinutes())}`
}
export function numToFixed(data: any, fixedNum: number = 0, returnZero: boolean = false) {
  let num = Number(data);
  if (!num || !(num.toFixed(fixedNum))) {
    if (returnZero) {
      num = 0.0;
      return num.toFixed(fixedNum);
    }
    else
      return '-'
  }
  return (+(num.toFixed(fixedNum))).toLocaleString("en-US");
}
export function changeToFixed(data: any, fixedNum: number=2) {
  let num = Number(data);
  if (!num || !(num.toFixed(fixedNum))) {
    num = 0.0;
  }
  return num.toFixed(fixedNum);
}
export function numToPositive(data: any, fixedNum: number) {
  let num = Number(data);
  if (!num || num < 0 || !(num.toFixed(fixedNum)))
    return 0;
  return num.toFixed(fixedNum)
}
export function numToFixed2(data: any) {
  if (!data) return '-'
  let num = Number(data);
  if (!num)
    return '-';
  return (+(num.toFixed(2))).toLocaleString("en-US");
}
export function getColorByChange(item: number) {
  if (!item) return '';
  if (item >= 0)
    return 'color-up';
  return 'color-down';
}
export function getMaxPositiveValue(companyValue: any, otherValue: any) {
  if (!companyValue && !otherValue)
    return 100;
  else if (!companyValue) {
    let x = +numToFixed(otherValue, 2);
    let y = x * 1.1;
    let z = +numToFixed(y, 2);
    return z;
  }
  else if (!otherValue)
    return +numToFixed(+numToFixed(companyValue, 2) * 1.1, 2);
  else if (companyValue < 0 && otherValue < 0)
    return 100;
  else if (companyValue < 0)
    return +numToFixed(+numToFixed(otherValue, 2) * 1.1, 2);
  else if (otherValue < 0)
    return +numToFixed(+numToFixed(companyValue, 2) * 1.1, 2);
  else
    return +numToFixed(+numToFixed(companyValue, 2) + +numToFixed(otherValue, 2), 2);
}
export function shortenNumber(data: any, fixedNum: number) {
  if (data == 0) return 0;
  if (!data || data == '-') return '-';
  let dataString = data.toLocaleString("en-US");
  let cnt = dataString.split(',').length - 1;
  let d = data.toString();
  if (d.includes(','))
    d = d.replaceAll(',', '');
  let num = parseFloat(d);
  switch (cnt) {
    case 1:
      return (+(num).toFixed(fixedNum)).toLocaleString("en-US");
    case 2:
      return (+(num / 1000000).toFixed(fixedNum)).toLocaleString("en-US") + ' triệu';
    case 3:
      return (+(num / 1000000000).toFixed(fixedNum)).toLocaleString("en-US") + ' tỷ';
    case 4:
      return (+(num / 1000000000000).toFixed(fixedNum)).toLocaleString("en-US") + ' nghìn tỷ';
    case 0:
    default:
      return (+num.toFixed(fixedNum)).toLocaleString("en-US");
  }
}
export function toLocale(data: any) {
  let num = Number(data);
  return num.toLocaleString("en-US");
}
export function convertViToEn(data: any) {
  data = data.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  data = data.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  data = data.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  data = data.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  data = data.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  data = data.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  data = data.replace(/đ/g, "d");
  data = data.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
  data = data.replace(/\u02C6|\u0306|\u031B/g, "");
  return data
}
//1679450400000 => 09:04
export function timeStampToTime(timeStamp: any) {
  return isTimeStamp(timeStamp)
    ? new Date(timeStamp).toLocaleTimeString("en-GB").substring(0, 5)
    : "";
}
//Check is TimeStamp
export function isTimeStamp(timeStamp: any) {
  return !isNumber(timeStamp) ? false : new Date(timeStamp).getTime();
}
//16/02/2024 => 1708041600000
export function _converDateToTimstampGMT(date: string) {
  const d = date.split(/-|\//);
  const dt = new Date(+d[2], +d[1] - 1, +d[0])
  const dateStamp = dt.getTime();
  const changeGMT = dt.getTimezoneOffset() * 60000;
  //Time GMT+00:00
  return dateStamp - changeGMT
}
export function _dateToddmmyyy(date: string) {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm: number = today.getMonth() + 1; // Months start at 0!
  let dd: number = today.getDate();
  let day = dd < 10 ? '0' + dd : dd;
  let month = mm < 10 ? '0' + mm : mm;
  const formattedToday = day + '/' + month + '/' + yyyy;
  return formattedToday
}
export function isNumber(num: any) {
  return !isNaN(parseFloat(num)) && isFinite(num) ? parseFloat(num) : false;
}
// GoBack, GoForward
export function _historyURL(back: boolean = false) {
  return back == true ? history.back() : history.forward();
}
export function locArrTrung(arr: any[], key: string) {
  const arrMap = arr.reduce((acc, curr) => {
    // Kiểm tra nếu StockCode đã tồn tại trong mảng kết quả (acc) thì bỏ qua
    if (!acc.some((item: any) => item[key] === curr[key])) {
      acc.push(curr);
    }
    return acc;
  }, []);
  return arrMap;
}

// Router, popup
export function _openModal(popupName: string) {
  const { $event } = useNuxtApp();
  $event("openModal", popupName);
}
export function _closeModal(popupName: string) {
  const { $event } = useNuxtApp();
  $event("closeModal", popupName);
}

export async function _detailSymbol(Symbol: string, activeCompanyTab: string = '', readonly: string[] = []) {
  const router = useRouter();
  const route = useRoute()
  const currentQueryParams = { ...route.query };
  let queryMap = {
    ...currentQueryParams,
    mck: Symbol,
  } as {[key: string]: any}
  if (activeCompanyTab) {
    queryMap.activeCompanyTab = activeCompanyTab
  }
  if (readonly.length) {
    readonly.forEach(key => {
      delete queryMap[key]
    })
  }
  await nextTick();
  router.push({
    query: queryMap,
  });
}
export async function _detailNews(newsId: any, url: string = '', readonly: string[] = []) {
  const router = useRouter();
  const route = useRoute()
  const currentQueryParams = { ...route.query };
  if (readonly.length) {
    readonly.forEach(key => {
      delete currentQueryParams[key]
    })
  }
  await nextTick();
  router.push({
    query: {
      ...currentQueryParams,
      news_id: newsId
    },
  });
}
export function _getAge(dob: string) {
  if (!dob) return '';
  let split = dob.toString().split('/');
  let year = parseInt(split[split.length - 1]);
  if (year) {
    let current = new Date().getFullYear();
    return ` | ${current - year} tuổi`;
  }
  return `(${dob})`;
}
export async function _detailLeader(LeaderId: any, readonly :string[] = []) {
  const router = useRouter();
  const route = useRoute()
  const currentQueryParams = { ...route.query };
  if(!LeaderId) return
  if (readonly.length) {
    readonly.forEach(key => {
      delete currentQueryParams[key]
    })
  }
  await nextTick();
  router.push({
    query: {
      ...currentQueryParams,
      leader_id: LeaderId,
    },
  });
}
export function _createId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
  });
}
export function _detailSymbolTVC(symbol: string) {
  if (!symbol) return
  const { $event } = useNuxtApp();
  $event("DetailSymbolOnTVChart", symbol);
}
export async function _navigateProduction(str: string) {
  let url = '/nang-cap-tai-khoan'
  if (str) {
    url = `/${str}`
  }
  await nextTick()
  navigateTo(url)
}
export function _getTotalQuarterYear(year: number, quarter: number, isYear = false) {
 return isYear ? year : (year * 4) + (quarter - 1)
}
export function _getQuarterYear(total: number, type: string, isYear = false) {
  if (!total || !type) return null
  if (type == 'year') return isYear ? total : Math.floor(total / 4)
  return isYear ? 0 : total % 4 + 1
}
export function _sortString (arr: any[], key: string) {
  if (!arr || !key) return
  const collator = new Intl.Collator('vi', { sensitivity: 'base' });
  return arr.sort((a, b) => collator.compare(a[key], b[key])) || []
}
export function _pushParamsRouter(type: string, data: any) {
  const router = useRouter()
  const route = useRoute()
  const currentQueryParams = { ...route.query, [type]: data };
  router.push({
    query: {
      ...currentQueryParams
    },
  })
}
export function _pushParamsRouterArray(objTypeData: any = {}) {
  if (!objTypeData || !Object.keys(objTypeData).length) return
  const router = useRouter()
  const route = useRoute()
  let currentQueryParams = Object.assign({}, route.query, objTypeData)
  router.push({
    query: {
      ...currentQueryParams
    },
  })
}
export function _deleteParamsRouter(arrType: string[]) {
  const router = useRouter()
  const route = useRoute()
  let currentQueryParams = { ...route.query };
  arrType.forEach(type => {
    delete currentQueryParams[type];
  })
  router.push({
    query: {
      ...currentQueryParams,
    },
  });
}
export async function _handleGotoUrl (str = '', selectedTab = '') {
  let strMap = str
  if (useDevice().isMobile) {
    strMap = `${strMap}/mobile`
    if (selectedTab) {
      strMap = `${strMap}?selected_tab=${selectedTab}`
    }
  }
  await nextTick()
  navigateTo('/' + strMap.trim());
}
export function _activeAction(str: string, onlyOpen = false) {
  if (useConst().value.activeSidebar === str && !onlyOpen) {
    useConst().value.activeSidebar = "hiden";
  } else {
    useConst().value.activeSidebar = str;
    keyLocalStorage({ type: 'SET', key: 'activeSidebar', value: useConst().value.activeSidebar })
  }
}
export function _useCookie(nameCookie = '') {
  if (!nameCookie) return
  return useCookie(nameCookie, {
    maxAge: 60 * 60 * 24 * 365
  })
}