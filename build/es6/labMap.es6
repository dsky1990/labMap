/**
 * labMap.es6
 * Created by dsky on 16/11/24.
 */
/* globals Promise, BMap*/
class mapLib {
  constructor(ele) {
    this.ele = ele;
  }
  init() {
    const $this = this;
    mapLib.loadJScript().then(() => {
      setTimeout(function () {
        $this.initMap();
      }, 100);
    });
    // this.initMap();
  }
  static loadJScript() {
    console.log('loadJScript start');
    const promise = new Promise((resolve) => {
      const key = '0splGL787be69VgsOZX2t3vMvw016i0F';
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `http://api.map.baidu.com/api?v=2.0&ak=${key}`;
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
  initMap() {
    console.log('initMap start');
    const map = new BMap.Map(this.ele);            // 创建Map实例
    const point = new BMap.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom();
    console.log('initMap end');
  }
}

window.mapLib = mapLib;
window.onload = mapLib.loadJScript;
