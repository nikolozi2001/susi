import { useLanguage } from '../../contexts/LanguageContext';

export default function StandardActs() {
  const { t } = useLanguage();

  // Categories of documents
  const documentCategories = [
    {
      id: 'general',
      documents: [
        { 
          id: 'ethics_code', 
          title: t('standardActs.ethics_code'),
          type: t('standardActs.order')
        },
        { 
          id: 'social_security', 
          title: t('standardActs.social_security'),
          type: t('standardActs.govResolution') 
        },
        { 
          id: 'special_equipment', 
          title: t('standardActs.special_equipment'),
          type: t('standardActs.order') 
        },
        { 
          id: 'service_rules', 
          title: t('standardActs.service_rules'),
          type: t('standardActs.order') 
        },
        { 
          id: 'salary_regulations', 
          title: t('standardActs.salary_regulations'),
          type: t('standardActs.resolution') 
        },
        { 
          id: 'sss_statute', 
          title: t('standardActs.sss_statute'),
          type: t('standardActs.govResolution') 
        },
        { 
          id: 'oath', 
          title: t('standardActs.oath'),
          type: t('standardActs.order') 
        }
      ]
    },
    {
      id: 'statutes',
      title: t('standardActs.statutes'),
      documents: [
        { 
          id: 'admin_dept', 
          title: t('standardActs.admin_dept')
        },
        { 
          id: 'anticorruption_dept', 
          title: t('standardActs.anticorruption_dept')
        },
        { 
          id: 'gen_inspection_dept', 
          title: t('standardActs.gen_inspection_dept')
        },
        { 
          id: 'economic_dept', 
          title: t('standardActs.economic_dept')
        },
        { 
          id: 'personnel_dept', 
          title: t('standardActs.personnel_dept')
        },
        { 
          id: 'protection_dept', 
          title: t('standardActs.protection_dept')
        },
        { 
          id: 'temp_detention_dept', 
          title: t('standardActs.temp_detention_dept')
        },
        { 
          id: 'legal_dept', 
          title: t('standardActs.legal_dept')
        }
      ]
    },
    {
      id: 'law',
      documents: [
        { 
          id: 'sss_law', 
          title: t('standardActs.sss_law'),
          type: t('standardActs.law')
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {t('information.standardActs')}
      </h1>

      {documentCategories.map((category) => (
        <div key={category.id} className="mb-8">
          {category.title && (
            <h2 className="text-2xl font-bold mb-4 text-susi-gray-800">
              {category.title}
            </h2>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-susi-gray-200">
              {category.documents.map((doc) => (
                <li 
                  key={doc.id} 
                  className="p-4 hover:bg-susi-gray-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="text-susi-gray-800 font-medium">
                      {doc.title}
                    </div>
                    {doc.type && (
                      <div className="text-sm text-susi-gray-600 bg-susi-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {doc.type}
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex gap-2">
                    <button 
                      className="text-sm px-3 py-1 bg-susi-gray-700 text-white rounded hover:bg-susi-darkgray transition-colors"
                      onClick={() => window.open(`/docs/${doc.id}.pdf`, '_blank')}
                    >
                      {t('standardActs.view')}
                    </button>
                    <button 
                      className="text-sm px-3 py-1 border border-susi-gray-300 rounded hover:bg-susi-gray-100 transition-colors"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `/docs/${doc.id}.pdf`;
                        link.download = `${doc.id}.pdf`;
                        link.click();
                      }}
                    >
                      {t('standardActs.download')}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* Note or disclaimer section */}
      <div className="mt-8 p-4 bg-susi-gray-50 border border-susi-gray-200 rounded-lg text-sm text-susi-gray-600">
        {t('standardActs.disclaimer')}
      </div>
    </div>
  );
}
