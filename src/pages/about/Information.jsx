import { useLanguage } from '../../contexts/LanguageContext';

export default function Information() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {language === 'ka' ? 'სახელმწიფო უსაფრთხოების სამსახური' : 'State Security Service of Georgia'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <p className="mb-4">
                ეროვნული უსაფრთხოების უზრუნველყოფა ნებისმიერი დემოკრატიული სახელმწიფოს უმთავრესი ამოცანაა.
              </p>
              
              <p className="mb-4">
                საქართველოს წინაშე არსებული გამოწვევებისა და საფრთხეების საპასუხოდ, უსაფრთხოების სისტემის ეფექტიანი და დემოკრატიული ფუნქციონირების მიზნით, 2015 წლის 1 აგვისტოს შეიქმნა დამოუკიდებელი, დეპოლიტიზებული, პროფესიული ნიშნით დაკომპლექტებული და ანგარიშვალდებულების მაღალი ხარისხის მქონე სახელმწიფო უსაფრთხოების სამსახური.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახურის საქმიანობის მიმართულებები, ფუნქციები და უფლებამოსილებები მკაფიოდაა განსაზღვრული საკანონმდებლო დონეზე. "სახელმწიფო უსაფრთხოების სამსახურის შესახებ" საქართველოს კანონის თანახმად, საქართველოს სახელმწიფო უსაფრთხოების სამსახური არის საქართველოს მთავრობის უშუალო დაქვემდებარებაში არსებული აღმასრულებელი ხელისუფლების სპეციალური დანიშნულების დაწესებულებათა სისტემა, რომელიც თავისი კომპეტენციის ფარგლებში უზრუნველყოფს სახელმწიფო უსაფრთხოებას.
              </p>
              
              <p className="mb-4">
                სამსახურის საქმიანობის მიმართულებებია: საქართველოს კონსტიტუციური წყობილების, სუვერენიტეტის, ტერიტორიული მთლიანობისა და სამხედრო პოტენციალის უცხო ქვეყნების სპეციალური სამსახურებისა და ცალკეულ პირთა მართლსაწინააღმდეგო ქმედებებისაგან დაცვა, საქართველოს კონსტიტუციური წყობილებისა და სახელმწიფო ხელისუფლების არაკონსტიტუციური, ძალადობრივი გზით შეცვლის გამოვლენა და მათი დაცვის უზრუნველყოფა, ქვეყნის ეკონომიკური უსაფრთხოების უზრუნველყოფა, ტერორიზმთან ბრძოლა, სახელმწიფო უსაფრთხოებისთვის საფრთხის შემცველი ტრანსნაციონალური ორგანიზებული დანაშაულის და საერთაშორისო დანაშაულის წინააღმდეგ ბრძოლა, კორუფციის თავიდან აცილების, გამოვლენისა და აღკვეთის ღონისძიებების განხორციელება, სახელმწიფო საიდუმლოების დაცვა, სახელმწიფო საიდუმლოების დაცვის უზრუნველყოფის ღონისძიებათა განხორციელება საქართველოს კანონმდებლობით დადგენილი წესით და მათი შესრულების კონტროლი, ქვეყნის საგარეო საფრთხეებისაგან დაცვა.
              </p>
              
              <p className="mb-4">
                უსაფრთხოების სამსახური შედგება 17 სტრუქტურული ერთეულისგან. ესენია: ადმინისტრაცია, გენერალური ინსპექცია, ეკონომიკური, საინფორმაციო-ანალიტიკური, კონტრდაზვერვის, სახელმწიფო უსაფრთხოების, კონტრტერორისტული ცენტრი, ანტიკორუფციული სააგენტო, უსაფრთხოების დაცვის რეჟიმის, ოპერატიული ღონისძიებებისა და სპეციალური ოპერაციების დეპარტამენტები; იურიდიული, ობიექტების დაცვის, დროებითი მოთავსების უზრუნველყოფისა და კადრების მთავარი სამმართველოები; სსიპ - საქართველოს ოპერატიულ-ტექნიკური სააგენტო, სსიპ - საქართველოს სახელმწიფო უსაფრთხოების სამსახურის სასწავლო ცენტრი.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახურის მისიაა საქართველოს მოქალაქეების უსაფრთხო გარემოში ცხოვრების უზრუნველყოფა. სამსახური ხელმძღვანელობს სახელმწიფოსა და მისი თითოეული მოქალაქის ინტერესების გათვალისწინებით. მისი საქმიანობა ხორციელდება იმგვარად, რომ თანაბრად იყოს დაცული როგორც ქვეყნის უსაფრთხოება, ისე ადამიანის ძირითადი უფლებები და თავისუფლებები.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                The main goal of any democratic country is to ensure national security of the state.
              </p>
              
              <p className="mb-4">
                In response to the current threats and challenges facing Georgia and with the aim to ensure effecient and democratic functioning of security system, on 1st of August 2015 independent, depoliticized, professional and highly accountable State Security Service of Georgia was established.
              </p>
              
              <p className="mb-4">
                The mandate, functions and authority of the State Security Service have been clearly defined at the legislative level. According to the Law of Georgia on "State Security Service of Georgia", the State Security Service is the system of special-purpose institutions of executive branch directly subordinated to the Government of Georgia, which ensures state security within its scope of competence.
              </p>
              
              <p className="mb-4">
                The directions of activity of the Service for ensuring state security include the following: to protect constitutional order, sovereignty, territorial integrity and military potential of Georgia from illegal acts of special services and certain individuals of foreign countries; to detect unconstitutional, violent change of constitutional order and state authority of Georgia and ensure their protection; to ensure economic security of the country; to fight against terrorism; to fight against transnational organized crime and international crime, containing threat to the state security; to carry out measures towards prevention, detection and suppression of corruption; to protect state secrets, conduct measures to ensure the protection of state secrets as provided by the legislation of Georgia and monitor their implementation; to protect the country from external threats.
              </p>
              
              <p className="mb-4">
                The Service consists of following thirteen structural entities: Administration, Counterterrorism Center and Anti-Corruption Agency, General Inspection, Counterintelligence, State Security, Information-Analytical, Operative-Technical, Operative Measures, Economic, Special Operations Departments, Facilities Protection and Human Resources Main Divisions.
              </p>
              
              <p className="mb-4">
                The mission of the State Security Service is to ensure a secure environment for the citizens of Georgia. The Service is guided by the interests of the state and its citizens. The activities of the Service are carried out in the manner that ensures equal protection of state security as well as fundamental rights and freedoms of an individual.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
