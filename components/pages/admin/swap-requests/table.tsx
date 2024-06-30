"use client";
import { useExchangeRequests } from "@/hooks/client/exchange-requests";
import { useHostels } from "@/hooks/client/hostels";
import { getAllPendingExchnageRequests } from "@/lib/actions/exchange-operations";
import { FC, useEffect, useState } from "react";
import { Row } from "./ui/table-row";

export const SwapRequests: FC = () => {
  const [load, setLoad] = useState(false);
  const { exchangeRequests, setAllExchangeRequests } = useExchangeRequests();

  useEffect(() => {
    async function getHostels() {
      setLoad(true);
      const res = await getAllPendingExchnageRequests();
      if (res) {
        setAllExchangeRequests(res);
      }
      setLoad(false);
    }
    getHostels();
  }, []);

  return (
    <div className="mt-8 flow-root px-5">
      {load ? (
        <>pleae wait...</>
      ) : (
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    From Student Id
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    From Hostel Name
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    To Student Id
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    To Hostel Name
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Approve Request
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0"
                  >
                    Reject Request
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {exchangeRequests.length > 0 &&
                  exchangeRequests.map((request, index) => (
                    <Row
                      requestId={request.id}
                      key={`request-${index}`}
                      fromStudentId={request.fromUserId}
                      toStudentId={request.toUserId}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
