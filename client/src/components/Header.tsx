import Image from "../assets/Helga.jpg"


export default function Header() {
  return (
    <header className="w-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm">
    <div className="relative flex items-center h-28 px-4 sm:px-6">
     
     <div className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 sm:h-full sm:w-auto">
     <img src={Image} 
      alt="helga image" 
      className="h-full w-full object-contain"/>
      </div>
     <h1 className="mx-auto text-blue-800 font-semibold text-lg sm:text-2xl tracking-wide uppercase max-w-xs sm:max-w-none text-center sm:text-left pl-0 sm:pl-28 ">
      INNOVATE, IMPLEMENT & TRANSFORM
      </h1>
    </div>
    </header>
  )
}



