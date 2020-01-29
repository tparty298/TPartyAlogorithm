#version 410


uniform float time;
uniform vec2 resolution;

out vec4 fragColor;

vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

const float PI = acos(-1.);

void main( void ) {
	vec2 position = ( gl_FragCoord.xy / min(resolution.x, resolution.y)) ;

    float sum = 0;

    for (int i =0; i < 10; i++) {
        vec2 st = position + vec2(0.0005) * i;
        float main_wave = sin(st.x * PI * 93+1) + (1.0- smoothstep(0.,1.,mod(st.x*93,2.0)));

        // main_wave = 2./PI*atan(1./tan(st.x*PI/0.02));
        float noised_wave = cnoise(vec2(st.x, 1.0) * 100.)* .05+ main_wave * 0.05;
        sum += plot(st, noised_wave +0.835);
    }

    
	float top_bar = smoothstep(0.1,0.6, sum/3.) * step(0.1025, position.x) * step(position.x, .885);


	vec2 tr = step(vec2(0.4225,0.34),1.0-position);
	vec2 bl = step(vec2(0.4225,0.025),position);
	float center_bar = bl.x * bl.y * tr.x * tr.y;
	
	float gray = top_bar + center_bar;
	
	vec3 color = vec3(1.0 - gray);

	fragColor = vec4( gray, 0.0,0., 0.4 );
	fragColor = vec4( color, 1.0);
	// fragColor = vec4( color, .0);
}
