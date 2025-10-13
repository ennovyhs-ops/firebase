"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, useEffect } from "react";

const LOGO_STORAGE_KEY = "team-logo";

export function Logo({ className }: { className?: string }) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // We need to use an effect to read from localStorage,
    // as it's a client-side only API.
    const storedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (storedLogo) {
      setLogoUrl(storedLogo);
    }

    const handleStorageChange = () => {
      const updatedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
      setLogoUrl(updatedLogo);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event to handle updates from the same tab
    const handleLogoUpdate = () => {
        const updatedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
        setLogoUrl(updatedLogo);
    }
    window.addEventListener('logoUpdated', handleLogoUpdate);


    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logoUpdated', handleLogoUpdate);
    };
  }, []);


  return (
    <div className={cn("flex items-center gap-2", className)}>
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt="Team Logo"
          width={32}
          height={32}
          className="size-8 object-contain"
        />
      ) : (
        <svg
          className="size-8 text-sidebar-primary"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7V17L12 22L22 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.1213 14.1213C15.2261 15.0166 14.0436 15.5 12.8091 15.5C11.5745 15.5 10.392 15.0166 9.4968 14.1213C8.60155 13.2261 8.11816 12.0436 8.11816 10.8091C8.11816 9.57453 8.60155 8.39202 9.4968 7.49677C10.392 6.60152 11.5745 6.11814 12.8091 6.11814C14.0436 6.11814 15.2261 6.60152 16.1213 7.49677"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="font-headline text-xl font-bold text-sidebar-foreground group-data-[collapsible=icon]:hidden">
        Sixx
      </span>
    </div>
  );
}
