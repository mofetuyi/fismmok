/**
 * FISMMOK LOGISTIX NIGERIA LIMITED - Interactive Engine
 * Handles Mobile Drawer, Config Binding, Counter Animations,
 * Cargo Tracking Engine, Form Validation, and Toasts.
 */

document.addEventListener("DOMContentLoaded", () => {
  initDynamicConfig();
  initMobileNav();
  initStatCounters();
  initForms();
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
   4. Form Submission & Processing (Quote & Contact)
   -------------------------------------------------------------------------- */
function initForms() {
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = (quoteForm.querySelector("[name='fullName']")?.value || "").trim();
      const company = (quoteForm.querySelector("[name='companyName']")?.value || "").trim();
      const email = (quoteForm.querySelector("[name='email']")?.value || "").trim();
      const phone = (quoteForm.querySelector("[name='phone']")?.value || "").trim();
      const service = quoteForm.querySelector("[name='serviceType']")?.value || "";
      const cargo = (quoteForm.querySelector("[name='cargoType']")?.value || "").trim();
      const origin = (quoteForm.querySelector("[name='origin']")?.value || "").trim();
      const destination = (quoteForm.querySelector("[name='destination']")?.value || "").trim();
      const weight = (quoteForm.querySelector("[name='weight']")?.value || "").trim();
      const incoterm = quoteForm.querySelector("[name='incoterm']")?.value || "";
      const notes = (quoteForm.querySelector("[name='message']")?.value || "").trim();

      if (!name || !phone || !origin || !destination) {
        showToast("Please fill in all required fields to submit your freight quote request.");
        return;
      }

      const submitBtn = quoteForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "Calculate & Submit Freight Quote Request &rarr;";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting Quote to Apapa Operations Desk...";
      }

      // WhatsApp quick message URL
      const waSummary = `*FISMMOK LOGISTIX - Freight Quote Request*
*Name:* ${name}
*Company:* ${company || "Individual Consignee"}
*Phone:* ${phone}
*Email:* ${email || "Not provided"}
*Service:* ${service}
*Commodity:* ${cargo}
*Route:* ${origin} ➔ ${destination}
*Gross Weight/Size:* ${weight || "Standard Container"}
*Incoterm:* ${incoterm}
*Notes:* ${notes || "None"}`;

      const waUrl = `https://wa.me/2348109285465?text=${encodeURIComponent(waSummary)}`;

      // Prepare payload for FormSubmit endpoint
      const payload = {
        _subject: `New Freight Quote Request: ${service} (${origin} -> ${destination})`,
        _cc: (typeof FISMMOK_CONFIG !== "undefined" && FISMMOK_CONFIG.forms?.ccEmail) ? FISMMOK_CONFIG.forms.ccEmail : "O.kayode@fismmoklogistix.com",
        fullName: name,
        companyName: company,
        email: email,
        phone: phone,
        serviceType: service,
        cargoType: cargo,
        origin: origin,
        destination: destination,
        weight: weight,
        incoterm: incoterm,
        message: notes,
        submittedAt: new Date().toISOString()
      };

      const endpoint = (typeof FISMMOK_CONFIG !== "undefined" && FISMMOK_CONFIG.forms?.formsubmitEndpoint)
        ? FISMMOK_CONFIG.forms.formsubmitEndpoint
        : "https://formsubmit.co/ajax/Kayodeosanyintuyi@yahoo.com";

      try {
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Direct form submission notice:", err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }

      // Display detailed confirmation feedback card
      const feedbackDiv = document.getElementById("quoteFeedback");
      if (feedbackDiv) {
        feedbackDiv.innerHTML = `
          <div style="background: #ECFDF5; border: 1.5px solid #10B981; border-radius: var(--radius-md); padding: 1.75rem; text-align: center; margin-top: 1.5rem; box-shadow: var(--shadow-md);">
            <div style="color: #059669; font-weight: 800; font-size: 1.25rem; margin-bottom: 0.5rem; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              Quote Request Successfully Dispatched!
            </div>
            <p style="color: #065F46; font-size: 1rem; line-height: 1.6; max-width: 600px; margin: 0 auto 1.25rem;">
              Thank you, <strong>${name}</strong>. Your freight parameters for <strong>${service}</strong> from <strong>${origin}</strong> to <strong>${destination}</strong> have been submitted directly to the FISMMOK Operations desk (<strong>Kayodeosanyintuyi@yahoo.com</strong>).
            </p>
            <p style="color: #047857; font-size: 0.875rem; margin-bottom: 1.5rem;">
              Our Apapa tariff officers are reviewing your consignment for fastest clearance &amp; lowest tariff assessment.
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn-accent btn-md">
                Fast-Track on WhatsApp Desk &rarr;
              </a>
              <button type="button" class="btn btn-outline-navy btn-md" onclick="location.reload()">
                Submit Another Shipment
              </button>
            </div>
          </div>
        `;
        feedbackDiv.scrollIntoView({ behavior: "smooth" });
      } else {
        showToast("Quote request dispatched! Our team will contact you shortly.");
      }
    });
  }

  // Contact Form
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = (contactForm.querySelector("[name='name']")?.value || "").trim();
      const email = (contactForm.querySelector("[name='email']")?.value || "").trim();
      const phone = (contactForm.querySelector("[name='phone']")?.value || "").trim();
      const subject = (contactForm.querySelector("[name='subject']")?.value || "").trim();
      const message = (contactForm.querySelector("[name='message']")?.value || "").trim();

      if (!name || !message) {
        showToast("Please enter your name and message.");
        return;
      }

      const submitBtn = contactForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending Message...";
      }

      const payload = {
        _subject: `New Contact Inquiry from ${name} [${subject || "General"}]`,
        _cc: (typeof FISMMOK_CONFIG !== "undefined" && FISMMOK_CONFIG.forms?.ccEmail) ? FISMMOK_CONFIG.forms.ccEmail : "O.kayode@fismmoklogistix.com",
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        submittedAt: new Date().toISOString()
      };

      const endpoint = (typeof FISMMOK_CONFIG !== "undefined" && FISMMOK_CONFIG.forms?.formsubmitEndpoint)
        ? FISMMOK_CONFIG.forms.formsubmitEndpoint
        : "https://formsubmit.co/ajax/Kayodeosanyintuyi@yahoo.com";

      try {
        await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn("Contact form notice:", err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Send Inquiry Message &rarr;";
        }
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
