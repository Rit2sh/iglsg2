// app/dashboard/submissions/[id]/_components/FileManagement.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileIcon, Download, Eye, ExternalLink, ShieldAlert } from "lucide-react";
import { format } from "date-fns";

export default function FileManagement({ files }: { files: any[] }) {
    return (
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="bg-muted/30 border-b pb-4">
                <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                    <FileIcon size={16} /> Manuscript Files
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {files.map((file) => (
                        <div
                            key={file.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border bg-slate-50/50 dark:bg-slate-900/50 group transition-all hover:border-primary/30"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                                    <FileIcon className="text-primary" size={24} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px] md:max-w-md">
                                        {file.fileName}
                                    </p>
                                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium uppercase tracking-wider">
                                        <span>{file.fileType.split("/")[1]}</span>
                                        <span>•</span>
                                        <span>{(file.fileSize / 1024).toFixed(1)} KB</span>
                                        <span>•</span>
                                        <span className="text-primary font-bold">{file.stage}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-4 md:mt-0">
                                <Button variant="ghost" size="sm" className="h-9 gap-2 rounded-lg" asChild>
                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                        <Eye size={16} /> Preview
                                    </a>
                                </Button>
                                <Button variant="outline" size="sm" className="h-9 gap-2 rounded-lg" asChild>
                                    <a href={file.url} download={file.fileName}>
                                        <Download size={16} /> Download
                                    </a>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Compliance Warning */}
                <div className="mt-6 flex gap-3 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/50">
                    <ShieldAlert className="text-amber-600 shrink-0" size={20} />
                    <p className="text-xs text-amber-700 leading-relaxed font-medium">
                        <strong>Mandatory Scrutiny:</strong> Verify that the manuscript is properly anonymized. There must be no mention of the author's name, institution, or contact details within the file for double-blind review.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}