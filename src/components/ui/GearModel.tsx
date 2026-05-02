"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { vertexShader, fragmentShader, createGear } from "@/shaders/gear";

export default function GearModel({ className }: { className?: string }) {
    const mountRef = useRef<HTMLDivElement>(null);

    const SETTINGS = {
        position: { x: 2.5, y: 0, z: 0 },
        rotation: { y: -1.2 },
        gear: {
            teeth: 12,
            innerRadius: 0.7,
            outerRadius: 1.4,
            toothWidth: 0.15,
            toothHeight: 0.20,
            depth: 0.7,
            material: {
                color: 0xffffff,
                wireframe: true,
                transparent: true,
                opacity: 0.1,
            }
        },
        particles: {
            count: 5000,
            spread: 0.05,
            cycleDuration: 4,
            pauseDuration: 2,
            material: {
                transparent: true,
                depthWrite: false,
                uniforms: {
                    uTime: { value: 0 },
                    uSize: { value: 10.0 },
                    uColor: { value: new THREE.Color(0xffffff) },
                    uOpacity: { value: 0.8 },
                    uFloatSpeed: { value: 1.0 },
                    uFloatAmplitude: { value: 0.5 },
                    uVibrationFactor: { value: 0 }
                },
                vertexShader: vertexShader,
                fragmentShader: fragmentShader
            }
        },
        animation: {
            speed: 0.5,
            stepAngle: Math.PI / 6,
            smoothness: 0.1,
        },
        renderer: {
            antialias: true,
            alpha: true,
            powerPreference: "high-performance" as const,
        },
    };

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer(SETTINGS.renderer);
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // GEOMETRY
        const gearGeo = createGear(SETTINGS.gear);

        const sampler = new MeshSurfaceSampler(new THREE.Mesh(gearGeo)).build();

        const posArray = new Float32Array(SETTINGS.particles.count * 3);
        const randoms = new Float32Array(SETTINGS.particles.count);
        const tempPos = new THREE.Vector3();
        const tempNormal = new THREE.Vector3();

        for (let i = 0; i < SETTINGS.particles.count; i++) {
            sampler.sample(tempPos, tempNormal);
            tempPos.addScaledVector(tempNormal, Math.random() * SETTINGS.particles.spread);
            posArray[i * 3] = tempPos.x;
            posArray[i * 3 + 1] = tempPos.y;
            posArray[i * 3 + 2] = tempPos.z;
            randoms[i] = Math.random() * 10.0;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
        particlesGeometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

        const particlesMaterial = new THREE.ShaderMaterial(SETTINGS.particles.material);
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);

        // WIREFRAME
        const wireMaterial = new THREE.MeshBasicMaterial(SETTINGS.gear.material);
        const gearMesh = new THREE.Mesh(gearGeo, wireMaterial);

        const gearGroup = new THREE.Group();
        gearGroup.add(particles);
        gearGroup.add(gearMesh);
        gearGroup.position.set(SETTINGS.position.x, SETTINGS.position.y, SETTINGS.position.z);
        gearGroup.rotation.y = SETTINGS.rotation.y;
        scene.add(gearGroup);

        // ANIMATION
        let startTime = performance.now();
        function animate() {
            requestAnimationFrame(animate);
            const elapsed = (performance.now() - startTime) / 1000;

            const step = Math.floor(elapsed * SETTINGS.animation.speed);
            const targetRotation = step * SETTINGS.animation.stepAngle;
            gearGroup.rotation.z += (targetRotation - gearGroup.rotation.z) * SETTINGS.animation.smoothness;

            const totalCycle = SETTINGS.particles.cycleDuration + SETTINGS.particles.pauseDuration;
            const timeInCycle = elapsed % totalCycle;
            let vFactor = 0;
            if (timeInCycle < SETTINGS.particles.cycleDuration) {
                vFactor = Math.sin((Math.PI * timeInCycle) / SETTINGS.particles.cycleDuration);
            }

            particlesMaterial.uniforms.uTime.value = elapsed;
            particlesMaterial.uniforms.uVibrationFactor.value = vFactor;

            renderer.render(scene, camera);
        }
        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} className={`absolute inset-0 pointer-events-none ${className || ""}`} />;
}