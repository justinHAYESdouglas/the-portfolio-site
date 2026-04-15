import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei"; 
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import modelUrl from "./portfolio-scene.glb?url";

const PAN_STRENGTH = 0.008;
const RAD2DEG = THREE.MathUtils.RAD2DEG;
const DEG2RAD = THREE.MathUtils.DEG2RAD;

const ZOOM_BREAKPOINTS = [
  { maxWidth:  768, multiplier: 0.40 },
  { maxWidth: 1280, multiplier: 0.85 },
  { maxWidth: 1440, multiplier: 0.85 },
  { maxWidth: 1920, multiplier: 0.85 },
  { maxWidth: 2560, multiplier: 1.00 },
  { maxWidth: 3440, multiplier: .5 },
];

function getZoomMultiplier(width) {
  const bp = ZOOM_BREAKPOINTS.find((b) => width <= b.maxWidth);
  return bp ? bp.multiplier : ZOOM_BREAKPOINTS[ZOOM_BREAKPOINTS.length - 1].multiplier;
}

const SCROLL_DISTANCE = 300;

const KEYFRAME_START = {
  position: { x: 0, y: 2.52, z: 6.5 },
  rotationDeg: { x: 0, y: 0, z: 0 },
  zoom: 1.2,
};

const KEYFRAME_END = {
  position: { x: -3.7, y: 3.4, z: 8.5 },
  rotationDeg: { x: -3.2, y: -23.6, z: -1.3 },
  zoom: 0.45,
};

function CameraController() {
  const mouse = useRef(0);
  const panOffset = useRef(0);
  const targetT = useRef(0);
  const currentT = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = (e.clientX / window.innerWidth) * 2 - 1;
    };
    const handleScroll = () => {
      targetT.current = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const cam = state.camera;

    currentT.current += (targetT.current - currentT.current) * Math.min(delta * 3, 1);
    const t = currentT.current;

    panOffset.current += (-mouse.current * PAN_STRENGTH - panOffset.current) * 0.05;

    const px = THREE.MathUtils.lerp(KEYFRAME_START.position.x, KEYFRAME_END.position.x, t);
    const py = THREE.MathUtils.lerp(KEYFRAME_START.position.y, KEYFRAME_END.position.y, t);
    const pz = THREE.MathUtils.lerp(KEYFRAME_START.position.z, KEYFRAME_END.position.z, t);
    const rx = THREE.MathUtils.lerp(KEYFRAME_START.rotationDeg.x, KEYFRAME_END.rotationDeg.x, t) * DEG2RAD;
    const ry = THREE.MathUtils.lerp(KEYFRAME_START.rotationDeg.y, KEYFRAME_END.rotationDeg.y, t) * DEG2RAD;
    const rz = THREE.MathUtils.lerp(KEYFRAME_START.rotationDeg.z, KEYFRAME_END.rotationDeg.z, t) * DEG2RAD;
    const zoomBase = THREE.MathUtils.lerp(KEYFRAME_START.zoom, KEYFRAME_END.zoom, t);
    const zoom = zoomBase * getZoomMultiplier(state.size.width);

    cam.position.set(px, py, pz);
    cam.rotation.set(rx, ry + panOffset.current, rz);
    cam.zoom = zoom;
    cam.updateProjectionMatrix();
  });

  return null;
}

function CameraTracker({ domRef }) {
  const { camera } = useThree();
  useFrame(() => {
    if (!domRef.current) return;
    const p = camera.position;
    const r = camera.rotation;
    domRef.current.innerHTML =
      `<b>Camera</b><br/>` +
      `pos &nbsp;x: ${p.x.toFixed(2)} &nbsp;y: ${p.y.toFixed(2)} &nbsp;z: ${p.z.toFixed(2)}<br/>` +
      `rot &nbsp;x: ${(r.x * RAD2DEG).toFixed(1)}° &nbsp;y: ${(r.y * RAD2DEG).toFixed(1)}° &nbsp;z: ${(r.z * RAD2DEG).toFixed(1)}°`;
  });
  return null;
}

function Model({ screenMaterial }) {
  const { scene, cameras, animations, materials } = useGLTF(modelUrl);
  const { set, size } = useThree();
  const sizeRef = useRef(size);
  useEffect(() => { sizeRef.current = size; }, [size]);
  const mixerRef = useRef(null);
  const currentActionRef = useRef(null);
  const craigMeshes = useRef([]);
  const originalEmissives = useRef([]);
  const craigRootRef = useRef(null);
  const mouseScreen = useRef(new THREE.Vector2());
  const isHovered = useRef(false);
  const hasClickedRef = useRef(false);
  const screenMeshRef = useRef(null);
  const originalScreenMaterialRef = useRef(null);
  const screenMaterialRef = useRef(screenMaterial);
  const materialsRef = useRef(materials);
  const hasScrolledRef = useRef(window.scrollY >= SCROLL_DISTANCE);
  const screenTransitionRef = useRef({ progress: 1, clonedMat: null, finalMat: null });
  const prevScreenMaterialRef = useRef(screenMaterial);
  // How many px from Craig's projected center counts as hover
  const HOVER_RADIUS_PX = 80;

  useEffect(() => { materialsRef.current = materials; }, [materials]);

  const applyCurrentScreenMaterial = (skipFade = false) => {
    const mesh = screenMeshRef.current;
    if (!mesh) return;
    const mats = materialsRef.current;
    const targetMat = !hasScrolledRef.current
      ? (mats["blank_screen"] ?? originalScreenMaterialRef.current)
      : (() => { const m = screenMaterialRef.current; return (m && mats[m]) ? mats[m] : originalScreenMaterialRef.current; })();
    if (skipFade) {
      mesh.material = targetMat;
      screenTransitionRef.current = { progress: 1, clonedMat: null, finalMat: targetMat };
      return;
    }
    const cloned = targetMat.clone();
    cloned.transparent = true;
    cloned.opacity = 0;
    mesh.material = cloned;
    screenTransitionRef.current = { progress: 0, clonedMat: cloned, finalMat: targetMat };
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#110b0b";
    const cam = cameras.find((c) => c.name === "full-work");
    if (cam) {
      cam.zoom = KEYFRAME_START.zoom;
      cam.aspect = sizeRef.current.width / sizeRef.current.height;
      cam.position.set(KEYFRAME_START.position.x, KEYFRAME_START.position.y, KEYFRAME_START.position.z);
      cam.rotation.set(
        KEYFRAME_START.rotationDeg.x * DEG2RAD,
        KEYFRAME_START.rotationDeg.y * DEG2RAD,
        KEYFRAME_START.rotationDeg.z * DEG2RAD
      );
      cam.updateProjectionMatrix();
      set({ camera: cam });
    }

    // Enable shadows on all meshes and lights from the GLB
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
      if (obj.isLight) {
        obj.castShadow = true;
        obj.shadow.mapSize.set(1024, 1024);
        obj.shadow.bias = -0.005;
      }
    });

    // Collect Craig's meshes, clone materials so other objects sharing them aren't affected
    const craig = scene.getObjectByName("Craig");
    craigRootRef.current = scene.getObjectByName("rig") ?? craig;
    if (craig) {
      craig.traverse((obj) => {
        if (obj.isMesh) {
          obj.material = obj.material.clone();
          craigMeshes.current.push(obj);
          originalEmissives.current.push(obj.material.emissive?.clone() ?? new THREE.Color(0, 0, 0));
        }
      });
    }

    // Find screen mesh for material swapping
    const screenMesh = scene.getObjectByName("screen");
    if (screenMesh?.isMesh) {
      screenMeshRef.current = screenMesh;
      originalScreenMaterialRef.current = screenMesh.material;
      applyCurrentScreenMaterial(true);
    }

    // Debug: log all mesh names and available materials
    console.log("[Scene] All materials from GLB:", Object.keys(materials));
    const meshNames = [];
    scene.traverse((obj) => { if (obj.isMesh) meshNames.push(obj.name); });
    console.log("[Scene] All mesh names in scene:", meshNames);
    console.log("[Scene] Screen mesh found:", screenMesh);

    // Set up mixer and play initial animation
    const rig = scene.getObjectByName("rig");
    const target = rig ?? craig ?? scene;
    const mixer = new THREE.AnimationMixer(target);
    mixerRef.current = mixer;

    const punchClip = THREE.AnimationClip.findByName(animations, "punch");
    if (punchClip) {
      const action = mixer.clipAction(punchClip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
      currentActionRef.current = action;
    }

    const handleMouseMove = (e) => {
      mouseScreen.current.x = e.clientX;
      mouseScreen.current.y = e.clientY;
    };

    const handleScroll = () => {
      const past = window.scrollY >= SCROLL_DISTANCE;
      if (past !== hasScrolledRef.current) {
        hasScrolledRef.current = past;
        applyCurrentScreenMaterial();
      }
    };

    const handleClick = () => {
      if (hasClickedRef.current || !isHovered.current || !mixerRef.current) return;

      const fallClip = animations.find((a) => a.name.toLowerCase() === "fall");
      if (!fallClip) return;

      hasClickedRef.current = true;

      const fallAction = mixerRef.current.clipAction(fallClip);
      fallAction.setLoop(THREE.LoopOnce, 1);
      fallAction.clampWhenFinished = true;

      if (currentActionRef.current) {
        currentActionRef.current.crossFadeTo(fallAction, 0.3, true);
      }
      fallAction.reset().play();
      currentActionRef.current = fallAction;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      document.body.style.cursor = "";
      mixerRef.current?.stopAllAction();
      mixerRef.current = null;
    };
  }, [cameras, set, scene, animations]);

  useFrame((state, delta) => {
    // Detect screenMaterial prop changes (avoids effect ordering issues on mount)
    if (screenMaterial !== prevScreenMaterialRef.current) {
      prevScreenMaterialRef.current = screenMaterial;
      screenMaterialRef.current = screenMaterial;
      applyCurrentScreenMaterial();
    }

    mixerRef.current?.update(delta);

    // Screen fade-in transition
    const tr = screenTransitionRef.current;
    if (tr.progress < 1 && tr.clonedMat) {
      tr.progress = Math.min(tr.progress + delta * 0.6, 1);
      tr.clonedMat.opacity = tr.progress;
      if (tr.progress >= 1 && screenMeshRef.current) {
        screenMeshRef.current.material = tr.finalMat;
      }
    }

    if (!craigRootRef.current) return;

    // Project Craig's world position into screen space
    const worldPos = new THREE.Vector3();
    craigRootRef.current.getWorldPosition(worldPos);
    worldPos.project(state.camera);
    const screenX = (worldPos.x * 0.5 + 0.5) * state.size.width - window.scrollX;
    const screenY = (-worldPos.y * 0.5 + 0.5) * state.size.height - window.scrollY;

    const dx = mouseScreen.current.x - screenX;
    const dy = mouseScreen.current.y - screenY;
    const nowHovered = Math.sqrt(dx * dx + dy * dy) < HOVER_RADIUS_PX;

    if (nowHovered !== isHovered.current) {
      isHovered.current = nowHovered;
      document.body.style.cursor = nowHovered ? "pointer" : "";
      craigMeshes.current.forEach((mesh, i) => {
        if (nowHovered) {
          mesh.material.emissive.set(0.15, 0.12, 0.05);
        } else {
          mesh.material.emissive.copy(originalEmissives.current[i]);
        }
      });
    }
  });

  return <primitive object={scene} />;
}

export default function Scene({ screenMaterial }) {
  const camDisplayRef = useRef(null);

  return (
    <>
      <div
        ref={camDisplayRef}
        style={{
          display: "none",
          position: "fixed",
          top: "12px",
          right: "12px",
          zIndex: 9999,
          background: "rgba(0,0,0,0.6)",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: "11px",
          lineHeight: "1.6",
          padding: "8px 12px",
          borderRadius: "6px",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      />
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1
        }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1,
          outputColorSpace: THREE.SRGBColorSpace,
          useLegacyLights: false,
        }}
      >
          <Model screenMaterial={screenMaterial} />
          <Environment preset="night" environmentIntensity={1} />

        <CameraController />
        <CameraTracker domRef={camDisplayRef} />
      </Canvas>
    </>
  );
}