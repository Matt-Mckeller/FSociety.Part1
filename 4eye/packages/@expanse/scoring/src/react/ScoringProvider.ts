/**
 * ScoringProvider — supplies a {@link ScoringService} to the React tree.
 *
 * Defaults to {@link localScoringService} (offline, in-process compute), so
 * apps work with zero configuration. To route scoring through the backend
 * later, pass a remote service — **no consumer changes required**:
 *
 * ```tsx
 * <ScoringProvider service={createRemoteScoringService(transport)}>
 *   <App />
 * </ScoringProvider>
 * ```
 */
import { createContext, createElement, useContext } from "react";
import type { ReactNode } from "react";
import type { ScoringService } from "../service";
import { localScoringService } from "../service";

const ScoringServiceContext = createContext<ScoringService>(localScoringService);

export interface ScoringProviderProps {
  /** Service to provide. Defaults to the offline local engine. */
  service?: ScoringService;
  children: ReactNode;
}

export function ScoringProvider({
  service = localScoringService,
  children,
}: ScoringProviderProps) {
  return createElement(
    ScoringServiceContext.Provider,
    { value: service },
    children,
  );
}

/** Access the current {@link ScoringService} (local engine by default). */
export function useScoringService(): ScoringService {
  return useContext(ScoringServiceContext);
}
