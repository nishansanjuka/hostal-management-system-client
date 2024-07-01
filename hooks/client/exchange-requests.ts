"use client";
import { getAllPendingExchnageRequests } from "@/lib/actions/exchange-operations";
import { ExchangeRequestContext } from "@/providers/exchanges-provider";
import { ExchangeRequest, Hostel, Room, Student, User } from "@prisma/client";
import { useContext, useEffect, useState } from "react";

export interface ExtExchangeRequest extends ExchangeRequest {
  
}

export const ExchangeRequestsContext = () => {
  const [exchangeRequests, setExchangeRequests] = useState<
    ExtExchangeRequest[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getExchangeRequests = () => exchangeRequests;

  const setAllExchangeRequests = (newRequests: ExtExchangeRequest[]) => {
    setIsLoading(true);
    setExchangeRequests(newRequests);
    setIsLoading(false);
  };

  const updateExchangeRequestById = (
    id: number,
    updatedData: Partial<ExtExchangeRequest>
  ) => {
    setIsLoading(true);
    setExchangeRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, ...updatedData } : request
      )
    );
    setIsLoading(false);
  };

  const addExchangeRequest = (newRequest: ExtExchangeRequest) => {
    setIsLoading(true);
    setExchangeRequests((prevRequests) => [...prevRequests, newRequest]);
    setIsLoading(false);
  };

  useEffect(() => {
    async function fetchExchangeRequests() {
      setIsLoading(true);
      const res = await getAllPendingExchnageRequests();
      if (res) {
        setExchangeRequests(res);
      }
      setIsLoading(false);
    }
    fetchExchangeRequests();
  }, []);

  return {
    isLoading,
    setIsLoading,
    exchangeRequests,
    getExchangeRequests,
    addExchangeRequest,
    setAllExchangeRequests,
    updateExchangeRequestById,
  };
};

export const useExchangeRequests = () => {
  const context = useContext(ExchangeRequestContext);
  if (!context) {
    throw new Error(
      "useExchangeRequestContext must be used within an ExchangeRequestProvider"
    );
  }
  return context;
};
