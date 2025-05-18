import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

type FileSourceWindowProps = {
    fileURL: string | null
}
const FileSourceWindow = ({ fileURL  }: FileSourceWindowProps) => {
  return (
    <div className="h-full w-full p-4 rounded-xl bg-white flex items-center justify-center text-gray-400 text-sm">
        {
            !fileURL ? (
                <div>PDF Source Preview (placeholder)</div>
            ) : (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                    <Viewer fileUrl={fileURL} />;
                </Worker>
            )
        }

    </div>
  );
};

export default FileSourceWindow;
