import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SampleReport = () => {
  const generateReport = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text('Technical Interview Report', 105, 10, { align: 'center' });

    // Add Subtitles
    doc.setFontSize(12);
    doc.text('Position: Software Engineer (Fresher)', 10, 30);
    doc.text('Candidate Name: John Doe', 10, 40);
    doc.text('Date: 2024-11-16', 10, 50);

    // Add Table
    const tableColumns = ['Category', 'Details'];
    const tableRows = [
      ['Knowledge in Programming Languages', 'Rating: 7/10'],
      ['Understanding of Theoretical Concepts', 'Rating: 6/10'],
      ['Problem-Solving Skills', 'Rating: 8/10'],
    ];

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 60,
    });

    // Add Summary
    doc.text('Overall Rating: 7/10', 10, doc.autoTable.previous.finalY + 10);
    doc.text(
      'Summary: Strong problem-solving skills; needs improvement in theoretical knowledge.',
      10,
      doc.autoTable.previous.finalY + 20
    );

    // Save PDF
    doc.save('Technical_Interview_Report.pdf');
  };

  return (
    <div>
      <h2>Generate Technical Interview Report</h2>
      <button onClick={generateReport}>Download Report</button>
    </div>
  );
};

export default SampleReport;
