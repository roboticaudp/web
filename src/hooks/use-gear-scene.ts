import { useEffect, useRef } from "react";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { vertexShader, fragmentShader, createGear } from "@/shaders/gear";

const SETTINGS = {
    position: new THREE.Vector3(2.5, 0, 0),
    rotation: new THREE.Euler(0, -1.2, 0),
    gear: {
        teeth: 12,
        innerRadius: 0.7,
        outerRadius: 1.4,
        toothWidth: 0.15,
        toothHeight: 0.20,
        depth: 0.7,
        material: {
            color: new THREE.Color(0xD32F2F),
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
        repulsionRadius: 1.25,
        repulsionStrength: 0.8,
        material: {
            transparent: true,
            depthWrite: false,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 10.0 },
                uColor: { value: new THREE.Color(0xD32F2F) },
                uOpacity: { value: 0.8 },
                uFloatSpeed: { value: 1.0 },
                uFloatAmplitude: { value: 0.5 },
                uVibrationFactor: { value: 0 },
                uMouse: { value: new THREE.Vector3(0, 0, 0) },
                uRepulsionRadius: { value: 1.25 },
                uRepulsionStrength: { value: 0.8 }
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        }
    },
    animation: {
        speed: 0.5,
        stepAngle: Math.PI / 6,
        smoothness: 0.1,
        mouseLerp: 0.1
    },
    renderer: {
        antialias: true,
        alpha: true,
        powerPreference: "high-performance" as const,
    },
};

export function useGearScene(mountRef: React.RefObject<HTMLDivElement | null>) {
    const mouse = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));
    const mouseWorld = useRef(new THREE.Vector3(0, 0, 0));
    const raycaster = useRef(new THREE.Raycaster());
    const isVisible = useRef(true);
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer(SETTINGS.renderer);
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        const gearGeo = createGear(SETTINGS.gear);
        const sampler = new MeshSurfaceSampler(new THREE.Mesh(gearGeo)).build();

        const particlePositionsBuffer = new Float32Array(SETTINGS.particles.count * 3);
        const particleRandomSeed = new Float32Array(SETTINGS.particles.count);
        const temporaryParticlePosition = new THREE.Vector3();
        const temporaryParticleNormal = new THREE.Vector3();

        for (let i = 0; i < SETTINGS.particles.count; i++) {
            sampler.sample(temporaryParticlePosition, temporaryParticleNormal);
            temporaryParticlePosition.addScaledVector(temporaryParticleNormal, Math.random() * SETTINGS.particles.spread);
            particlePositionsBuffer[i * 3] = temporaryParticlePosition.x;
            particlePositionsBuffer[i * 3 + 1] = temporaryParticlePosition.y;
            particlePositionsBuffer[i * 3 + 2] = temporaryParticlePosition.z;
            particleRandomSeed[i] = Math.random() * 10.0;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositionsBuffer, 3));
        particlesGeometry.setAttribute("aRandom", new THREE.BufferAttribute(particleRandomSeed, 1));

        const particlesMaterial = new THREE.ShaderMaterial(SETTINGS.particles.material);
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);

        const wireMaterial = new THREE.MeshBasicMaterial(SETTINGS.gear.material);
        const gearMesh = new THREE.Mesh(gearGeo, wireMaterial);

        const gearGroup = new THREE.Group();
        gearGroup.add(particles);
        gearGroup.add(gearMesh);
        gearGroup.position.set(SETTINGS.position.x, SETTINGS.position.y, SETTINGS.position.z);
        gearGroup.rotation.y = SETTINGS.rotation.y;
        scene.add(gearGroup);

        const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

        const handleMouseMove = (event: MouseEvent) => {
            targetMouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const timer = new THREE.Timer();
        let accumulatedTime = 0;
        const localMouseVector = new THREE.Vector3();
        const totalCycle = SETTINGS.particles.cycleDuration + SETTINGS.particles.pauseDuration;

        function animate() {
            if (isVisible.current) {
                timer.update();
                let delta = timer.getDelta();
                if (delta > 0.1) delta = 0;
                accumulatedTime += delta;

                mouse.current.lerp(targetMouse.current, SETTINGS.animation.mouseLerp);

                const step = Math.floor(accumulatedTime * SETTINGS.animation.speed);
                const targetRotation = step * SETTINGS.animation.stepAngle;

                gearGroup.rotation.z = THREE.MathUtils.lerp(
                    gearGroup.rotation.z,
                    targetRotation,
                    SETTINGS.animation.smoothness
                );

                gearGroup.rotation.x = mouse.current.y * 0.15;
                gearGroup.rotation.y = SETTINGS.rotation.y + mouse.current.x * 0.15;

                raycaster.current.setFromCamera(mouse.current, camera);
                raycaster.current.ray.intersectPlane(mousePlane, mouseWorld.current);
                
                localMouseVector.copy(mouseWorld.current);
                gearGroup.worldToLocal(localMouseVector);

                const timeInCycle = accumulatedTime % totalCycle;
                let vibrationFactor = 0;
                if (timeInCycle < SETTINGS.particles.cycleDuration) {
                    vibrationFactor = Math.sin((Math.PI * timeInCycle) / SETTINGS.particles.cycleDuration);
                }

                particlesMaterial.uniforms.uTime.value = accumulatedTime;
                particlesMaterial.uniforms.uVibrationFactor.value = vibrationFactor;
                particlesMaterial.uniforms.uMouse.value.copy(localMouseVector);

                renderer.render(scene, camera);
            }
            
            animationFrameId.current = requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            if (!mountRef.current) return;
            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]) {
                    isVisible.current = entries[0].isIntersecting;
                    if (entries[0].isIntersecting) {
                        timer.update();
                    }
                }
            },
            { threshold: 0 }
        );

        observer.observe(mountRef.current);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
            observer.disconnect();

            gearGeo.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            wireMaterial.dispose();
            renderer.dispose();

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, [mountRef]);
}
