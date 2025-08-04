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
import { OperatingHoursModel } from "../../../data/entities/model/operating-hours-model"
import { UpdateOperatingHoursDto } from "../../../data/entities/dto/update-operating-hours.dto"
import { useUpdateOperatingHours } from "../../tanstack/operating-hours-tanstack"
import { Loader2 } from "lucide-react"


interface EditOperatingHoursSheetProps {
    operatingHours?: OperatingHoursModel;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    open_time: z.string().min(2, {
        message: "Open time must be at least 2 characters.",
    }),
    close_time: z.string().min(2, {
        message: "Close time must be at least 2 characters.",
    }),
    is_active: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

const EditOperatingHoursSheet = ({ operatingHours, open, onOpenChange }: EditOperatingHoursSheetProps) => {
    const { mutate: updateOperatingHours, isPending } = useUpdateOperatingHours(operatingHours?.id || "")
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            open_time: operatingHours?.open_time || "",
            close_time: operatingHours?.close_time || "",
            is_active: operatingHours?.is_active || false,
        },
    })

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        let data: UpdateOperatingHoursDto = {
            open_time: values.open_time || operatingHours?.open_time,
            close_time: values.close_time || operatingHours?.close_time,
            is_active: values.is_active,
        }
        updateOperatingHours(data, {
            onSettled: () => {
                onOpenChange(false)
            }
        })
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[425px] w-full">
                <SheetHeader>
                    <SheetTitle>Edit Operating Hours</SheetTitle>
                    <SheetDescription>
                        Make changes to your operating hours here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
                        <FormField
                            control={form.control}
                            name="open_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Open Time</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="close_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Close Time</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Is Active</FormLabel>
                                    <FormControl>
                                        <Switch checked={field.value} onCheckedChange={field.onChange} />
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

export default EditOperatingHoursSheet;