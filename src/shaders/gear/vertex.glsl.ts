export const vertexShader = `
uniform float uTime;
uniform float uSize;
uniform float uFloatSpeed;
uniform float uFloatAmplitude;
uniform float uVibrationFactor;
uniform vec3 uMouse;
uniform float uRepulsionRadius;
uniform float uRepulsionStrength;
attribute float aRandom;
varying float vOpacity;

void main() {
    vec3 pos = position;
    
    // 1. Efecto de Repulsión
    float dist = distance(pos, uMouse);
    if (dist < uRepulsionRadius) {
        // Calculamos la dirección opuesta al ratón
        vec3 dir = normalize(pos - uMouse);
        // La fuerza decae con la distancia
        float power = 1.0 - (dist / uRepulsionRadius);
        // Aplicamos el desplazamiento con un poco de aleatoriedad para que no sea perfecto
        pos += dir * power * uRepulsionStrength * (aRandom * 0.1 + 0.9);
    }

    // 2. Movimiento orgánico base (flotación)
    float time = uTime * uFloatSpeed + aRandom;
    float offset = sin(time) * uFloatAmplitude * uVibrationFactor;
    
    pos.x += offset * 0.3;
    pos.y += offset * 0.3;
    pos.z += offset;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = 1.0;
}
`;
export default vertexShader;
