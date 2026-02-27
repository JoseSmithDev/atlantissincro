import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad del Club Natación Artística Atlantis conforme al Reglamento General de Protección de Datos (RGPD) y la LOPDGDD.',
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-black text-atlantis-black tracking-tight mb-2">Política de Privacidad</h1>
      <p className="text-atlantis-gray text-sm mb-10">
        Última actualización: febrero de 2026
      </p>

      <section>
        <h2>1. Responsable del tratamiento</h2>
        <ul>
          <li><strong>Identidad:</strong> Club Natación Artística Atlantis</li>
          <li><strong>Domicilio:</strong> Polideportivo de Nazaret, Valencia, España</li>
          <li><strong>Correo electrónico:</strong> <a href="mailto:atlantissincro@gmail.com">atlantissincro@gmail.com</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:+34644388883">+34 644 388 883</a></li>
        </ul>
      </section>

      <section>
        <h2>2. Datos que recogemos y finalidad</h2>
        <p>
          El Club trata los datos personales facilitados por los usuarios a través de los distintos formularios
          del Sitio para las siguientes finalidades:
        </p>
        <table>
          <thead>
            <tr>
              <th>Formulario / Servicio</th>
              <th>Datos recogidos</th>
              <th>Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Solicitud de día de prueba</td>
              <td>Nombre, email, teléfono, edad del menor</td>
              <td>Gestión de la reserva y comunicación con el interesado</td>
            </tr>
            <tr>
              <td>Área de padres (registro/login)</td>
              <td>Email, contraseña (cifrada)</td>
              <td>Autenticación y acceso a la galería privada de fotos</td>
            </tr>
            <tr>
              <td>Contacto por email</td>
              <td>Nombre, email, mensaje</td>
              <td>Atención de consultas y solicitudes</td>
            </tr>
          </tbody>
        </table>
        <p>
          Los datos no serán utilizados para ninguna finalidad distinta de las descritas ni cedidos a terceros
          salvo obligación legal.
        </p>
      </section>

      <section>
        <h2>3. Base jurídica del tratamiento</h2>
        <p>El tratamiento de los datos se fundamenta en:</p>
        <ul>
          <li>
            <strong>Ejecución de una relación precontractual o contractual</strong> (art. 6.1.b RGPD):
            gestión de las solicitudes de prueba y del acceso al área privada.
          </li>
          <li>
            <strong>Interés legítimo del responsable</strong> (art. 6.1.f RGPD):
            atención de consultas y comunicación con personas interesadas en el club.
          </li>
          <li>
            <strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD):
            envío de comunicaciones informativas o noticias del club, cuando se solicite expresamente.
          </li>
        </ul>
      </section>

      <section>
        <h2>4. Comunicación de datos a terceros</h2>
        <p>
          El Club no cede datos personales a terceros, salvo en los siguientes supuestos:
        </p>
        <ul>
          <li>
            <strong>Proveedores de servicios tecnológicos:</strong> utilizamos <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a> (base de datos y autenticación) y
            Cloudflare (almacenamiento de imágenes y CDN), ambos con acuerdos de encargo del tratamiento
            conforme al RGPD y servidores ubicados en la Unión Europea.
          </li>
          <li>
            <strong>Obligación legal:</strong> cuando sea requerido por autoridades competentes.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Transferencias internacionales</h2>
        <p>
          Los servicios tecnológicos utilizados disponen de garantías adecuadas para las transferencias
          internacionales (cláusulas contractuales tipo aprobadas por la Comisión Europea o decisiones de
          adecuación). No se realizan transferencias internacionales no autorizadas.
        </p>
      </section>

      <section>
        <h2>6. Conservación de los datos</h2>
        <p>
          Los datos se conservarán durante el tiempo necesario para la finalidad para la que fueron recogidos y,
          en todo caso, durante los plazos de prescripción legal aplicables:
        </p>
        <ul>
          <li>Datos de registro de socios y padres: mientras dure la relación con el club y 5 años más.</li>
          <li>Datos de solicitudes de prueba: 1 año desde la solicitud si no se formaliza la inscripción.</li>
          <li>Datos de acceso al área privada: mientras la cuenta esté activa; 30 días tras la baja.</li>
        </ul>
      </section>

      <section>
        <h2>7. Derechos de los interesados</h2>
        <p>
          En virtud del RGPD y la <strong>Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD)</strong>, el usuario
          tiene derecho a:
        </p>
        <ul>
          <li><strong>Acceso:</strong> conocer qué datos personales tratamos sobre usted.</li>
          <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos.</li>
          <li><strong>Supresión:</strong> solicitar la eliminación de sus datos cuando ya no sean necesarios.</li>
          <li><strong>Oposición:</strong> oponerse al tratamiento basado en interés legítimo.</li>
          <li><strong>Limitación del tratamiento:</strong> solicitar la suspensión del tratamiento en determinados supuestos.</li>
          <li><strong>Portabilidad:</strong> recibir sus datos en formato estructurado y de uso común.</li>
          <li><strong>Retirada del consentimiento:</strong> en cualquier momento, sin que ello afecte a la licitud del tratamiento previo.</li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, diríjase a:{' '}
          <a href="mailto:atlantissincro@gmail.com">atlantissincro@gmail.com</a>, indicando en el asunto
          «Protección de datos» y adjuntando copia de su documento de identidad.
        </p>
        <p>
          Asimismo, tiene derecho a presentar una reclamación ante la{' '}
          <strong>Agencia Española de Protección de Datos (AEPD)</strong> —{' '}
          <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a> — si
          considera que el tratamiento no es conforme a la normativa vigente.
        </p>
      </section>

      <section>
        <h2>8. Menores de edad</h2>
        <p>
          El Club trata datos de menores de edad en el contexto de su actividad deportiva. Dicho tratamiento
          se realiza con el consentimiento de los padres o tutores legales, quienes ostentan todos los derechos
          descritos en el apartado anterior en nombre del menor.
        </p>
      </section>

      <section>
        <h2>9. Seguridad</h2>
        <p>
          El Club aplica las medidas técnicas y organizativas apropiadas para garantizar la seguridad de los datos
          personales, incluyendo cifrado en tránsito (HTTPS/TLS), control de accesos y almacenamiento en
          plataformas certificadas. No obstante, ninguna transmisión de datos por internet es completamente
          segura, por lo que no podemos garantizar la seguridad absoluta.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-atlantis-gray">
        <Link href="/legal/aviso-legal" className="text-atlantis-red hover:underline">Aviso Legal</Link>
        <span className="text-gray-300">·</span>
        <Link href="/legal/cookies" className="text-atlantis-red hover:underline">Política de Cookies</Link>
        <span className="text-gray-300">·</span>
        <Link href="/" className="hover:text-atlantis-black transition-colors">Volver al inicio</Link>
      </div>
    </article>
  );
}
