import * as THREE from "three";

export function createGear(config: {
    teeth: number;
    innerRadius: number;
    outerRadius: number;
    toothWidth: number;
    toothHeight: number;
    depth: number;
}) {
    const shape = new THREE.Shape();
    const step = (Math.PI * 2) / config.teeth;

    for (let i = 0; i < config.teeth; i++) {
        const angle = i * step;
        const a1 = angle - config.toothWidth;
        const a2 = angle + config.toothWidth;

        const x1 = Math.cos(a1) * config.outerRadius;
        const y1 = Math.sin(a1) * config.outerRadius;
        const x2 = Math.cos(a2) * config.outerRadius;
        const y2 = Math.sin(a2) * config.outerRadius;

        const x3 = Math.cos(angle + config.toothWidth) * (config.outerRadius + config.toothHeight);
        const y3 = Math.sin(angle + config.toothWidth) * (config.outerRadius + config.toothHeight);
        const x4 = Math.cos(angle - config.toothWidth) * (config.outerRadius + config.toothHeight);
        const y4 = Math.sin(angle - config.toothWidth) * (config.outerRadius + config.toothHeight);

        if (i === 0) shape.moveTo(x1, y1);

        shape.lineTo(x1, y1);
        shape.lineTo(x4, y4);
        shape.lineTo(x3, y3);
        shape.lineTo(x2, y2);
    }

    shape.closePath();

    const hole = new THREE.Path();
    hole.absarc(0, 0, config.innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);

    const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: config.depth,
        bevelEnabled: false,
    });

    geometry.center();
    return geometry;
}
