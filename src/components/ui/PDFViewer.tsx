import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import pdfjs from 'pdfjs-dist';

const PDFViewer = ({ pdfUrl }) => (
  <Worker workerUrl={`https://unpkg.com/pdfjsdist@${pdfjs?.version}/build/pdf.worker.min.js`}>
    <Viewer fileUrl={pdfUrl} />
  </Worker>
);

export default PDFViewer;

