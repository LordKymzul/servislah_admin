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
import { UpdateReviewDto } from "../../../data/entities/dto/update-review.dto"
import { useUpdateReview } from "../../tanstack/review-tanstack"
import { ReviewModel } from "../../../data/entities/model/review-model"
import { Loader2 } from "lucide-react"

interface EditReviewSheetProps {
    review?: ReviewModel;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
    comment: z.string().min(2, {
        message: "Comment must be at least 2 characters.",
    }),
    rating: z.number().min(1).max(5, {
        message: "Rating must be between 1 and 5.",
    }),
    is_active: z.boolean(),
})

type FormValues = z.infer<typeof formSchema>

const EditReviewSheet = ({ review, open, onOpenChange }: EditReviewSheetProps) => {
    const queryClient = useQueryClient()
    const { mutate: updateReview, isPending } = useUpdateReview(review?.id || "")
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            comment: review?.comment || "",
            rating: review?.rating || 5,
            is_active: review?.is_active ?? true,
        },
    })

    const handleSubmit: SubmitHandler<FormValues> = (values: FormValues) => {
        let updateReviewDto: UpdateReviewDto = {
            comment: values.comment,
            rating: values.rating,
            is_active: values.is_active,
        }
        updateReview(updateReviewDto, {
            onSuccess: () => {
                onOpenChange(false)
            },

        })
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-[425px] w-full flex flex-col h-full">
                <SheetHeader className="flex-none">
                    <SheetTitle>Edit Review</SheetTitle>
                    <SheetDescription>
                        Make changes to the review here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Comment</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Enter review comment"
                                                className="min-h-[100px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rating"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rating</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={5}
                                                placeholder="Enter rating (1-5)"
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
                                name="is_active"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Active Status</FormLabel>
                                            <FormDescription>
                                                Review will be visible if active
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
                        </div>

                        <SheetFooter className="flex-none px-4 py-4 border-t">
                            <div className="flex flex-row items-center justify-end w-full gap-x-2">
                                <Button type="submit" disabled={isPending}>
                                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default EditReviewSheet;