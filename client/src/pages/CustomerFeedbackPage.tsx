import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { onboardingSchema } from "../lib/schema"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,
} from "@/components/ui/form"
import {Card,CardContent,CardFooter,CardHeader,CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import  { ServicesOffered } from "@/lib/services"
import {FeedbackTypes} from "@/lib/FeedbackType"


const onboardingPersonSchema = onboardingSchema.pick({
  fullname:true,
  gender:true,
  service:true,
  phoneNo: true,
  Email:true,
  feedbackType: true,
  message: true,
  attachment: true 

});

 type onboardingPersonSchema = z.infer<typeof onboardingPersonSchema>


export default function FeedbackForm(){

   const form = useForm<onboardingPersonSchema>({
    resolver: zodResolver(onboardingPersonSchema),
    defaultValues: {
      fullname:"",
      gender:undefined,
      service:"",
      phoneNo:"+255",
      Email:"",
      feedbackType:"",
      message:"",
      attachment: undefined,
    },
   })
    const onSumbit = (data:onboardingPersonSchema) => {
      console.log(data);
      toast.success('Submitted successfully')
       form.reset()
    }
  return (
    <div >
    <h1 className="w-full text-center text-3xl bg-gray-50 p-5 font-bold "> karibu UKWELI BOX</h1>
     <h6 className="w-full  text-center bg-gray-50">Mfumo wa Kutuma,Kupokea na Kufuatilia Malalamiko, Mapendekezo,Maulizo na Pongezi</h6>
     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="border-0 w-full max-w-[900px]">
        <CardHeader>
          <CardTitle className="text-center">Taarifa za Muwasilishaji Mrejesho</CardTitle>
        </CardHeader>
        <CardContent>
       <Form {...form}>
      <form 
      onSubmit={form.handleSubmit(onSumbit)} className="w-full max-w-3xl space-y-6 px-4 mx-auto">
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <FormLabel className="min-w-[120px] mb-1 md:mb-0">
                Majina Yako
                </FormLabel>
              <FormControl>
                 <Input
                  className="w-full"
                  placeholder="Andika Majina yako hapa" {...field} />
              </FormControl>
              </div>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         
         <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <FormLabel className="min-w-[120px] mb-1 md:mb-0">
                Namba ya simu 
                </FormLabel>
              <FormControl>
                 <Input
                 className="w-full"
                  placeholder="Andika Nambari ya simu hapa" {...field} />
              </FormControl>
              </div>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
             
          <FormField
          control={form.control}
          name="Email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <FormLabel className="min-w-[120px] mb-1 md:mb-0">
                Barua Pepe (siyo Lazima)
                </FormLabel>
              <FormControl>
                 <Input
                 className="w-full"
                  placeholder="Andika barua pepe yako hapa" {...field} />
              </FormControl>
              </div>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

          <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <FormLabel className="min-w-[120px] mb-1 md:mb-0">
                Jinsia
                </FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Bofya hapa kuchagua Jinsia yako" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              </div>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedbackType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Chagua aina ya mrejesho unaotaka kuwasilisha</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-4"
                >
                  {FeedbackTypes.map((types)=> 
                  <FormItem key={types.id} className="flex items-center gap-2">
                    <FormControl>
                      <RadioGroupItem value={types.id} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {types.value}
                    </FormLabel>
                  </FormItem>
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col md:flex-row md:items-center md:gap-6">
              <FormLabel className="min-w-[120px] mb-1 md:mb-0">
                Huduma
              </FormLabel>
              <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Bofya hapa kuchagua Aina ya huduma uliyopata" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ServicesOffered.map((service) => 
                  <SelectItem value={service.id} key={service.id}>
                    {service.value}
                  </SelectItem>
                  )}
                </SelectContent>
              </Select>
              </div>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Maelezo </FormLabel>
              <FormControl>
                <div className="space-y-3">
                 <Textarea 
                  placeholder="Andika maelezo yako hapa"
                  className="w-full h-40 resize-none"
                  {...field} />
                    </div>
              </FormControl>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ambatanisha Ushahidi
              <FormControl>
                <Input
                    type="file"
                    className="w-full md:w-72"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
              </FormControl>
              </FormLabel>
              <FormDescription>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <div className="flex justify-center">
        <Button 
        className="w-full md:w-auto"
        type="submit">
          Submit
          </Button>
        </div>  
      </form>
    </Form>
     
      </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500">
          Copyright © 2025 Helga Digital Solutions Limited
        </CardFooter>
  </Card>
    </div>
    </div>
  )

}