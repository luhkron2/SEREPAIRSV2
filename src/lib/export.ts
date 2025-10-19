import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatMelbourneShort } from './time';

export interface ExportIssue {
  ticket: number;
  status: string;
  severity: string;
  category: string;
  description: string;
  fleetNumber: string;
  trailerA?: string | null;
  trailerB?: string | null;
  driverName: string;
  driverPhone?: string | null;
  location?: string | null;
  createdAt: Date | string;
}

export function generateCSV(issues: ExportIssue[]): string {
  const headers = [
    'Ticket',
    'Status',
    'Severity',
    'Category',
    'Description',
    'Fleet #',
    'Trailer A',
    'Trailer B',
    'Driver',
    'Phone',
    'Location',
    'Created',
  ];

  const rows = issues.map((issue) => [
    issue.ticket,
    issue.status,
    issue.severity,
    issue.category,
    `"${issue.description.replace(/"/g, '""')}"`, // Escape quotes
    issue.fleetNumber,
    issue.trailerA || '',
    issue.trailerB || '',
    issue.driverName,
    issue.driverPhone || '',
    issue.location || '',
    formatMelbourneShort(issue.createdAt),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  return csvContent;
}

export function generatePDF(issues: ExportIssue[]): Blob {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text('SE Repairs - Issues Report', 14, 20);

  // Date
  doc.setFontSize(10);
  doc.text(`Generated: ${formatMelbourneShort(new Date())}`, 14, 28);

  // Table
  autoTable(doc, {
    startY: 35,
    head: [
      [
        'Ticket',
        'Status',
        'Severity',
        'Fleet #',
        'Driver',
        'Category',
        'Created',
      ],
    ],
    body: issues.map((issue) => [
      issue.ticket,
      issue.status,
      issue.severity,
      issue.fleetNumber,
      issue.driverName,
      issue.category,
      formatMelbourneShort(issue.createdAt),
    ]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [71, 85, 105] },
  });

  return doc.output('blob');
}

export function downloadFile(content: string | Blob, filename: string, mimeType: string) {
  const blob = typeof content === 'string'
    ? new Blob([content], { type: mimeType })
    : content;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

