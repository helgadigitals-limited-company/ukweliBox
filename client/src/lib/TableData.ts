
export type Table = {
  id: string
  name: string
  date: string
  time: string
  phone: string
  email: string
  service: string
  description: string
  status: "Pending" | "Resolved" | "Closed"
}

export const TableDatas: Table[] = [
  {
    id: "1",
    name: "John Doe",
    date: "2025-10-03",
    time: "08:30",
    phone: "123-456-7890",
    email: "johndoes@email.com",
    service: "Software Development",
    description: "I appreciate the software development service I received, but I believe there is room to improve customer care. While the technical work was delivered well, communication and responsiveness could be more consistent. Providing faster updates, clearer timelines, and proactive support when challenges arise would help build more trust and confidence. Strengthening customer care in this way will make the overall service experience more professional and customer-friendly.",
    status: "Pending"
  },
  {
    id: "2",
    name: "Jane Smith",
    date: "2025-10-04",
    time: "09:10",
    phone: "987-654-3210",
    email: "janesmith@email.com",
    service: "ICT Research and Consulting",
    description: "This is a sample description for Jane Smith's feedback entry.",
    status: "Resolved"
  },
  {
    id: "3",
    name: "Alice Johnson",
    date: "2025-10-03",
    time: "02:40",
    phone: "555-123-4567",
    email: "alice@123.email.com",
    service: "Software Development",
    description: "I appreciate the software development service I received, but I believe there is room to improve customer care. While the technical work was delivered well, communication and responsiveness could be more consistent. Providing faster updates, clearer timelines, and proactive support when challenges arise would help build more trust and confidence. Strengthening customer care in this way will make the overall service experience more professional and customer-friendly.",
    status: "Closed"
  },
  {
    id: "4",
    name: "Juma Shaaban",
    date: "2025-10-04",
    time: "07:24",
    phone: "255780456678",
    email: "jumash@email.com",
    service: "Network Infrastructure Services",
    description: "This is a sample description for Juma Shaaban's feedback entry.",
    status: "Pending"
  },
  {
    id: "5",
    name: "said Said",
    date: "2025-10-03",
    time: "08:20",
    phone: "255780986678",
    email: "saids@email.com",
    service: "Network Infrastructure Services",
    description: "This is a sample description for Said said feedback entry.",
    status: "Resolved"
  },
  {
    id: "6",
    name: "Mary John",
    date: "2025-10-03",
    time: "08:20",
    phone: "255757346678",
    email: "saids@email.com",
    service: "ICT Governance, Risk and Compliance",
    description: "This is a sample description for Said said feedback entry.",
    status: "Pending"
  },
  {
    id: "7",
    name: "Upendo Ndassa",
    date: "2025-10-01",
    time: "10:20",
    phone: "255617479762",
    email: "ndassa.up@gmail.com",
    service: "Software Development",
    description: "Sijapenda lakini haya. Swala la msosi ni jambo la muhimu mimi kama mteja naomba nikija tena msosi uwepo wa kutosha",
    status: "Resolved"
  },
  {
    id: "8",
    name: "Faidha Mbega",
    date: "2025-10-01",
    time: "09:20",
    phone: "255689744404",
    email: "faydherbatuli@gmail.com",
    service: "Professional ICT Training Services",
    description: "Nimepata good treatment, tumefundishwa vizuri sana na nimejifunza mengi sana",
    status: "Resolved"
  },
  {
    id: "9",
    name: "Faith Masoud",
    date: "2025-10-02",
    time: "11:28",
    phone: "255621500381",
    email: "masoudfaith3@gmail.com",
    service: "Professional ICT Training Services",
    description: "Wanafunzi wa field tupikiwe",
    status: "Closed"
  },
  {
    id: "10",
    name: "Harith Issa",
    date: "2025-10-01",
    time: "08:26",
    phone: "255787900234",
    email: "hariths@gmail.com",
    service: "ICT Governance, Risk and Compliance",
    description: "This is a sample description for Harith Issa feedback entry.",
    status: "Pending"
  },
  {
    id: "11",
    name: "Patric Johns",
    date: "2025-10-01",
    time: "08:40",
    phone: "255787346567",
    email: "pjohns@gmail.com",
    service: "Software Development",
    description: "This is a sample description for pjohns feedback entry.",
    status: "Resolved"
  },
  {
    id: "12",
    name: "Brocklin Mushi",
    date: "2025-10-01",
    time: "09:35",
    phone: "255757987051",
    email: "bmushi@gmail.com",
    service: "Network Infrastructure Services",
    description: "This is a sample description for Brockline Mushi feedback entry.",
    status: "Pending"
  },
  {
    id: "13",
    name: "Jovin John",
    date: "2025-10-01",
    time: "12:58",
    phone: "255569832456",
    email: "jjohn@gmail.com",
    service: "Professional ICT Training Services",
    description: "This is a sample description for Jovin John feedback entry.",
    status: "Pending"
  }
]