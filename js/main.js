/**
 * FISMMOK LOGISTIX NIGERIA LIMITED - Interactive Engine
 * Handles Mobile Drawer, Config Binding, Counter Animations,
 * Cargo Tracking Engine, Form Validation, and Toasts.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicConfig();
  initMobileNav();
  initStatCounters();
  initTrackingEngine();
  initForms();
  initQuickTrackHero();
});

/* --------------------------------------------------------------------------
   1. Dynamic Config Binding
   -------------------------------------------------------------------------- */
function initDynamicConfig() {
  if (typeof FISMMOK_CONFIG === "undefined") return;

  const cfg = FISMMOK_CONFIG;

  // Phone elements
  document.querySelectorAll("[data-cfg='phone-display']").forEach(el => {
    el.textContent = cfg.contact.phoneDisplay;
  });
  document.querySelectorAll("[data-cfg='phone-href']").forEach(el => {
    el.href = `tel:${cfg.contact.phoneCall}`;
  });

  // WhatsApp elements
  document.querySelectorAll("[data-cfg='whatsapp-href']").forEach(el => {
    el.href = cfg.contact.whatsappLink;
  });

  // Email elements
  document.querySelectorAll("[data-cfg='email-primary']").forEach(el => {
    el.textContent = cfg.contact.emailPrimary;
    if (el.tagName === "A") el.href = `mailto:${cfg.contact.emailPrimary}`;
  });
  document.querySelectorAll("[data-cfg='email-secondary']").forEach(el => {
    el.textContent = cfg.contact.emailSecondary;
    if (el.tagName === "A") el.href = `mailto:${cfg.contact.emailSecondary}`;
  });

  // Address
  document.querySelectorAll("[data-cfg='address-full']").forEach(el => {
    el.textContent = cfg.contact.address.full;
  });

  // CEO
  document.querySelectorAll("[data-cfg='ceo-name']").forEach(el => {
    el.textContent = cfg.ceo.name;
  });
  document.querySelectorAll("[data-cfg='ceo-title']").forEach(el => {
    el.textContent = cfg.ceo.title;
  });
  document.querySelectorAll("[data-cfg='ceo-quote']").forEach(el => {
    el.textContent = `"${cfg.ceo.quote}"`;
  });

  // Year in footer
  document.querySelectorAll("[data-cfg='current-year']").forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const backdrop = document.getElementById("mobileNavBackdrop");
  const closeBtn = document.getElementById("mobileCloseBtn");

  if (!hamburger || !mobileNav || !backdrop) return;

  function openNav() {
    mobileNav.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    hamburger.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    mobileNav.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", openNav);
  if (closeBtn) closeBtn.addEventListener("click", closeNav);
  backdrop.addEventListener("click", closeNav);

  // Close drawer on link click
  mobileNav.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("open")) {
      closeNav();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Animated Stat Counters
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const counters = document.querySelectorAll("[data-counter-target]");
  if (!counters.length) return;

  let started = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute("data-counter-target"));
          const suffix = counter.getAttribute("data-counter-suffix") || "";
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const stepTime = 30;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = (isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString()) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? current.toFixed(1) : Math.round(current).toLocaleString()) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.querySelector(".stats-section");
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   4. Cargo Tracking Simulator Engine
   -------------------------------------------------------------------------- */
const SAMPLE_SHIPMENTS = {
  "FLN-88214": {
    code: "FLN-88214",
    status: "In Transit - Approaching Apapa Port",
    statusType: "in-transit",
    origin: "Shanghai Port, China (CNSHA)",
    destination: "Apapa Container Terminal (TICT), Lagos, Nigeria",
    vessel: "MSC OSCAR V.402",
    blNumber: "BL-SH-AP-992140",
    containerNo: "MSCU-821943-2 (40ft High Cube)",
    eta: "Tomorrow, 08:30 AM WAT",
    weight: "24,800 KG",
    commodity: "Industrial Solar Inverters & Energy Equipment",
    steps: [
      { title: "Booking Confirmed & Gate-in", date: "Nov 02, 2026", location: "Shanghai Logistics Hub", done: true },
      { title: "Vessel Departure from Origin Port", date: "Nov 05, 2026", location: "East China Sea", done: true },
      { title: "Ocean Freight Transit (Gulf of Guinea)", date: "Nov 18, 2026", location: "Atlantic Transit Corridor", done: true },
      { title: "Berthing & Terminal Offloading", date: "Estimated Nov 22, 2026", location: "Apapa Port Berth 4, Lagos", done: false, active: true },
      { title: "Nigerian Customs PAAR Clearance", date: "Pending Terminal Offload", location: "NCS Apapa Area Command", done: false },
      { title: "Interstate Haulage Dispatch & Final Delivery", date: "Pending Clearance", location: "Client Consignee Warehouse", done: false }
    ]
  },
  "FLN-77390": {
    code: "FLN-77390",
    status: "Customs Cleared & Gate-Out Ready",
    statusType: "cleared",
    origin: "Jebel Ali Port, Dubai (AEJEA)",
    destination: "Tin Can Island Port, Lagos, Nigeria",
    vessel: "MAERSK COTONOU V.118",
    blNumber: "BL-DXB-TC-440182",
    containerNo: "MRKU-419082-9 (2x 20ft Standard)",
    eta: "Cleared for Immediate Dispatch",
    weight: "38,200 KG",
    commodity: "Automotive Spare Parts & Lubricants",
    steps: [
      { title: "Cargo Loading & Export Clearance", date: "Oct 28, 2026", location: "Jebel Ali Freezone", done: true },
      { title: "Vessel Transit & Sea Freight", date: "Nov 01, 2026", location: "Red Sea - Cape Route", done: true },
      { title: "Vessel Discharged at Lagos Terminal", date: "Nov 16, 2026", location: "Tin Can Island Container Terminal", done: true },
      { title: "Customs Inspection & PAAR Verified", date: "Nov 19, 2026", location: "NCS Tin Can Island Command", done: true },
      { title: "Terminal Demurrage Paid & Release Order", date: "Today, 11:15 AM", location: "FISMMOK Clearing Desk, Apapa", done: true, active: true },
      { title: "Haulage Truck Assigned for Outbound Delivery", date: "In Progress", location: "Lagos Dispatch Base", done: false }
    ]
  },
  "FLN-90432": {
    code: "FLN-90432",
    status: "Air Freight Arrived - Customs Verification",
    statusType: "in-transit",
    origin: "Heathrow Airport, London (LHR)",
    destination: "Murtala Muhammed Int'l Airport Cargo (LOS), Lagos",
    vessel: "CARGOLUX FLIGHT CV-781",
    blNumber: "AWB-781-9921-4320",
    containerNo: "ULD-AKE-91044",
    eta: "Arrived - Fast Track Processing",
    weight: "1,450 KG",
    commodity: "Critical Telecommunication Hardware",
    steps: [
      { title: "Air Waybill Lodged & Security Screening", date: "Nov 18, 2026", location: "Heathrow Cargo Terminal 4", done: true },
      { title: "Flight Departure from London (LHR)", date: "Nov 19, 2026", location: "Direct Flight LOS", done: true },
      { title: "Aircraft Landed at Lagos Airport (LOS)", date: "Nov 20, 2026", location: "NAHCO Cargo Warehouse, Ikeja", done: true },
      { title: "NAHCO Terminal Verification & NCS Assessment", date: "Today, 09:40 AM", location: "NCS MMIA Command", done: true, active: true },
      { title: "Final Dispatch to Corporate Client Office", date: "Estimated 03:00 PM", location: "Victoria Island, Lagos", done: false }
    ]
  }
};

function initTrackingEngine() {
  const trackForm = document.getElementById("trackingSearchForm");
  const trackInput = document.getElementById("trackingInput");
  const resultBox = document.getElementById("trackingResultBox");
  const sampleChips = document.querySelectorAll(".sample-chip");

  if (!trackForm || !trackInput || !resultBox) return;

  // Sample Chips Click
  sampleChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const code = chip.getAttribute("data-code");
      trackInput.value = code;
      renderTrackingResult(code);
    });
  });

  // Track Form Submission
  trackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = trackInput.value.trim().toUpperCase();
    if (!code) {
      showToast("Please enter a valid tracking number or Bill of Lading (B/L).");
      return;
    }
    renderTrackingResult(code);
  });

  // Check URL parameters for auto lookup (e.g. ?code=FLN-88214)
  const urlParams = new URLSearchParams(window.location.search);
  const queryCode = urlParams.get("code");
  if (queryCode) {
    trackInput.value = queryCode;
    renderTrackingResult(queryCode);
  }
}

function renderTrackingResult(code) {
  const resultBox = document.getElementById("trackingResultBox");
  if (!resultBox) return;

  // Find exact match or generate realistic tracking report
  const cleanCode = code.toUpperCase().trim();
  let data = SAMPLE_SHIPMENTS[cleanCode];

  if (!data) {
    // Generate simulated dynamic cargo result for user's custom tracking number
    data = {
      code: cleanCode,
      status: "Customs Clearing in Progress - Apapa Port",
      statusType: "in-transit",
      origin: "Foreign Origin Port of Departure",
      destination: "Apapa Maritime Terminal, Lagos, Nigeria",
      vessel: "ATLANTIC CARRIER V.204",
      blNumber: `BL-${cleanCode.replace(/[^A-Z0-9]/g, "")}`,
      containerNo: `TEMU-${Math.floor(100000 + Math.random() * 900000)}-1`,
      eta: "Within 48 Business Hours",
      weight: "18,400 KG",
      commodity: "Commercial Freight Consignment",
      steps: [
        { title: "Container Manifest Lodged with NPA", date: "3 Days Ago", location: "Nigerian Ports Authority Portal", done: true },
        { title: "Vessel Discharged at Lagos Wharf", date: "Yesterday, 14:00 WAT", location: "Apapa Terminal Berthing Quay", done: true },
        { title: "Physical & Non-Intrusive Scanning Inspection", date: "Today, 10:15 AM", location: "NCS Apapa Command", done: true, active: true },
        { title: "Customs Clearance & Duty Payment Approval", date: "In Progress", location: "FISMMOK Clearing Division", done: false },
        { title: "Flatbed Truck Haulage to Final Destination", date: "Pending Terminal Release", location: "Nigeria Transit Network", done: false }
      ]
    };
  }

  // Populate HTML
  resultBox.innerHTML = `
    <div class="tracking-header-meta">
      <div>
        <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Consignment Reference</span>
        <h3 style="font-size: 1.4rem; color: var(--primary); font-family: var(--font-heading);">${data.code}</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">B/L: <strong>${data.blNumber}</strong> • Container: <strong>${data.containerNo}</strong></p>
      </div>
      <div>
        <span class="status-pill ${data.statusType}">
          <span class="pulse-dot" style="width: 7px; height: 7px;"></span>
          ${data.status}
        </span>
      </div>
    </div>

    <!-- Quick Info Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem; background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
      <div>
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Port of Origin</div>
        <div style="font-weight: 600; color: var(--primary); font-size: 0.95rem;">${data.origin}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Destination Port</div>
        <div style="font-weight: 600; color: var(--primary); font-size: 0.95rem;">${data.destination}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Carrier / Vessel</div>
        <div style="font-weight: 600; color: var(--secondary); font-size: 0.95rem;">${data.vessel}</div>
      </div>
      <div>
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700;">Estimated Arrival / Status</div>
        <div style="font-weight: 700; color: var(--accent); font-size: 0.95rem;">${data.eta}</div>
      </div>
    </div>

    <!-- Timeline Stepper -->
    <h4 style="font-family: var(--font-heading); font-size: 1.15rem; color: var(--primary); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 0.5rem;">
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
      Shipment Movement Milestones
    </h4>

    <div class="timeline-stepper">
      ${data.steps.map(step => `
        <div class="timeline-step ${step.done ? 'completed' : ''} ${step.active ? 'active' : ''}">
          <div class="step-node"></div>
          <div class="step-time">${step.date}</div>
          <div class="step-title">${step.title}</div>
          <div class="step-location">${step.location}</div>
        </div>
      `).join("")}
    </div>

    <div style="margin-top: 2.5rem; padding: 1.25rem; background: rgba(30, 111, 217, 0.08); border-radius: var(--radius-md); border: 1px dashed var(--secondary); display: flex; justify-content: space-between; align-items: center; flex-wrap: gap: 1rem;">
      <div>
        <div style="font-weight: 700; color: var(--primary); font-size: 0.95rem;">Need live terminal assistance with this consignment?</div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">Connect directly with our Apapa Wharf Clearing & Operations desk.</div>
      </div>
      <a href="https://wa.me/2348109285465?text=Hello%20FISMMOK%20Operations,%20I%20am%20tracking%20consignment%20${encodeURIComponent(data.code)}" target="_blank" rel="noopener" class="btn btn-accent btn-sm">
        Inquire via WhatsApp
      </a>
    </div>
  `;

  resultBox.style.display = "block";
  resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

/* --------------------------------------------------------------------------
   5. Hero Quick Track Widget
   -------------------------------------------------------------------------- */
function initQuickTrackHero() {
  const quickForm = document.getElementById("quickTrackHeroForm");
  const quickInput = document.getElementById("quickTrackHeroInput");

  if (!quickForm || !quickInput) return;

  quickForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = quickInput.value.trim();
    if (!val) {
      showToast("Please enter your tracking number.");
      return;
    }
    // Redirect to track.html with code query parameter
    window.location.href = `track.html?code=${encodeURIComponent(val)}`;
  });
}

/* --------------------------------------------------------------------------
   6. Form Validation & Handling (Quote & Contact)
   -------------------------------------------------------------------------- */
function initForms() {
  // Quote Form
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = quoteForm.querySelector("[name='fullName']").value.trim();
      const phone = quoteForm.querySelector("[name='phone']").value.trim();
      const service = quoteForm.querySelector("[name='serviceType']").value;
      const origin = quoteForm.querySelector("[name='origin']").value.trim();
      const destination = quoteForm.querySelector("[name='destination']").value.trim();

      if (!name || !phone || !origin || !destination) {
        showToast("Please fill in all required fields to calculate your quote.");
        return;
      }

      // Format WhatsApp message option
      const waMsg = `*FISMMOK LOGISTIX - Quote Request*\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nRoute: ${origin} ➔ ${destination}\nDetails submitted via website.`;
      const waUrl = `https://wa.me/2348109285465?text=${encodeURIComponent(waMsg)}`;

      // Success modal / display
      const feedbackDiv = document.getElementById("quoteFeedback");
      if (feedbackDiv) {
        feedbackDiv.innerHTML = `
          <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: var(--radius-md); padding: 1.5rem; text-align: center; margin-top: 1.5rem;">
            <div style="color: #059669; font-weight: 800; font-size: 1.2rem; margin-bottom: 0.5rem;">Quote Request Generated Successfully!</div>
            <p style="color: #065F46; font-size: 0.95rem; margin-bottom: 1.25rem;">
              Thank you, <strong>${name}</strong>. Our Apapa logistics officers have logged your shipment details from <strong>${origin}</strong> to <strong>${destination}</strong>.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-accent btn-sm">
                Fast-Track on WhatsApp Desk
              </a>
              <button type="button" class="btn btn-outline-navy btn-sm" onclick="location.reload()">
                Submit Another Request
              </button>
            </div>
          </div>
        `;
        feedbackDiv.scrollIntoView({ behavior: "smooth" });
      } else {
        showToast("Quote request submitted! Our team will contact you shortly.");
      }
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = contactForm.querySelector("[name='name']").value.trim();
      const message = contactForm.querySelector("[name='message']").value.trim();

      if (!name || !message) {
        showToast("Please enter your name and message.");
        return;
      }

      showToast(`Thank you, ${name}! Your inquiry has been sent to our Apapa team.`);
      contactForm.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   7. Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="color: var(--accent); flex-shrink: 0;"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 4000);
}
