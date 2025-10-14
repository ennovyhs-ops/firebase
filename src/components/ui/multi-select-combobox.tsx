
"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from "./badge"

type MultiSelectComboboxProps = {
    options: { label: string; value: string }[],
    placeholder: string,
    searchPlaceholder: string,
    emptyPlaceholder: string,
    value: string[],
    onValueChange: (value: string[]) => void,
    disabled?: (value: string) => boolean;
}

export function MultiSelectCombobox({ options, placeholder, searchPlaceholder, emptyPlaceholder, value, onValueChange, disabled }: MultiSelectComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const handleSelect = (currentValue: string) => {
    const newValue = [...value];
    const itemIndex = newValue.indexOf(currentValue);
    if (itemIndex > -1) {
      newValue.splice(itemIndex, 1);
    } else {
      newValue.push(currentValue);
    }
    onValueChange(newValue);
    setInputValue("");
  };

  const handleRemove = (item: string) => {
    onValueChange(value.filter(v => v !== item));
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative flex min-h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
            <div className="flex flex-wrap gap-1">
            {value.length > 0 ? (
                value.map(item => {
                    const label = options.find(opt => opt.value === item)?.label || item;
                    return (
                        <Badge key={item} variant="secondary" className="gap-1.5">
                            {label}
                            <button onClick={(e) => { e.stopPropagation(); handleRemove(item);}} className="ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                            </button>
                        </Badge>
                    )
                })
            ) : (
                <span className="text-muted-foreground">{placeholder}</span>
            )}
            </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput 
            placeholder={searchPlaceholder} 
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>{emptyPlaceholder}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={disabled?.(option.value)}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
