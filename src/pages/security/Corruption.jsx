import { useLanguage } from '../../contexts/LanguageContext';

export default function Corruption() {
  const { language } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-susi-black">
        {language === 'ka' ? 'კორუფციის წინააღმდეგ ბრძოლა' : 'Fight against Corruption'}
      </h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="prose max-w-none">
          {language === 'ka' ? (
            <>
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების უზრუნველყოფაში გადამწყვეტი მნიშვნელობა ენიჭება კორუფციის წინაღმდეგ ბრძოლას. კორუფცია ხელყოფს საჯარო სექტორის გამართულ ფუნქციონირებას, ასუსტებს სახელმწიფო ინსტიტუტების მიმართ საზოგადოების ნდობას, აფერხებს ქვეყნის სტაბილურ და დემოკრატიულ განვითარებას. კორუმპირებული საჯარო მოხელეები დანაშაულებრივი დაჯგუფებებისა და უცხო ქვეყნების სპეცსამსახურების პოტენციურ სამიზნეებს წარმოადგენენ. სწორედ ამიტომ, კორუფციის წინააღმდეგ ბრძოლა სახელმწიფო უსაფრთხოების საკითხია.
              </p>
              
              <p className="mb-4">
                სახელმწიფო უსაფრთხოების სამსახურის ერთ-ერთ ძირითად პრიორიტეტს სამოხელეო დანაშაულის, საჯარო სამსახურში ინტერესთა შეუთავსებლობისა და კორუფციის ფაქტების, მათ შორის, „ელიტური კორუფციის" პრევენცია, გამოვლენა და აღკვეთა წარმოადგენს.
              </p>
              
              <p className="mb-4">
                სამსახური აქტიურადაა ჩართული საქართველოს მთავრობის 2014 წლის N236 დადგენილებით დამტკიცებული ფულის გათეთრებისა და ტერორიზმის დაფინანსების წინააღმდეგ ბრძოლის (2014-2017წწ.) სტრატეგიის ფარგლებში მიმდინარე ფულის გათეთრებისა და ტერორიზმის დაფინანსების ეროვნული რისკების შეფასების პროცესთან დაკავშირებით შექმნილი სამუშაო ჯგუფის მუშაობაში, ასევე საქართველოს მთავრობის 2013 წლის 30 დეკემბრის N390 დადგენილებით შექმნილ კორუფციის წინააღმდეგ ბრძოლის უწყებათშორის საკოორდინაციო საბჭოს ფარგლებში მოქმედ სამუშაო ჯგუფში.
              </p>
              
              <p className="mb-4">
                კორუფციასთან ბრძოლაში თანამედროვე სტანდარტებისა და მიდგომების გათვალისწინებით, ხდება საჯარო სამსახურში კორუფციასთან ბრძოლის საუკეთესო საერთაშორისო გამოცდილების გაზიარება. სამსახურის შესაბამისი დანაყოფის თანამშრომლები ინტენსიურად მონაწილეობენ დასავლელი პარტნიორების, მათ შორის აშშ-ის საელჩოს, ინტერპოლის, ევროკავშირის, ევროპის საბჭოს და ნატოს დახმარებით ორგანიზებულ პროგრამებში.
              </p>
            </>
          ) : (
            <>
              <p className="mb-4">
                Fight against corruption has huge significance in ensuring state security. Corruption endangers unimpeded functioning of public sector, weakens the public trust towards state institutions, and hinders democratic and stable development of the country. Corrupted public servants represent potential targets of foreign special services and criminal groups. Hence, fight against corruption is the concern of state security.
              </p>
              
              <p className="mb-4">
                One of the main priorities of the State Security Service (SSSG) is to prevent, detect and suppress malfeasance, conflict of interests in public service and corruption facts.
              </p>
              
              <p className="mb-4">
                The Service is actively involved in activities of the Working Group established in relation to national money laundering and terrorist financing risk assessment process in the frame of the Strategy on Fight Against Money-Laundering and Financing of Terrorism adopted by the Resolution №236 of 2014 of the Government of Georgia, as well as in activities of the Working Group formed under the Anti-Corruption Interagency Coordination Council established by Resolution №390 of 2013 of the Government of Georgia.
              </p>
              
              <p className="mb-4">
                Taking into consideration the modern anti-corruption standards and approaches, international best practices on fighting against corruption in public service are shared. Employees of relevant structural units of the SSSG intensively participate in programs organized by the western partners, including the US Embassy, Interpol, the EU, the Council of Europe and NATO.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
