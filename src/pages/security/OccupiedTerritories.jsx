import { useLanguage } from '../../contexts/LanguageContext';

export default function OccupiedTerritories() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {language === 'ka' ? 'ოკუპირებული ტერიტორიები' : 'Occupied Territories'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <p className="mb-4">
                საქართველოს სახელმწიფო უსაფრთხოების სამსახურისათვის ერთ-ერთი მთავარი გამოწვევა ოკუპირებული ტერიტორიების არსებობა და იქ განთავსებული უცხო ქვეყნის სამხედრო ძალაა. ოკუპირებული აფხაზეთისა და ცხინვალის რეგიონის ტერიტორიაზე დიდი ოდენობით რუსული სამხედრო კონტინგენტი, თანამედროვე ტიპის მძიმე შეიარაღება, მათ შორის, შეტევითი სამხედრო ტექნიკის არსებობა, სახელმწიფოსთვის ეგზისტენციალურ საფრთხეს წარმოადგენს.
              </p>
              
              <p className="mb-4">
                რუსეთის ფედერაციის მხრიდან ოკუპირებული ტერიტორიების ანექსიის მცდელობა, იქ არსებული მძიმე კრიმინოგენული ვითარება (გამოსასყიდის მიღების მიზნით ადამიანების გატაცებები, ყაჩაღობები, მკვლელობები, მოსახლეობაზე თავდასხმა), ქართული მოსახლეობის დისკრიმინაცია, საქართველოს მოქალაქეების უკანონო დაკავება (ე.წ. საზღვრის უკანონო კვეთის ბრალდებით), ე.წ. ბორდერიზაციის პროცესი (მავთულხლართების, ღობეების, ე.წ. საზღვრის აღმნიშვნელი ბანერების აღმართვა და ტრანშეების გათხრა), თავისუფალი გადაადგილებისა და განათლების ხელმისაწვდომობის შეზღუდვა, ინტენსიური სამხედრო წვრთნები ოკუპირებულ ტერიტორიებზე, ასევე ცენტრალური ხელისუფლების მიერ კონტროლირებადი საჰაერო სივრცის რუსული სამხედრო თვითმფრინავების, ვერტმფრენებისა და უპილოტო საფრენი აპარატების მიერ დარღვევის ფაქტები და ოკუპირებული ტერიტორიების შესახებ საქართველოს კანონის დარღვევა საფრთხეს უქმნის ქვეყნის უსაფრთხოებას.
              </p>
              
              <p className="mb-4">
                ოკუპირებული ტერიტორიებიდან მომდინარე საფრთხეების შეკავებისა და რუსეთის ფედერაციის მხრიდან ანექსიისკენ მიმართული პროცესებისთვის ხელშეშლის მიზნით, საქართველოს სახელმწიფო უსაფრთხოების სამსახური ახდენს განვითარებული პროცესების შეფასებას, ატარებს შესაბამის ღონისძიებებს, აქტიურად მონაწილეობს ანექსიის წინააღმდეგ (პრევენციის) მიმართული პოლიტიკის, ასევე დეოკუპაციის მიმართულებით ნაბიჯების შემუშავებასა და განხორციელებაში. ინფორმაცია ოკუპირებული ტერიტორიებიდან მომდინარე საფრთხეებისა და იქ განვითარებული პროცესების შესახებ მუდმივად მიეწოდება შესაბამის სახელმწიფო უწყებებსა და საერთაშორისო პარტნიორებს.
              </p>
              
              <p className="mb-4">
                უსაფრთხოების სამსახური, საოკუპაციო ხაზის გასწვრივ მშვიდობიანი მოსახლეობის უსაფრთხოებისა და ადამიანის უფლებების მაქსიმალური დაცულობის უზრუნველყოფის მიზნით, მის ხელთ არსებული ყველა მექანიზმის გამოყენებით, სხვა პასუხისმგებელ უწყებებთან ერთად, ახორციელებს ადგილზე უსაფრთხოების ღონისძიებების კოორდინაციას.
              </p>
              
              <p className="mb-4">
                2015 წლის 1 აგვისტოდან, სახელმწიფო უსაფრთხოების სამსახური წამყვანი უწყებაა ცენტრალური ხელისუფლების მხრიდან ინციდენტების პრევენციისა და მათზე რეაგირების მექანიზმის (IPRM) ფორმატის შეხვედრებში. აღნიშნული მექანიზმის ფარგლებში, სუს-ი მუდმივად აყენებს საოკუპაციო ხაზის გასწვრივ და ოკუპირებულ ტერიტორიებზე ინციდენტების, ადამიანის უფლებების დარღვევის, ე.წ. სასაზღვრო ინფრასტრუქტურის უკანონო მოწყობის საკითხებს, ასევე საუბრობს საოკუპაციო ძალისა და დე ფაქტო ხელისუფლების მხრიდან სხვა უკანონო ქმედებებზე. სუს-ი ჩართულია ჟენევის საერთაშორისო დისკუსიებშიც.
              </p>
              
              <p className="mb-4">
                ოკუპირებული აფხაზეთის მიმართულებით (გალში), ჩვენი ხელისუფლებისა და ჟენევის დისკუსიების თანათავმჯდომარეების ძალისხმევის შედეგად, 2016 წლის 23 მარტს, ჟენევის საერთაშორისო დისკუსიების 35-ე რაუნდზე, მიღწეულ იქნა შეთანხმება გალში აღნიშნული შეხვედრების განახლებასთან დაკავშირებით. პირველი შეხვედრა გაიმართა 2016 წლის 27 მაისს.
              </p>
              
              <p className="mb-4">
                IPRM-ის ფარგლებში შექმნილი ერთ-ერთი ეფექტიანი მექანიზმია ე.წ. „ცხელი ხაზი", რომელიც 24-საათიანი კავშირის საშუალებას წარმოადგენს სუს-ის, ევროკავშირის სადამკვირვებლო მისიის (EUMM), რუსეთის ფედერაციის საოკუპაციო ძალებისა და ოკუპირებული ტერიტორიების დე ფაქტო მთავრობების წარმომადგენლებს შორის. ცენტრალური ხელისუფლების სახელით, მათთან კომუნიკაციას „ცხელი ხაზის" მეშვეობით, სუს-ის მეკავშირე-ოფიცერი ახორციელებს.
              </p>
              
              <p className="mb-4">
                უკანონოდ დაკავებულთა დროულად გასათავისუფლებლად, სახელმწიფო უსაფრთხოების სამსახური იყენებს მის ხელთ არსებულ ყველა  მექანიზმს, მათ შორის „ცხელ ხაზსა" და IPRM-ის შეხვედრებს (სადაც სხვა თემებთან ერთად განიხილება უკანონოდ დაკავებულთა გათავისუფლების საკითხები).
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახური განსაკუთრებულ ყურადღებას უთმობს საქართველოში ევროკავშირის სადამკვირვებლო მისიასთან (EUMM) თანამშრომლობას. მისია, საოკუპაციო ხაზის მიმდებარედ, მშვიდობისა და სტაბილურობის შენარჩუნებაში ერთ-ერთი ყველაზე დიდი კონტრიბუტორი და, ამასთანავე, ერთადერთი საერთაშორისო მონიტორია რეგიონში. სახელმწიფო უსაფრთხოების სამსახურსა და მისიას შორის 2015 წლის დეკემბერში ხელი მოეწერა ურთიერთთანამშრომლობის მემორანდუმს.
              </p>
              
              <p className="mb-4">
                სამსახური ასევე აქტიურად თანამშრომლობს წითელი ჯვრის საერთაშორისო კომიტეტთან (ICRC) ისეთ საკითხებზე, როგორებიცაა ოკუპირებული ცხინვალის რეგიონში მცხოვრები მოსახლეობისთვის გადაუდებელი სამედიცინო დახმარების გაწევა და მათი საქართველოს ცენტრალური ხელისუფლების მიერ კონტროლირებად ტერიტორიაზე გადმოყვანა. ასევე, აღსანიშნავია თანამშრომლობა გაერო-სთან.
              </p>
              
              <p className="mb-4">
                სუს-ი ჩართულია წითელი ჯვრის საერთაშორისო კომიტეტის ეგიდით ორგანიზებულ სამმხრივი შეხვედრების ფორმატში, რომელიც 90-იანი წლების კონფლიქტებისა და 2008 წლის რუსეთ-საქართველოს ომის დროს უგზო-უკვლოდ დაკარგულ და დაღუპულ პირთა მოძიებას ითვალისწინებს.
              </p>
              
              <p className="mb-4">
                უსაფრთხოების სამსახური აქტიურად მონაწილეობს ოკუპირებული ტერიტორიების საკითხებზე მომუშავე უწყებათაშორის ფორმატებში: ,,გამყოფი ხაზის" მიმდებარე სოფლებში დაზარალებული მოსახლეობის საჭიროებებზე რეაგირების დროებითი სამთავრობო კომისია, „კონფლიქტურ ტერიტორიებზე მიმდინარე პროცესებთან დაკავშირებით" საქართველოს პრემიერ-მინისტრთან არსებული უწყებათაშორისი სამუშაო ჯგუფი და სახელმწიფო უსაფრთხოების და კრიზისების მართვის საბჭოს აპარატის ეგიდით შექმნილი უწყებათაშორისი სამუშაო ჯგუფი.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                One of the main challenges of the State Security Service of Georgia is existence of the occupied territories and deployment of the foreign military force there. Large amount of Russian military contingent, modern type of heavy armament, including offensive military equipment on the occupied territories of Abkhazia and Tskhinvali Region, pose existential threat to the country.
              </p>
              
              <p className="mb-4">
                The attempt of annexation of the occupied territories by Russian Federation, heavy criminogenic situation (kidnapping for ransom, robberies, murders, attacks on population) discrimination of Georgian population, illegal detention of citizens of Georgia, (on the grounds of so-called illegal border crossing charges), the so-called borderization process (installation of wire fences, so-called border banners and excavation of trenches), restriction of freedom of movement and access to education, intensive military trainings on the occupied territories, also the facts of violation from Russian military aircrafts, helicopters and unmanned aerial vehicle of the air space controlled by central Government and violation of Law of Georgia on Occupied Territories pose threat to the security of the country.
              </p>
              
              <p className="mb-4">
                In order to suppress the threats coming from occupied territories and to prevent process towards annexation by Russian Federation, the State Security Service of Georgia carries out evaluation of processes, takes appropriate measures and actively participates in developing and implementing of the policy against (towards preventing) annexation and de-occupation. The information about threats and ongoing processes in the occupied territories is constantly delivered to state agencies and international partners.
              </p>
              
              <p className="mb-4">
                For the purpose of security of civilian population across occupational line and for ensuring maximum protection of human rights, in cooperation with other responsible agencies and to the extent of all available mechanisms, the State Security Service coordinates security measures in place.
              </p>
              
              <p className="mb-4">
                Since 1 August 2015, the State Security Service is a leading agency of representing the Central Government in Incident Prevention and Response Mechanism (IPRM) format meetings. Under this mechanism, the SSSG constantly addresses the issues of incidents, violations of human rights and the so-called illegal installations of border infrastructure across occupational line, as well as other illegal acts by occupation forces and de-facto government. The SSSG is involved in Geneva International Discussions as well.
              </p>
              
              <p className="mb-4">
                In the direction of the occupied Abkhazia (Gali), as a result of the efforts of the Central Government and co-chairs of Geneva Discussions, on 23 March 2016, on the 35th Round of Geneva Discussions, the agreement on renovation of Gali meetings was achieved. The first meeting was held on 27 May 2016.
              </p>
              
              <p className="mb-4">
                One of the effective mechanisms established under IPRM is the so-called "hot line" which enables 24 hours communication between the State Security Service, European Union Monitoring Mission (EUMM), Russian occupation forces and representatives of de facto Governments of occupied territories. On behalf of the Central Government the Liaison Officer of the State Security Service conducts communication with them through "hot line".
              </p>
              
              <p className="mb-4">
                In order to ensure timely release of illegally detained persons, the State Security Service uses all available mechanisms, including "hot line" and IPRM meetings (where along with other matters, the issue of release of illegally detained persons is also discussed).
              </p>
              
              <p className="mb-4">
                The State Security Service pays particular attention to the cooperation with The European Union Monitoring in Georgia (EUMM). The mission is one of the biggest contributors for maintaining peace and stability across the occupational line and represents the only international monitoring mechanism in the region. In December 2015, the memorandum of understanding on cooperation was signed between the State Security Service and the Mission.
              </p>
              
              <p className="mb-4">
                The Service also actively cooperates with the International Committee of the Red Cross on the issues related to the emergency medical aid for the population of the occupied Tskhinvali Region and their movement to the territory controlled by the Georgian central Government. Cooperation with the UN is also noteworthy.
              </p>
              
              <p className="mb-4">
                The State Security Service is involved in trilateral meetings organized under the auspices of the International Committee of the Red Cross, which envisages the search of missing and deceased persons during armed conflicts in 90s' and Russia-Georgia War in 2008.
              </p>
              
              <p className="mb-4">
                The State Security Service actively participates in the inter-agency mechanisms working on the issues related to the occupied territories: the Temporary Government Commission for Response to the Needs of the Affected Population Living in the Villages on the "Dividing Line", inter-agency working group under the Prime Minister focusing on "processes ongoing in the territories of conflict zones" and inter-agency working group created under the auspices of the State Security and Crisis Management Council.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
