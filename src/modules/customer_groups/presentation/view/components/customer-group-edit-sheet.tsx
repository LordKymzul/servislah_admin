import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
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
import { CustomerGroupModel } from "../../../data/entities/model/customer-group-model"
import { updateCustomerGroup } from "../../../data/services/customer-group-api.service"
import { useUpdateCustomerGroup } from "../../tanstack/customer-group-tanstack"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"


interface CustomerGroupEditSheetProps {
    customerGroup?: CustomerGroupModel;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters.",
    }),
})

type FormValues = z.infer<typeof formSchema>

const CustomerGroupEditSheet = ({ customerGroup, open, onOpenChange }: CustomerGroupEditSheetProps) => {
    const queryClient = useQueryClient()

    const { id } = useParams()
    if (!id) {
        return null
    }

    const { mutate: updateCustomerGroup, isPending } = useUpdateCustomerGroup(id as string)
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: customerGroup?.name || "",
            description: customerGroup?.description || "",
        },
    })

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        console.log(values)
        updateCustomerGroup(values, {
            onSettled: () => {
                onOpenChange(false)
            }
        })
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[425px] w-full">
                <SheetHeader>
                    <SheetTitle>Edit Customer Group</SheetTitle>
                    <SheetDescription>
                        Make changes to your customer group here. Click save when you're done.
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
                                        <Input placeholder="Enter your name" {...field} />
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
                                        <Input placeholder="Enter your description" {...field} />
                                    </FormControl>
                                    <FormMessage />


                                </FormItem>
                            )}
                        />

                        <SheetFooter>
                            <div className="flex flex-row items-center justify-end w-full gap-x-2">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? <Loader2 className="w-4 h-4 mr-2" /> : "Save"}
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default CustomerGroupEditSheet;