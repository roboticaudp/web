"use client";
import { useRef } from "react";
import { useGearScene } from "@/hooks/use-gear-scene";

export function GearModel({ className }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null);
    useGearScene(mountRef);

    return <div ref={mountRef} className={`absolute inset-0 pointer-events-none ${className || ""}`} />;
}