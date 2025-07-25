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
import { ServiceBayModel } from "../../../data/entities/model/service-bay-model"
import { useUpdateService } from "@/src/modules/services/presentation/tanstack/service-tanstack"
import { UpdateServiceBayDto } from "../../../data/entities/dto/update-service-bay.dto"
import { useUpdateServiceBay } from "../../tanstack/service-bay-tanstack"

interface EditServiceBaySheetProps {
    service_bay?: ServiceBayModel;
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

const EditServiceBaySheet = ({ service_bay }: EditServiceBaySheetProps) => {
    const queryClient = useQueryClient()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: service_bay?.name || "",

        },
    })

    const { mutate: updateServiceMutation, isPending } = useUpdateServiceBay(service_bay?.id || "")

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        const updateData: UpdateServiceBayDto = {
            name: values.name,
            service_center_id: values.service_center_id,
        }
        updateServiceMutation(updateData, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['service-bays'] })
                queryClient.invalidateQueries({ queryKey: ['service-bay', service_bay?.id] })
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
                    <SheetTitle>Edit Service Bay</SheetTitle>
                    <SheetDescription>
                        Make changes to your service bay here. Click save when you're done. {service_bay?.name}
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

export default EditServiceBaySheet;