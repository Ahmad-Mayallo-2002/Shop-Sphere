import { getToken } from "@/assets/utils/getToken";
import Cart from "@/components/user/Cart";
import Favorites from "@/components/user/Favorites";
import Orders from "@/components/user/Orders";
import UpdateUser from "@/components/user/UpdateUser";

export type Token = {
  token: string;
  _id: string;
};

export default function Profile() {
  const { token, _id } = getToken();
  return (
    <>
      <UpdateUser token={token} _id={_id} />
      <Favorites token={token} _id={_id} />
      <Cart token={token} _id={_id} />
      <Orders token={token} _id={_id} />
    </>
  );
}
