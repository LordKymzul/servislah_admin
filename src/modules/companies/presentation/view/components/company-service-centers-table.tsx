'use client'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ServiceCenterModel } from "@/src/modules/service-centers/data/entities/model/service-center-model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Menu, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

const CompanyServiceCentersTable = ({
    serviceCenters,

}: { serviceCenters: ServiceCenterModel[] }) => {

    const router = useRouter();
    return (
        <div className="w-full">
            <Table>
                <TableCaption>A list of service centers</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Service Center</TableHead>
                        <TableHead>Contact Info</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {serviceCenters.map((center) => (
                        <TableRow key={center.id}>
                            <TableCell className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={center.image || ''} alt={center.name || ''} />
                                    <AvatarFallback>{(center.name || '').substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium">{center.name || 'Unnamed Center'}</span>
                                    <span className="text-xs text-muted-foreground">ID: {center.id}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span>{center.phone || 'No phone'}</span>
                                    <span className="text-sm text-muted-foreground">{center.email || 'No email'}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                {center.created_at ? new Date(center.created_at).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {center.updated_at ? new Date(center.updated_at).toLocaleDateString() : 'N/A'}
                            </TableCell>
                            <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => router.push(`/settings/service-center/${center.id}`)}>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanyServiceCentersTable;