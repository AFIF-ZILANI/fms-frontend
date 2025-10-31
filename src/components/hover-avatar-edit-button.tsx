"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AiOutlineEdit } from "react-icons/ai";

export function HoverAvatarEditButton<
  T extends { name: string; avatar?: { image_url?: string } }
>({ data }: { data: T }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  const fullNameArray = data.name.trim().split(" ");
  const first = fullNameArray[0]?.[0] || "";
  const second = fullNameArray[1]?.[0] || "";
  const fallback = (first + second).toUpperCase() || "?";

  return (
    <>
      {/* Avatar / Menu Button */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
        className="relative w-10 h-10 cursor-pointer group"
      >
        {/* Avatar */}
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={data.avatar && data.avatar.image_url}
              alt="@user"
            />
            <AvatarFallback>{fallback || "?"}</AvatarFallback>
          </Avatar>
        </div>

        {/* Three dot icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 bg-muted rounded-full ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <AiOutlineEdit className="w-5 h-5" />
        </div>
      </div>

      {/* Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>User Options</SheetTitle>
            <SheetDescription>
              Add whatever content you need here — profile actions, settings,
              etc.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => alert("View profile")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-muted"
            >
              View Profile
            </button>
            <button
              onClick={() => alert("Logout")}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-muted"
            >
              Logout
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
