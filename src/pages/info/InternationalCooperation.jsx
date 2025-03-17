import { useLanguage } from '../../contexts/LanguageContext';

export default function InternationalCooperation() {
  const { t, language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {t('information.internationalCooperation')}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Content will be displayed based on the selected language */}
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <p className="mb-4">
                მსოფლიოში მიმდინარე მოვლენების ფონზე, არსებულ საფრთხეებსა და გამოწვევებზე სათანადო რეაგირების უზრუნველყოფის მიზნით, სახელმწიფო უსაფრთხოების სამსახური განსაკუთრებულ ყურადღებას უთმობს საერთაშორისო თანამშრომლობის გაღრმავებასა და მჭიდრო, ორმხრივად დადებით შედეგებზე ორიენტირებული მეგობრული ურთიერთობების ჩამოყალიბებას სტრატეგიულ და არა მხოლოდ, პარტნიორ სახელმწიფოებთან, სხვადასხვა ქვეყნის შესაბამის უწყებებთან, რეგიონულ და საერთაშორისო ორგანიზაციებთან. საერთაშორისო თანამშრომლობა იძლევა ძალისხმევის გაერთიანებისა და ერთობლივი მოქმედების საშუალებას ისეთი გლობალური გამოწვევებისა და მნიშვნელოვანი საკითხების დასაძლევად, როგორიცაა: ტერორიზმი, კორუფცია, ტრანსნაციონალური, ორგანიზებული და საერთაშორისო დანაშაული, მასობრივი განადგურების იარაღის გავრცელება, ქიმიური, ბიოლოგიური, რადიაციული და ბირთვული საფრთხეები, კიბერუსაფრთხოება და სხვა.
              </p>
              
              <p className="mb-4">
                საქართველოს სახელმწიფო უსაფრთხოების სამსახურის საერთაშორისო თანამშრომლობა ემყარება საქართველოს კანონმდებლობას და ორმხრივ და მრავალმხრივ ფორმატში დადებულ შესაბამის საერთაშორისო ხელშეკრულებებს. საქართველო არის უსაფრთხოების სფეროში არსებული არაერთი საერთაშორისო კონვენციის მონაწილე მხარე, სხვადასხვა ქვეყნებთან გაფორმებულია ორმხრივი შეთანხმებები დანაშაულის წინააღმდეგ ბრძოლის სფეროში, ასევე, შეთანხმებები საიდუმლო ინფორმაციის გაცვლისა და ორმხრივად დაცვის შესახებ. მსგავსი შეთანხმებების დადება ქმნის მყარ სამართლებრივ საფუძველს უსაფრთხოების სფეროში ინფორმაციის გაცვლისა და თანამშრომლობის შემდგომი გაღრმავების უზრუნველსაყოფად. ამ მხრივ სტრატეგიული მნიშვნელობა აქვს 2016 წლის ივნისში ხელმოწერილ შეთანხმებას „საქართველოსა და ევროპის კავშირს შორის საიდუმლო ინფორმაციის გაცვლისა და დაცვის უსაფრთხოების პროცედურების შესახებ".
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახური აქტიურად თანამშრომლობს საქართველოში აკრედიტებული სხვადასხვა ქვეყნების უსაფრთხოების ატაშეებთან და დიპლომატიურ წარმომადგენლებთან. აღნიშნული თანამშრომლობის ფარგლებში, მათთან ინფორმაციის გაცვლა სისტემატურად მიმდინარეობს.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახური მჭიდროდ თანამშრომლობს საქართველოში აშშ-ის საელჩოსთან სხვადასხვა ფორმატში, მათ შორის, გამოძიების ფედერალური ბიუროს, ანტინარკოტიკული და სამართალდამცავ ორგანოებთან ურთიერთობის საერთაშორისო ბიუროს (INL), აშშ-ის თავდაცვის დეპარტამენტის თავდაცვის საფრთხეების შემცირების სააგენტოს (DTRA), ექსპორტის კონტროლისა და საზღვრის უსაფრთხოების (EXBS) და სხვა პროგრამების ფარგლებში.
              </p>
              
              <p className="mb-4">
                საქართველო არის ტერორიზმის წინააღმდეგ ბრძოლის გლობალური კოალიციის აქტიური წევრი და ჩართულია მრავალმხრივ ანტიტერორისტულ ოპერაციებში. სახელმწიფო უსაფრთხოების სამსახური ასევე გახდა ევროპის საბჭოს ტერორიზმთან ბრძოლის ექსპერტთა კომიტეტის (CODEXTER) წევრი.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახური აქტიურადაა ჩართული ევროკავშირთან ასოცირების შესახებ შეთანხმებისა და ასოცირების დღის წესრიგის განხორციელების ეროვნული სამოქმედო გეგმის იმპლემენტაციაში, ასევე, ევროკავშირის აღმოსავლეთ პარტნიორობის ქვეყნებთან თანამშრომლობის პროგრამებსა და ევროკავშირის ერთიანი უსაფრთხოებისა და თავდაცვის პოლიტიკის (CSDP) ფარგლებში დაგეგმილ ღონისძიებებში.
              </p>
              
              <p className="mb-4">
                სუს-ი აქტიურად თანამშრომლობს ნატო-სთან, მათ შორის ნატო-ს სამეკავშირეო ოფისთან. აღსანიშნავია, რომ სამსახური ჩართულია წლიური ეროვნული პროგრამის (ANP) შემუშავებისა და განხორციელების პროცესში. სახელმწიფო უსაფრთხოების სამსახური ასევე წარმოდგენილია ნატო-საქართველოს პროფესიული განვითარების პროგრამის (NATO PDP) მმართველ საბჭოში და მონაწილეობს ნატო-ს პარტნიორობისა და თანამშრომლობის მენიუს ფარგლებში დაგეგმილ ღონისძიებებში.
              </p>
              
              <p className="mb-4">
                სუს-ი აქტიურადაა ჩართული ეუთო-სა და სუამ-ის ეგიდით დანაშაულის წინააღმდეგ ბრძოლის სფეროში დაგეგმილ აქტივობებში, ასევე, შავი ზღვის ეკონომიკური თანამშრომლობის ორგანიზაციისა (BSEC) და ეკონომიკური თანამშრომლობისა და განვითარების ორგანიზაციის (OECD) ფარგლებში განხორციელებულ ღონისძიებებში. სუს-ი აქტიურად მონაწილეობს ევროკავშირისა და ევროპის საბჭოს მხარდაჭერით განხორციელებულ პროგრამებსა და პროექტებში.
              </p>
              
              <p className="mb-4">
                აგრეთვე, სუს-ის ქბრბ საფრთხეების წინააღმდეგ ბრძოლაში ჩართული დანაყოფის თანამშრომლები მონაწილეობას იღებენ საერთაშორისო ორგანიზაციებისა და პარტნიორი ქვეყნების მიერ ორგანიზებულ არაერთ საერთაშორისო სემინარსა და ტრენინგში.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                Considering the ongoing processes in the world, in order to tackle the threats and challenges properly one of the priorities of the State Security Service of Georgia is to develop and strengthen international cooperation and solid, mutually beneficial friendly relations with strategic and not only, partner countries, relevant agencies of different states, regional and international organizations. International cooperation offers a good opportunity for unifying effort and acting jointly in order to tackle the global challenges and issues such as terrorism, corruption, transnational organized and international crime, proliferation of weapons of mass destruction, chemical, biological, radiological and nuclear threats, cybersecurity and etc.
              </p>
              
              <p className="mb-4">
                The International Cooperation of the SSSG is guided by the national legislation of Georgia and respective bilateral and multilateral international agreements. Georgia is a party of a number of international conventions in the field of security. International agreements in the field of cooperation in fight against crime and agreements on exchange and mutual protection of classified information are concluded with various countries. Concluding such agreements create strong legal basis for sharing information and further enhancing cooperation in the field of security. In this regard, the signature of "Agreement between Georgia and the European Union on Security Procedures for exchanging and Protecting Classified Information" in June 2016 is of strategic importance.
              </p>
              
              <p className="mb-4">
                State Security Service of Georgia actively cooperates with security attaches and diplomatic representatives of different countries accredited in Georgia. Within the framework of such cooperation the information is exchanged on regular bases.
              </p>
              
              <p className="mb-4">
                State Security Service of Georgia actively cooperates with the Embassy of the United States of America to Georgia in different formats: within the framework of various programs of the Federal Bureau of Investigation, Defense Threat Reduction Agency (DTRA) of US Department of Defense; Export Control and Border Security Program (EXBS) and etc.
              </p>
              
              <p className="mb-4">
                Georgia is an active member of the global anti-terrorist coalition and participates in multinational anti-terrorist operations. State Security Service of Georgia has also become a member of Council of Europe Committee of Experts on Terrorism (CODEXTER).
              </p>
              
              <p className="mb-4">
                State Security Service of Georgia is actively involved in the process of implementation of EU-Georgia Association Agreement and its National Action Plan, in Eastern Partnership Programs and activities planned within the framework of the Common Security and Defence Policy (CSDP) of EU.
              </p>
              
              <p className="mb-4">
                State Security Service of Georgia actively cooperates with NATO, including with NATO Liaison Office. SSSG is involved in the process of drafting and implementation of Annual National Plan. SSSG is a member of the Management Board of NATO Professional Development Program and participates in activities planned within the framework of Partnership Cooperation Menu.
              </p>
              
              <p className="mb-4">
                The SSSG is actively involved in activities related to the fighting against crime under the auspices of OSCE and GUAM as well as in the events implemented within the framework of Organisation of the Black Sea Economic Cooperation (BSEC) and Organization for Economic Cooperation and Development (OECD). The SSSG participates in programs and projects supported and implemented by the EU and Council of Europe.
              </p>
              
              <p className="mb-4">
                Furthermore, the employees of the SSSG structural units responsible for fight against CBRN threats participate in numerous international seminars and trainings, organized by partner countries and international organizations.
              </p>
            </>
          )}
        </div>
        
        {/* Sidebar with key partnerships or a summary of international partners could be added here */}
        <div className="mt-8 p-4 bg-susi-gray-50 border border-susi-gray-200 rounded-lg">
          <h3 className="text-lg font-bold text-susi-black mb-3">
            {t('internationalCooperation.keyPartners')}
          </h3>
          
          <ul className="space-y-2 text-sm text-susi-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.eu')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.nato')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.un')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.osce')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.coe')}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{t('internationalCooperation.usPartnership')}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
