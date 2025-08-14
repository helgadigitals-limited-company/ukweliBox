import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form, FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import {Card,CardContent,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import {toast} from "sonner"

const loginformSchema = z.object({
  username: z.string().min(1,{
    message:"username is required"
  }),
  password:z.string().min(2,{
    message:"Password is required"
  })
})


type loginformValues = z.infer<typeof loginformSchema>

export default function Admin(){
  const { login } = useAuth()
  const navigate = useNavigate()

  const form = useForm<loginformValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      username:"",
      password:"",
    },
  })

    const onSubmit = (values: loginformValues)=>{
      if(login(values.username, values.password)){
        toast.success('Login successfully')
        navigate("/admin")
      }else {
        toast("Login Failed",{
          description:"Invalid username or password"
        })
      }
     
      console.log(values)
      form.reset()
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <Card className="border-0 w-4/5 max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md mx-auto space-y-6">

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input 
                className="w-full"
                placeholder="" {...field} />
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
                className="w-full"
                placeholder="" {...field} />
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center">
        <Button type="submit" className="w-auto px-8">Login</Button>
        </div>
      </form>
    </Form>

    </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500">
          Copyright © 2025 Helga Digital Solutions Limited
        </CardFooter>
  </Card>
  </div>
  )
}

