import { useDropzone } from 'react-dropzone'
import { useCallback } from "react";
import { toast } from 'sonner'

const FileUploadZone = () => {
    const onDropAccepted = useCallback( files => {
        files.forEach((file) => {
            toast(`${file.path} has been uploaded`);
        });
        // Verify file types are accepted
        // Notify user of upload via toast
        // Upload files to backend server
    }, []);

    const onDropRejected = useCallback( files => {
        files.forEach((file) => {
            toast(`${file.path} has failed to upload`);
        });
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDropAccepted,
        onDropRejected,
        accept: { 'application/pdf': [] },
        maxFiles: 5
    });
  return (
    <div {...getRootProps({
        className: "flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 bg-white/60 mb-6"
    })}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center space-y-2">
          <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" /></svg>
          <span className="text-gray-700 font-medium">Select or drop files here</span>
          <span className="text-xs text-gray-500">PDF files only</span>
        </div>
    </div>
  );
};

export default FileUploadZone;
