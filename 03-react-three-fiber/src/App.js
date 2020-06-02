import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

  useFrame(() => {
    orbitRef.current.update()
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef} />
  );
};

const Box = () => {
  return (
    <mesh
      scale={[1, 1, 1]}
      castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial attach="material" color="gray" />
    </mesh>
  );
};

export default () => (
  <Canvas
    camera={{ position: [0, 0, 5] }}
    onCreated={({ gl }) => {
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}>
    <ambientLight intensity={0.5} />
    <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
    <fog attach="fog" args={["black", 10, 25]} />
    <Controls />
    <Box />
  </Canvas>
);