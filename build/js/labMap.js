'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * labMap.es6
 * Created by dsky on 16/11/24.
 */
/* globals Promise, BMap*/
var mapLib = function () {
  function mapLib(ele) {
    _classCallCheck(this, mapLib);

    this.ele = ele;
  }

  _createClass(mapLib, [{
    key: 'init',
    value: function init() {
      var $this = this;
      mapLib.loadJScript().then(function () {
        return $this.initMap();
      });
      // this.initMap();
    }
  }, {
    key: 'initMap',
    value: function initMap() {
      console.log('initMap start');
      var map = new BMap.Map(this.ele); // 创建Map实例
      var point = new BMap.Point(116.404, 39.915); // 创建点坐标
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom();
      console.log('initMap end');
    }
  }], [{
    key: 'loadJScript',
    value: function loadJScript() {
      console.log('loadJScript start');
      var promise = new Promise(function (resolve) {
        var key = '0splGL787be69VgsOZX2t3vMvw016i0F';
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + key;
        document.head.appendChild(script);
        resolve();
      });
      /* const key = '0splGL787be69VgsOZX2t3vMvw016i0F';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${key}`;
      document.head.appendChild(script);*/
      console.log('loadJScript end');
      return promise;
    }
  }]);

  return mapLib;
}();

window.mapLib = mapLib;
window.onload = mapLib.loadJScript;