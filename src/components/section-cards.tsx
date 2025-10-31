import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownRight,
  Droplet,
  Thermometer,
  Wind,
  Gauge,
  Cloud,
} from "lucide-react";

const dashboardData = [
  {
    title: "Current Birds",
    description: "Total active flock",
    value: "14,785",
    change: "Stable",
    changeIcon: ArrowUpRight,
    changeColor: "text-green-500",
    footer: "Updated just now",
  },
  {
    title: "Mortalities (Today)",
    description: "Birds lost today",
    value: "32",
    change: "-0.5%",
    changeIcon: ArrowDownRight,
    changeColor: "text-red-500",
    footer: "Lower than last week",
  },
  {
    title: "Mortality Rate",
    description: "Overall batch rate",
    value: "2.1%",
    change: "-0.3%",
    changeIcon: ArrowDownRight,
    changeColor: "text-green-500",
    footer: "Improved from last batch",
  },
  {
    title: "Feed Consumed (Today)",
    description: "Total feed used",
    value: "2,450 kg",
    change: "+3.2%",
    changeIcon: ArrowUpRight,
    changeColor: "text-green-500",
    footer: "Compared to avg. of last batches",
  },
  {
    title: "Water Consumed (Today)",
    description: "Total water used",
    value: "3,850 L",
    change: "+1.4%",
    changeIcon: ArrowUpRight,
    changeColor: "text-green-500",
    footer: "Normal usage level",
  },
  {
    title: "Electricity Usage",
    description: "Energy consumption",
    value: "420 kWh",
    change: "-2.8%",
    changeIcon: ArrowDownRight,
    changeColor: "text-green-500",
    footer: "Efficient compared to average",
  },
  {
    title: "Avg. Bird Weight",
    description: "Average per bird",
    value: "1.85 kg",
    change: "+0.4%",
    changeIcon: ArrowUpRight,
    changeColor: "text-green-500",
    footer: "Higher than expected growth",
  },
  {
    title: "Medicine Used",
    description: "Dosages applied",
    value: "12 doses",
    change: "-10%",
    changeIcon: ArrowDownRight,
    changeColor: "text-green-500",
    footer: "Reduced medication need",
  },
];

export  function SectionCards() {
  return (
    <section className="space-y-8">
      {/* Metrics Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Farm Overview</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardData.map((item, index) => {
            const Icon = item.changeIcon;
            return (
              <Card key={index} className="@container/card">
                <CardHeader>
                  <CardDescription>{item.description}</CardDescription>
                  <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                    {item.value}
                  </CardTitle>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Icon className={`h-4 w-4 ${item.changeColor}`} />
                    {item.change}
                  </Badge>
                </CardHeader>
                <CardFooter className="flex-col items-start text-sm text-muted-foreground">
                  {item.footer}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Environment Status */}
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Environment Status</h2>
        <Card className="@container/card">
          <CardHeader>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-orange-500" />
                <span>Temp: 29°C</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <span>Humidity: 63%</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-gray-500" />
                <span>CO₂: 420 ppm</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-teal-500" />
                <span>O₂: 20.9%</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-yellow-500" />
                <span>Pressure: 1012 hPa</span>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Conditions are within optimal range
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
