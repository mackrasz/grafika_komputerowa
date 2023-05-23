varying vec3 vNormal;
varying vec3 vDirectionalLightDirection;

uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;

void main() {
    // Calculate the ambient light contribution
    vec3 ambient = ambientLightColor;

    // Calculate the directional light contribution
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(vDirectionalLightDirection);
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = directionalLightColor * diffuseFactor;

    // Calculate the final color
    vec3 finalColor = ambient + diffuse;

    // Set the fragment color
    gl_FragColor = vec4(finalColor, 1.0);
}