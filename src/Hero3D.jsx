import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Interactive 3D hero: starfield + glowing planet with ring + orbiting moon. Reacts to mouse/touch.
export default function Hero3D() {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    camera.position.z = 9;

    const stars = new THREE.BufferGeometry();
    const pos = new Float32Array(1800 * 3).map(() => (Math.random() - 0.5) * 90);
    stars.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const starPts = new THREE.Points(stars, new THREE.PointsMaterial({ size: 0.07, color: 0xbfc8ff }));
    scene.add(starPts);

    const planet = new THREE.Group();
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 3),
      new THREE.MeshStandardMaterial({ color: 0x7c5cff, roughness: 0.55, metalness: 0.2, flatShading: true }));
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(2.08, 2),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.25 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.05, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xf0abfc }));
    ring.rotation.x = Math.PI / 2.4;
    const moon = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), new THREE.MeshStandardMaterial({ color: 0xfde68a }));
    planet.add(body, wire, ring, moon);
    scene.add(planet);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const sun = new THREE.PointLight(0xffffff, 80, 50); sun.position.set(6, 5, 8); scene.add(sun);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix();
      planet.position.x = w > 800 ? 3 : 0; planet.scale.setScalar(w > 800 ? 1 : 0.7);
    };
    resize(); addEventListener('resize', resize);

    const m = { x: 0, y: 0 };
    const move = e => {
      const p = e.touches ? e.touches[0] : e;
      m.x = (p.clientX / innerWidth - 0.5) * 2; m.y = (p.clientY / innerHeight - 0.5) * 2;
    };
    addEventListener('pointermove', move); addEventListener('touchmove', move, { passive: true });

    let raf, t = 0;
    const loop = () => {
      t += reduce ? 0 : 0.01;
      planet.rotation.y += reduce ? 0 : 0.004;
      planet.rotation.x += (m.y * 0.4 - planet.rotation.x) * 0.03;
      moon.position.set(Math.cos(t * 2) * 3.2, Math.sin(t * 2) * 0.8, Math.sin(t * 2) * 3.2);
      starPts.rotation.y = t * 0.05 + m.x * 0.1;
      camera.position.x += (m.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-m.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf); removeEventListener('resize', resize);
      removeEventListener('pointermove', move); removeEventListener('touchmove', move);
      scene.traverse(o => { o.geometry?.dispose(); o.material?.dispose?.(); });
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="hero3d" ref={mount} aria-hidden="true" />;
}
