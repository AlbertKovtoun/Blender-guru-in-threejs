uniform vec3 uColor1;
uniform vec3 uColor2;

varying float vRandom;

void main()
{
	//Normal circles
    // vec2 xy = gl_PointCoord.xy - vec2(0.5);
    // float ll = length(xy);
    // float alpha = step(ll, 0.5);

	float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
	//Fading stars
	// float alpha = 0.05 / distanceToCenter - 0.1;

	//Fading circles
	float alpha = 1.0 - smoothstep(0.2, 0.5, distanceToCenter);
	alpha = alpha * 1.0 * vRandom;

	vec3 color;

	color = uColor1;

    gl_FragColor = vec4(color, alpha);
    // gl_FragColor = vec4(color, 1.0);
}