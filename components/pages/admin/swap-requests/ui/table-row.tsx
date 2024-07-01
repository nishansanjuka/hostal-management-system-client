import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ApproveExchange,
  RejectExchangeRequest,
} from "@/lib/actions/exchange-operations";
import { ExtStudent, getStudentById } from "@/lib/actions/hostlers";
import { ExchangeRequest } from "@prisma/client";
import { Loader } from "lucide-react";
import { FC, useEffect, useState } from "react";

export const Row: FC<{
  fromStudentId: string;
  toStudentId?: string | null;
  requestId: number;
}> = ({ fromStudentId, toStudentId, requestId }) => {
  const [fromStudent, setFromStudent] = useState<ExtStudent | null>(null);
  const [toStudent, setToStudent] = useState<ExtStudent | null>(null);
  const [request, setRequest] = useState<ExchangeRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function getStudent() {
      setFromStudent(await getStudentById({ studentId: fromStudentId }));
      if (toStudentId) {
        setToStudent(await getStudentById({ studentId: toStudentId }));
      }
    }
    getStudent();
  }, [fromStudentId, toStudentId]);

  const handleApprove = async () => {
    setLoading(true);
    if (fromStudent && toStudent) {
      const res = await ApproveExchange({
        fromStudent,
        toStudent,
        requestId: requestId,
      });

      if (res.status == "ACCEPTED") {
        window.location.reload();
        setRequest(res);
      }
    }
    setLoading(false);
  };

  const handleReject = async () => {
    setDeleting(true);
    const res = await RejectExchangeRequest({ requestId });
    if (res) {
      setRequest(res);
      window.location.reload();
    }
    setDeleting(false);
  };

  return (
    <tr className="divide-x divide-gray-200">
      <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">
        {fromStudent ? (
          fromStudent.user.username
        ) : (
          <Skeleton className=" w-full h-6" />
        )}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500">
        {fromStudent ? (
          fromStudent.room?.hostel.name
        ) : (
          <Skeleton className=" w-full h-6" />
        )}
      </td>
      <td className="whitespace-nowrap capitalize p-4 text-sm text-gray-500">
        {toStudent ? (
          toStudent.user.username
        ) : (
          <Skeleton className=" w-full h-6" />
        )}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize">
        {toStudent ? (
          toStudent.room?.hostel.name
        ) : (
          <Skeleton className=" w-full h-6" />
        )}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize break-words">
        {fromStudent && toStudent ? (
          <Button
            disabled={
              request && request.status === "ACCEPTED" ? true : false || loading
            }
            onClick={handleApprove}
          >
            {request && request.status === "ACCEPTED" ? (
              "Approved"
            ) : loading ? (
              <span className=" flex items-center animate-pulse">
                <Loader className=" size-4 mr-1 animate-spin" />
                please wait...
              </span>
            ) : (
              "Approve"
            )}
          </Button>
        ) : (
          <Skeleton className=" w-28 h-10" />
        )}
      </td>
      <td className="whitespace-nowrap p-4 text-sm text-gray-500 capitalize break-words">
        {fromStudent && toStudent ? (
          <Button
            disabled={
              request && request.status === "ACCEPTED" ? true : false || loading
            }
            variant={"destructive"}
            onClick={handleReject}
          >
            {deleting ? (
              <span className=" flex items-center animate-pulse">
                <Loader className=" size-4 mr-1 animate-spin" />
                please wait...
              </span>
            ) : (
              <>
                {request && request.status === "REJECTED"
                  ? "Rejected"
                  : "Reject"}
              </>
            )}
          </Button>
        ) : (
          <Skeleton className=" w-28 h-10" />
        )}
      </td>
    </tr>
  );
};
