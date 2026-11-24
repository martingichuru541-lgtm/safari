/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Building2, CheckCircle2, Shield, X, Upload, ArrowRight } from 'lucide-react';

interface PartnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerPortalModal: React.FC<PartnerPortalModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [companyName, setCompanyName] = useState('Mara Wilderness Camps Ltd');
  const [contactName, setContactName] = useState('Kiprono Ole Senteu');
  const [contactEmail, setContactEmail] = useState('director@marawilderness.co.ke');
  const [partnerType, setPartnerType] = useState<'Safari Lodge / Camp' | 'Tour Operator' | 'Vehicle Fleet Owner' | 'Diving / Experience Guide'>('Safari Lodge / Camp');
  const [katoLicense, setKatoLicense] = useState('KTB-2026-OP981');
  const [locationCounty, setLocationCounty] = useState('Narok County (Maasai Mara)');
  const [inventoryDetails, setInventoryDetails] = useState('14 Luxury River Tents, private game drive vehicles, solar powered eco-lodge.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative text-stone-100">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          aria-label="Close Partner Portal"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Direct Supplier Portal
              </span>
              <h3 className="text-2xl font-bold text-white font-serif mt-1">
                Partner with KenyaOne Safaris
              </h3>
              <p className="text-stone-400 text-xs mt-1">
                List your Kenyan lodge, safari packages, or 4x4 cruiser fleet. Reach discerning international high-net-worth travelers with zero listing setup fees.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 font-semibold uppercase mb-1">
                  Registered Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-semibold uppercase mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-400 font-semibold uppercase mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 font-semibold uppercase mb-1">
                    Supplier Category *
                  </label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as typeof partnerType)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Safari Lodge / Camp">Safari Lodge / Camp</option>
                    <option value="Tour Operator">Tour Operator</option>
                    <option value="Vehicle Fleet Owner">Vehicle Fleet Owner</option>
                    <option value="Diving / Experience Guide">Diving / Experience Guide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-400 font-semibold uppercase mb-1">
                    KTB / KATO License No.
                  </label>
                  <input
                    type="text"
                    value={katoLicense}
                    onChange={(e) => setKatoLicense(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                    placeholder="e.g. KTB/2026/..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-400 font-semibold uppercase mb-1">
                  Primary Location / County *
                </label>
                <input
                  type="text"
                  required
                  value={locationCounty}
                  onChange={(e) => setLocationCounty(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-400 font-semibold uppercase mb-1">
                  Inventory &amp; Capacity Summary
                </label>
                <textarea
                  rows={2}
                  value={inventoryDetails}
                  onChange={(e) => setInventoryDetails(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-white outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 flex items-center gap-2 text-stone-400 text-[11px]">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  All applications undergo verification with the Tourism Regulatory Authority (TRA) and KATO before listing activation.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-stone-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
              >
                Submit Partner Application
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-white font-serif">Application Submitted</h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto">
              Thank you, <strong className="text-white">{contactName}</strong>. Our Supplier Onboarding Committee has received your registration for <strong className="text-amber-400">{companyName}</strong>. We will review your credentials and send your direct vendor portal login within 24 hours.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
