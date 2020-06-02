import React, { useState } from 'React';
import { Canvas, useThree, useRender } from 'react-three-fiber';

const Box = () => {
  return (
    <mesh
      scale={[1, 1, 1]}
      castShadow>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshPhysicalMaterial attach="material" color="hotpink" />
    </mesh>
  )
}

const App = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true
        gl.shadowMap.type = THREE.PCFSoftShadowMap
      }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
      <fog attach="fog" args={["black", 10, 25]} />
      {/* <Controls /> */}
      <Box />
      {/* <Plane /> */}
      {/* <SpaceShip /> */}
    </Canvas>
  )
};

export default App;
