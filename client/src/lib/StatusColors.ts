
export const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
  Received: "bg-green-400 text-green-800"
};

export type StatusType = keyof typeof statusColors

export const statusLabels: Record<StatusType, string> = {
  Pending: "Pending",
  Resolved: "Resolved",
  Closed: "Closed",
  Received: "Received"
};

type SelectStatusType = {
    name: string
    color:string
}


export const selectStatus: SelectStatusType[] = [
  {
    name: "Pending",
    color: statusColors.Pending
  },
  {
    name: "Resolved",
    color: statusColors.Resolved
  },
  {
    name: "Closed",
    color: statusColors.Closed
  },
  {
    name: "Received",
    color: statusColors.Received
  }
]