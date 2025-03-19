import { useLanguage } from '../../contexts/LanguageContext';

export default function CBRN() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {language === 'ka' ? 'ქბრბ უსაფრთხოება' : 'CBRN Security'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                ქიმიური, ბიოლოგიური, რადიოლოგიური და ბირთვული (ქბრბ) უსაფრთხოება, მასობრივი განადგურების იარაღისა და მასალების გავრცელების წინააღმდეგ ბრძოლა
              </h2>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების ერთ-ერთი მნიშვნელოვანი კომპონენტია ქიმიური, ბიოლოგიური, რადიოლოგიური და ბირთვული (ქბრბ) უსაფრთხოება. მიუხედავად გამომწვევი მიზეზებისა (ბუნებრივი, შემთხვევითი/ადამიანური შეცდომით გამოწვეული და კრიმინალური ფაქტორები), ქბრბ ინციდენტები, მასშტაბებიდან გამომდინარე, განსაკუთრებული საფრთხის შემცველია საზოგადოებისთვის.
              </p>
              
              <p className="mb-4">
                ქბრბ რისკებისა და საფრთხეების შემცირება მსოფლიოში ერთ-ერთ უმნიშვნელოვანეს პრიორიტეტს წარმოადგენს. გამონაკლისი არც საქართველოა. ამ კუთხით, ზოგადად, რეგიონია საინტერესო. ცალკეულ სახელმწიფოებს გააჩნიათ კარგად განვითარებული ბირთვული ინდუსტრია, რაც იმას ნიშნავს, რომ ნებისმიერმა ინციდენტმა შეიძლება უარყოფითი გავლენა იქონიოს საქართველოზე. ასევე, ქვეყანაში განთავსებულია ყოფილი საბჭოთა სამხედრო და სამეცნიერო დანიშნულების რამდენიმე მცირე ობიექტი, რადიოაქტიური და ქიმიური ნივთიერებების განთავსების ადგილები, ბიოლოგიური პროფილის დაწესებულებები. არსებული მდგომარეობის შეფასების შედეგად, სახელმწიფოს მხრიდან შემუშავდა სტრატეგიული, მეთოდური გეგმა უსაფრთხოების მკაცრი ზომების გატარების თვალსაზრისით. რისკის ან საფრთხის შემცველი ნებისმიერი კერა ან ობიექტი, სახელმწიფოს მხრიდან ექვემდებარება მუდმივ კონტროლს და მონიტორინგს.
              </p>
              
              <p className="mb-4">
                საქართველოს მთავრობა სრულად აცნობიერებს, რომ ქვეყნის სატრანზიტო ფუნქციისა და კონფლიქტის კერებთან სიახლოვის გამო, სახელმწიფოში არსებობს აღნიშნული მასალების უკანონო შემოტანის, ასევე ქვეყნის ტერიტორიის ტრანზიტისთვის გამოყენების რისკიც. ამ კუთხით ხელსაყრელი გარემოს ქმნის ოკუპირებული ტერიტორიების არსებობაც, სადაც დღემდე ვერ ხერხდება, არადა აუცილებელი და უაღრესად მნიშვნელოვანია უსაფრთხოების საერთაშორისო მექანიზმების შექმნა.
              </p>
              
              <p className="mb-4">
                სირიასა და ერაყში საბრძოლო მოქმედებების ფონზე, ჩვენი პარტნიორი ქვეყნების სადაზვერვო და უსაფრთხოების სტრუქტურები ხშირად საუბრობენ ისლამისტების მიერ ქიმიური, ბიოლოგიური და ბირთვული ტერორიზმის შესაძლებლობასა და ალბათობაზე.
              </p>
              
              <p className="mb-4">
                ეს არის გამოწვევები, რომელთა საპასუხოდ აუცილებელია როგორც ეროვნული, ისე საერთაშორისო ძალისხმევა შესაბამისი საფრთხეების პრევენციისა და გამოვლენის, მათზე მზადყოფნისა და რეაგირების მიზნით.
              </p>
              
              <p className="mb-4">
                ქბრბ უსაფრთხოების სფეროში საქართველომ გადადგა ქმედითი ნაბიჯები და მიაღწია სერიოზულ წარმატებას. მთავრობის მეირ ჩამოყალიბდა ერთიანი მიდგომა, შეიქმნა ქბრბ საფრთხეების წინააღმდეგ ბრძოლის უწყებათშორისი საკოორდინაციო საბჭო, რომელსაც სახელმწიფო უსაფრთხოების სამსახური თავმჯდომარეობს. საბჭოს ფარგლებში და ჩვენი ამერიკელი და ევროპელი პარტნიორების მხარდაჭერით, შემუშავდა და დამტკიცდა ქბრბ საფრთხეების შემცირების ეროვნული სტრატეგია და შესაბამისი სამოქმედო გეგმა. სუს-ი კოორდინაციას უწევს სამოქმედო გეგმის იმპლემენტაციას.
              </p>
              
              <p className="mb-4">
                ამასთან, სუს-ი აქტიურად მონაწილეობს ევროკავშირის ინიციატივაში „ქბრბ რისკების შემცირების გამოცდილების გაზიარების ცენტრები" და მჭიდროდ თანამშრომლობს ამ ინიციატივის თბილისის რეგიონულ სამდივნოსთან, ასევე, აშშ-სთან, გაერო-სთან და სხვა პარტნიორ ქვეყნებთან თუ ორგანიზაციებთან. ევროკავშირის ინიციატივის ფარგლებში საქართველო პირველი ქვეყანაა, რომელმაც შეიმუშავა და დაამტკიცა სტრატეგია და სამოქმედო გეგმა.
              </p>
              
              <p className="mb-4">
                2015 წელს, სახელმწიფო უსაფრთხოების სამსახურის აქტიური ძალისხმევის შედეგად, საქართველოს მთავრობის ინიციატივით, ფილიპინებისა და მაროკოს მთავრობებთან ერთად, შეიქმნა „ქიმიური, ბიოლოგიური, რადიოლოგიური და ბირთვული რისკების შემცირებისა და უსაფრთხოების მმართველობის შესახებ გაერო-ს მეგობართა ჯგუფი" (UN Group of Friends on CBRN Risk Mitigation and Security Governance). 2015 წლის 8 დეკემბერს, გაერო-ში საქართველოს მისიის თავმჯდომარეობით, გაიმართა ჯგუფის პირველი დამფუძნებელი სხდომა, რომელსაც 27 წევრი ქვეყანა ესწრებოდა.
              </p>
              
              <p className="mb-4">
                სუს-ისთვის, ასევე, პრიორიტეტულია საქართველოს გაწევრიანება დიდი შვიდეულის მასობრივი განადგურების იარაღისა და მასალების გავრცელების წინააღმდეგ გლობალურ პარტნიორობაში.
              </p>
              
              <p className="mb-4">
                სუს-ი უზრუნველყოფს სახელმწიფო საზღვარზე არსებული რადიაციული კონტროლის სისტემების ტექნიკურ და პროგრამულ გამართულობას. საქართველოს მთავარი პარტნიორი ბირთვული გაუვრცელებლობისა და რადიაციული უსაფრთხოების საკითხებში არის აშშ.
              </p>
              
              <p className="mb-4">
                აგრეთვე, განსაკუთრებული ყურადღება ეთმობა ქბრბ ნივთიერებებისა და მასალების უკანონო ბრუნვის წინააღმდეგ ბრძოლას.
              </p>
              
              <p className="mb-4">
                სწორედ უსაფრთხოების სამსახურის კომპეტენციას განეკუთვნება აღნიშნულ სფეროში დანაშაულის, მათ შორის ბირთვული მასალისა და რადიოაქტიური ნივთიერებისადმი უკანონო მოპყრობის, ასევე, მასობრივი განადგურების იარაღის დამზადების, შეძენის ან გასაღების ფაქტების გამოძიება. უსაფრთხოების სამსახურის მიერ, ბოლო პერიოდის განმავლობაში, აღკვეთილია ბირთვული და რადიოაქტიური მასალების უკანონო ბრუნვის 4 ფაქტი. მათგან 2 შემთხვევაში ადგილი ჰქონდა გაღარიბებული და დაბალგამდიდრებული ურანის უკანონო ბრუნვას. პასუხისგებაში მიცემულია 19 პირი.
              </p>
              
              <p className="mb-4">
                რადიოაქტიური ნივთიერებების უკანონო ბრუნვის აღკვეთის სფეროში, სამსახური უდიდეს მნიშვნელობას ანიჭებს აშშ-თან ხელმოწერილი ბირთვული მასალების კონტრაბანდის წინააღმდეგ ერთობლივი სამოქმედო გეგმის (Joint Document of US and Georgian Delegations on Georgia's Priority Needs To Improve Its Capabilities to Combat Nuclear Smuggling) შესრულებას.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Chemical, Biological, Radiological and Nuclear (CBRN) Security; Fight against proliferation of Weapons and Materials of Mass Destruction
              </h2>
              
              <p className="mb-4">
                Chemical, biological, radiological and nuclear (CBRN) security represents one of the main elements of the state security. Despite the causes (natural, incidental/human fault or criminal factors), CBRN incidents due to their scope, pose significant threat to the public.
              </p>
              
              <p className="mb-4">
                CBRN risks and threats reduction is one of the top priorities in the world. And Georgia is no exemption. Generally, the region is quite interesting in this regard. Certain states have well-developed nuclear industry, and this means that any incident may adversely affect Georgia. Also, several former soviet military and scientific small facilities, storage areas for radioactive and chemical substances, facilities of biological facilities are located in the country. In the process of assessing the existing situation, a strategic, systematic plan has been elaborated by the State in terms of carrying out stringent security measures. Any source or object containing risk or threat is subject to permanent State control and monitoring.
              </p>
              
              <p className="mb-4">
                The Government of Georgia fully acknowledges that, due to the transit function of the country and adjacency to conflict areas, there are the risks of illicit import of the mentioned materials as well as using the territory of the country as a transit. In this regard it should be further noted the factor of occupied territories, where international security mechanisms have not been established yet, despite of the necessity and huge importance of the matter.
              </p>
              
              <p className="mb-4">
                Considering the hostile activities carried out in Syria and Iraq, the security and intelligence structures of our partners often mention the possibility and probability of chemical, biological and nuclear terrorism by Islamist terrorists.
              </p>
              
              <p className="mb-4">
                These are the challenges in response to which national as well as international efforts are required to prevent and detect relevant threats, to be prepared and to respond thereto.
              </p>
              
              <p className="mb-4">
                In the field of CBRN security Georgia has taken effective measures and achieved significant success. The Government has developed a consolidated approach, Interagency Coordination Council on Combating CBRN Threats has been established, which is led by the State Security Service of Georgia. Under the Council and with the support of our American and European partners, the CBRN Threat Reduction National Strategy and relevant Action Plan have been elaborated and adopted. The SSSG coordinated the implementation of the Action Plan.
              </p>
              
              <p className="mb-4">
                Furthermore, the SSSG actively participates in EU CBRN Risk Mitigation Centre of Excellence Initiative and closely cooperates with Tbilisi Regional Secretariat of this Initiative, as well as with the USA, the UN and other partner countries or international organizations. Under the EU Initiative Georgia is the first country which elaborated and adopted the Strategy and Action Plan.
              </p>
              
              <p className="mb-4">
                In 2015, as a result of the active efforts of the SSSG and by the initiative of the Georgian Government, together with the Governments of Philippines and Morocco, UN Group of Friends on CBRN Risk Mitigation and Security Governance was established. On 8 December 2015 the first inaugural session of the Group was held, chaired by the Mission of Georgia in the UN and attended by 27 member countries.
              </p>
              
              <p className="mb-4">
                It is also a priority for the SSSG to become a member of the G7 Global Partnership against the Spread of Weapons and Materials of Mass Destruction.
              </p>
              
              <p className="mb-4">
                The State Security Service ensures technical and software functioning of radioactive control systems at the state border. In nuclear non-proliferation and radiation security areas Georgia's main partner is the U.S.
              </p>
              
              <p className="mb-4">
                Furthermore, special attention is paid to the fight against illegal trafficking of CBRN substances and materials.
              </p>
              
              <p className="mb-4">
                It is the competence of the State Security Service of Georgia to investigate crimes in this field, including illicit treatment of nuclear materials and radioactive substances, as well as facts of production, acquisition or selling weapons of mass destruction. Over the recent period, the State Security Service of Georgia has suppressed 4 facts of illicit traffic in nuclear and radioactive materials. Two of these facts concerned the illicit traffic in depleted and low-enriched uranium. 19 persons have been charged.
              </p>
              
              <p className="mb-4">
                The SSSG grants significant importance to the implementation of Joint Document of the US and Georgian Delegations on Georgia's Priority Needs to Improve Its Capabilities to Combat Nuclear Smuggling in terms of suppression of illegal trafficking of radioactive substances.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
