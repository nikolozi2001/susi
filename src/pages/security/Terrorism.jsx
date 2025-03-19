import { useLanguage } from '../../contexts/LanguageContext';

export default function Terrorism() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {language === 'ka' ? 'ტერორიზმთან ბრძოლა' : 'Fight Against Terrorism'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახურის ერთ-ერთი უმთავრესი პრიორიტეტია ტერორიზმის წინააღმდეგ ბრძოლა. თანამედროვე მსოფლიოში ტერორიზმის გლობალური საფრთხე ცვალებადი, არაპროგნოზირებადი და მზარდია. გლობალური ტერორისტული საფრთხის ყველაზე მკაფიო გამოვლინებაა ე.წ. „ისლამური სახელმწიფო". თუმცა, ამით არ მცირდება სხვა ტერორისტულ დაჯგუფებებთან („ალ-ქაიდა", „თალიბანი" და სხვა) ასოცირებული საფრთხეები.
              </p>
              
              <p className="mb-4">
                ახლო აღმოსავლეთში განვითარებული მოვლენები უარყოფითად აისახება კავკასიის რეგიონზეც. მიუხედავად იმისა, რომ საქართველო არ განეკუთვნება ტერორისტული თავდასხმის მაღალი რისკის ქვეყანათა რიცხვს, აღნიშნული მიმართულებით არსებობს გარკვეული გამოწვევები.
              </p>
              
              <p className="mb-4">
                საქართველოსთვის სასიცოცხლოდ მნიშვნელოვანია საკუთარ ტერიტორიაზე ნებისმიერი ტერორისტული საქმიანობის პრევენცია და აღკვეთა, რადგან აღნიშნული შესაძლებელია ცალკეული სახელმწიფოების მიერ საკუთარი სამხედრო და პოლიტიკური მიზნებისთვის იქნას გამოყენებული. ტერორიზმის წინააღმდეგ ბრძოლაში სახელმწიფო უსაფრთხოების სამსახურის უმთავრესი ამოცანაა ქვეყნის მიმართ ტერორისტული რისკების შემცირება, სახელმწიფოს, მისი ინტერესებისა და მოქალაქეების ტერორისტული საქმიანობის ყველა ფორმისაგან დაცვა. ამ მიმართულებით, უსაფრთხოების სამსახურის მიერ განხორციელდა მთელი რიგი ღონისძიებები.
              </p>
              
              <p className="mb-4">
                აღნიშნული მიზნად ისახავდა საქართველოს ტერიტორიაზე საერთაშორისო ტერორისტული ორგანიზაციებისა და მათთან დაკავშირებული პირების საქმიანობის გამოვლენასა და აღკვეთას. სამსახურის საქმიანობა ასევე მიმართული იყო სირიასა და ერაყში საბრძოლო მოქმედებებში მონაწილეობის მიზნით ქვეყნის ტერიტორიის სატრანზიტოდ გამოყენების ფაქტების გამოვლენაზე. ხორციელდებოდა ტერორისტულ ორგანიზაციებთან კავშირში მყოფ პირთა აქტიური კონტრტერორისტული ძებნა. აქტიურად ხორციელდებოდა რადიკალური იდეოლოგიის გამავრცელებელ პირთა და ორგანიზაციების ოპერატიული კონტროლი.
              </p>
              
              <p className="mb-4">
                უსაფრთხოების სამსახურის მხრიდან განსაკუთრებული ყურადღება დაეთმო რადიკალური იდეოლოგიის გავრცელების მიზნით ინტერნეტ-სივრცის გამოყენების პრევენციას. 2015 წლის ნოემბერში, შეიზღუდა წვდომა რადიკალური იდეოლოგიის გამავრცელებელ ვებ-გვერდებსა და სოციალურ მედიაში დარეგისტრირებულ ჯგუფებზე.
              </p>
              
              <p className="mb-4">
                საქართველოს მოქალაქეების საბრძოლო მოქმედებებში მონაწილეობისთვის გამგზავრების პრევენციის მიზნით, მუდმივად ტარდება შესაბამისი ღონისძიებები. სუს-სა და პარტნიორი სახელმწიფოების შესაბამის უწყებებს შორის მუდმივად ხდება ინფორმაციის გაცვლა ტერორისტულ ორგანიზაციაში გაწევრიანებულ ან/და კავშირში მყოფ პირებზე, ასევე ტრანზიტულად გადაადგილების მსურველებზე.
              </p>
              
              <p className="mb-4">
                ტერორისტული საქმიანობისთვის ქვეყნიდან გამგზავრებისა და შემოსვლის პრევენციის მიზნით, შსს-სთან თანამშრომლობით სათანადოდ ხორციელდება სასაზღვრო კონტროლი (საზღვრის მწვანე ზოლის, ასევე სასაზღვრო გამტარი პუნქტების). ხდება ვიზიტორებთან გასაუბრება. ყველა სასაზღვრო-გამტარი პუნქტი აღჭურვილია ბირთვული და რადიოაქტიური მასალების/ნივთიერებების დეტექტორებით. პერმანენტულ რეჟიმში ხორციელდება საზღვრის მართვაში ჩართული უწყებების თანამშრომელთა ტრენინგი, მათ შორის ყალბი სამგზავრო დოკუმენტების აღმოჩენის სფეროში.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახური აქტიურად თანამშრომლობს აშშ-სთან, ისრაელთან, დიდ ბრიტანეთსა და გერმანიასთან კონტრტერორისტული შესაძლებლობების გაუმჯობესების (საგამოძიებო და ანალიტიკური ტრენინგები), ოპერატიული ინფორმაციის გაცვლის, საქართველოსა და მის ფარგლებს გარეთ ერთობლივი ღონისძიების დაგეგმვის სფეროებში. განსაკუთრებული აღნიშვნის ღირსია თანამშრომლობა მეზობელ სახელმწიფოებთან.
              </p>
              
              <p className="mb-4">
                განსაკუთრებული ყურადღება ეთმობა ტერორისტულ საფრთხეებზე მზადყოფნისა და რეაგირების შესაძლებლობების გაუმჯობესებას. განხორციელდა ტერორისტული თავდასხმის პოტენციური სამიზნე სახელმწიფო სტრატეგიული ობიექტებისა და მათი დამხმარე შენობა-ნაგებობების პასპორტიზაცია და რისკების ანალიზი. შეფასდა მაღალი რისკის საზოგადოებრივი თავშეყრის ადგილების (ე.წ. იოლი სამიზნეები) უსაფრთხოების ზომები. მუდმივად ხორციელდება ტერორიზმის წინააღმდეგ მებრძოლი სპეციალური დანაყოფების მომზადება/გადამზადება როგორც ტაქტიკური მოქმედებების (სნაიპერის კურსები, ანტიტერორისტული ღონისძიებები ქალაქის პირობებში, ტერორისტების ბანაკების განადგურების ოპერაციები, სამთო მომზადების კურსები და ა.შ.), განაღმვითი სამუშაოების, ისე მასობრივი განადგურების საშუალებების გამოვლენისა და გაუვნებელყოფის კუთხით. ამ მიმართულებით ხაზგასასმელია საერთაშორისო პარტნიორების მხარდაჭერა. გაუმჯობესდა ტერორიზმის წინააღმდეგ მებრძოლი ტაქტიკური დანაყოფების მატერიალურ-ტექნიკური ბაზა.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                One of the main priorities of the State Security Service of Georgia is to fight against terrorism. In the modern world, the global threat of terrorism is constantly changing, unpredictable and ever increasing. The most obvious manifestation of the global threat of terrorism is "Islamic State". However, it does not exclude the threats coming from other terrorist groups ("Al-Qaeda", "Taliban" and others).
              </p>
              
              <p className="mb-4">
                Recent developments in the Middle East have negative affect over the Caucasus Region. Although Georgia is not among the countries with high risk of terrorist attack, there are some challenges in this respect.
              </p>
              
              <p className="mb-4">
                For Georgia it is vitally important to prevent and suppress any terrorist activities on its territory, as some of the states may rely on such activities for their own military and political intentions. In its counter terrorism activities, the main objective of the State Security Service is the reduction of the risks of terrorism and the protection of the state, its interests and citizens against all forms of terrorist activities. In this regard, the State Security Service has carried out a number of measures.
              </p>
              
              <p className="mb-4">
                The aim of the above-mentioned measures was the detection and suppression of activities carried out by international terrorist organizations and persons related to them. Activities of the SSSG also aimed at detecting facts of using Georgian territory as the transit state for participation in military activities in Syria and Iraq. Active search of individuals connected with terrorist organizations, as well as operative control over the individuals and organizations disseminating radical ideology were conducted.
              </p>
              
              <p className="mb-4">
                Particular attention has been paid by the SSSG towards prevention of using cyberspace for purposes of dissemination of radical ideology. In November 2015, access to the websites diffusing radical ideology and groups registered in social media were restricted.
              </p>
              
              <p className="mb-4">
                In order to prevent the travel of Georgian citizens for the purposes of taking part in hostile activites, appropraite measures are carried out on regular basis. Information is permanently exchanged between the SSSG and parntrer countries on members of terrorist organization and/or associated persons as well as individuals intending to travel via transit.
              </p>
              
              <p className="mb-4">
                In order to prevent entering or leaving the country for terrorist activities, border (so-called "green border", as well as border crossing points) is properly controled in cooperation with the Ministry of Internal Affairs of Georgia. Visitors are interviewed. All border crossing points are equipped with detectors of nuclear and radioactive materials/substances. Employees of border management authorities are regularly trained, inter alia, in the detection of forged travel documents.
              </p>
              
              <p className="mb-4">
                The State Security Service actively cooperates with the USA, Israel, the UK and Germany in developing counterterrorism capabilities (investigative and analytical trainings), exchanging operative information and planning joint activities in and out of Georgia. Cooperation with neighboring states should be particularly noted.
              </p>
              
              <p className="mb-4">
                Considerable attention is paid to enhancing the capabilities of readiness and responses to terrorist threats. National strategic objects and their subsidiary premises that might be the potential targets of terrorist attacks were officially documented and are analyzed in the light of possible risks. In addition, security measures on the places of public assembly bearing high risk (known as easy targets) have been assessed. Special unites responsible for counterterrorism activities are regularly trained/retrained in the field of tactical activities (sniper courses, counterterrorist actions in the urban conditions, operations on destruction of terrorists camps, mountainous training courses, etc.) and demining issues, as well as detection and suppression of means of mass destruction. Support of international partners' should be noted in this respect. Material-technical base of tactical units for fight against terrorism has been improved.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
