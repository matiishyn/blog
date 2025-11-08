export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-sm text-foreground/70">
          © {currentYear} Engineering & Management Notes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
