// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Trophy, AlertTriangle } from "lucide-react";

// type EmployeePerformance = {
//   id: string;
//   name: string;
//   avatarUrl?: string;
//   role: string;
//   attendanceRate: number;
//   taskCompletion: number;
//   feedbackScore: number;
//   penalties: number;
//   performanceScore: number;
// };

// export function PerformanceLeaderboard({ data }: { data: EmployeePerformance[] }) {
//   const sorted = [...data].sort((a, b) => b.performanceScore - a.performanceScore);
//   const topPerformers = sorted.slice(0, 5);
//   const lowPerformers = sorted.slice(-5).reverse();

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Top Performers */}
//       <Card className="border-green-500/30">
//         <CardHeader className="flex items-center gap-2">
//           <Trophy className="text-yellow-500" />
//           <CardTitle>Top Performers</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {topPerformers.map((emp, idx) => (
//             <div key={emp.id} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={emp.avatarUrl} />
//                   <AvatarFallback>{emp.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{emp.name}</p>
//                   <p className="text-xs text-muted-foreground">{emp.role}</p>
//                 </div>
//               </div>
//               <div className="w-32">
//                 <Progress value={emp.performanceScore} className="h-2" />
//                 <p className="text-xs text-right mt-1 text-muted-foreground">{emp.performanceScore}%</p>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Needs Improvement */}
//       <Card className="border-red-500/30">
//         <CardHeader className="flex items-center gap-2">
//           <AlertTriangle className="text-red-500" />
//           <CardTitle>Needs Improvement</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {lowPerformers.map((emp) => (
//             <div key={emp.id} className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src={emp.avatarUrl} />
//                   <AvatarFallback>{emp.name[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">{emp.name}</p>
//                   <p className="text-xs text-muted-foreground">{emp.role}</p>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <span className="text-xs text-muted-foreground">Score: {emp.performanceScore}%</span>
//                 {emp.penalties > 0 && (
//                   <span className="text-[10px] text-red-500 mt-1">
//                     {emp.penalties} penalties
//                   </span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type EmployeePerformance = {
  id: string;
  name: string;
  avatarUrl?: string;
  role: string;
  performanceScore: number;
};

export function PerformanceSnapshot({ data }: { data: EmployeePerformance[] }) {
  const sorted = [...data].sort(
    (a, b) => b.performanceScore - a.performanceScore
  );
  const topPerformers = sorted.slice(0, 5);
  const lowPerformers = sorted.slice(-5).reverse();

  return (
    <Card className="border-border/50">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Performance Snapshot</CardTitle>
        </div>
        <Link href="/employee/performance">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1 text-green-600 mb-2">
            Top Performers
          </h3>
          <div className="space-y-3">
            {topPerformers.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={emp.avatarUrl} />
                    <AvatarFallback>{emp.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <div className="w-28">
                  <Progress value={emp.performanceScore} className="h-2 [&>div]:!bg-green-500" />
                  <p className="text-xs text-right text-muted-foreground mt-1">
                    {emp.performanceScore}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Needs Improvement */}
        <div>
          <h3 className="text-sm font-semibold flex items-center gap-1 text-red-600 mb-2">
            Needs Improvement
          </h3>
          <div className="space-y-3">
            {lowPerformers.map((emp) => (
              <div key={emp.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={emp.avatarUrl} />
                    <AvatarFallback>{emp.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium leading-none">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.role}</p>
                  </div>
                </div>
                <div className="w-28">
                  <Progress
                    value={emp.performanceScore}
                    className="h-2 [&>div]:!bg-red-500"
                  />
                  <p className="text-xs text-right text-muted-foreground mt-1">
                    {emp.performanceScore}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        Data from latest performance report (auto-updated monthly)
      </CardFooter>
    </Card>
  );
}
