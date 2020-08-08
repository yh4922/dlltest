#ifndef FFMPEGTHREAD_C_H
#define FFMPEGTHREAD_C_H
#include <common/include/comm_type.h>
enum FRAME_TYPE{
    PREVIEW_FRAME = 0,//获取预览数据
    ALG_FRAME = 1//获取算法数据
};
#ifdef __cplusplus //(内置宏,如果是c++,在编译器预处理的时候加上extern,如果是c语言调用的时候是不处理的)
SMART_EXTERN_C
{
#endif
//createCamera
//---------------------初始化视频解码器
//param:
//url-ip设想头url或者本地路径
//preview_height--预览数据所需的高
//preview_width--预览数据的宽
//返回值：编码器是否初始化成功
SMART_EXPORTS bool createCamera(const char* url, int preview_height, int preview_width, const char* log_path);
//---------------------startCamrea --开始解码
SMART_EXPORTS bool startCamrea();
//---------------------获取视频帧
//param
//pdata用来存储图片数据的数组
//height  图片的宽度
//width 图片的高
//通道数  写3就好了
//type  图片类型，是预览数据还是算法使用的数据  0--预览数据  1--原始数据
SMART_EXPORTS bool getCameraFrameRGB(int handle, unsigned char *pdata, int *height, int *width, int channels, int type);
SMART_EXPORTS void releaseCamera();


#ifdef __cplusplus
}
#endif 

#endif // FFMPEGTHREAD_C_H
