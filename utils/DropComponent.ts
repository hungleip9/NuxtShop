export function _triggerFunction(id: string, data: any) {
  useDrop().value.dataDrop.id = ''
  useDrop().value.dataDrop.data = null
  if (!id) return
  useDrop().value.dataDrop.id = id;
  useDrop().value.dataDrop.data = data;
  setTimeout(() => {
    useDrop().value.dataDrop.id = ''
    useDrop().value.dataDrop.data = null
  }, 1000);
}
