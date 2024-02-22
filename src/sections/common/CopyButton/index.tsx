import React from 'react';
import IconButton from '../IconButton';

interface CopyButtonProps {
  textToCopy: string;
  onCopy?: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, onCopy }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      console.log('copied', textToCopy);
      if (onCopy) onCopy();
    } catch (err) {
      console.error('error copying:', err);
    }
  };

  return <IconButton onClick={handleCopy}>📋</IconButton>;
};

export default CopyButton;