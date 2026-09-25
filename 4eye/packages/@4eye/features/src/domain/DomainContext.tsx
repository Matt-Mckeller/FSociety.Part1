"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_DOMAIN,
  DOMAINS,
  type DomainConfig,
  type DomainType,
} from "@4eye/types";

const STORAGE_KEY = "4eye-domain-v1";

interface DomainContextValue {
  currentDomain: DomainType;
  domainConfig: DomainConfig;
  domains: DomainConfig[];
  setDomain: (domain: DomainType) => void;
  getDomainConfig: (domain: DomainType) => DomainConfig;
}

const DomainContext = createContext<DomainContextValue | undefined>(undefined);

const findConfig = (id: DomainType): DomainConfig =>
  DOMAINS.find((d) => d.id === id) ?? DOMAINS[0];

export function DomainProvider({ children }: { children: ReactNode }) {
  const [currentDomain, setCurrentDomain] = useState<DomainType>(DEFAULT_DOMAIN);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && DOMAINS.some((d) => d.id === saved)) {
      setCurrentDomain(saved as DomainType);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, currentDomain);
  }, [currentDomain]);

  const setDomain = useCallback((domain: DomainType) => {
    setCurrentDomain(domain);
  }, []);

  const getDomainConfig = useCallback(findConfig, []);

  const value = useMemo<DomainContextValue>(
    () => ({
      currentDomain,
      domainConfig: findConfig(currentDomain),
      domains: DOMAINS,
      setDomain,
      getDomainConfig,
    }),
    [currentDomain, setDomain, getDomainConfig],
  );

  return <DomainContext.Provider value={value}>{children}</DomainContext.Provider>;
}

export function useDomain(): DomainContextValue {
  const ctx = useContext(DomainContext);
  if (!ctx) throw new Error("useDomain must be used within a DomainProvider");
  return ctx;
}
