import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"
import { ReactNode } from "react"

interface DefaultAlertDialogProps {
    trigger?: ReactNode
    title: string
    description: string
    cancelText?: string
    confirmText?: string
    onConfirm?: () => void
    onCancel?: () => void
    open?: boolean
    onOpenChange?: (open: boolean) => void
    loading?: boolean
}

const DefaultAlertDialog = ({
    trigger,
    title,
    description,
    cancelText = "Cancel",
    confirmText = "Continue",
    onConfirm,
    onCancel,
    open,
    onOpenChange,
    loading = false
}: DefaultAlertDialogProps) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onCancel}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} disabled={loading}>{
                        loading ? <Loader2 className="w-4 h-4 animate-spin" /> : confirmText
                    }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DefaultAlertDialog