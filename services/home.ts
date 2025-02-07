const res = [] as any[];
for (let index = 0; index < 50; index++) {
  res.push({
    id: index + 1,
    title: `Cà phê kem muối ${index}`,
    description: 'Ngon và lành',
    photo: 'https://phugiathucphamvmc.com/wp-content/uploads/2014/10/cafe.jpeg',
    originalPrice: 30000,
    price: 25000,
    ingredient: `<ul>
            <li><b>- Sữa</b>: 50g</li>
            <li><b>- Cà phê</b>: 20g</li>
            <li><b>- Kem béo</b>: 10g</li>
          </ul>`,
    story: 'Cà phê là một thức quen thuộc với dân văn phòng, IT.'
  });
}

export async function getMenu(page: number, size: number) {
  const start = (page - 1) * size;
  const end = start + size;
  return {
    data: res.slice(start, end),
    totalItem: 50
  };
}
export async function detailProduct(id: string) {
  return res.find((e) => e.id == id) || null;
}
