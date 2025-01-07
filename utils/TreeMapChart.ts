export function _getClassBgContent(data: any){
  if (!data || !data.liveboard) return
  return getClassBgColorBase(
    data?.liveboard?.Close,
    data?.liveboard?.Reference,
    data?.liveboard?.Floor,
    data?.liveboard?.Ceiling
  )
}
export function _getClassContentText(price: number, data: any) {
  if (!data || !data.liveboard) return
  if (price) {
    return getClassColorBase(price,
      data?.liveboard?.Reference,
      data?.liveboard?.Floor,
      data?.liveboard?.Ceiling);
  } else {
    return classContentText(
      data?.liveboard?.Close,
      data?.liveboard?.Reference,
      data?.liveboard?.Ceiling,
      data?.liveboard?.Floor
    );
  }
}
export function _getValueKN(data: any, type: boolean = false) {
  let value = 0 as any
  let name = 'mua'
  if (data) {
    value = isnum(data.ForeignBuyValue) - isnum(data.ForeignSellValue)
  }
  if (value < 0) {
    name = 'bán'
    value = value * -1
  }
  value = numberShortener(value, 2) || 0
  if (type) {
    value = name
  }
  return value
}
export function _getHexColor(Close: number, Reference: number, Floor: number, Ceiling: any) {
  if (Close < Reference) {
    return Close == Floor ? "#00cccc" : "#f6465d";
  } else if (Close > Reference) {
    return Close == Ceiling ? "#ff00ff" : "#03A66D";
  } else {
    return "#ccaa00";
  }
}
export function _getValue(liveboard: any, key: string) {
  let val = 0;
  if (!liveboard || !key) return;
  if (key == "ForeignBuyValueKN") {
    val = isnum(liveboard.ForeignBuyValue) - isnum(liveboard.ForeignSellValue);
  } else if (key == "ForeignSellValueKN") {
    val = isnum(liveboard.ForeignSellValue) - isnum(liveboard.ForeignBuyValue);
  } else {
    val = isnum(liveboard[key]);
  }
  return val;
}