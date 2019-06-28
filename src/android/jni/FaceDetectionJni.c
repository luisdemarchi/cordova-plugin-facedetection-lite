//
//  FaceDetectionJni
//
#include <string.h>
#include <picornt.h>
#include <FaceDetectionJni.h>

JNIEXPORT jint JNICALL Java_br_com_luisdemarchi_FaceDetectionJni_find_1objects(JNIEnv *jenv, jclass jcls, jfloatArray jarg1, jint jarg2, jbyteArray jarg3, jfloat jarg4, jbyteArray jarg5, jint jarg6, jint jarg7, jint jarg8, jfloat jarg9, jfloat jarg10, jfloat jarg11, jfloat jarg12)
{
    (void)jenv;
    (void)jcls;
    jfloat *arg1 = (*jenv)->GetFloatArrayElements(jenv, jarg1, NULL);
    int arg2 = (int)jarg2;
    jbyte *arg3 = (*jenv)->GetByteArrayElements(jenv, jarg3, NULL);
    float arg4 = (float)jarg4;
    jbyte *arg5 = (*jenv)->GetByteArrayElements(jenv, jarg5, NULL);
    int arg6 = (int)jarg6;
    int arg7 = (int)jarg7;
    int arg8 = (int)jarg8;
    float arg9 = (float)jarg9;
    float arg10 = (float)jarg10;
    float arg11 = (float)jarg11;
    float arg12 = (float)jarg12;

    int result = find_objects(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12);

    (*jenv)->ReleaseFloatArrayElements(jenv, jarg1, arg1, 0);
    (*jenv)->ReleaseByteArrayElements(jenv, jarg3, arg3, 0);
    (*jenv)->ReleaseByteArrayElements(jenv, jarg5, arg5, 0);

    return (jint)result;
}

JNIEXPORT jint JNICALL Java_br_com_luisdemarchi_FaceDetectionJni_cluster_1detections(JNIEnv *jenv, jclass jcls, jfloatArray jarg1, jint jarg2)
{
    (void)jenv;
    (void)jcls;
    jfloat *arg1 = (*jenv)->GetFloatArrayElements(jenv, jarg1, NULL);
    int arg2 = (int)jarg2;
    int result = (int)cluster_detections(arg1, arg2);

    (*jenv)->ReleaseFloatArrayElements(jenv, jarg1, arg1, 0);

    return (jint)result;
}

JNIEXPORT jint JNICALL Java_br_com_luisdemarchi_FaceDetectionJni_update_1memory(JNIEnv *jenv, jclass jcls, jintArray jarg1, jfloatArray jarg2, jintArray jarg3, jint jarg4, jint jarg5, jfloatArray jarg6, jint jarg7, jint jarg8)
{
    (void)jenv;
    (void)jcls;
    jint *arg1 = (*jenv)->GetIntArrayElements(jenv, jarg1, 0);
    jfloat *arg2 = (*jenv)->GetFloatArrayElements(jenv, jarg2, NULL);
    jint *arg3 = (*jenv)->GetIntArrayElements(jenv, jarg3, NULL);
    int arg4 = (int)jarg4;
    int arg5 = (int)jarg5;
    jfloat *arg6 = (*jenv)->GetFloatArrayElements(jenv, jarg6, NULL);
    int arg7 = (int)jarg7;
    int arg8 = (int)jarg8;
    int result = (int)update_memory(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8);


    (*jenv)->ReleaseIntArrayElements(jenv, jarg1, arg1, 0);
    (*jenv)->ReleaseFloatArrayElements(jenv, jarg2, arg2, 0);
    (*jenv)->ReleaseIntArrayElements(jenv, jarg3, arg3, 0);
    (*jenv)->ReleaseFloatArrayElements(jenv, jarg6, arg6, 0);

    return (jint)result;
}