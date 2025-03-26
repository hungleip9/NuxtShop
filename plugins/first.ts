import { getInfo } from '~/services/auth';
export default defineNuxtPlugin(async () => {
  const dataConst = useConst().value;
  for (let index = 0; index < 50; index++) {
    dataConst.menu.push({
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

  const Cart = keyLocalStorage({ type: 'GET', key: "Cart"}) as any;
  dataConst.carts = Cart
  handleCallFirstApi();
})
async function handleCallFirstApi() {
  await Promise.all([
    await getInfo()
  ]).then(() => {});
  const axios = useNuxtApp().$axios;
  await axios.get(`http://192.168.2.100:30002/api/tin-tuc/menu?isMarket=true`)
}