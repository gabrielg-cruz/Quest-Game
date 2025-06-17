import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { authService } from "../services/authService";
import { Player } from "../models/Player";

interface AuthContextProps {
  user: Player | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    avatarIndex: number
  ) => Promise<void>;
  logout: () => void;
  updateProfile: (data: {
    id: number;
    name: string;
    email: string;
    password?: string;
    themesIds: number[];
    balance: number;
    avatarIndex: number;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as any);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Player | null>(null);

  useEffect(() => {
    const stored = authService.getCurrentUser();
    if (stored) setUser(stored);
  }, []);

  const login = async (email: string, password: string) => {
    const player = await authService.login(email, password);
    setUser(player);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    avatarIndex: number
  ) => {
    const player = await authService.register(
      name,
      email,
      password,
      avatarIndex
    );
    setUser(player);
  };

  const logout = () => {
    authService.clearCurrentUser();
    setUser(null);
  };

  const updateProfile = async (data: {
    id: number;
    name: string;
    email: string;
    password?: string;
    themesIds: number[];
    balance: number;
    avatarIndex: number;
  }) => {
    const response = await fetch(`http://localhost:8080/players/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        themesIds: data.themesIds,
        balance: data.balance,
        avatarIndex: data.avatarIndex
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar perfil");
    }

    const updatedUser = await response.json();
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
