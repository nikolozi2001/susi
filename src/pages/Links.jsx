import { useLanguage } from '../contexts/LanguageContext';

export default function Links() {
  const { t } = useLanguage();
  
  // Group links by category
  const linkGroups = [
    {
      id: 'government',
      links: [
        { key: 'government', url: 'https://www.gov.ge/' },
        { key: 'parliament', url: 'https://parliament.ge/' },
        { key: 'constitutional_court', url: 'https://constcourt.ge/' },
        { key: 'supreme_court', url: 'http://www.supremecourt.ge/' },
        { key: 'justice_ministry', url: 'https://www.justice.gov.ge/' },
        { key: 'interior_ministry', url: 'https://police.ge/' },
        { key: 'defense_ministry', url: 'https://mod.gov.ge/' },
        { key: 'foreign_ministry', url: 'https://mfa.gov.ge/' },
        { key: 'environment_ministry', url: 'https://mepa.gov.ge/' },
        { key: 'idp_ministry', url: 'https://www.moh.gov.ge/' },
        { key: 'prosecutor', url: 'https://pog.gov.ge/' },
        { key: 'intelligence', url: 'https://sis.gov.ge/' },
        { key: 'special_protection', url: 'https://ssps.gov.ge/' },
        { key: 'abkhazia_government', url: 'http://abkhazia.gov.ge/' },
        { key: 'data_protection', url: 'https://personaldata.ge/' },
      ]
    },
    {
      id: 'international',
      links: [
        { key: 'eu', url: 'https://european-union.europa.eu/' },
        { key: 'council_of_europe', url: 'https://www.coe.int/' },
        { key: 'un', url: 'https://www.un.org/' },
        { key: 'eumm', url: 'https://www.eumm.eu/' },
        { key: 'codexter', url: 'https://www.coe.int/en/web/counter-terrorism' },
        { key: 'nato', url: 'https://www.nato.int/' },
        { key: 'nato_liaison', url: 'https://www.nato.int/cps/en/natohq/topics_81066.htm' },
        { key: 'osce', url: 'https://www.osce.org/' },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-susi-black">{t('links.title')}</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {linkGroups.map((group) => (
          <div key={group.id} className="mb-10 last:mb-0">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-susi-gray-300">
              {t(`links.${group.id}_section`)}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.links.map((link) => (
                <li key={link.key}>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border border-susi-gray-200 rounded-lg hover:bg-susi-gray-50 transition-colors group"
                  >
                    <span className="flex-grow text-susi-gray-700 group-hover:text-susi-black">
                      {t(`links.${link.key}`)}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-susi-gray-400 group-hover:text-susi-gray-700" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
