import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

function Hero3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050509);
    scene.fog = new THREE.FogExp2(0x050509, 0.025);

    const camera = new THREE.PerspectiveCamera(
      70,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 12);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2.1;
    controls.minPolarAngle = Math.PI / 3.2;

    const ambientLight = new THREE.AmbientLight(0x404060, 2.5);
    scene.add(ambientLight);

    const purpleLight = new THREE.PointLight(0x9945ff, 2.5, 25);
    purpleLight.position.set(-3, 2, -4);
    purpleLight.castShadow = true;
    scene.add(purpleLight);

    const greenLight = new THREE.PointLight(0x14f195, 2.3, 25);
    greenLight.position.set(3, 2, 3);
    greenLight.castShadow = true;
    scene.add(greenLight);

    const backLight = new THREE.PointLight(0x4466ff, 1.8, 25);
    backLight.position.set(0, 1, -8);
    scene.add(backLight);

    const topLight = new THREE.PointLight(0xffffff, 1.5, 20);
    topLight.position.set(0, 5, 0);
    scene.add(topLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(1, 5, 5);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const waveGroup = new THREE.Group();
    waveGroup.position.y = 0.5;

    const mainGeo = new THREE.IcosahedronGeometry(1.6, 3);
    const mainMat = new THREE.MeshStandardMaterial({
      color: 0x9945ff,
      metalness: 0.8,
      roughness: 0.1,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
      emissive: new THREE.Color(0x331166)
    });
    const mainMesh = new THREE.Mesh(mainGeo, mainMat);
    mainMesh.castShadow = true;
    waveGroup.add(mainMesh);

    const coreGeo = new THREE.SphereGeometry(0.9, 48, 48);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x14f195,
      metalness: 0.9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.8,
      emissive: new THREE.Color(0x114433)
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    waveGroup.add(coreMesh);

    const innerGlowGeo = new THREE.SphereGeometry(1.1, 32, 32);
    const innerGlowMat = new THREE.MeshBasicMaterial({
      color: 0x9945ff,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
    waveGroup.add(innerGlow);

    for (let i = 0; i < 5; i++) {
      const ringGeo = new THREE.TorusGeometry(2.1 + i * 0.4, 0.03 + i * 0.01, 32, 120);
      const ringMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x9945ff : i === 1 ? 0x14f195 : i === 2 ? 0xff3366 : 0x44aaff,
        emissive: new THREE.Color(i === 0 ? 0x331166 : i === 1 ? 0x114433 : 0x331122),
        transparent: true,
        opacity: 0.3 + i * 0.1,
        metalness: 0.5,
        roughness: 0.3
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.rotation.z = i * (Math.PI / 4);
      waveGroup.add(ring);
    }

    const outerRingGeo = new THREE.TorusGeometry(3.8, 0.06, 32, 180);
    const outerRingMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0x4466aa),
      transparent: true,
      opacity: 0.4
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.rotation.z = 0.5;
    waveGroup.add(outerRing);

    scene.add(waveGroup);

    const energyFieldGeo = new THREE.SphereGeometry(4.5, 64, 64);
    const energyFieldMat = new THREE.MeshPhongMaterial({
      color: 0x4466ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
      emissive: new THREE.Color(0x112244)
    });
    const energyField = new THREE.Mesh(energyFieldGeo, energyFieldMat);
    energyField.position.y = 0.5;
    scene.add(energyField);

    const particlesCount = 3500;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const radius = 3.5 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      posArray[i * 3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      const r = Math.random();
      if (r > 0.6) color.setHSL(0.77 + Math.random() * 0.1, 0.9, 0.6);
      else if (r > 0.3) color.setHSL(0.35 + Math.random() * 0.1, 0.9, 0.6);
      else color.setHSL(0.58 + Math.random() * 0.1, 0.8, 0.55);

      colorArray[i * 3] = color.r;
      colorArray[i * 3 + 1] = color.g;
      colorArray[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const shapesGroup = new THREE.Group();
    const shapes = [];
    for (let i = 0; i < 40; i++) {
      const type = Math.floor(Math.random() * 3);
      let shape;
      if (type === 0) {
        shape = new THREE.Mesh(
          new THREE.TetrahedronGeometry(0.15 + Math.random() * 0.1),
          new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0x9945ff : 0x14f195, metalness: 0.7, roughness: 0.3, emissive: new THREE.Color(0x331144) })
        );
      } else if (type === 1) {
        shape = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.15 + Math.random() * 0.1),
          new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0xff3366 : 0x44aaff, metalness: 0.6, roughness: 0.4, emissive: new THREE.Color(0x331122) })
        );
      } else {
        shape = new THREE.Mesh(
          new THREE.DodecahedronGeometry(0.12 + Math.random() * 0.1),
          new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0xffaa44 : 0x66ff99, metalness: 0.8, roughness: 0.2, emissive: new THREE.Color(0x332211) })
        );
      }
      const angle = (i / 40) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;
      shape.position.set(Math.cos(angle) * radius, Math.sin(angle * 4) * 2 + 0.5, Math.sin(angle) * radius);
      shape.castShadow = true;
      shapesGroup.add(shape);
      shapes.push(shape);
    }
    scene.add(shapesGroup);

    const cubesGroup = new THREE.Group();
    const cubes = [];
    for (let i = 0; i < 35; i++) {
      const size = Math.random() * 0.18 + 0.08;
      const cube = new THREE.Mesh(
        new THREE.BoxGeometry(size, size, size),
        new THREE.MeshStandardMaterial({ color: Math.random() > 0.5 ? 0x9945ff : 0x14f195, metalness: 0.9, roughness: 0.2, transparent: true, opacity: 0.9, emissive: new THREE.Color(0x331144) })
      );
      const angle = (i / 35) * Math.PI * 2;
      const radius = 3.8 + Math.random() * 2;
      cube.position.set(Math.cos(angle) * radius, Math.sin(angle * 5) * 2 + 0.5, Math.sin(angle) * radius);
      cubesGroup.add(cube);
      cubes.push(cube);
    }
    scene.add(cubesGroup);

    const sparklesCount = 200;
    const sparklesGeometry = new THREE.BufferGeometry();
    const sparklesPos = new Float32Array(sparklesCount * 3);
    const sparklesColor = new Float32Array(sparklesCount * 3);
    for (let i = 0; i < sparklesCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 2;
      sparklesPos[i * 3] = Math.cos(angle) * radius;
      sparklesPos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      sparklesPos[i * 3 + 2] = Math.sin(angle) * radius;
      sparklesColor[i * 3] = Math.random();
      sparklesColor[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      sparklesColor[i * 3 + 2] = Math.random();
    }
    sparklesGeometry.setAttribute('position', new THREE.BufferAttribute(sparklesPos, 3));
    sparklesGeometry.setAttribute('color', new THREE.BufferAttribute(sparklesColor, 3));
    const sparkles = new THREE.Points(sparklesGeometry, new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, sizeAttenuation: true }));
    scene.add(sparkles);

    const gridHelper = new THREE.GridHelper(40, 40, 0x9945ff, 0x14f195);
    gridHelper.position.y = -2.2;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    gsap.to(waveGroup.rotation, { y: Math.PI * 2, duration: 25, repeat: -1, ease: 'none' });
    gsap.to(waveGroup.rotation, { x: 0.3, z: 0.2, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(waveGroup.position, { y: 1.2, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(energyField.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(energyField.rotation, { x: Math.PI, y: Math.PI, duration: 20, repeat: -1, ease: 'none' });
    gsap.to(outerRing.rotation, { z: outerRing.rotation.z + 2, duration: 15, repeat: -1, ease: 'none' });
    gsap.to(outerRing.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    shapes.forEach((shape, i) => {
      gsap.to(shape.position, { y: shape.position.y + 0.6, duration: 3 + Math.random() * 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.05 });
      gsap.to(shape.rotation, { x: Math.PI * 2, y: Math.PI * 2, z: Math.PI * 2, duration: 5 + Math.random() * 3, repeat: -1, ease: 'none' });
    });

    cubes.forEach((cube, i) => {
      gsap.to(cube.position, { y: cube.position.y + 0.8, duration: 2.5 + Math.random() * 2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: i * 0.04 });
      gsap.to(cube.rotation, { y: Math.PI * 2, duration: 4 + Math.random() * 3, repeat: -1, ease: 'none' });
    });

    gsap.to(purpleLight.position, { x: 4, y: 3, z: -2, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(greenLight.position, { x: -4, y: 3, z: 4, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      particles.rotation.y += 0.00025;
      particles.rotation.x += 0.00015;
      sparkles.rotation.y += 0.001;
      sparkles.rotation.x = Math.sin(t * 0.5) * 0.1;
      gridHelper.rotation.z += 0.0001;
      innerGlow.scale.setScalar(1 + Math.sin(t * 3) * 0.05);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      if (containerRef.current && renderer.domElement && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" style={{ width: '100%', height: '100%' }} />;
}

export default Hero3D;