// import { useRef } from "react";
// import { useFrame } from "@react-three/fiber";

// function Wave({ speed, amplitude, color, position }) {
//   const meshRef = useRef();

//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime();
//     const mesh = meshRef.current;
//     if (!mesh) return;

//     const pos = mesh.geometry.attributes.position;

//     for (let i = 0; i < pos.count; i++) {
//       const x = pos.getX(i);
//       const y = pos.getY(i);

//       const wave =
//         Math.sin(x * 0.9 + time * speed) * amplitude +
//         Math.cos(y * 0.8 + time * speed * 0.7) * amplitude * 0.7;

//       pos.setZ(i, wave);
//     }

//     pos.needsUpdate = true;
//     mesh.geometry.computeVertexNormals();
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       position={position}
//       rotation={[-Math.PI / 2.6, 0, 0]}
//     >
//       <planeGeometry args={[14, 5, 250, 250]} />
//       <meshPhysicalMaterial
//         color={color}
//         metalness={0.2}
//         roughness={0.6}
//         clearcoat={0.5}
//       />
//     </mesh>
//   );
// }

// export default function WavePlane() {
//   return (
//     <>
//       {/* Back darker layer */}
//       <Wave
//         speed={0.5}
//         amplitude={0.08}
//         color="#e6e6e6"
//         position={[0, -1.5, -0.2]}
//       />

//       {/* Front lighter layer */}
//       <Wave
//         speed={0.7}
//         amplitude={0.12}
//         color="#f4f4f4"
//         position={[0, -1.3, 0]}
//       />
//     </>
//   );
// }