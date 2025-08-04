import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExperienceLevel } from "@/src/core/util/constant"
import { useUpdateMechanic } from "../../tanstack/mechanic-tanstack"
import { UpdateMechanicDto } from "../../../data/entities/dto/update-mechanic.dto"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useQuerySpecializations } from "@/src/modules/specialization/presentation/tanstack/specialization-tanstack"
import { MechanicModel } from "../../../data/entities/model/mechanic-model"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface EditMechanicSheetProps {
    mechanic: MechanicModel
    open: boolean
    onOpenChange: (open: boolean) => void
}

const formSchema = z.object({
    experience_level: z.nativeEnum(ExperienceLevel),
    years_of_exp: z.number().min(0, {
        message: "Years of experience must be a positive number.",
    }),
    is_active: z.boolean(),
    specialization_ids: z.array(z.string()),
})

type FormValues = z.infer<typeof formSchema>

interface SpecializationOption {
    label: string
    value: string
}

const EditMechanicSheet = ({ mechanic, open, onOpenChange }: EditMechanicSheetProps) => {
    const { mutate: updateMechanic, isPending } = useUpdateMechanic()

    const serviceCenterId = mechanic.service_center_id as string
    const { data: specializations } = useQuerySpecializations({
        service_center_id: serviceCenterId || "",
        page: 1,
        limit: 50,
    })

    const existingSpecIds = mechanic?.specializations?.map(spec => spec.id) || []

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            experience_level: mechanic?.experience_level as ExperienceLevel,
            years_of_exp: mechanic?.years_of_exp || 0,
            is_active: mechanic?.is_active || false,
            specialization_ids: existingSpecIds,
        },
    })

    const onSubmit = (values: FormValues) => {
        const existingSpecSet = new Set(existingSpecIds)
        const newSpecSet = new Set(values.specialization_ids)

        // Find added and removed specializations
        const addedSpecs = values.specialization_ids.filter(id => !existingSpecSet.has(id))
        const removedSpecs = existingSpecIds.filter(id => !newSpecSet.has(id as string))

        let data: UpdateMechanicDto = {
            experience_level: values.experience_level,
            years_of_exp: values.years_of_exp,
            is_active: values.is_active,
            specialization_ids: values.specialization_ids,
        }

        if (mechanic.id) {
            updateMechanic({ mechanicId: mechanic.id, data }, {
                onSettled: () => {
                    onOpenChange(false)
                    console.log("Added specializations:", addedSpecs)
                    console.log("Removed specializations:", removedSpecs)
                }
            })
        } else {
            toast.error("Mechanic ID is required")
        }
    }

    const specializationOptions: SpecializationOption[] = specializations?.specializations.map((spec) => ({
        label: spec.name || "",
        value: spec.id || "",
    })).filter(option => option.value !== "") || []

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[425px] w-full">
                <SheetHeader>
                    <SheetTitle>Edit Mechanic</SheetTitle>
                    <SheetDescription>
                        Make changes to mechanic details here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 px-4">
                        <FormField
                            control={form.control}
                            name="experience_level"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select experience level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ExperienceLevel).map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level.charAt(0) + level.slice(1).toLowerCase()}
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
                            name="years_of_exp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Years of Experience</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="Enter years of experience"
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="specialization_ids"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Specializations</FormLabel>
                                    <FormDescription>
                                        Select the areas of expertise for this mechanic
                                    </FormDescription>
                                    <ScrollArea className="h-[200px] rounded-md border p-4">
                                        <div className="space-y-4">
                                            {specializationOptions.map((option) => (
                                                <FormField
                                                    key={option.value}
                                                    control={form.control}
                                                    name="specialization_ids"
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem
                                                                key={option.value}
                                                                className="flex flex-row items-start space-x-3 space-y-0"
                                                            >
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(option.value)}
                                                                        onCheckedChange={(checked) => {
                                                                            const newValue = checked
                                                                                ? [...field.value, option.value]
                                                                                : field.value?.filter((value) => value !== option.value)
                                                                            field.onChange(newValue)
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <FormLabel className="font-normal">
                                                                    {option.label}
                                                                </FormLabel>
                                                            </FormItem>
                                                        )
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </ScrollArea>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Active Status</FormLabel>
                                        <FormDescription>
                                            Determine if this mechanic is currently active
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
                                <Button
                                    variant="outline"
                                    onClick={() => onOpenChange(false)}
                                    type="button"
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save changes"}
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default EditMechanicSheet