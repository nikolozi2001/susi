#!/bin/bash

# Create docs directory if it doesn't exist
mkdir -p public/docs

# List of document IDs
DOCUMENTS=(
  "ethics_code"
  "social_security"
  "special_equipment"
  "service_rules"
  "salary_regulations"
  "sss_statute"
  "oath"
  "admin_dept"
  "anticorruption_dept"
  "gen_inspection_dept"
  "economic_dept"
  "personnel_dept"
  "protection_dept"
  "temp_detention_dept"
  "legal_dept"
  "sss_law"
)

# Create a basic placeholder PDF for each document
for doc in "${DOCUMENTS[@]}"; do
  # Skip if file already exists
  if [ -f "public/docs/${doc}.pdf" ]; then
    echo "Skipping existing file: ${doc}.pdf"
    continue
  fi
  
  echo "Creating placeholder for: ${doc}.pdf"
  
  # Create a minimal PDF file
  cat > "public/docs/${doc}.pdf" << EOF
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources 4 0 R /MediaBox [0 0 612 792] /Contents 6 0 R >>
endobj
4 0 obj
<< /Font << /F1 5 0 R >> >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
6 0 obj
<< /Length 100 >>
stream
BT
/F1 24 Tf
100 700 Td (Placeholder Document) Tj
/F1 18 Tf
100 650 Td (${doc}) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000210 00000 n
0000000252 00000 n
0000000320 00000 n
trailer << /Size 7 /Root 1 0 R >>
startxref
470
%%EOF
EOF

done

echo "Done creating placeholder PDFs in public/docs/"
