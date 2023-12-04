attribute float aRandom;

uniform float uPixelRatio;
uniform float uTime;

varying float vRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.y = sin(uTime);

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    // gl_PointSize = 50.0 * aRandom * uPixelRatio;
    // gl_PointSize *= (1.0 / - viewPosition.z);
    // gl_Position = projectedPosition;

    gl_Position = projectedPosition;

    gl_PointSize = 20.0 * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vRandom = aRandom;
}