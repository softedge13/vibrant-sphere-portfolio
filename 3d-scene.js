
// Initialize Three.js scene
document.addEventListener('DOMContentLoaded', () => {
  // Check if the container exists (we only want to run this on the home page)
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 10;
  
  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);
  
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(10, 10, 5);
  scene.add(directionalLight1);
  
  const directionalLight2 = new THREE.DirectionalLight(0xbf9dff, 0.5);
  directionalLight2.position.set(-10, -10, -5);
  scene.add(directionalLight2);
  
  const pointLight = new THREE.PointLight(0xbf9dff, 0.5);
  pointLight.position.set(0, 0, 5);
  scene.add(pointLight);
  
  // Create 3D title
  // Note: This is simplified as we don't have the font loader
  const titleGeometry = new THREE.TextGeometry('PORTFOLIO', {
    font: 'helvetica', // This is a placeholder
    size: 1,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5
  });
  
  // Fallback to a torusKnot if TextGeometry isn't available
  const torusKnotGeometry = new THREE.TorusKnotGeometry(1, 0.3, 128, 32, 2, 3);
  const knotMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x8b5cf6,
    roughness: 0.1,
    metalness: 0.8,
    emissive: 0x5b00ff,
    emissiveIntensity: 0.4,
    clearcoat: 1,
    clearcoatRoughness: 0.1
  });
  
  const knot = new THREE.Mesh(torusKnotGeometry, knotMaterial);
  knot.position.set(0, 0, -1);
  scene.add(knot);
  
  // Add floating objects
  function createFloatingObject(position, color, size, rotationFactor) {
    const geometry = new THREE.DodecahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.8
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(size, size, size);
    mesh.userData = { rotationFactor };
    
    scene.add(mesh);
    return mesh;
  }
  
  const isMobile = window.innerWidth < 768;
  
  const floatingObjects = [
    createFloatingObject([-5, -2, -5], 0x4f46e5, isMobile ? 0.2 : 0.5, 0.3),
    createFloatingObject([5, 3, -7], 0x8b5cf6, isMobile ? 0.3 : 0.7, 0.2),
    createFloatingObject([7, -4, -8], 0xc084fc, isMobile ? 0.15 : 0.4, 0.5),
    createFloatingObject([-7, 4, -10], 0x818cf8, isMobile ? 0.25 : 0.6, 0.4)
  ];
  
  // OrbitControls
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableRotate = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.maxPolarAngle = Math.PI / 1.8;
  controls.minPolarAngle = Math.PI / 2.5;
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Animation loop
  const clock = new THREE.Clock();
  
  function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();
    
    // Animate floating objects
    floatingObjects.forEach((obj, index) => {
      obj.rotation.x += delta * obj.userData.rotationFactor;
      obj.rotation.y += delta * obj.userData.rotationFactor * 0.8;
      
      // Add bobbing motion
      obj.position.y += Math.sin(elapsed * (0.5 + index * 0.1)) * 0.003;
    });
    
    // Animate knot
    knot.rotation.y = Math.sin(elapsed * 0.3) * 0.2;
    knot.position.y = Math.sin(elapsed * 0.5) * 0.2;
    
    controls.update();
    renderer.render(scene, camera);
  }
  
  animate();
});
