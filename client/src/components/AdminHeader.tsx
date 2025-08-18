import Image from "../assets/Helga.jpg"
import type { FC } from "react"
import { User } from 'lucide-react';

interface AdminHeaderProps {
  adminName: string
}

const AdminHeader: FC<AdminHeaderProps> = ({ adminName }) =>{

  return(
    <header className="flex items-center justify-between  bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm h-25 px-12">
      <div className="h-full">
        <img src={Image} 
          alt="helga image" 
          className="h-full object-contain"/>
      </div>
      <div className="flex items-center">
      <span className="font-semibold text-gray-800 flex items-center">
        <User  className="mr-1"/>
        {adminName}
        </span> 
      </div>  
    </header>
  )

}

export default AdminHeader