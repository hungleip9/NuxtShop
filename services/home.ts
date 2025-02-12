export async function getMenu(page: number, size: number) {
  const start = (page - 1) * size;
  const end = start + size;
  return {
    data: useConst().value.menu.slice(start, end),
    totalItem: 50
  };
}
export async function detailProduct(id: string) {
  return useConst().value.menu.find((e) => e.id == id) || null;
}
