import React, { useState } from 'react';
import { CLINIC, SERVICES, whatsappUrl } from '../data/clinicData';
import { WhatsAppIcon } from './BrandIcons';

const DIAS = ['Cualquier día', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const FRANJAS = ['Cualquier horario', 'Mañana', 'Tarde'];

export const BookingSection: React.FC = () => {
  const [name, setName] = useState('');
  const [motivo, setMotivo] = useState('Primera consulta / revisión');
  const [dia, setDia] = useState(DIAS[0]);
  const [franja, setFranja] = useState(FRANJAS[0]);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Escribí tu nombre para armar el mensaje.');
      return;
    }
    setError('');
    const lineas = [
      `Hola! Quisiera pedir un turno en ${CLINIC.name}.`,
      `- Nombre: ${name.trim()}`,
      `- Motivo: ${motivo}`,
      `- Día preferido: ${dia}`,
      `- Horario preferido: ${franja}`,
    ];
    if (notes.trim()) lineas.push(`- Comentario: ${notes.trim()}`);
    window.open(whatsappUrl(lineas.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const campo =
    'w-full px-4 py-3 text-sm text-slate-900 bg-pink-50/60 border border-pink-100 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-colors';

  return (
    <section
      id="turnos"
      className="py-20 lg:py-24 bg-gradient-to-br from-pink-600 via-pink-500 to-rose-500 border-b border-pink-200"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 text-white">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3">
            Pedí tu turno por WhatsApp
          </h2>
          <p className="text-base sm:text-lg text-pink-50">
            Completá estos datos y se arma el mensaje. El consultorio te responde para confirmar día y horario.
          </p>

          <ol className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            {[
              ['1', 'Completá tus datos', 'Nombre, qué necesitás y cuándo te queda cómodo.'],
              ['2', 'Se abre WhatsApp', 'Te llevamos al chat con el mensaje ya armado.'],
              ['3', 'Confirmamos tu turno', 'Te respondemos con día y horario.'],
            ].map(([n, titulo, texto]) => (
              <li key={n} className="flex items-start gap-3 rounded-2xl bg-white/15 border border-white/25 p-4">
                <span className="shrink-0 w-8 h-8 rounded-full bg-white text-pink-700 font-extrabold flex items-center justify-center">
                  {n}
                </span>
                <span>
                  <span className="block font-bold text-white leading-tight">{titulo}</span>
                  <span className="block text-sm text-pink-50 mt-0.5">{texto}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <form
          onSubmit={enviar}
          className="bg-white rounded-3xl shadow-2xl shadow-pink-950/20 p-6 sm:p-9 space-y-5"
        >
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-slate-800 mb-1.5">
              Tu nombre *
            </label>
            <input
              id="nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: María Gómez"
              className={campo}
            />
          </div>

          <div>
            <label htmlFor="motivo" className="block text-sm font-semibold text-slate-800 mb-1.5">
              ¿Qué necesitás?
            </label>
            <select id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} className={campo}>
              <option>Primera consulta / revisión</option>
              {SERVICES.map((s) => (
                <option key={s.id}>{s.name}</option>
              ))}
              <option>Dolor o urgencia</option>
              <option>Otra consulta</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dia" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Día preferido
              </label>
              <select id="dia" value={dia} onChange={(e) => setDia(e.target.value)} className={campo}>
                {DIAS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="franja" className="block text-sm font-semibold text-slate-800 mb-1.5">
                Horario preferido
              </label>
              <select id="franja" value={franja} onChange={(e) => setFranja(e.target.value)} className={campo}>
                {FRANJAS.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="notas" className="block text-sm font-semibold text-slate-800 mb-1.5">
              Comentario (opcional)
            </label>
            <textarea
              id="notas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Contanos brevemente qué te pasa o qué buscás."
              className={campo}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-[#16c55e] hover:bg-[#12a84f] rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span>Enviar pedido por WhatsApp</span>
          </button>

          <p className="text-xs text-slate-500 text-center">
            Se abre WhatsApp con el mensaje listo para enviar a {CLINIC.whatsappDisplay}.
          </p>
        </form>
      </div>
    </section>
  );
};
