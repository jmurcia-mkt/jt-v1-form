import React, { useState } from 'react';

// --- Iconos Nativos (Reemplazan dependencias externas para evitar errores de pantalla en blanco) ---
const Icon = ({ path, c }: { path: React.ReactNode, c?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c}>{path}</svg>
);
const IcoCpu = ({c}:any) => <Icon c={c} path={<><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></>} />;
const IcoCalendar = ({c}:any) => <Icon c={c} path={<><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>} />;
const IcoCreditCard = ({c}:any) => <Icon c={c} path={<><rect width="22" height="16" x="1" y="4" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></>} />;
const IcoMapPin = ({c}:any) => <Icon c={c} path={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>} />;
const IcoUser = ({c}:any) => <Icon c={c} path={<><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>} />;
const IcoMail = ({c}:any) => <Icon c={c} path={<><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>} />;
const IcoCheck = ({c}:any) => <Icon c={c} path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></>} />;
const IcoChevRight = ({c}:any) => <Icon c={c} path={<path d="m9 18 6-6-6-6"/>} />;
const IcoChevLeft = ({c}:any) => <Icon c={c} path={<path d="m15 18-6-6 6-6"/>} />;
const IcoSparkles = ({c}:any) => <Icon c={c} path={<><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4M19 17v4M3 5h4M17 19h4"/></>} />;
const IcoZap = ({c}:any) => <Icon c={c} path={<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>} />;
const IcoShield = ({c}:any) => <Icon c={c} path={<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>} />;
const IcoLoader = ({c}:any) => <Icon c={c} path={<path d="M21 12a9 9 0 1 1-6.219-8.56"/>} />;

export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interesPrincipal: '',
    tiempoCompra: '',
    metodoPago: '',
    ciudad: '',
    nombre: '',
    telefono: '',
    email: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejo de cambios
  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Evento de Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'Jetour Dashing',
          ciudad: formData.ciudad,
          metodo_pago: formData.metodoPago
        });
      }

      // 2. Enviar datos a Google Sheets
      // Pega tu URL de Google Apps Script directamente entre las comillas
      const GOOGLE_SCRIPT_URL = 'PEGAR_AQUI_LA_URL_DE_TU_GOOGLE_SCRIPT'; 
      
      if (GOOGLE_SCRIPT_URL !== 'PEGAR_AQUI_LA_URL_DE_TU_GOOGLE_SCRIPT') {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(formData)
        });
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un problema al enviar los datos. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validaciones
  const isStep1Valid = formData.interesPrincipal !== '';
  const isStep2Valid = formData.tiempoCompra !== '' && formData.metodoPago !== '';
  const isStep3Valid = formData.ciudad !== '' && formData.nombre.length > 2 && formData.telefono.length >= 8;

  // Opciones de Datos
  const caracteristicasDashing = [
    { id: 'diseno', title: 'Diseño Aerodinámico', desc: 'Líneas futuristas y rines de 20"', icon: <IcoSparkles c="w-5 h-5 mb-2 text-cyan-400" /> },
    { id: 'tech', title: 'Cabina Inteligente', desc: 'Pantalla 15.6" y comandos de voz', icon: <IcoCpu c="w-5 h-5 mb-2 text-cyan-400" /> },
    { id: 'motor', title: 'Rendimiento Sport', desc: 'Motor 1.6T con 197 HP', icon: <IcoZap c="w-5 h-5 mb-2 text-cyan-400" /> },
  ];

  const tiempos = ['Esta misma semana', 'En este mes', 'En 2 a 3 meses', 'Aún estoy evaluando'];
  const pagos = ['Financiamiento Bancario', 'Compra de Contado', 'Dejar mi auto como prima'];
  const ciudades = ['Tegucigalpa', 'San Pedro Sula', 'La Ceiba', 'Choluteca', 'Comayagua', 'Roatán', 'Otra'];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 text-center animate-fade-in-up">
          <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/30">
            <IcoCheck c="w-10 h-10 text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">¡Solicitud Exitosa!</h2>
          <p className="text-cyan-400 text-sm font-mono tracking-widest uppercase mb-6">Acceso VIP Concedido</p>
          <p className="text-slate-400 mb-6 text-lg">
            Gracias <strong>{formData.nombre.split(' ')[0]}</strong>. Un especialista en la <strong>Jetour Dashing</strong> de {formData.ciudad} se contactará contigo vía WhatsApp en breve.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-transparent border border-cyan-500 text-cyan-400 font-semibold py-4 rounded-xl hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050B14] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 bg-slate-900/30 backdrop-blur-2xl border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Panel Izquierdo */}
        <div className="hidden lg:flex lg:col-span-2 relative bg-black flex-col justify-between p-8 overflow-hidden group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-luminosity"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1617814076367-b77137c2b9f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-transparent to-[#050B14]/80" />
          
          <div className="relative z-10">
            <h2 className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase mb-2">Cotización Oficial</h2>
            <h1 className="text-4xl font-bold text-white tracking-tight">JETOUR<br/>DASHING</h1>
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 p-5 rounded-xl">
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Diseñada para los que no se conforman. Obtén precios, opciones de financiamiento y disponibilidad en Honduras.
              </p>
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider bg-cyan-900/30 px-3 py-1.5 rounded-lg border border-cyan-500/30">
                <IcoZap c="w-4 h-4" /> Cotización directa
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho */}
        <div className="lg:col-span-3 flex flex-col relative">
          
          {/* Header */}
          <div className="p-8 pb-4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-white">Cotiza tu Jetour Dashing</h2>
                <p className="text-slate-400 text-sm mt-1">Paso {step} de 3</p>
              </div>
              <div className="text-cyan-400 font-mono text-xl">0{step}</div>
            </div>
            
            <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden relative">
              <div 
                className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-500 ease-out" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Formulario Dinámico */}
          <div className="p-8 flex-1">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Iniciemos tu cotización</h3>
                  <p className="text-slate-400 text-sm mb-6">¿Qué característica es tu prioridad en la Dashing?</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {caracteristicasDashing.map((feat) => (
                    <button
                      key={feat.id}
                      onClick={() => handleSelect('interesPrincipal', feat.title)}
                      className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col h-full ${
                        formData.interesPrincipal === feat.title 
                          ? 'border-cyan-400 bg-cyan-900/20 transform -translate-y-1' 
                          : 'border-slate-700 bg-slate-800/30 hover:border-slate-500'
                      }`}
                    >
                      {feat.icon}
                      <div className="font-semibold text-white mt-auto">{feat.title}</div>
                      <div className="text-xs text-slate-400 mt-2">{feat.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-fade-in-up">
                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <IcoCalendar c="w-5 h-5 text-cyan-400" /> ¿Cuándo planeas estrenar?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {tiempos.map((tiempo) => (
                      <button
                        key={tiempo}
                        onClick={() => handleSelect('tiempoCompra', tiempo)}
                        className={`text-center p-3 rounded-xl border transition-all ${
                          formData.tiempoCompra === tiempo
                            ? 'border-cyan-400 bg-cyan-900/20 text-cyan-300'
                            : 'border-slate-700 bg-slate-800/30 text-slate-300'
                        }`}
                      >
                        <span className="text-sm font-medium">{tiempo}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                    <IcoCreditCard c="w-5 h-5 text-cyan-400" /> Método de adquisición
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {pagos.map((pago) => (
                      <button
                        key={pago}
                        onClick={() => handleSelect('metodoPago', pago)}
                        className={`text-left px-5 py-4 rounded-xl border transition-all flex items-center justify-between ${
                          formData.metodoPago === pago
                            ? 'border-cyan-400 bg-cyan-900/20 text-cyan-300'
                            : 'border-slate-700 bg-slate-800/30 text-slate-300'
                        }`}
                      >
                        <span className="font-medium">{pago}</span>
                        {formData.metodoPago === pago && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-fade-in-up">
                <div className="bg-cyan-950/30 border border-cyan-900 p-4 rounded-xl mb-6 flex gap-3">
                  <IcoShield c="w-6 h-6 text-cyan-400 flex-shrink-0" />
                  <p className="text-sm text-cyan-100/80 font-light">
                    Último paso. Ingresa tus datos para asignarte a tu asesor VIP y enviarte la ficha técnica interactiva.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Nombre Completo</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IcoUser c="h-5 w-5 text-slate-500" />
                      </div>
                      <input type="text" name="nombre" value={formData.nombre} onChange={handleTextChange} placeholder="Ej. Carlos Martínez" className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-3 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Ciudad</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IcoMapPin c="h-5 w-5 text-slate-500" />
                      </div>
                      <select name="ciudad" value={formData.ciudad} onChange={handleTextChange} className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-3 text-white focus:ring-1 focus:ring-cyan-500 outline-none appearance-none">
                        <option value="" className="bg-slate-900">Seleccionar...</option>
                        {ciudades.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">WhatsApp</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-700 bg-slate-800 text-slate-400 text-sm">+504</span>
                      <input type="tel" name="telefono" value={formData.telefono} onChange={handleTextChange} placeholder="0000-0000" className="block w-full bg-slate-900/50 border border-slate-700 rounded-r-xl py-3 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 outline-none" />
                    </div>
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Correo (Opcional)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IcoMail c="h-5 w-5 text-slate-500" />
                      </div>
                      <input type="email" name="email" value={formData.email} onChange={handleTextChange} placeholder="tu@correo.com" className="block w-full pl-10 bg-slate-900/50 border border-slate-700 rounded-xl py-3 text-white placeholder-slate-500 focus:ring-1 focus:ring-cyan-500 outline-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Controles */}
          <div className="p-8 pt-0 flex justify-between items-center">
            {step > 1 ? (
              <button onClick={prevStep} className="px-5 py-3 rounded-xl font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                <IcoChevLeft c="w-5 h-5" /> Atrás
              </button>
            ) : <div />}

            {step < 3 ? (
              <button onClick={nextStep} disabled={step === 1 ? !isStep1Valid : !isStep2Valid} className={`px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 ${(step === 1 ? isStep1Valid : isStep2Valid) ? 'bg-cyan-500 text-slate-900 hover:bg-cyan-400' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}>
                Continuar <IcoChevRight c="w-5 h-5" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!isStep3Valid || isSubmitting} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${isStep3Valid && !isSubmitting ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}`}>
                {isSubmitting ? <>Procesando... <IcoLoader c="w-4 h-4 animate-spin" /></> : <>Solicitar Cotización VIP <IcoZap c="w-4 h-4" /></>}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Animaciones CSS Nativas */}
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } } 
        .animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}