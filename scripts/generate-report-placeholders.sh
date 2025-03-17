#!/bin/bash

# Create reports directory if it doesn't exist
mkdir -p public/reports

# List of report years
YEARS=(
  "2015"
  "2016"
  "2017"
  "2018"
  "2019"
  "2020"
  "2021"
  "2022"
  "2023"
)

# List of languages
LANGUAGES=("ka" "en")

# Create a basic placeholder PDF for each report and language
for year in "${YEARS[@]}"; do
  for lang in "${LANGUAGES[@]}"; do
    # Skip if file already exists
    if [ -f "public/reports/report-${year}_${lang}.pdf" ]; then
      echo "Skipping existing file: report-${year}_${lang}.pdf"
      continue
    fi
    
    echo "Creating placeholder for: report-${year}_${lang}.pdf"
    
    # Set date range
    if [ "$year" == "2015" ]; then
      DATE_RANGE="01.08.2015-31.12.2015"
    else
      DATE_RANGE="01.01.${year}-31.12.${year}"
    fi
    
    # Set language text
    LANG_TEXT="Georgian"
    if [ "$lang" == "en" ]; then
      LANG_TEXT="English"
    fi
    
    # Create a minimal PDF file
    cat > "public/reports/report-${year}_${lang}.pdf" << EOF
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
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Length 280 >>
stream
BT
/F1 24 Tf
100 700 Td (State Security Service of Georgia) Tj
/F1 20 Tf
100 650 Td (Annual Report ${year}) Tj
/F1 16 Tf
100 600 Td (Reporting Period: ${DATE_RANGE}) Tj
/F1 14 Tf
100 560 Td (Language: ${LANG_TEXT}) Tj
/F1 12 Tf
100 520 Td (This is a placeholder PDF for the annual report.) Tj
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
650
%%EOF
EOF

  done
done

echo "Done creating language-specific placeholder PDFs in public/reports/"
