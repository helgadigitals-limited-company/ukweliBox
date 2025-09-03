
export const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-red-100 text-red-800",
};

export type StatusType = keyof typeof statusColors;