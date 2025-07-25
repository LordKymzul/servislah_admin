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
import { MapPin, Menu } from "lucide-react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useQueryClient } from "@tanstack/react-query"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { ServiceCenterModel } from "../../../data/entities/model/service-center-model"
import { useUpdateServiceCenter } from "../../tanstack/service-center-tanstack"
import { UpdateServiceCenterDto, UpdateServiceCenterLocationDto } from "../../../data/entities/dto/update-service-center.dto"

interface EditServiceCenterLocationSheetProps {
    service_center?: ServiceCenterModel;
}

const MALAYSIA_STATES = [
    "Johor",
    "Kedah",
    "Kelantan",
    "Melaka",
    "Negeri Sembilan",
    "Pahang",
    "Perak",
    "Perlis",
    "Pulau Pinang",
    "Sabah",
    "Sarawak",
    "Selangor",
    "Terengganu",
    "Kuala Lumpur",
    "Labuan",
    "Putrajaya"
] as const;

const formSchema = z.object({
    address: z.string().min(5, {
        message: "Address must be at least 5 characters.",
    }),
    city: z.string().min(2, {
        message: "City must be at least 2 characters.",
    }),
    state: z.enum(MALAYSIA_STATES),
    zip_code: z.string().min(5, {
        message: "ZIP code must be at least 5 characters.",
    }),
    latitude: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= -90 && parseFloat(val) <= 90, {
        message: "Latitude must be a valid number between -90 and 90.",
    }),
    longitude: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= -180 && parseFloat(val) <= 180, {
        message: "Longitude must be a valid number between -180 and 180.",
    }),
})

type FormValues = z.infer<typeof formSchema>

const EditServiceCenterLocationSheet = ({ service_center }: EditServiceCenterLocationSheetProps) => {
    const queryClient = useQueryClient()
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            address: service_center?.locations?.address || "",
            city: service_center?.locations?.city || "",
            state: (service_center?.locations?.state as typeof MALAYSIA_STATES[number]) || "Kuala Lumpur",
            zip_code: service_center?.locations?.zip_code || "",
            latitude: service_center?.locations?.latitude?.toString() || "",
            longitude: service_center?.locations?.longitude?.toString() || "",
        },
    })

    const { mutate: updateServiceCenterMutation, isPending } = useUpdateServiceCenter(service_center?.id || "")

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        const locationData: UpdateServiceCenterLocationDto = {
            address: values.address,
            city: values.city,
            state: values.state,
            zip_code: values.zip_code,
            latitude: parseFloat(values.latitude),
            longitude: parseFloat(values.longitude),
            country: "Malaysia" // Fixed value
        }

        const updateData: UpdateServiceCenterDto = {
            locations: locationData
        }

        updateServiceCenterMutation(updateData, {
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
                    <SheetTitle>Edit Service Center Location</SheetTitle>
                    <SheetDescription>
                        Update the location details for {service_center?.name}. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 px-4">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Enter service center address"
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
                            name="city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter city name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>State</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a state" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-full">
                                            {MALAYSIA_STATES.map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="zip_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter ZIP code"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input
                                    value="Malaysia"
                                    disabled
                                    className="bg-muted"
                                />
                            </FormControl>
                        </FormItem>

                        <FormField
                            control={form.control}
                            name="latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Latitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter latitude (e.g. 1.3521)"
                                            type="number"
                                            step="any"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="longitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Longitude</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter longitude (e.g. 103.8198)"
                                            type="number"
                                            step="any"
                                            {...field}
                                        />
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

export default EditServiceCenterLocationSheet;