import prisma from "@/lib/prisma";
import verifyUser from "@/lib/auth/verifyUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, LogIn, LogOut, CheckCircle2 } from "lucide-react";
import { getAuditLogs } from "../actions";

function getActionIcon(action: string) {
    switch (action.toUpperCase()) {
        case "LOGIN": return <LogIn className="w-4 h-4 text-emerald-500" />;
        case "LOGOUT": return <LogOut className="w-4 h-4 text-orange-500" />;
        case "LOGOUT_ALL": return <ShieldAlert className="w-4 h-4 text-red-500" />;
        case "UPDATE": return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
        default: return <Activity className="w-4 h-4 text-primary" />;
    }
}

export default async function ActivityPage() {

    const { data: logs } = await getAuditLogs();
    if (!logs) return <div className="p-8 text-center text-muted-foreground animate-pulse">Unauthorized</div>;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Activity Logs</h1>
                <p className="text-muted-foreground mt-1 text-lg">
                    Monitor your account activity and security events.
                </p>
            </div>

            <Card className="border-primary/10 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/30 border-b">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Recent Events
                    </CardTitle>
                    <CardDescription>
                        A log of the last 30 actions taken on your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/10 hover:bg-muted/10">
                                <TableHead className="w-[180px] pl-6">Action</TableHead>
                                <TableHead>Date &amp; Time</TableHead>
                                <TableHead>Device / Browser</TableHead>
                                <TableHead>IP Address</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {logs.length > 0 ? logs.map((log) => (
                                <TableRow key={log.id} className="group">
                                    <TableCell className="font-medium pl-6">
                                        <div className="flex items-center gap-2">
                                            {getActionIcon(log.action)}
                                            <Badge variant="outline" className="bg-background shadow-xs">
                                                {log.action}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(log.createdAt).toLocaleString(undefined, {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{log.device || "Unknown Device"}</span>
                                            <span className="text-xs text-muted-foreground">{log.browser || "Unknown Browser"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                                            {log.ipAddress || "Unknown IP"}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                        No activity logs found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}