import React from 'react';
import { ExternalLink, Quote, Star } from 'lucide-react';
import { CLINIC, REVIEWS } from '../data/clinicData';
import { GoogleG } from './GoogleBadge';

/** Opiniones reales de pacientes, tomadas de la ficha pública de Google del consultorio. */
export const ReviewsSection: React.FC = () => {
  if (REVIEWS.length === 0) return null;

  return (
    <section
      id="opiniones"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-pink-50 to-white border-b border-pink-100 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-pink-100/70 blur-3xl pointer-events-none"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-pink-700 via-pink-600 to-rose-500 bg-clip-text text-transparent">
              Lo que dicen nuestros pacientes
            </span>
          </h2>
          <div className="mx-auto mt-4 mb-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-pink-500 to-rose-400" />
          <p className="text-base sm:text-lg text-slate-600">
            Opiniones reales de pacientes en Google: {CLINIC.googleRating.replace('.', ',')} de 5 con{' '}
            {CLINIC.googleReviews} reseñas.
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <li
              key={r.text}
              className="relative flex flex-col rounded-3xl bg-white border border-pink-100 shadow-lg shadow-pink-900/5 p-6 sm:p-7"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-pink-100" aria-hidden="true" />
              <div className="flex items-center gap-0.5 text-amber-400 mb-4" aria-label="5 de 5 estrellas">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="text-slate-700 leading-relaxed mb-6 flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <span className="text-sm font-bold text-slate-900">{r.author ?? 'Paciente'}</span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <GoogleG className="w-4 h-4" />
                  Opinión en Google
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-10">
          <a
            href={CLINIC.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white border border-pink-200 text-pink-800 font-bold text-sm hover:bg-pink-50 shadow-sm transition-colors"
          >
            <span>Ver las {CLINIC.googleReviews} opiniones en Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
