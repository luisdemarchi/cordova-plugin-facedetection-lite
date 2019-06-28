package br.com.luisdemarchi;

public class FaceDetectionJni {

    // C-function interface
    public static native int find_objects(float []rcsq, int maxndetections, byte []cascade, float angle, byte []pixels, int nrows, int ncols, int ldim, float scalefactor, float stridefactor, float minsize, float maxsize);
    public static native int cluster_detections(float []rcsq, int n);
    public static native int update_memory(int []slot, float []memory, int []counts, int nmemslots, int maxslotsize, float []rcsq, int ndets, int maxndets);


    // load library
    static {
        System.loadLibrary("picornt");
    }
}
