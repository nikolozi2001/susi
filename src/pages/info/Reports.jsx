import { useLanguage } from '../../contexts/LanguageContext';

export default function Reports() {
  const { t } = useLanguage();
  
  // Annual reports data
  const reports = [
    {
      id: 'report-2023',
      year: '2023',
      dateRange: '01.01.2023-31.12.2023'
    },
    {
      id: 'report-2022',
      year: '2022',
      dateRange: '01.01.2022-31.12.2022' // Fixed date range typo
    },
    {
      id: 'report-2021',
      year: '2021',
      dateRange: '01.01.2021-31.12.2021'
    },
    {
      id: 'report-2020',
      year: '2020',
      dateRange: '01.01.2020-31.12.2020'
    },
    {
      id: 'report-2019',
      year: '2019',
      dateRange: '01.01.2019-31.12.2019'
    },
    {
      id: 'report-2018',
      year: '2018',
      dateRange: '01.01.2018-31.12.2018'
    },
    {
      id: 'report-2017',
      year: '2017',
      dateRange: '01.01.2017-31.12.2017'
    },
    {
      id: 'report-2016',
      year: '2016',
      dateRange: '01.01.2016-31.12.2016'
    },
    {
      id: 'report-2015',
      year: '2015',
      dateRange: '01.08.2015-31.12.2015'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {t('information.reports')}
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <ul className="divide-y divide-susi-gray-200">
          {reports.map((report) => (
            <li 
              key={report.id} 
              className="p-6 hover:bg-susi-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-susi-gray-800">
                    {t('reports.annualReport')} {report.year}
                  </h2>
                  <p className="text-susi-gray-600 mt-1">
                    {report.dateRange}
                  </p>
                </div>
                <div className="text-sm text-susi-gray-600 bg-susi-gray-100 px-3 py-1 rounded-full whitespace-nowrap">
                  {t('reports.annualReport')}
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="px-4 py-2 bg-susi-gray-700 text-white rounded hover:bg-susi-darkgray transition-colors flex items-center"
                  onClick={() => window.open(`/reports/${report.id}.pdf`, '_blank')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {t('reports.view')}
                </button>
                
                <button 
                  className="px-4 py-2 border border-susi-gray-300 rounded hover:bg-susi-gray-100 transition-colors flex items-center"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = `/reports/${report.id}.pdf`;
                    link.download = `${t('reports.stateSecurityService')}-${report.year}.pdf`;
                    link.click();
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('reports.download')}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Additional information */}
      <div className="mt-8 p-4 bg-susi-gray-50 border border-susi-gray-200 rounded-lg text-sm text-susi-gray-600">
        {t('reports.disclaimer')}
      </div>
    </div>
  );
}
