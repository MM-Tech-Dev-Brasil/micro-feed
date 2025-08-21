"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeaderProps {
  onLogout: () => void;
  onToggleFilter: (isAll: boolean) => void;
}

export function Header({ onLogout, onToggleFilter }: HeaderProps) {
  const [active, setActive] = useState<"all" | "mine">("all");

  const handleClick = (filter: "all" | "mine") => {
    setActive(filter);
    onToggleFilter(filter === "all");
  };

  return (
    <div className="bg-zinc-900 border-b border-zinc-800 p-4 sticky top-0 z-10 flex justify-between items-center shadow-lg">
      <div className="flex space-x-2 sm:space-x-4">
        <Button
          variant={active === "all" ? "default" : "ghost"}
          className={`
            transition-all duration-300 ease-in-out 
            ${active === "all" 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "text-zinc-400 hover:text-blue-500 hover:bg-zinc-800"
            }
          `}
          onClick={() => handleClick("all")}
        >
          All Posts
        </Button>
        <Button
          variant={active === "mine" ? "default" : "ghost"}
          className={`
            transition-all duration-300 ease-in-out 
            ${active === "mine" 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "text-zinc-400 hover:text-blue-500 hover:bg-zinc-800"
            }
          `}
          onClick={() => handleClick("mine")}
        >
          My Posts
        </Button>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-zinc-400 hover:text-red-500 hover:bg-zinc-800 transition-colors duration-300"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-zinc-700 text-white border-none">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
