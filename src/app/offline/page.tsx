'use client';

import Link from 'next/link';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">İnternet Bağlantısı Yok</h1>
        
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24 mx-auto text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Görünüşe göre internet bağlantısı yok. Lütfen bağlantınızı kontrol edip tekrar deneyin.
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Önceden ziyaret ettiğiniz sayfaları çevrimdışı iken görüntüleyebilirsiniz.
        </p>

        <div className="mt-4">
          <Link 
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition duration-150"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
} 