varying vec3 vColor;

uniform vec3 directionalLightDirection;

uniform vec3 ambientLightColor;
uniform vec3 directionalLightColor;
uniform vec3 specularLightColor;


void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vec3 tr_directionalLightDirection = (modelViewMatrix * vec4(directionalLightDirection, 0.0)).xyz;
    vec3 viewPosition = -(modelViewMatrix * vec4(position, 1.0)).xyz;

    // Calculate the ambient light contribution
    vec3 ambient = ambientLightColor;

    // Calculate the directional light contribution
    vec3 normal = normalize(normal);
    vec3 lightDirection = normalize(tr_directionalLightDirection);
    float diffuseFactor = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = directionalLightColor * diffuseFactor;

    // Calculate the specular reflection
    vec3 viewDirection = normalize(viewPosition);
    vec3 reflectionDirection = reflect(-lightDirection, normal);
    float specularFactor = pow(max(dot(reflectionDirection, viewDirection), 0.0), 10.0);
    vec3 specular = specularLightColor * specularFactor;


    // Calculate the final color
    vColor = ambient + diffuse + specular;
}