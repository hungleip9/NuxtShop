export interface DataSaveAlert {
  selectAlert: {[key: string]: string},
  listAlertValue: {
    [key: string]: DataSaveAlertListAlertValue[]
  },
  Id: string,
  status: boolean
}
export interface DataSaveAlertListAlertValue {
  name: string,
  render: string,
  code: string,
  label: string,
  value: string,
  option: {
    label: string,
    value: string
  }[]
}