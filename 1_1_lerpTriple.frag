#version 300 es

precision highp float;
out vec4 fragColor;
uniform vec2 u_resolution;

void main(){
  
  vec2 pos=gl_FragCoord.xy/u_resolution.xy;
  
  vec3[3]col3=vec3[](
    vec3(1.,0.,0.),
    vec3(0.,0.,1.),
    vec3(0.,1.,0.)
  );// 3x3 color matrix
  
  pos.x*=2.;
  
  int ind=int(pos.x);
  /*
  0 <= ind < 1 : mix(col3[0], col3[1])
  1 <= ind < 2 : mix(col3[1], col3[2])
  */
  vec3 col=mix(col3[ind],col3[ind+1],fract(pos.x)); // 
  
  fragColor=vec4(col,1.);
}