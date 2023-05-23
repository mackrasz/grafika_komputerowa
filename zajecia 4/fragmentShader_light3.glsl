varying vec3 vNormal;
varying vec3 vDirectionalLightDirection;
varying vec3 vViewPosition;

uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;
uniform vec3 specularLightColor;


void main() {
    // Calculate the ambient light contribution
    vec3 ambient = ambientLightColor;

    // Calculate the directional light contribution
    vec3 normal = normalize(vNormal);
    vec3 lightDirection = normalize(vDirectionalLightDirection);
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = directionalLightColor * diffuseFactor;

    // Calculate the specular reflection
    vec3 viewDirection = normalize(vViewPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float specularFactor = pow(max(dot(reflectionDirection, viewDirection), 0.0), 10.0);
    vec3 specular = specularLightColor * specularFactor;


    // Calculate the final color
    vec3 finalColor = ambient + diffuse + specular;

    // Set the fragment color
    gl_FragColor = vec4(finalColor, 1.0);
}