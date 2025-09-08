import Header from "@/components/Header"


export const  ClientLayout:React.FC<{children: React.ReactNode}> =({children})=>{
  return(
    <>
     <Header slogan/>
     {children}
    </>
  )
}