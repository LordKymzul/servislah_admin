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
        revenue: 45000,
    },
    {
        month: "February",
        revenue: 52000,
    },
    {
        month: "March",
        revenue: 61000,
    },
    {
        month: "April",
        revenue: 58000,
    },
    {
        month: "May",
        revenue: 72000,
    },
    {
        month: "June",
        revenue: 85000,
    },
    {
        month: "July",
        revenue: 78000,
    },
    {
        month: "August",
        revenue: 92000,
    },
    {
        month: "September",
        revenue: 88000,
    },
    {
        month: "October",
        revenue: 96000,
    },
    {
        month: "November",
        revenue: 102000,
    },
    {
        month: "December",
        revenue: 115000,
    }
]

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "#047857", // Emerald-700
    },
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
                                {entry.name}
                            </span>
                        </div>
                        <span className="font-bold text-foreground">
                            ${entry.value.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ServiceCenterDetailSalesChart = () => {
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
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke={chartConfig.revenue.color}
                            strokeWidth={2}
                            dot={{ r: 4, strokeWidth: 0, fill: chartConfig.revenue.color }}
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
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.revenue.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.revenue.color} stopOpacity={0.1} />
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
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ stroke: "hsl(var(--muted))", strokeWidth: 1, strokeDasharray: "3 3" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            name="Revenue"
                            stroke={chartConfig.revenue.color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
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
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                        />
                        <Tooltip
                            content={<CustomTooltipContent />}
                            cursor={{ fill: "hsl(var(--muted))", opacity: 0.1 }}
                        />
                        <Bar
                            dataKey="revenue"
                            name="Revenue"
                            fill={chartConfig.revenue.color}
                            radius={[4, 4, 0, 0]}
                            maxBarSize={40}
                        />
                    </BarChart>
                )

            default:
                return (
                    <AreaChart data={data}>
                        <Area dataKey="revenue" />
                    </AreaChart>
                )
        }
    }

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-lg font-bold">Sales Analytics</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            {chartType === "line" ? "Line" :
                                chartType === "area" ? "Area" :
                                    "Bar"} Chart showing revenue performance
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

export default ServiceCenterDetailSalesChart