varying vec3 vNormal;

uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;
uniform vec3 directionalLightDirection;

void main() {
    // Calculate the ambient light contribution
    vec3 ambient = ambientLightColor;

    // Calculate the directional light contribution
    vec3 normal = vNormal;
    vec3 lightDirection = directionalLightDirection;
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = directionalLightColor * diffuseFactor;

    // Calculate the final color
    vec3 finalColor = ambient + diffuse;

    // Set the fragment color
    gl_FragColor = vec4(finalColor, 1.0);
}