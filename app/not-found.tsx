export default function GlobalNotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-2">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Page Not Found
        </h2>
      </div>
    </div>
  );
}
