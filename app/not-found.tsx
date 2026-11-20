import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden bg-background">
            {/* Background glowing effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
            <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

            <div className="max-w-2xl w-full text-center space-y-8 z-10">

                {/* Animated Icon */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
                        <div className="relative bg-background border border-border/50 p-6 rounded-3xl shadow-xl">
                            <Compass className="w-16 h-16 text-primary animate-[spin_4s_linear_infinite]" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-br from-foreground to-foreground/50">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                        Lost in the digital void
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
                        The page you're searching for seems to have drifted away. Let's get you back on track to exploring our content.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/25"
                    >
                        <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                {/* Status Indicator */}
                <div className="mt-16 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                        Connections are stable. It's just a missing link.
                    </p>
                </div>
            </div>
        </div>
    );
}
