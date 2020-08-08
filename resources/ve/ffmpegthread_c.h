#ifndef FFMPEGTHREAD_C_H
#define FFMPEGTHREAD_C_H
#include <common/include/comm_type.h>
enum FRAME_TYPE{
    PREVIEW_FRAME = 0,//��ȡԤ������
    ALG_FRAME = 1//��ȡ�㷨����
};
#ifdef __cplusplus //(���ú�,�����c++,�ڱ�����Ԥ�����ʱ�����extern,�����c���Ե��õ�ʱ���ǲ������)
SMART_EXTERN_C
{
#endif
//createCamera
//---------------------��ʼ����Ƶ������
//param:
//url-ip����ͷurl���߱���·��
//preview_height--Ԥ����������ĸ�
//preview_width--Ԥ�����ݵĿ�
//����ֵ���������Ƿ��ʼ���ɹ�
SMART_EXPORTS bool createCamera(const char* url, int preview_height, int preview_width, const char* log_path);
//---------------------startCamrea --��ʼ����
SMART_EXPORTS bool startCamrea();
//---------------------��ȡ��Ƶ֡
//param
//pdata�����洢ͼƬ���ݵ�����
//height  ͼƬ�Ŀ��
//width ͼƬ�ĸ�
//ͨ����  д3�ͺ���
//type  ͼƬ���ͣ���Ԥ�����ݻ����㷨ʹ�õ�����  0--Ԥ������  1--ԭʼ����
SMART_EXPORTS bool getCameraFrameRGB(int handle, unsigned char *pdata, int *height, int *width, int channels, int type);
SMART_EXPORTS void releaseCamera();


#ifdef __cplusplus
}
#endif 

#endif // FFMPEGTHREAD_C_H
