"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dashboardSections, type DashboardProfile } from "@/lib/dashboard-permissions";

type AuthResponse = {
  session?: {
    accessToken: string;
  };
  profile?: DashboardProfile;
  error?: string;
};

type DashboardAuthContextValue = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  token: string | null;
  profile: DashboardProfile | null;
  error: string;
  loading: boolean;
  booting: boolean;
  availableSections: typeof dashboardSections[number][];
  handleLogin: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => void;
};

const storageKey = "glenn_dashboard_access_token";
const DashboardAuthContext = createContext<DashboardAuthContextValue | null>(null);

export function DashboardAuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<DashboardProfile | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [booting, setBooting] = useState(true);

  const availableSections = useMemo(
    () =>
      profile
        ? dashboardSections.filter(
            (section) => (profile.permissions[section]?.length ?? 0) > 0,
          )
        : [],
    [profile],
  );

  useEffect(() => {
    const storedToken = window.localStorage.getItem(storageKey);
    if (!storedToken) {
      setBooting(false);
      return;
    }

    void restoreSession(storedToken, true);
  }, []);

  async function restoreSession(accessToken: string, isBoot = false) {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = (await response.json()) as { profile?: DashboardProfile; error?: string };
      if (!response.ok || !data.profile) {
        throw new Error(data.error || "Session expired.");
      }

      if (!data.profile.hasAccess) {
        throw new Error("This account does not currently have dashboard access.");
      }

      setToken(accessToken);
      setProfile(data.profile);
    } catch (restoreError) {
      window.localStorage.removeItem(storageKey);
      setToken(null);
      setProfile(null);
      setError(
        restoreError instanceof Error ? restoreError.message : "Session restore failed.",
      );
    } finally {
      setLoading(false);
      if (isBoot) {
        setBooting(false);
      }
    }
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/dashboard/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = (await response.json()) as AuthResponse;
      if (!response.ok || !data.session || !data.profile) {
        throw new Error(data.error || "Unable to sign in.");
      }

      if (!data.profile.hasAccess) {
        throw new Error("This account does not currently have dashboard access.");
      }

      window.localStorage.setItem(storageKey, data.session.accessToken);
      setToken(data.session.accessToken);
      setProfile(data.profile);
      setPassword("");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    window.localStorage.removeItem(storageKey);
    setToken(null);
    setProfile(null);
    setError("");
  }

  return (
    <DashboardAuthContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        token,
        profile,
        error,
        loading,
        booting,
        availableSections,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </DashboardAuthContext.Provider>
  );
}

export function useDashboardAuth() {
  const context = useContext(DashboardAuthContext);

  if (!context) {
    throw new Error("useDashboardAuth must be used inside DashboardAuthProvider.");
  }

  return context;
}
