import { useState } from "react";
import { useApi } from "./useApi"; // 🔑 usando seu hook de axios com token

interface CreateAccountPayload {
  username: string;
  password: string;
  confirmPassword: string;
}

interface CreateAccountResponse {
  message: string;
  data?: any;
}

export function useCreateAccount() {
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (payload: CreateAccountPayload): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const { data, status } = await api.post<CreateAccountResponse>(
        "/auth/register",
        payload
      );

      if (status !== 201 && status !== 200) {
        setError(data.message || "Registration failed");
        return false;
      }

      console.log("✅ Account created successfully:", data);
      return true;
    } catch (err: any) {
      console.error("Erro ao criar conta:", err);
      setError(err.response?.data?.message || "Unexpected error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createAccount, loading, error };
}
