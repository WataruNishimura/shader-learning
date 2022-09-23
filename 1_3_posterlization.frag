#version 300 es

precision highp float;
out vec4 fragColor;
uniform float u_time;
uniform vec2 u_resolution;
int channel;

void main(){
  vec2 pos=gl_FragCoord.xy/u_resolution.xy;
  
  vec3[4]col4=vec3[](
    vec3(1.,0.,0.),
    vec3(1.,0.,1.),
    vec3(1.,.5,0.),
    vec3(1.,1.,0.)
  );
  
  float n=5.;// 階層数
  pos*=n;// フラグメント座標範囲を[0,1]区間から[0,n]区間にスケール。
  channel=int(2.*gl_FragCoord.x/u_resolution.x);// ビューポートを２つのチャンネルに分割;
  
  if(channel==0){
    /*
    when pos = 3.2
    floor(pos) = 3
    step(0.5, fract(pos):0.2)
    stepのedge(threshold: 閾値)を0.5に設定することで 0.5 > fract(pos)の際は0を、 0.5 <= fract(pos)の際は1を返す
    */
    pos=floor(pos)+step(.5,fract(pos));
    
  }else{
    float thr = 0.25 * sin(u_time);
    pos = floor(pos) + smoothstep(0.25 + thr, 0.75 - thr, fract(pos));
  }
  
  pos/=n;// フラグメント座標を[0,1]区間に正規化
  
  vec3 col=mix(mix(col4[0],col4[1],pos.x),mix(col4[2],col4[3],pos.x),pos.y);
  
  fragColor=vec4(col,1.);
}