#version 300 es

precision highp float;
out vec4 fragColor;
// Viewport Resolution
uniform vec2 u_resolution;

void main(){
  
  vec2 pos=gl_FragCoord.xy/u_resolution.xy;

  // 関数はvec4で引数が3つだ、posがVec2のため、posにx,yの２変数が渡されている
  fragColor=vec4(1.,pos,1);
}