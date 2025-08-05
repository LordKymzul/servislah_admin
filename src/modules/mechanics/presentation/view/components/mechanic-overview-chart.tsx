"use client"

import { TrendingUp, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, ChevronDown } from "lucide-react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

// Monthly data for the entire year of 2024
const monthlyData2024 = [
    { month: "January", customers: 186, vehicles: 80, appointments: 45 },
    { month: "February", customers: 305, vehicles: 200, appointments: 100 },
    { month: "March", customers: 237, vehicles: 120, appointments: 150 },
    { month: "April", customers: 253, vehicles: 190, appointments: 50 },
    { month: "May", customers: 209, vehicles: 130, appointments: 100 },
    { month: "June", customers: 214, vehicles: 140, appointments: 160 },
    { month: "July", customers: 258, vehicles: 160, appointments: 120 },
    { month: "August", customers: 342, vehicles: 210, appointments: 135 },
    { month: "September", customers: 370, vehicles: 230, appointments: 150 },
    { month: "October", customers: 410, vehicles: 250, appointments: 180 },
    { month: "November", customers: 470, vehicles: 290, appointments: 200 },
    { month: "December", customers: 520, vehicles: 320, appointments: 230 },
]

const chartConfig = {
    customers: {
        label: "Customers",
        color: "#008060", // Green
    },
    vehicles: {
        label: "Vehicles",
        color: "#5C6AC4", // Purple/indigo
    },
    appointments: {
        label: "Appointments",
        color: "#212B36", // Dark slate
    },
} satisfies ChartConfig

const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm w-[200px]">
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                    </span>
                </div>
                <div className="flex flex-col"></div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
                {payload.map((entry: any, index: number) => (
                    <div
                        key={`item-${index}`}
                        className="flex items-center justify-between gap-4"
                    >
                        <div className="flex items-center gap-1">
                            <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-muted-foreground">
                                {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}
                            </span>
                        </div>
                        <span className="font-bold text-foreground">
                            {entry.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function MechanicOverviewChart() {
    const [chartType, setChartType] = useState("bar")
    const [dataPeriod, setDataPeriod] = useState("H1 2024")

    const dataPeriods = {
        "All 2024": monthlyData2024,
        "Q1 2024": monthlyData2024.slice(0, 3),
        "Q2 2024": monthlyData2024.slice(3, 6),
        "Q3 2024": monthlyData2024.slice(6, 9),
        "Q4 2024": monthlyData2024.slice(9, 12),
        "H1 2024": monthlyData2024.slice(0, 6),
        "H2 2024": monthlyData2024.slice(6, 12),
    }

    const renderChart = () => {
        const data = dataPeriods[dataPeriod as keyof typeof dataPeriods]

        switch (chartType) {
            case "line":
                return (
                    <LineChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="customers"
                            stroke={chartConfig.customers.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.customers.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="vehicles"
                            stroke={chartConfig.vehicles.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.vehicles.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="appointments"
                            stroke={chartConfig.appointments.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.appointments.color }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                )

            case "area":
                return (
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.customers.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.customers.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorVehicles" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.vehicles.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.vehicles.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.appointments.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.appointments.color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="customers"
                            stroke={chartConfig.customers.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCustomers)"
                        />
                        <Area
                            type="monotone"
                            dataKey="vehicles"
                            stroke={chartConfig.vehicles.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorVehicles)"
                        />
                        <Area
                            type="monotone"
                            dataKey="appointments"
                            stroke={chartConfig.appointments.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorAppointments)"
                        />
                    </AreaChart>
                )

            case "bar":
                return (
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                        />
                        <Bar
                            dataKey="customers"
                            fill={chartConfig.customers.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="vehicles"
                            fill={chartConfig.vehicles.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                        <Bar
                            dataKey="appointments"
                            fill={chartConfig.appointments.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                )

            case "stackedArea":
                return (
                    <AreaChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tick={{ fill: "hsl(var(--muted-foreground))" }}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            dataKey="customers"
                            type="monotone"
                            fill={chartConfig.customers.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.customers.color}
                            stackId="1"
                        />
                        <Area
                            dataKey="vehicles"
                            type="monotone"
                            fill={chartConfig.vehicles.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.vehicles.color}
                            stackId="1"
                        />
                        <Area
                            dataKey="appointments"
                            type="monotone"
                            fill={chartConfig.appointments.color}
                            fillOpacity={0.6}
                            stroke={chartConfig.appointments.color}
                            stackId="1"
                        />
                    </AreaChart>
                )

            default:
                return (
                    <AreaChart data={data}>
                        <Area dataKey="customers" />
                        <Area dataKey="vehicles" />
                        <Area dataKey="appointments" />
                    </AreaChart>
                )
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Mechanic Analytics Overview</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            {chartType === "line" ? "Line" :
                                chartType === "area" ? "Area" :
                                    chartType === "bar" ? "Bar" : "Stacked Area"} Chart showing mechanics performance
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {/* Time period selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-8">
                                    {dataPeriod}
                                    <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {Object.keys(dataPeriods).map((period) => (
                                    <DropdownMenuItem key={period} onClick={() => setDataPeriod(period)}>
                                        {period}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Chart type selector */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                    {chartType === 'line' && <LineChartIcon className="h-4 w-4" />}
                                    {chartType === 'area' && <TrendingUp className="h-4 w-4" />}
                                    {chartType === 'bar' && <BarChart3 className="h-4 w-4" />}
                                    {chartType === 'stackedArea' && <PieChartIcon className="h-4 w-4" />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setChartType("line")}>
                                    <LineChartIcon className="h-4 w-4 mr-2" />
                                    Line Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("area")}>
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Area Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("bar")}>
                                    <BarChart3 className="h-4 w-4 mr-2" />
                                    Bar Chart
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setChartType("stackedArea")}>
                                    <PieChartIcon className="h-4 w-4 mr-2" />
                                    Stacked Area
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[350px] w-full">
                    <ChartContainer config={chartConfig} className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </CardContent>
            {/* <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Growth trend: +15% in customer acquisition <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            Data shown for {dataPeriod}
                        </div>
                    </div>
                </div>
            </CardFooter> */}
        </Card>
    )
}
