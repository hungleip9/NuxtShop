export function _handleBackNganh () {
  const router = useRouter()
  const route = useRoute()
  let str = ''
  if (!route.query.sector_id) {
    str = '1'
  } else if (route.query.sector_id == 'lv4') {
    str = '4'
  } else {
    str = `${route.query.sector_id}`
  }
  if (str.includes('_')) {
    const arr = str.split('_') as string[]
    str = arr[0]
  } else if (str) {
    str = ''
  }
  if (str) {
    _pushParamsRouter('sector_id', str)
  } else {
    _deleteParamsRouter(['sector_id'])
  }
}
export function _updateKeyNganh(id: string, sectorID: string) {
  debouncedUpdateKeyNganh(id, sectorID)
}
const debouncedUpdateKeyNganh = useDebounceFn(async (id: string, sectorID: string) => {
  let strId = id
  if (sectorID && sectorID != '1') {
    strId = `${sectorID}${id}`
    if (sectorID == '4') {
      strId = `lv4${id}`
    }
  }
  _pushParamsRouter('sector_id', strId)
}, 500, {maxWait: 500})
export function _getSectorId (sectorIDMap: string) {
  let id = sectorIDMap || ''
  if (sectorIDMap.includes('_')) {
    const arr = sectorIDMap.split('_') || [] as string[]
    id = '_' + arr[1]
  }
  return id
}
export function _getVonHoa(WeightCirculation: number, Reference: number) {
  let number = 0
  if (_hasDataNganh2(WeightCirculation) && _hasDataNganh2(Reference)) {
    number = isnum(WeightCirculation) * isnum(Reference) * 1000
  }
  return number
}
export function _hasDataNganh2 (data: number) {
  let check = false
  if (hasData(data) && data != -999999999999) {
    check = true
  }
  return check
}