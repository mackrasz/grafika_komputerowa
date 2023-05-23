varying vec3 vNormal;
varying vec3 vDirectionalLightDirection;
varying vec3 vViewPosition;

uniform vec3 directionalLightDirection;

void main() {
    vNormal = normalize(normalMatrix * normal);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vDirectionalLightDirection = (modelViewMatrix * vec4(directionalLightDirection, 0.0)).xyz;

    vViewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;
}