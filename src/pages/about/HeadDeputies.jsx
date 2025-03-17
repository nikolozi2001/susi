import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function HeadDeputies() {
  const { language } = useLanguage();
  const [selectedOfficial, setSelectedOfficial] = useState(null);
  
  // Officials data with both Georgian and English information
  const officials = [
    {
      id: 'liluashvili',
      nameGe: 'გრიგოლ ლილუაშვილი',
      nameEn: 'Grigol Liluashvili',
      positionGe: 'საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსი',
      positionEn: 'Head of the State Security Service of Georgia',
      photo: '/assets/images/officials/liluashvili.jpg',
      bioGe: 'გრიგოლ ლილუაშვილი დაინიშნა საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსად. მას აქვს მრავალწლიანი გამოცდილება უსაფრთხოების სფეროში და წარმატებით უძღვება სამსახურის საქმიანობას.',
      bioEn: 'Grigol Liluashvili was appointed as the Head of the State Security Service of Georgia. He has many years of experience in the security field and successfully leads the activities of the service.'
    },
    {
      id: 'batiashvili',
      nameGe: 'ალექსი ბატიაშვილი',
      nameEn: 'Aleksi Batiashvili',
      positionGe: 'საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის პირველი მოადგილე',
      positionEn: 'First Deputy Head of the State Security Service of Georgia',
      photo: '/assets/images/officials/batiashvili.jpeg',
      bioGe: 'ალექსი ბატიაშვილი არის საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის პირველი მოადგილე. იგი პასუხისმგებელია სამსახურის ოპერაციულ საქმიანობაზე.',
      bioEn: 'Aleksi Batiashvili is the First Deputy Head of the State Security Service of Georgia. He is responsible for the operational activities of the service.'
    },
    {
      id: 'pitskhelauri',
      nameGe: 'შენგელი ფიცხელაური',
      nameEn: 'Shengeli Pitskhelauri',
      positionGe: 'საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილე',
      positionEn: 'Deputy Head of the State Security Service of Georgia',
      photo: '/assets/images/officials/pitskhelauri.jpg',
      bioGe: 'შენგელი ფიცხელაური საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილედ დაინიშნა. მისი პასუხისმგებლობის სფეროში შედის უსაფრთხოების მნიშვნელოვანი მიმართულებები.',
      bioEn: 'Shengeli Pitskhelauri was appointed as the Deputy Head of the State Security Service of Georgia. His responsibilities include important security directions.'
    },
    {
      id: 'nikoleishvili',
      nameGe: 'გიგა ნიკოლეიშვილი',
      nameEn: 'Giga Nikoleishvili',
      positionGe: 'საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილე',
      positionEn: 'Deputy Head of the State Security Service of Georgia',
      photo: '/assets/images/officials/nikoleishvili.jpg',
      bioGe: 'გიგა ნიკოლეიშვილი სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილეა. იგი კურირებს სამსახურის სტრატეგიული ანალიზის მიმართულებას.',
      bioEn: 'Giga Nikoleishvili is a Deputy Head of the State Security Service of Georgia. He oversees the strategic analysis direction of the service.'
    },
    {
      id: 'akhobadze',
      nameGe: 'ლევან ახობაძე',
      nameEn: 'Levan Akhobadze',
      positionGe: 'საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილე',
      positionEn: 'Deputy Head of the State Security Service of Georgia',
      photo: '/assets/images/officials/akhobadze.jpg',
      bioGe: 'ლევან ახობაძე დაინიშნა საქართველოს სახელმწიფო უსაფრთხოების სამსახურის უფროსის მოადგილედ. იგი პასუხისმგებელია უსაფრთხოების სამსახურის საერთაშორისო ურთიერთობებზე.',
      bioEn: 'Levan Akhobadze was appointed as the Deputy Head of the State Security Service of Georgia. He is responsible for the international relations of the security service.'
    }
  ];

  // Handle click on official card
  const handleOfficialClick = (official) => {
    setSelectedOfficial(selectedOfficial?.id === official.id ? null : official);
  };

  // Helper function for dynamic text based on language
  const getText = (obj, field) => {
    const langField = language === 'ka' ? `${field}Ge` : `${field}En`;
    return obj[langField];
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Page Header */}
      <header className="mb-10 border-b border-susi-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-susi-black">
          {language === 'ka' ? 'ხელმძღვანელობა' : 'Leadership'}
        </h1>
      </header>
      
      {/* Leadership Grid */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {officials.map((official) => (
            <div 
              key={official.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg
                ${selectedOfficial?.id === official.id ? 'ring-2 ring-susi-primary' : ''}`}
            >
              {/* Official Photo */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <img 
                  src={official.photo} 
                  alt={getText(official, 'name')}
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/officials/placeholder.jpg';
                  }}
                />
                {/* Overlay button for better UX */}
                <button 
                  className="absolute inset-0 w-full h-full cursor-pointer bg-transparent"
                  onClick={() => handleOfficialClick(official)}
                  aria-label={`Select ${getText(official, 'name')}`}
                ></button>
              </div>
              
              {/* Official Info */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-susi-gray-800 mb-2">
                  {getText(official, 'name')}
                </h2>
                <p className="text-susi-gray-600">
                  {getText(official, 'position')}
                </p>
                
                {/* View Details Button */}
                <button 
                  onClick={() => handleOfficialClick(official)}
                  className="mt-4 text-sm px-4 py-2 bg-susi-gray-100 hover:bg-susi-gray-200 text-susi-gray-700 rounded-full transition-colors w-full"
                >
                  {language === 'ka' ? 'დეტალების ნახვა' : 'View Details'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Selected Official Details */}
      {selectedOfficial && (
        <section className="mb-12 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-susi-gray-200">
            <div className="flex flex-col lg:flex-row">
              {/* Left: Photo */}
              <div className="lg:w-1/3">
                <div className="h-full">
                  <img 
                    src={selectedOfficial.photo} 
                    alt={getText(selectedOfficial, 'name')}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/images/officials/placeholder.jpg';
                    }}
                  />
                </div>
              </div>
              
              {/* Right: Details */}
              <div className="lg:w-2/3 p-6 lg:p-8">
                {/* Close button */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-susi-gray-800 mb-2">
                      {getText(selectedOfficial, 'name')}
                    </h2>
                    <p className="text-susi-gray-600 text-lg pb-2 border-b border-susi-gray-200">
                      {getText(selectedOfficial, 'position')}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedOfficial(null)}
                    className="text-susi-gray-400 hover:text-susi-gray-600"
                    aria-label="Close details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {/* Bio */}
                <div className="mt-6 text-susi-gray-700 leading-relaxed">
                  <h3 className="font-semibold mb-2 text-lg">
                    {language === 'ka' ? 'ბიოგრაფია' : 'Biography'}
                  </h3>
                  <p>{getText(selectedOfficial, 'bio')}</p>
                </div>
                
                {/* Contact or additional info could be added here */}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Organizational Structure */}
      <section className="bg-susi-gray-50 rounded-lg shadow-sm border border-susi-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-bold text-susi-gray-800 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {language === 'ka' ? 'ორგანიზაციული სტრუქტურა' : 'Organizational Structure'}
          </h2>
          <p className="text-susi-gray-600">
            {language === 'ka' 
              ? 'სახელმწიფო უსაფრთხოების სამსახურის ორგანიზაციული სტრუქტურა შედგება სხვადასხვა დეპარტამენტებისა და სამმართველოებისგან, რომლებიც ქვეყნის უსაფრთხოების სხვადასხვა ასპექტებზე მუშაობენ.' 
              : 'The organizational structure of the State Security Service consists of various departments and divisions that work on different aspects of the country\'s security.'
            }
          </p>
          
          {/* Departments list - could be expanded in the future */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div className="bg-white p-2 rounded border border-susi-gray-200">
              {language === 'ka' ? 'ადმინისტრაცია' : 'Administration'}
            </div>
            <div className="bg-white p-2 rounded border border-susi-gray-200">
              {language === 'ka' ? 'კონტრტერორისტული ცენტრი' : 'Counterterrorism Center'}
            </div>
            <div className="bg-white p-2 rounded border border-susi-gray-200">
              {language === 'ka' ? 'ანტიკორუფციული სააგენტო' : 'Anti-Corruption Agency'}
            </div>
            <div className="bg-white p-2 rounded border border-susi-gray-200">
              {language === 'ka' ? 'კონტრდაზვერვის დეპარტამენტი' : 'Counterintelligence Department'}
            </div>
          </div>
        </div>
      </section>
      
      {/* "Back to top" button or additional navigation could be added here */}
    </div>
  );
}
