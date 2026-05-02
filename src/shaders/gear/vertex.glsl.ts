export const vertexShader = `
uniform float uTime;
uniform float uSize;
uniform float uFloatSpeed;
uniform float uFloatAmplitude;
uniform float uVibrationFactor;
attribute float aRandom;
varying float vOpacity;

void main() {
    vec3 pos = position;
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
