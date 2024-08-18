'use client';

import Image from 'next/image';

const DocumentModal = ({ documentUrl }) => {
  return (
    <div>
      <div className="relative h-[500px]">
        <div className="flex-1 overflow-auto re">
          <Image src={documentUrl} alt="doc" fill className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;
