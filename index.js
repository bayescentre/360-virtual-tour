(function() {
  var viewerOpts = { controls: { mouseViewMode: 'drag' } };
  var viewer = new Marzipano.Viewer(document.getElementById('pano'), viewerOpts);
  var scenes = APP_DATA.scenes.map(function(data) {
    var source = Marzipano.ImageUrlSource.fromString("tiles/" + data.id + "/{z}/{f}/{y}/{x}.jpg");
    var geometry = new Marzipano.CubeGeometry(data.levels);
    var limiter = Marzipano.RectilinearView.limit.traditional(data.faceSize, 100*Math.PI/180);
    var view = new Marzipano.RectilinearView(data.initialViewParameters, limiter);
    var scene = viewer.createScene({ source: source, geometry: geometry, view: view });
    scene.userData = { id: data.id, name: data.name };
    return scene;
  });

  function switchScene(scene) {
    scene.switchTo();
    document.querySelector('.sceneName').textContent = scene.userData.name;
  }

  var sceneListElem = document.querySelector('#sceneList .scenes');
  scenes.forEach(function(scene) {
    var el = document.createElement('li');
    el.className = 'scene';
    el.innerText = scene.userData.name;
    el.addEventListener('click', function() { switchScene(scene); });
    sceneListElem.appendChild(el);
  });

  switchScene(scenes[0]);
})();
