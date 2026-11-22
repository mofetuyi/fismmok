# FISMMOK LOGISTIX NIGERIA LIMITED — Corporate Website

A complete, high-performance, responsive corporate website built for **FISMMOK LOGISTIX NIGERIA LIMITED** (RC 1523574), an accredited freight forwarding, clearing, haulage, and supply chain management company based in **Apapa, Lagos, Nigeria**.

---

## 🚀 Live Demo & Structure

### Project File Tree
```
fismmok-logistix/
├── index.html              # Home Page (Hero, quick track, services, stats, why choose us, testimonials, CTA)
├── about.html              # Corporate Profile (Story, mission, vision, values, CEO profile, port coverage)
├── services.html           # Deep Dive Services (Sea freight, customs clearing, haulage, air cargo, warehousing, door-to-door)
├── track.html              # Interactive Consignment Tracker with real-time milestones & sample B/Ls
├── quote.html              # Dynamic Freight Quote Form (Formspree & direct WhatsApp routing)
├── contact.html            # Apapa Office Details, Hotlines, Inquiry Form & Google Map Embed
├── css/
│   └── style.css           # Modern production CSS design system (responsive, accessible)
├── js/
│   ├── config.js           # Central configuration for all company info, contacts, and CEO data
│   └── main.js             # Mobile drawer, stats animations, cargo tracking engine, form validations
├── assets/
│   ├── logo.svg            # Official vector logo (RC 1523574, FISMMOK, cyan lower band)
│   ├── logo-white.svg      # White/dark-background contrast vector logo
│   ├── logo-icon.svg       # Square brand icon / favicon
│   ├── logo.png            # High-resolution raster logo (2000 x 750 px)
│   ├── logo-hq.png         # High-resolution raster logo (2000 x 750 px)
│   └── images/             # Vector illustrations (hero ship, haulage, customs, air freight, etc.)
├── fismmok-logistix.zip    # Bundled release archive for instant deployment
└── README.md               # Run, configuration, and deployment documentation
```

---

## 🎨 Brand & Design System

- **Primary Navy:** `#0A1F44` & `#282F92` (Corporate maritime trust, ocean strength)
- **Secondary Ocean Blue:** `#1E6FD9` & `#1BAEE8` (Active navigation, milestone indicators, brand ribbons)
- **Accent Amber/Orange:** `#FF6B00` & `#F59E0B` (High-conversion call-to-actions, quotes, badges)
- **Surface & Backgrounds:** Crisp `#FFFFFF` and `#F8FAFC`
- **Typography:**
  - Headings: `Poppins`, sans-serif (Bold, 700–900 weight)
  - Body & Data: `Inter`, sans-serif (Clean, legible, 400–600 weight)
- **Official Credentials:**
  - **Company Registration:** `RC 1523574`
  - **CEO / Managing Director:** Kayode Osanyintuyi
  - **Location:** Commercial Avenue, Apapa Port Corridor, Lagos, Nigeria

---

## 💻 How to Run Locally

### Option 1: Python HTTP Server (Built-in)
Run the following in PowerShell or terminal inside the project root:
```bash
python -m http.server 8080
```
Then open your browser to [http://localhost:8080](http://localhost:8080).

### Option 2: Node.js / NPX
```bash
npx serve .
# or
npx live-server
```

### Option 3: VS Code / IDE
Right-click `index.html` and click **"Open with Live Server"**.

---

## 🌐 Production Deployment Guide

### 1. Netlify (Drag & Drop or Git)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `fismmok-logistix` folder (or unzip `fismmok-logistix.zip` and drop the contents).
3. Your site goes live instantly with an SSL certificate (`https://your-site.netlify.app`).
4. To attach a custom domain (e.g. `fismmoklogistix.com`), go to **Site Settings > Domain Management > Add Custom Domain**.

### 2. Vercel
1. Install Vercel CLI: `npm i -g vercel` (or connect your GitHub repository on [vercel.com](https://vercel.com)).
2. In the project folder, run:
   ```bash
   vercel
   ```
3. Follow the CLI prompts (Framework preset: `Other`).
4. Vercel deploys your site globally in seconds.

### 3. cPanel / Shared Web Hosting (e.g., Namecheap, Whogohost, Bluehost)
1. Log in to your cPanel dashboard.
2. Open **File Manager** and navigate into `public_html/`.
3. Upload `fismmok-logistix.zip`.
4. Right-click `fismmok-logistix.zip` and select **Extract**.
5. Ensure `index.html`, `css/`, `js/`, and `assets/` sit directly inside `public_html/`.
6. Visit your domain in any browser.

---

## ⚙️ Configuration & Easy Editing (`js/config.js`)

All editable company details are stored in one central file: [`js/config.js`](file:///C:/Users/BUY%20COMPUTERS/.gemini/antigravity/scratch/fismmok-logistix/js/config.js).
Modifying this file will automatically update details across all pages without having to edit individual HTML files:

```javascript
const FISMMOK_CONFIG = {
  companyName: "FISMMOK LOGISTIX NIGERIA LIMITED",
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
    whatsappLink: "https://wa.me/2348109285465?text=...",
    emailPrimary: "O.kayode@fismmoklogistix.com",
    emailSecondary: "Kayodeosanyintuyi@yahoo.com",
    address: {
      full: "Maritime Towers, Commercial Avenue, Apapa Port Corridor, Lagos, Nigeria"
    }
  }
};
```

---

## 📦 Connecting Forms to Backend or Formspree

1. **Quote Form (`quote.html`):**
   - The `<form>` is configured to submit to `https://formspree.io/f/YOUR_ENDPOINT`.
   - Replace `placeholder-fismmok` with your Formspree endpoint ID or your custom server URL.
   - Upon submitting, the site generates an immediate summary card with a 1-click **"Fast-Track on WhatsApp Desk"** button that pre-populates all shipment details directly into WhatsApp.
2. **Contact Form (`contact.html`):**
   - Ready to receive messages directly or connect to your company CRM.

---

## 🔍 Interactive Cargo Tracking Simulator

The site includes a realistic shipment lookup engine with preloaded demonstration consignments:
- **`FLN-88214`**: 40ft High Cube Container aboard *MSC OSCAR*, ocean transit approaching Apapa Berth 4.
- **`FLN-77390`**: 2x 20ft Containers Customs Cleared at Tin Can Island, terminal release order issued, ready for dispatch.
- **`FLN-90432`**: Priority Air Cargo arrived at NAHCO Cargo Warehouse, Murtala Muhammed Airport (LOS).
- **Custom Codes**: Entering any tracking number generates an automated milestone assessment.
