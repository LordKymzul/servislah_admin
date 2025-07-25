import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useQueryClient } from "@tanstack/react-query"
import { useUpdateService } from "@/src/modules/services/presentation/tanstack/service-tanstack"

import { ServiceCenterModel } from "../../../data/entities/model/service-center-model"
import { useUpdateServiceCenter } from "../../tanstack/service-center-tanstack"
import { UpdateServiceCenterDto } from "../../../data/entities/dto/update-service-center.dto"

interface EditServiceCenterSheetProps {
    service_center?: ServiceCenterModel;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    phone: z.string().min(1, {
        message: "Phone must be at least 1 characters.",
    }),
    email: z.string().min(1, {
        message: "Email must be at least 1 characters.",
    }),

})

type FormValues = z.infer<typeof formSchema>

const EditServiceCenterSheet = ({ service_center }: EditServiceCenterSheetProps) => {
    const queryClient = useQueryClient()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: service_center?.name || "",
            phone: service_center?.phone || "",
            email: service_center?.email || "",
        },
    })

    const { mutate: updateServiceMutation, isPending } = useUpdateServiceCenter(service_center?.id || "")

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        const updateData: UpdateServiceCenterDto = {
            name: values.name,
            phone: values.phone,
            email: values.email,
        }
        updateServiceMutation(updateData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['service-centers'] })
                queryClient.invalidateQueries({ queryKey: ['service-center', service_center?.id] })
            }
        })
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                    <Menu className="w-4 h-4" />
                </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px] w-full">
                <SheetHeader>
                    <SheetTitle>Edit Service Center</SheetTitle>
                    <SheetDescription>
                        Make changes to your service center here. Click save when you're done. {service_center?.name}
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter service name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter service phone" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            disabled={true}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter service email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <SheetFooter>
                            <div className="flex flex-row items-center justify-end w-full gap-x-2">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default EditServiceCenterSheet;