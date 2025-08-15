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
    Tooltip,
    Legend
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
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
    {
        month: "January",
        appointments: 45,
        mechanics: 12,
        customers: 150,
        services: 60,
        vehicles: 130
    },
    {
        month: "February",
        appointments: 60,
        mechanics: 15,
        customers: 180,
        services: 75,
        vehicles: 160
    },
    {
        month: "March",
        appointments: 75,
        mechanics: 18,
        customers: 220,
        services: 90,
        vehicles: 200
    },
    {
        month: "April",
        appointments: 90,
        mechanics: 20,
        customers: 250,
        services: 100,
        vehicles: 230
    },
    {
        month: "May",
        appointments: 100,
        mechanics: 22,
        customers: 280,
        services: 110,
        vehicles: 260
    },
    {
        month: "June",
        appointments: 120,
        mechanics: 25,
        customers: 320,
        services: 130,
        vehicles: 300
    },
    {
        month: "July",
        appointments: 110,
        mechanics: 24,
        customers: 300,
        services: 120,
        vehicles: 280
    },
    {
        month: "August",
        appointments: 130,
        mechanics: 28,
        customers: 350,
        services: 140,
        vehicles: 320
    },
    {
        month: "September",
        appointments: 150,
        mechanics: 30,
        customers: 380,
        services: 160,
        vehicles: 350
    },
    {
        month: "October",
        appointments: 170,
        mechanics: 32,
        customers: 420,
        services: 180,
        vehicles: 390
    },
    {
        month: "November",
        appointments: 190,
        mechanics: 35,
        customers: 450,
        services: 200,
        vehicles: 420
    },
    {
        month: "December",
        appointments: 200,
        mechanics: 38,
        customers: 500,
        services: 220,
        vehicles: 450
    }
]

const chartConfig = {
    appointments: {
        label: "Appointments",
        color: "#2563eb", // Blue
    },
    mechanics: {
        label: "Mechanics",
        color: "#16a34a", // Green
    },
    customers: {
        label: "Customers",
        color: "#9333ea", // Purple
    },
    services: {
        label: "Services",
        color: "#ea580c", // Orange
    },
    vehicles: {
        label: "Vehicles",
        color: "#dc2626", // Red
    }
} satisfies ChartConfig

const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-[1fr_auto] gap-2">
                <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {label}
                    </span>
                </div>
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

const ServiceCenterOverviewChart = () => {
    const [chartType, setChartType] = useState("area")
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
                        <Legend />
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                name={config.label}
                                stroke={config.color}
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 0, fill: config.color }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        ))}
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
                            {Object.entries(chartConfig).map(([key, config]) => (
                                <linearGradient key={key} id={`color${key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={config.color} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={config.color} stopOpacity={0.1} />
                                </linearGradient>
                            ))}
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
                        <Legend />
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <Area
                                key={key}
                                type="monotone"
                                dataKey={key}
                                name={config.label}
                                stroke={config.color}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill={`url(#color${key})`}
                            />
                        ))}
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
                        <Legend />
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <Bar
                                key={key}
                                dataKey={key}
                                name={config.label}
                                fill={config.color}
                                radius={[4, 4, 0, 0]}
                                maxBarSize={40}
                            />
                        ))}
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
                        <Legend />
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <Area
                                key={key}
                                dataKey={key}
                                name={config.label}
                                type="monotone"
                                fill={config.color}
                                fillOpacity={0.6}
                                stroke={config.color}
                                stackId="1"
                            />
                        ))}
                    </AreaChart>
                )

            default:
                return (
                    <AreaChart data={data}>
                        {Object.entries(chartConfig).map(([key, config]) => (
                            <Area key={key} dataKey={key} />
                        ))}
                    </AreaChart>
                )
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Service Center Analytics Overview</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            {chartType === "line" ? "Line" :
                                chartType === "area" ? "Area" :
                                    chartType === "bar" ? "Bar" : "Stacked Area"} Chart showing service center performance metrics
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
        </Card>
    )
}

export default ServiceCenterOverviewChart