"use client";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogActionDestructive,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutationResult,
} from "@tanstack/react-query";

interface DeleteDialogProps {
  handleDelete: () => string[];
  deleteFunc: UseMutationResult<
    unknown,
    Error,
    {
      ids: string[] | number[];
    },
    unknown
  >;
  refetchFn: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<unknown, Error>>;
}

export function DeleteDialog({
  refetchFn,
  handleDelete,
  deleteFunc,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  // ✅ Handle success / error / dialog close
  useEffect(() => {
    if (deleteFunc.isSuccess) {
      toast.success("Row removed successfully!");
      setOpen(false);
      refetchFn();
      deleteFunc.reset(); // important: reset mutation state after success
    }

    if (deleteFunc.isError) {
      toast.error("Row removal failed");
      deleteFunc.reset(); // reset after error too
    }
  }, [deleteFunc.isSuccess, deleteFunc.isError, refetchFn, deleteFunc.reset]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <FaTrash />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete selected
            batches from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteFunc.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogActionDestructive
            onClick={() => deleteFunc.mutate({ ids: handleDelete() })}
            disabled={deleteFunc.isPending}
          >
            {deleteFunc.isPending ? (
              <>
                <Spinner /> <span className="ml-2">Deleting...</span>
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogActionDestructive>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
