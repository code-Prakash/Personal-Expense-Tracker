const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4">

        {/* Modal Box */}
        <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-300 border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>

            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 bg-transparent hover:text-gray-900 hover:bg-gray-200 rounded-lg w-8 h-8 flex items-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer justify-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4 md:p-5">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Modal;
