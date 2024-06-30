"use client";

import { ExchangeRequestsContext, ExtExchangeRequest } from "@/hooks/client/exchange-requests";
import { createContext, ReactNode } from "react";

interface ExchangeRequestContextType {
  exchangeRequests: ExtExchangeRequest[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  getExchangeRequests: () => ExtExchangeRequest[];
  addExchangeRequest: (newRequest: ExtExchangeRequest) => void;
  setAllExchangeRequests: (newRequests: ExtExchangeRequest[]) => void;
  updateExchangeRequestById: (id: number, updatedData: Partial<ExtExchangeRequest>) => void;
}

export const ExchangeRequestContext = createContext<ExchangeRequestContextType | undefined>(undefined);

export const ExchangeRequestProvider = ({ children }: { children: ReactNode }) => {
  const {
    isLoading,
    setIsLoading,
    exchangeRequests,
    getExchangeRequests,
    setAllExchangeRequests,
    updateExchangeRequestById,
    addExchangeRequest,
  } = ExchangeRequestsContext();

  return (
    <ExchangeRequestContext.Provider
      value={{
        exchangeRequests,
        isLoading,
        setIsLoading,
        getExchangeRequests,
        setAllExchangeRequests,
        updateExchangeRequestById,
        addExchangeRequest,
      }}
    >
      {children}
    </ExchangeRequestContext.Provider>
  );
};
