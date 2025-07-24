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
import { ServiceModel } from "../../../data/entities/model/service-model"
import { Switch } from "@/components/ui/switch"
import { useUpdateService } from "../../../presentation/tanstack/service-tanstack"
import { useQueryClient } from "@tanstack/react-query"
import { UpdateServiceDto } from "../../../data/entities/dto/update-service.dto"

interface EditServiceSheetProps {
    service?: ServiceModel;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z.coerce.number().min(0, {
        message: "Price must be at least 0.",
    }),
    duration: z.coerce.number().min(0, {
        message: "Duration must be at least 0.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    is_active: z.boolean().default(false),
    service_center_id: z.string().min(1, {
        message: "Service center ID is required.",
    }),
})

type FormValues = z.infer<typeof formSchema>

const EditServiceSheet = ({ service }: EditServiceSheetProps) => {
    const queryClient = useQueryClient()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: service?.name || "",
            description: service?.description || "",
            price: service?.price || 0,
            duration: service?.duration || 0,
            is_active: service?.is_active ?? true,
            service_center_id: service?.service_center_id || "",
        },
    })

    const { mutate: updateServiceMutation, isPending } = useUpdateService(service?.id || "")

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        const updateData: UpdateServiceDto = {
            name: values.name,
            description: values.description,
            price: values.price,
            duration: values.duration,
            is_active: values.is_active,
            service_center_id: values.service_center_id,
        }
        updateServiceMutation(updateData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['services'] })
                queryClient.invalidateQueries({ queryKey: ['service', service?.id] })
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
                    <SheetTitle>Edit Service</SheetTitle>
                    <SheetDescription>
                        Make changes to your service here. Click save when you're done. {service?.name}
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
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter service price" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Duration (minutes)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Enter service duration" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter service description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Availability
                                        </FormLabel>
                                        <FormDescription>
                                            Make this service available to customers
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
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

export default EditServiceSheet;