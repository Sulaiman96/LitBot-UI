import { Fragment} from "react";

type UploadsTableProps = {
  files: { id: string | number; name: string }[];
  selectedFile?: { id: string | number; name: string } | null;
  onSelect?: (file: { id: string | number; name: string }) => void;
};

const UploadsTable = ({ files, selectedFile, onSelect }: UploadsTableProps) => {

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
          {files.map((file) => (
            <Fragment key={file.id}>
              <div className="flex items-center justify-center py-2">
                <input
                  type="radio"
                  name="uploads-table-select"
                  checked={selectedFile?.id === file.id}
                  onChange={() => onSelect && onSelect(file)}
                  aria-label={`Select ${file.name}`}
                />
              </div>
              <div className="flex items-center py-2 cursor-pointer" onClick={() => onSelect && onSelect(file)}>
                <span className="truncate text-gray-700 text-sm">
                  {file.name}
                </span>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadsTable;
