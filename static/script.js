let viewer;
let scenesData = {};

function preloadScenes() {
    return Promise.all(
        Object.keys(scenesData).map(sceneId => 
            new Promise((resolve) => {
                const img = new Image();
                img.src = `/static/panoramas/${scenesData[sceneId].image}`;
                img.onload = resolve;
            })
        )
    );
}

async function initViewer(initialScene) {
    const response = await fetch('/panoramas');
    scenesData = await response.json();

    const config = {
        default: {
            sceneFadeDuration: 1500,
            autoLoad: true,
            preview: null,
            
        },
        scenes: {}
    };

    // Заполняем сцены
    for (const sceneId in scenesData) {
        config.scenes[sceneId] = {
            title: scenesData[sceneId].title,
            type: 'equirectangular',
            panorama: `/static/panoramas/${scenesData[sceneId].image}`,
            hotSpots: scenesData[sceneId].hotspots.map(hotspot => ({
                pitch: hotspot.pitch,
                yaw: hotspot.yaw,
                type: hotspot.type,
                text: hotspot.text,
                sceneId: hotspot.sceneId,
                clickHandlerFunc: function() {
                    viewer.loadScene(hotspot.sceneId);
                }
            }))
        };
    }

    await preloadScenes();

    viewer = pannellum.viewer('panorama-container', config);
    viewer.loadScene(initialScene);
}

document.addEventListener('DOMContentLoaded', () => {
    initViewer('room1');
});