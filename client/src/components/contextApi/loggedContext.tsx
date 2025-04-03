import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type Logged = {
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
};

export const UseLoggedContext = createContext<Logged>({
  logged: false,
  setLogged: () => {},
});

export default function LoggedContext({ children }: { children: ReactNode }) {
  const [logged, setLogged] = useState<boolean>(false);
  return (
    <UseLoggedContext.Provider value={{ logged, setLogged }}>
      {children}
    </UseLoggedContext.Provider>
  );
}
