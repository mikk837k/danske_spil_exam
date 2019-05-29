// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"static/garbage.json":[function(require,module,exports) {
module.exports = ["plasticbag", "chipsbag", "candywrapper", "candywrapper2", "can", "straw", "battery", "beerholder", "milkcan", "can2", "tube", "waterbottle", "plasticbag", "chipsbag", "candywrapper", "candywrapper2", "can", "straw", "battery", "beerholder", "milkcan", "can2", "tube", "waterbottle", "plasticbag", "chipsbag", "can", "straw", "battery", "beerholder", "waterbottle"];
},{}],"index_test.js":[function(require,module,exports) {
"use strict";

var _garbage = _interopRequireDefault(require("/static/garbage.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener("DOMContentLoaded", init);
console.log(_garbage.default);
var action = "";
var myJSON;
var playerHealth = 3;
var collectedTrash = 0;
var isGameOver = false;
var gameContainer = document.querySelector("#game_container");

function init() {
  console.log("init kørt");
  console.log(_garbage.default);
  document.querySelector("#game_container").addEventListener("mousedown", windowClicked); // getJSON();

  createElements();
} // function getJSON() {
//   fetch("garbage.json")
//     .then(jsonData => jsonData.json())
//     .then(jsonData => {
//       myJSON = jsonData;
//       createElements();
//     });
// }


function createElements() {
  _garbage.default.forEach(function (element) {
    var newDiv = document.createElement("div");
    newDiv.classList.add("element");
    newDiv.dataset.status = "trash";
    newDiv.dataset.action = "remove";
    newDiv.style.backgroundImage = "url(\"".concat(element, ".svg\")"); // newDiv.style.backgroundColor = "red";

    gameContainer.appendChild(newDiv);
  });

  placeElements();
}

function windowClicked(e) {
  console.log("windowclicked kørt");
  action = e.target.dataset.action;

  if (action === "remove") {
    console.log("if statement kørt");
    removeElement(e);
    incrementCounter();
  }

  if (action === "start") {
    startGame();
  }

  console.log(action);
}

function placeElements() {
  var elementArray = document.querySelectorAll("[data-status=trash]");
  console.log(gameContainer.clientWidth); // place elements randomly on X axis using transform translate

  for (var counter = 0; counter < elementArray.length; counter++) {
    var stringifyNumb = getCoordinateWithinBox(gameContainer, elementArray[counter]).toString();
    elementArray[counter].style.transform = "translate(".concat(stringifyNumb, "px, -200px)");
  }
}

function getCoordinateWithinBox(container, elem) {
  return Math.floor(Math.random() * (container.clientWidth - elem.clientWidth));
}

function startGame() {
  console.log("startGame kørt"); // Can this be done by using forEach? note the delay!

  playerHealthStatus();
  checkValidity();
}

function checkValidity() {
  var elementArray = document.querySelectorAll("[data-status=trash]");

  var _loop = function _loop(counter) {
    setTimeout(function () {
      checkHealth(elementArray[counter], counter);
    }, 1000 * counter);
  };

  for (var counter = 0; counter < elementArray.length; counter++) {
    _loop(counter);
  }
}

function checkHealth(element, counter) {
  // console.log(playerHealth);
  if (!isGameOver && playerHealth === 0) {
    isGameOver = true;
    gameOver();
  } else {
    addAnimation(element, counter);
  }
}

function addAnimation(element, counter) {
  // console.log(element);
  var Xpos = element.getBoundingClientRect().x;
  var gameContainerXpos = gameContainer.getBoundingClientRect().x;

  if (counter <= 5) {
    // element.classList.add("floatDown");
    element.style.transform = "translate(".concat(Xpos - gameContainerXpos, "px, 580px)");
    element.classList.add("float_speed_1");
  }

  if (counter > 5 && counter <= 10) {
    element.style.transform = "translate(".concat(Xpos - gameContainerXpos, "px, 580px)");
    element.classList.add("float_speed_2");
  }

  if (counter >= 11 && counter <= 15) {
    element.style.transform = "translate(".concat(Xpos - gameContainerXpos, "px, 580px)");
    element.classList.add("float_speed_3");
  }

  if (counter >= 16 && counter <= 31) {
    element.style.transform = "translate(".concat(Xpos - gameContainerXpos, "px, 580px)");
    element.classList.add("float_speed_4");
  }
}

function playerHealthStatus() {
  console.log("playerHealthStatus");
  var elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(function (element) {
    element.addEventListener("transitionend", function () {
      element.style.pointerEvents = "none";

      if (element.dataset.status === "trash") {
        playerHealth--;
        decreaseHealth();
        console.log(playerHealth);
      }
    });
  });
}

function decreaseHealth() {
  var healthBar = document.querySelector("[data-status=no-damage]");
}

function gameOver() {
  //
  var elementArray = document.querySelectorAll("[data-status=trash]");
  elementArray.forEach(function (element) {
    element.dataset.status = "clean";
  });
  console.log("gameover");
}

function removeElement(e) {
  // console.log(e);
  // console.log("removeElement kørt");
  // add if statement that defines that if the element is too far down on the page then it can't be clicked
  e.target.dataset.status = "clean";
  e.target.style.backgroundColor = "initial";
  e.target.style.backgroundImage = 'url("../img/bubbles.png")'; // reset placement to be the original one

  var posX = e.target.getBoundingClientRect().x;
  e.target.style.transform = "translate(".concat(posX, "px, -200px)");
}

function incrementCounter() {
  collectedTrash++;
  document.querySelector("#score h1").textContent = collectedTrash; // Add counter to field in HTML to show amount of pieces collected
  // console.log(collectedTrash);
}
},{"/static/garbage.json":"static/garbage.json"}],"../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61795" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.npm-global/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index_test.js"], null)
//# sourceMappingURL=/index_test.f328d342.js.map