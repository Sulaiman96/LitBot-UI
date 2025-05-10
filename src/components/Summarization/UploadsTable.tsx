import React from "react";

type UploadsTableProps = {
  files: { id: string | number; title: string }[];
};

const UploadsTable = ({ files }: UploadsTableProps) => {
  return (
    <div className="w-full bg-white/80 rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-700">Recently Uploaded</span>
        <input
          type="text"
          placeholder="Search for papers"
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>
      <div className="border-t border-b border-gray-200 max-h-56 overflow-y-auto">
        <div className="grid grid-cols-[40px_1fr]">
          {/* Table header row (optional, can be left blank for checkboxes) */}
          {/* <div></div><div></div> */}
          {files.map((file) => (
            <React.Fragment key={file.id}>
              <div className="flex items-center justify-center py-2">
                <input type="checkbox" />
              </div>
              <div className="flex items-center py-2">
                <span className="truncate text-gray-700 text-sm">
                  {file.title}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadsTable;
