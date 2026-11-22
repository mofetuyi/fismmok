/**
 * FISMMOK LOGISTIX NIGERIA LIMITED
 * Central Configuration & Brand Data
 * Edit this file to update contact details, addresses, services, and corporate info across the entire website.
 */

const FISMMOK_CONFIG = {
  companyName: "FISMMOK LOGISTIX NIGERIA LIMITED",
  tagline: "Your Trusted Gateway to Seamless Freight, Haulage & Customs Solutions",
  shortDesc: "Premier freight forwarding, clearing, haulage, and international supply chain management based in Apapa, Lagos, Nigeria.",
  ceo: {
    name: "Kayode Osanyintuyi",
    title: "Chief Executive Officer / Managing Director",
    quote: "At FISMMOK LOGISTIX, our promise is unwavering integrity, precision cargo tracking, and rapid port turnaround for every single consignment.",
    email: "Kayodeosanyintuyi@yahoo.com"
  },
  contact: {
    phoneDisplay: "+234 (0) 810 928 5465",
    phoneCall: "+2348109285465",
    whatsapp: "2348109285465",
    whatsappLink: "https://wa.me/2348109285465?text=Hello%20FISMMOK%20LOGISTIX,%20I%20would%20like%20an%20inquiry%20regarding%20freight%20and%20clearing%20services.",
    emailPrimary: "O.kayode@fismmoklogistix.com",
    emailSecondary: "Kayodeosanyintuyi@yahoo.com",
    address: {
      street: "Suite 14, Maritime Towers, Commercial Avenue",
      city: "Apapa",
      state: "Lagos State",
      country: "Nigeria",
      full: "Maritime Towers, Commercial Avenue, Apapa Port Corridor, Lagos, Nigeria"
    },
    workingHours: "Monday – Friday: 8:00 AM – 6:00 PM | Saturday: 9:00 AM – 2:00 PM"
  },
  socials: {
    facebook: "https://facebook.com/fismmoklogistix",
    linkedin: "https://linkedin.com/company/fismmok-logistix",
    twitter: "https://twitter.com/fismmoklogistix",
    instagram: "https://instagram.com/fismmoklogistix"
  },
  stats: [
    { label: "Cargo TEUs Handled", value: 18500, suffix: "+", icon: "box" },
    { label: "On-Time Clearance Rate", value: 99.4, suffix: "%", icon: "shield-check" },
    { label: "Global Shipping Partners", value: 45, suffix: "+", icon: "globe" },
    { label: "Years of Operational Excellence", value: 12, suffix: "+", icon: "award" }
  ],
  services: [
    {
      id: "sea-freight",
      title: "Ocean & Sea Freight",
      short: "Full Container Load (FCL) & Less than Container Load (LCL) global shipping with major shipping lines into Apapa and Tin Can Island ports.",
      icon: "ship"
    },
    {
      id: "air-freight",
      title: "Air Freight Forwarding",
      short: "Rapid international air cargo clearance, priority express consolidations via Murtala Muhammed International Airport (LOS).",
      icon: "plane"
    },
    {
      id: "customs-clearing",
      title: "Customs Clearing & Brokerage",
      short: "Accredited Nigerian Customs Service (NCS) clearing agent. PAAR generation, HS code tariff classification, fast terminal release.",
      icon: "clipboard-check"
    },
    {
      id: "road-haulage",
      title: "Road Haulage & Intermodal",
      short: "Heavy-duty truck fleet providing secure container transit from Lagos maritime terminals to destinations across all 36 Nigerian states.",
      icon: "truck"
    },
    {
      id: "warehousing",
      title: "Bonded Warehousing & Storage",
      short: "Secured, monitored warehousing solutions with temperature-controlled units, 24/7 CCTV, inventory control, and cross-docking.",
      icon: "warehouse"
    },
    {
      id: "door-to-door",
      title: "Door-to-Door Cargo Delivery",
      short: "Complete turnkey end-to-end import & export delivery service from foreign supplier factories directly to your Nigerian doorstep.",
      icon: "map-pin"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.FISMMOK_CONFIG = FISMMOK_CONFIG;
}
