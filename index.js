var images = require('images');
var path = require('path');
var fs = require("fs")
var path = require("path")
var srcDir = path.join(__dirname, 'srcImages')
var distDir = path.join(__dirname, 'distImages')


function readDirSync(path) {
  var pa = fs.readdirSync(path);
  pa.forEach(function (ele, index) {
    var info = fs.statSync(path + "/" + ele)
    if (info.isDirectory()) {
      console.log("dir: " + ele)
      readDirSync(path + "/" + ele);
    } else {
      console.log("file: " + ele)
      watermark(ele)
    }
  })
}

function watermark(sourceImgName) {
  var watermarkImg = images(path.join(__dirname, './watermark2.png'))
  var sourceImgPath = path.join(srcDir, sourceImgName)
  var savePath = path.join(distDir, sourceImgName)
  var sourceImg = images(sourceImgPath);
  var sWidth = sourceImg.width();
  var sHeight = sourceImg.height();
  var wmWidth = watermarkImg.width();
  var wmHeight = watermarkImg.height();

  console.log(sWidth, sHeight, wmWidth, wmHeight)
  if (sWidth < wmWidth) {
    wmWidth = wmWidth / 10
    wmHeight = wmHeight / 10
    watermarkImg.size(wmWidth, wmHeight)
  } else {
    wmWidth = wmWidth / 2
    wmHeight = wmHeight /2
    watermarkImg.size(wmWidth, wmHeight)
  }

  images(sourceImg)
    // 设置绘制的坐标位置，右下角距离 10px
    .draw(watermarkImg, sWidth - wmWidth - 10, sHeight - wmHeight - 10)
    // 保存格式会自动识别
    .save(savePath);
}
readDirSync(srcDir)