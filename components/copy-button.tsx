import React, { useState, useEffect } from 'react';
import { ClipboardDocumentIcon, DocumentCheckIcon } from '@heroicons/react/24/outline';

function CopyButton({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
    if (isCopied) {
      timeoutId = setTimeout(() => setIsCopied(false), 1500);
    }
    return () => clearTimeout(timeoutId); 
  }, [isCopied]);

  return (
    <button
      onClick={handleCopy}
      className="btn btn-square btn-xs opacity-0 hover:opacity-100 transition-opacity duration-300"
    >
      {isCopied ? <DocumentCheckIcon /> : <ClipboardDocumentIcon />}
    </button>
  );
}

export default CopyButton;