var e=.38,t=.16,n=.24,r=.62;function i(e,t,n){let r=e.createShader(t);return r===null?null:(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)===!0?r:(e.deleteShader(r),null))}function a(e){let t=i(e,e.VERTEX_SHADER,`
precision highp float;

attribute float aT;
attribute float aLado;
attribute float aFaixa;

uniform float uProg;
uniform float uTempo;
uniform float uFaixas;
uniform float uEspessura;
uniform vec2  uEscala;
uniform vec2  uMeia;

varying float vT;
varying float vLado;
varying float vFora;

const float PI = 3.14159265;

void main() {
  float p = uProg;

  /* Contido, o gesto tambem e mais curto. */
  float alonga = mix(0.86, 1.0, p);
  float y = mix(-1.0, 1.0, aT) * alonga;

  float s = uFaixas > 1.0 ? aFaixa / (uFaixas - 1.0) : 0.5;
  float centro = s - 0.5;

  /* Curta e nervosa no comeco, longa e lenta no fim. */
  float amp = mix(0.012, 0.400, p);
  float k   = mix(13.00, 2.100, p);
  float w   = mix(7.500, 1.150, p);

  /* Separacao ao quadrado, fator 1.15: nota 3. */
  float abre = p * p;
  float fase = centro * abre * 1.15;

  /* Preso nas duas pontas quando contido, solto no topo quando livre. */
  float preso = sin(PI * aT);
  float solto = pow(aT, 0.50);
  float env = mix(preso, solto, 0.72 * smoothstep(0.18, 0.95, p));

  float onda = sin(k * y + w * uTempo + fase)
             + 0.30 * p * sin(k * 1.9 * y - w * 0.62 * uTempo + fase * 1.7);
  float x = amp * env * onda;

  /* Derivada analitica em y: nota 5. */
  float dx = amp * env * (
        k * cos(k * y + w * uTempo + fase)
      + 0.30 * p * k * 1.9 * cos(k * 1.9 * y - w * 0.62 * uTempo + fase * 1.7)
  );

  /* Normal em pixel, nao em recorte: nota 6. */
  vec2 base = vec2(x * uEscala.x, y * uEscala.y);
  vec2 tang = normalize(vec2(dx * uEscala.x * uMeia.x, uEscala.y * uMeia.y));
  vec2 norm = vec2(tang.y, -tang.x);

  float perfil = 0.30 + 0.70 * sin(PI * aT);
  float meia = uEspessura * mix(1.00, 0.80, p) * perfil;

  /* aLado da a LARGURA da fita: nota 1. */
  vec2 pos = base + aLado * vec2(norm.x * meia / uMeia.x, norm.y * meia / uMeia.y);

  vT = aT;
  vLado = aLado;
  vFora = abs(centro) * 2.0;

  gl_Position = vec4(pos.x, pos.y, 0.0, 1.0);
}
`),n=i(e,e.FRAGMENT_SHADER,`
precision mediump float;

varying float vT;
varying float vLado;
varying float vFora;

/* highp a mao: nota 2. */
uniform highp float uProg;
uniform float uAlfa;
uniform vec3  uCorNucleo;
uniform vec3  uCorBorda;

const float PI = 3.14159265;

void main() {
  /* Nucleo fino, queda suave ate a borda da fita. */
  float corpo = pow(max(0.0, 1.0 - abs(vLado)), 2.6);

  /* As duas pontas somem: a fita nao encosta na borda do palco. */
  float pontas = sin(PI * vT);
  pontas *= pontas;

  float a = corpo * pontas;

  /* Quem esta longe do centro do feixe e mais discreto. */
  a *= mix(1.0, 0.34, vFora);

  /* No repouso so existe a fita do MEIO: nota 4. */
  float extra = step(0.02, vFora);
  a *= mix(1.0, smoothstep(0.03, 0.42, uProg), extra);

  vec3 cor = mix(uCorBorda, uCorNucleo, corpo * 0.75 + 0.25);

  /* Pre-multiplicado, para a equacao MAX: nota 7. */
  gl_FragColor = vec4(cor, 1.0) * (a * uAlfa);
}
`);if(t===null||n===null)return null;let r=e.createProgram();return r===null?null:(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.deleteShader(t),e.deleteShader(n),e.getProgramParameter(r,e.LINK_STATUS)===!0?r:(e.deleteProgram(r),null))}function o(e,t,n){return e<t?t:e>n?n:e}function s(i){let s=i.querySelector(`[data-cena-a-tela]`);if(!(s instanceof HTMLCanvasElement))return null;let c=s,l={alpha:!0,antialias:!0,depth:!1,stencil:!1,premultipliedAlpha:!0,powerPreference:`low-power`},d=c.getContext(`webgl`,l)??c.getContext(`experimental-webgl`,l);if(d===null||!(`createShader`in d))return c.remove(),null;let p=d;if(p.isContextLost())return null;let m=a(p);if(m===null)return c.remove(),null;let h=new Float32Array(5082),g=0;for(let e=0;e<7;e+=1)for(let t=0;t<=120;t+=1){let n=t/120;h[g]=n,h[g+1]=-1,h[g+2]=e,h[g+3]=n,h[g+4]=1,h[g+5]=e,g+=6}let _=new Uint16Array(5040),v=0;for(let e=0;e<7;e+=1){let t=e*242;for(let e=0;e<120;e+=1){let n=t+e*2;_[v]=n,_[v+1]=n+1,_[v+2]=n+2,_[v+3]=n+1,_[v+4]=n+3,_[v+5]=n+2,v+=6}}let y=p.createBuffer(),b=p.createBuffer();if(y===null||b===null)return c.remove(),null;p.bindBuffer(p.ARRAY_BUFFER,y),p.bufferData(p.ARRAY_BUFFER,h,p.STATIC_DRAW),p.bindBuffer(p.ELEMENT_ARRAY_BUFFER,b),p.bufferData(p.ELEMENT_ARRAY_BUFFER,_,p.STATIC_DRAW),p.useProgram(m);let x=3*Float32Array.BYTES_PER_ELEMENT,S=p.getAttribLocation(m,`aT`),C=p.getAttribLocation(m,`aLado`),w=p.getAttribLocation(m,`aFaixa`);p.enableVertexAttribArray(S),p.vertexAttribPointer(S,1,p.FLOAT,!1,x,0),p.enableVertexAttribArray(C),p.vertexAttribPointer(C,1,p.FLOAT,!1,x,4),p.enableVertexAttribArray(w),p.vertexAttribPointer(w,1,p.FLOAT,!1,x,8);let T=p.getUniformLocation(m,`uProg`),E=p.getUniformLocation(m,`uTempo`),D=p.getUniformLocation(m,`uFaixas`),O=p.getUniformLocation(m,`uEspessura`),k=p.getUniformLocation(m,`uEscala`),A=p.getUniformLocation(m,`uMeia`),ee=p.getUniformLocation(m,`uAlfa`),te=p.getUniformLocation(m,`uCorNucleo`),j=p.getUniformLocation(m,`uCorBorda`);p.uniform1f(D,7),p.uniform3f(te,.2196,.7412,.9725),p.uniform3f(j,.0863,.4078,.8902),p.disable(p.DEPTH_TEST),p.enable(p.BLEND);let M=p.getExtension(`EXT_blend_minmax`),N=M===null?t:e;M!==null&&p.blendEquation(M.MAX_EXT),p.blendFunc(p.ONE,p.ONE_MINUS_SRC_ALPHA),p.clearColor(0,0,0,0);function P(){let e=c.getBoundingClientRect(),t=window.devicePixelRatio>0?window.devicePixelRatio:1,n=Math.min(t,2),r=Math.max(1,Math.round(e.width*n)),i=Math.max(1,Math.round(e.height*n));(c.width!==r||c.height!==i)&&(c.width=r,c.height=i);let a=c.width,s=c.height;p.viewport(0,0,a,s);let l=a/s,u=.8,d=u*o(1/l,1.3,2);p.uniform2f(k,d,u),p.uniform2f(A,a/2,s/2),p.uniform1f(O,5.8*n)}let F=0,I=0;function L(){let e=i.getBoundingClientRect();F=e.top+window.scrollY,I=e.height}function R(){let e=I-window.innerHeight;return e<=0?+(window.scrollY>=F):o((window.scrollY-F)/e,0,1)}function z(e,t,n){p.uniform1f(T,e),p.uniform1f(E,t),p.uniform1f(ee,n),p.clear(p.COLOR_BUFFER_BIT),p.drawElements(p.TRIANGLES,_.length,p.UNSIGNED_SHORT,0)}P(),L();let B=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,V=M===null?n*t/e:n,H=!0,U=0,W=!0,G=0,K=0,q=!1,J=typeof ResizeObserver==`function`?new ResizeObserver(()=>{P(),L(),B&&z(r,0,V)}):null;J!==null&&(J.observe(c),J.observe(i));let Y=typeof IntersectionObserver==`function`?new IntersectionObserver(e=>{for(let t of e)W=t.isIntersecting}):null;Y!==null&&Y.observe(i);function X(e){e.preventDefault(),H=!1,U!==0&&(window.cancelAnimationFrame(U),U=0),J!==null&&J.disconnect(),Y!==null&&Y.disconnect(),i.removeAttribute(`data-cena`),u(i)}function Z(){Q(!1),u(i),f()}c.addEventListener(`webglcontextlost`,X),c.addEventListener(`webglcontextrestored`,Z);function Q(e=!0){if(q||(q=!0,H=!1,U!==0&&(window.cancelAnimationFrame(U),U=0),c.removeEventListener(`webglcontextlost`,X),c.removeEventListener(`webglcontextrestored`,Z),J!==null&&J.disconnect(),Y!==null&&Y.disconnect(),!e))return;p.deleteBuffer(y),p.deleteBuffer(b),p.deleteProgram(m);let t=p.getExtension(`WEBGL_lose_context`);t!==null&&t.loseContext()}if(B)return z(r,0,V),i.setAttribute(`data-cena`,`parada`),Q;function $(e){if(!H||(U=window.requestAnimationFrame($),!W))return;K===0&&(K=e);let t=R();G+=(t-G)*.085;let n=o((e-K)/1100,0,1);z(G,e/1e3,N*n*n)}return U=window.requestAnimationFrame($),i.setAttribute(`data-cena`,`viva`),Q}var c=null,l=null;function u(e){c===e&&(c=null,l=null)}function d(){l!==null&&(l(),l=null),c=null}function f(){let e=document.querySelector(`[data-cena-a]`);if(!(e instanceof HTMLElement)){d();return}c!==e&&(d(),c=e,l=s(e))}function p(){let e=window.requestIdleCallback;if(typeof e==`function`){e(f,{timeout:1200});return}window.setTimeout(f,120)}function m(){document.readyState===`complete`?p():window.addEventListener(`load`,p,{once:!0}),document.addEventListener(`astro:before-swap`,d),document.addEventListener(`astro:page-load`,p)}m();