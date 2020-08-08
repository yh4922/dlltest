/* eslint-disable */
import ffi from 'ffi-napi'
import ref from 'ref-napi'
import ArrayType from 'ref-array-napi'
import * as path from 'path'
import { Buffer } from 'buffer'

// dll所在文件
let dllPath = path.resolve('resources', 've')

var kernel32 = new ffi.Library('kernel32', {
  SetDllDirectoryA: ['bool', ['string']]
})
// 注册DLL路径
let regDllPath = kernel32.SetDllDirectoryA(dllPath)
console.log('注册DLL路径', dllPath)
let dllFile = path.join(dllPath, 'ffmpeg-warp.dll')
console.log('DLL文件', dllFile)


// let charArray = ArrayType(ref.types.uchar, 8)
let uini8Array = ArrayType(ref.types.char, 1000*562*3)

let veLib = new ffi.Library(dllFile, {
  // 初始化视频解码器
  createCamera: [
    ref.types.bool, // 返回创建状态
    [
      ref.types.CString, // 解码的视频路径 可以是rtsp的网络地址 'const char* url'
      ref.types.int, // 希望视频的高度  'int preview_height'
      ref.types.int, // 希望视频的宽度   'int preview_width'
      ref.types.CString // 日志文件路径  'const char* log_path'
    ]
  ],

  // 开始解码
  startCamrea: [
    ref.types.bool, // 返回开始状态
    []
  ],

  // 获取视频帧 RGB 格式
  getCameraFrameRGB: [
    ref.types.bool, // 状态
    [
      ref.types.int, // 暂时为零 后续保留参数 'int handle'
      uini8Array, // 暂时为零 后续保留参数 'unsigned char *pdata'
      ref.types.int, // 指针 回去拿到图像的高度 'int *height'
      ref.types.int, // 指针 回去拿到图像的宽度 'int *width'
      ref.types.int, // 通道数  暂时为3   'int channels'
      ref.types.int, // 获取图片的类型 0--预览数据  1--原始数据   'int type'
    ]
  ],

  // 释放解码器
  releaseCamera: [
    ref.types.void,
    []
  ]
})

console.log('连接DLL', veLib)


// 第一步创建解码器
let testMp4 = path.join(dllPath, 'test.mp4')
let logsPath = path.join(dllPath, 'logs')
let createStatus = veLib.createCamera(testMp4, 562, 1000, logsPath)
console.log('创建解码器', createStatus)

// 第二步开始解码
let startStatus = veLib.startCamrea()
console.log('开始运行解码器', startStatus)


// 第三步获取视频图像
getImages()

// 第四步 释放解码器
veLib.releaseCamera()

// 获取视频帧
function getImages() {
  let imgBuf = new Buffer(1000*562*3) // 图像数据指针
  imgBuf.type = uini8Array

  let hBuf = new Buffer(4) // 图像高度指针
  hBuf.type = ref.types.int

  let wBuf = new Buffer(4) // 图像宽度指针
  hBuf.type = ref.types.int

  let getStatus = veLib.getCameraFrameRGB(0, imgBuf, hBuf, wBuf, 3, 0)
  console.log('获取图像状态', getStatus)
  console.log('图像数据', imgBuf.deref())
  console.log('图像高度', hBuf.deref())
  console.log('图像宽度', wBuf.deref())
}


export default getImages