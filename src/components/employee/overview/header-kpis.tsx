import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCheck,
  Wallet,
  AlertTriangle,
  TrendingUp,
  Smile,
} from "lucide-react";
import React from "react";

import { IconType } from "react-icons/lib";
import CountUp from "../../effects/count-up";

export default function CardStats({
  data,
}: {
  data: {
    title: string;
    value: string;
    description: string;
  }[];
}) {
  const icons = [Users, UserCheck, Wallet, AlertTriangle, TrendingUp, Smile];

  return (
    <div className="w-full flex justify-center">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {data.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {icons[index % icons.length] &&
                React.createElement(icons[index % icons.length] as IconType, {
                  className: "h-4 w-4 text-gray-500",
                })}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {index === 2 && "৳"}
                <CountUp
                  from={0}
                  to={parseInt(stat.value, 10)}
                  separator=","
                  direction="up"
                  duration={1}
                  className="count-up-text"
                />
              </div>
              <CardDescription>{stat.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
