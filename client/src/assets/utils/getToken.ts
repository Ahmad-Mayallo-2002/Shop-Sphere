import Cookies from "universal-cookie";

type Token = {
  token: string;
  _id: string;
  role: string;
};

const cookies = new Cookies();

export const getToken = (): Token =>
  cookies.get("token") || { token: "", _id: "", role: "" };
