// CodeKids - 3D Cube Background (Three.js)
// Draws a field of slowly rotating wireframe cubes behind the hero section.

(function () {

    const canvas = document.getElementById("bg-canvas");
    if (!canvas || typeof THREE === "undefined") return;

    // Scene / Camera / Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Brand colors: navy blue + gold accent
    const colors = [0x183d7a, 0x2b5aa8, 0xffd43b];

    // Create a field of wireframe cubes
    const cubes = [];
    const cubeCount = 22;

    for (let i = 0; i < cubeCount; i++) {
        const size = 0.8 + Math.random() * 2.2;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const color = colors[i % colors.length];
        const material = new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
            transparent: true,
            opacity: 0.35 + Math.random() * 0.25
        });

        const cube = new THREE.Mesh(geometry, material);

        cube.position.x = (Math.random() - 0.5) * 40;
        cube.position.y = (Math.random() - 0.5) * 24;
        cube.position.z = (Math.random() - 0.5) * 20 - 5;

        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;

        cube.userData.rotSpeedX = (Math.random() - 0.5) * 0.01;
        cube.userData.rotSpeedY = (Math.random() - 0.5) * 0.01;
        cube.userData.floatSpeed = 0.2 + Math.random() * 0.3;
        cube.userData.floatOffset = Math.random() * Math.PI * 2;
        cube.userData.baseY = cube.position.y;

        scene.add(cube);
        cubes.push(cube);
    }

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const t = clock.getElapsedTime();

        cubes.forEach((cube) => {
            cube.rotation.x += cube.userData.rotSpeedX;
            cube.rotation.y += cube.userData.rotSpeedY;
            cube.position.y =
                cube.userData.baseY +
                Math.sin(t * cube.userData.floatSpeed + cube.userData.floatOffset) * 0.8;
        });

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

})();
