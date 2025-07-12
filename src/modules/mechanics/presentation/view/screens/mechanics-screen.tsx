"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Wrench, Filter } from "lucide-react"
import { MechanicsDataTable } from "../components/mechanics-data-table"
import { useQueryMechanics } from "../../tanstack/mechanic-tanstack"
import { QueryMechanicDto } from "../../../data/entities/dto/query-mechanic.dto"
import { InfoScreenType } from "@/src/core/shared/presentation/screens/info-screen"
import InfoScreen from "@/src/core/shared/presentation/screens/info-screen"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const experienceLevels = ["BEGINNER", "INTERMEDIATE", "EXPERT"];
const yearsOfExperience = [1, 2, 3, 5, 10];

const MechanicsScreen = () => {
    const [query, setQuery] = React.useState<QueryMechanicDto>({});
    const {
        data: mechanics,
        isLoading,
        isError,
        error
    } = useQueryMechanics(query);

    const handleFilterChange = (key: keyof QueryMechanicDto, value: any) => {
        if (value === "ALL") {
            const newQuery = { ...query };
            delete newQuery[key];
            setQuery(newQuery);
        } else {
            setQuery(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    const clearFilters = () => {
        setQuery({});
    };

    if (isError) {
        return (
            <div className="mx-auto py-4 px-4 w-full">
                <InfoScreen type={InfoScreenType.ERROR} title="Error" description={error?.message} />
            </div>
        )
    }

    return (
        <div className="mx-auto py-4 px-4 w-full">
            <div className="flex md:flex-row flex-col justify-between md:items-center mb-6 gap-4">
                <div className="space-y-2">
                    <h1 className="md:text-3xl text-2xl font-bold">Mechanics</h1>
                    <p className="text-sm text-muted-foreground font-light">
                        Manage your mechanics and their assignments
                    </p>
                </div>
                <div className="flex gap-2">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Filter className="mr-2 h-4 w-4" />
                                Filters
                            </Button>
                        </SheetTrigger>
                        <SheetContent >
                            <SheetHeader>
                                <SheetTitle>Filter Mechanics</SheetTitle>
                                <SheetDescription>
                                    Apply filters to find specific mechanics
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid gap-4 p-4">
                                <div className="space-y-2">
                                    <Label>Experience Level</Label>
                                    <Select
                                        value={query.experience_level || "ALL"}
                                        onValueChange={(value) => handleFilterChange("experience_level", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">All Levels</SelectItem>
                                            {experienceLevels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level.charAt(0) + level.slice(1).toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select
                                        value={(query.is_active === undefined ? "ALL" : query.is_active.toString())}
                                        onValueChange={(value) => handleFilterChange("is_active", value === "ALL" ? value : value === "true")}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">All Status</SelectItem>
                                            <SelectItem value="true">Active</SelectItem>
                                            <SelectItem value="false">Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <Label>Minimum Years of Experience</Label>
                                    <Select
                                        value={query.years_of_exp?.toString() || "ALL"}
                                        onValueChange={(value) => handleFilterChange("years_of_exp", value === "ALL" ? value : parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select minimum years" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">Any Experience</SelectItem>
                                            {yearsOfExperience.map((years) => (
                                                <SelectItem key={years} value={years.toString()}>
                                                    {years} {years === 1 ? 'year' : 'years'}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <SheetFooter>
                                <Button variant="outline" onClick={clearFilters}>
                                    Clear Filters
                                </Button>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                    <Button>
                        <Wrench className="mr-2 h-4 w-4" />
                        Add New Mechanic
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <MechanicsDataTable data={mechanics?.mechanics || []} />
            )}
        </div>
    )
}

export default MechanicsScreen;