import { info } from '~/services/auth';
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
  await handleGetInfoUser()
})
async function handleGetInfoUser() {
  const dataConst = useConst().value;
  const dataAuth = useAuth().value;
  const token = await keyLocalStorage({ type: 'GET', key: "token"})
  if (!token) return
  await info().then(res => {
    dataAuth.isAuthenticated = true
    if (res?.data?.data?.info) {
      dataConst.userInfo = res.data.data.info
    }
  }).catch(async (error) => {
    const messError = error?.response?.data?.messages || 'Có lỗi xảy ra'
    console.log(messError);
    await _showMsg({type: 'error', summary: 'Thất bại', msg: messError, placement: 'bottomRight'})
    dataAuth.isAuthenticated = false
    dataConst.userInfo = null
  })
}