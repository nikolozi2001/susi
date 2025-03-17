# PDF Documents for Standard Acts

This directory contains PDF documents for the Standard Acts page. Make sure to name the files according to the IDs used in the StandardActs component.

## Required Files

The following files should be placed in this directory:

### General Documents
- `ethics_code.pdf` - Ethics code for employees
- `social_security.pdf` - Social protection rules
- `special_equipment.pdf` - Rules for special equipment
- `service_rules.pdf` - Service rules
- `salary_regulations.pdf` - Salary regulations
- `sss_statute.pdf` - State Security Service statute
- `oath.pdf` - Employee oath document

### Department Statutes
- `admin_dept.pdf` - Administration Department statute
- `anticorruption_dept.pdf` - Anti-corruption Agency statute
- `gen_inspection_dept.pdf` - General Inspection Department statute
- `economic_dept.pdf` - Economic Department statute
- `personnel_dept.pdf` - Personnel Department statute
- `protection_dept.pdf` - Protection Department statute
- `temp_detention_dept.pdf` - Temporary Detention Department statute
- `legal_dept.pdf` - Legal Department statute

### Laws
- `sss_law.pdf` - Law on State Security Service

## Adding Documents

When adding new documents, make sure:
1. The filename matches the ID used in the StandardActs component
2. The file is in PDF format
3. The file size is reasonable (preferably under 5MB)

## Testing

To test if documents are served correctly, run the application and navigate to http://localhost:5173/docs/sss_law.pdf (or any other document) to verify it loads properly.
