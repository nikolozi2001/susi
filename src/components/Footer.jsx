export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}
