"use client";
import { columns, DisplayBatch } from "./columns";
import { DataTable } from "./data-table";
import { useDeleteBulkData, useGetData } from "@/lib/api-request";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function Page() {
  const {
    mutate,
    isSuccess: DeleteSuccess,
    isError,
    isPending: DeletePending,
  } = useDeleteBulkData(`/batch/remove`);
  const [skip, setSkip] = useState(0);
  const [tableData, setTableData] = useState<DisplayBatch[]>([]);
  const { data, isPending, isSuccess, refetch } = useGetData(
    `/get-table-data?category=batch&skip=${skip * 20}`
  );

  useEffect(() => {
    if (isSuccess) {
      setTableData((data as any).data);
    }
  }, [data, isPending, isSuccess]);
  // Refresh table after delete
  useEffect(() => {
    if (DeleteSuccess) {
      toast("Batch Remove Successfully!");
      refetch();
    }
    if (isError) {
      toast("Batch Remove Faild");
    }

    if (DeletePending) {
      toast("Removing Batch");
    }
  }, [DeleteSuccess, refetch, isError, DeletePending]);
  return (
    <div className="py-6 px-4">
      <div className="mx-auto w-[70rem]">
        {isPending ? (
          <div className="flex items-center gap-3">
            <Spinner width={200} height={200} />
            Loading...
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={tableData}
            setSkip={setSkip}
            mutateFn={mutate}
            refetchFn={refetch}
          />
        )}
      </div>
    </div>
  );
}
