import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@helgadigitals/vera-ui"
import {Form, FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import {Card,CardContent,CardHeader,CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../components/AuthContext"
import {toast} from "sonner"


const loginformSchema = z.object({
  email: z
  .string()
  .min(1,{message:"Email is required"})
  .refine((val)=> val.endsWith("@helgadigitals.co.tz"),{
    message:"Email must end with @helgadigitals.co.tz",
  }),
  password:z.string().min(8,{
    message:"Password must be at least 8 characters"
  })
})


type loginformValues = z.infer<typeof loginformSchema>

export default function Admin(){
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<loginformValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  })

    const onSubmit = (values: loginformValues)=>{
      if(login(values.email, values.password)){
        toast.success("Login Successful", {
          description: `Welcome ${values.email.split("@")[0]}`
        })
        navigate("/admin")
      }else {
        toast.error("Login Failed",{
          description:"Invalid username or password"
        })
      }
     
      console.log(values)
      form.reset()
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card className="border border-gray-200 bg-white w-4/5 max-w-[500px] shadow-lg transition-all duration-200 mt-24">
        <CardHeader className="pb-6">
          <CardTitle className="text-center text-2xl font-bold">
            Admin Login
        </CardTitle>
        <p className="text-center text-sm mt-2">
            Access your admin dashboard
          </p>
        </CardHeader>
        <CardContent className="pt-0">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-6">

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <Input 
                 className="w-full bg-white  focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="your.email@helgadigitals.co.tz" 
                {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                type="password"
                 className="w-full bg-white  focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your password"
                 {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-4">
        <Button type="submit" className="w-auto px-8 py-2 bg-blue-600">Login</Button>
        </div>
      </form>
    </Form>

    </CardContent>
        {/* <CardFooter className="justify-center text-sm text-gray-500">
          Copyright © 2025 Helga Digital Solutions Limited
        </CardFooter> */}
  </Card>
  </div>
  )
  
}

