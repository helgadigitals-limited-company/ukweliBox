"use client"

import * as React from "react"
import {type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function Dropdown() {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Change Feedback Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Resolved
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Closed
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
