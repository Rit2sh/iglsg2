"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp, FileText, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
    onChange: (file: File | null) => void;
    value?: File | null;
}

export function FileUpload({ onChange, value }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(value || null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        onChange(selectedFile);
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxFiles: 1,
        multiple: false
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
        onChange(null);
    };

    return (
        <div
            {...getRootProps()}
            className={cn(
                "relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center",
                isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 bg-background",
                file ? "border-green-500 bg-green-50/10" : ""
            )}
        >
            <input {...getInputProps()} />

            {file ? (
                <div className="flex items-center gap-4 w-full max-w-xs p-4 bg-background border rounded-lg shadow-sm">
                    <div className="p-2 bg-green-100 text-green-600 rounded">
                        <CheckCircle2 size={24} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <button onClick={removeFile} className="p-1 hover:bg-muted rounded-full">
                        <X size={16} className="text-muted-foreground" />
                    </button>
                </div>
            ) : (
                <>
                    <div className="p-4 bg-muted rounded-full mb-4">
                        <FileUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h4 className="text-sm font-semibold italic">Click or drag manuscript here</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                        Accepted formats: DOCX (Max 10MB)
                    </p>
                </>
            )}
        </div>
    );
}