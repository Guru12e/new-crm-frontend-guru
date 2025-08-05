"use client";

import * as React from "react";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

const MultiSelect = ({
  options,
  onValueChange,
  selectedValues = [],
  placeholder = "Select options",
  animation = 0,
  maxCount = 3,
  modalPopover = false,
  className,
}) => {
  const [selectedIds, setSelectedIds] = React.useState(selectedValues);
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsPopoverOpen(true);
    } else if (event.key === "Backspace" && !event.currentTarget.value) {
      const newSelectedNames = [...selectedNames];
      newSelectedNames.pop();
      setSelectedNames(newSelectedNames);
      onValueChange(newSelectedNames);
    }
  };

  const toggleOption = (value) => {
    const newSelected = selectedIds.includes(value)
      ? selectedIds.filter((v) => v !== value)
      : [...selectedIds, value];
    setSelectedIds(newSelected);
    onValueChange(newSelected);
  };

  const handleClear = () => {
    setSelectedNames([]);
    onValueChange([]);
  };

  const clearExtraOptions = () => {
    const newSelected = selectedIds.slice(0, maxCount);
    setSelectedIds(newSelected);
    onValueChange(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.length === options.length) {
      handleClear();
    } else {
      const allIds = options.map((opt) => opt.value);
      setSelectedIds(allIds);
      onValueChange(allIds);
    }
  };

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={setIsPopoverOpen}
      modal={modalPopover}
    >
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsPopoverOpen((p) => !p)}
          className={cn(
            "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit",
            className
          )}
        >
          {selectedIds.length > 0 ? (
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-wrap items-center">
                {selectedIds.slice(0, maxCount).map((id) => {
                  const option = options.find((o) => o.value === id);
                  return (
                    <Badge
                      key={id}
                      className={isAnimating ? "animate-bounce" : ""}
                    >
                      {option?.label || id}
                      <XCircle
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleOption(id);
                        }}
                      />
                    </Badge>
                  );
                })}

                {selectedIds.length > maxCount && (
                  <Badge
                    className="bg-transparent text-foreground hover:bg-transparent"
                    style={{ animationDuration: `${animation}s` }}
                  >
                    + {selectedIds.length - maxCount} more
                    <XCircle
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        clearExtraOptions();
                      }}
                    />
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <XIcon
                  className="h-4 mx-2 cursor-pointer text-muted-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                />
                <Separator
                  orientation="vertical"
                  className="flex min-h-6 h-full"
                />
                <ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-muted-foreground mx-3">
                {placeholder}
              </span>
              <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search..."
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem onSelect={toggleAll} className="cursor-pointer">
                <div className="mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                  {selectedIds.length === options.length && (
                    <CheckIcon className="h-4 w-4" />
                  )}
                </div>
                <span>(Select All)</span>
              </CommandItem>
              {options.map((option) => {
                const isSelected = selectedIds.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => toggleOption(option.value)}
                    className="cursor-pointer"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <div className="flex items-center justify-between">
                {selectedIds.length > 0 && (
                  <>
                    <CommandItem
                      onSelect={handleClear}
                      className="flex-1 justify-center cursor-pointer"
                    >
                      Clear
                    </CommandItem>
                    <Separator
                      orientation="vertical"
                      className="flex min-h-6 h-full"
                    />
                  </>
                )}
                <CommandItem
                  onSelect={() => setIsPopoverOpen(false)}
                  className="flex-1 justify-center cursor-pointer max-w-full"
                >
                  Close
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {animation > 0 && selectedIds.length > 0 && (
        <WandSparkles
          className={cn(
            "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
            isAnimating ? "" : "text-muted-foreground"
          )}
          onClick={() => setIsAnimating(!isAnimating)}
        />
      )}
    </Popover>
  );
};

export default MultiSelect;
