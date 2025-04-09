import { getToken } from "@/assets/utils/getToken";
import Cart from "@/components/user/Cart";
import Favorites from "@/components/user/favorites";

export default function Profile() {
  const { token, _id } = getToken();
  return (
    <>
      <Favorites token={token} _id={_id} />
      <Cart token={token} _id={_id} />
    </>
  );
}
