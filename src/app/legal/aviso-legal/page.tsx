import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Aviso Legal',
  description: 'Aviso legal del Club Natación Artística Atlantis conforme a la Ley 34/2002 de Servicios de la Sociedad de la Información.',
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-black text-atlantis-black tracking-tight mb-2">Aviso Legal</h1>
      <p className="text-atlantis-gray text-sm mb-10">
        Última actualización: febrero de 2026
      </p>

      <section>
        <h2>1. Datos identificativos del titular</h2>
        <p>
          En cumplimiento del artículo 10 de la <strong>Ley 34/2002, de 11 de julio, de Servicios de la Sociedad
          de la Información y del Comercio Electrónico (LSSI-CE)</strong>, se informa al usuario de los siguientes
          datos identificativos del titular del sitio web:
        </p>
        <ul>
          <li><strong>Denominación:</strong> Club Natación Artística Atlantis</li>
          <li><strong>NIF/CIF:</strong> G98259443</li>
          <li><strong>Domicilio:</strong> Polideportivo de Nazaret, Valencia, Comunitat Valenciana, España</li>
          <li><strong>Correo electrónico:</strong> <a href="mailto:atlantissincro@gmail.com">atlantissincro@gmail.com</a></li>
          <li><strong>Teléfono:</strong> <a href="tel:+34644388883">+34 644 388 883</a></li>
          <li><strong>Sitio web:</strong> atlantissincro.com</li>
        </ul>
      </section>

      <section>
        <h2>2. Objeto y ámbito de aplicación</h2>
        <p>
          El presente Aviso Legal regula el acceso y uso del sitio web <strong>atlantissincro.com</strong>
          (en adelante, «el Sitio»), titularidad del Club Natación Artística Atlantis
          (en adelante, «el Club»). El acceso al Sitio implica la aceptación plena y sin reservas de las
          presentes condiciones.
        </p>
      </section>

      <section>
        <h2>3. Condiciones de uso</h2>
        <p>
          El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos en el Sitio y,
          con carácter enunciativo pero no limitativo, a no emplearlos para:
        </p>
        <ul>
          <li>Realizar actividades ilícitas o contrarias a la buena fe y al ordenamiento jurídico.</li>
          <li>Difundir contenidos o propaganda de carácter racista, xenófobo, pornográfico o que atente contra los derechos de menores.</li>
          <li>Provocar daños en los sistemas físicos y lógicos del Club o de terceros.</li>
          <li>Intentar acceder, utilizar o manipular los datos del Club, terceros proveedores u otros usuarios.</li>
        </ul>
      </section>

      <section>
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio —incluyendo, sin carácter limitativo, textos, fotografías, gráficos,
          imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales— son titularidad del
          Club o de terceros que han autorizado expresamente su uso, y están protegidos por la legislación española
          e internacional de propiedad intelectual e industrial.
        </p>
        <p>
          Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación total
          o parcial de los contenidos del Sitio sin la autorización expresa y por escrito del Club.
        </p>
      </section>

      <section>
        <h2>5. Política de enlaces</h2>
        <p>
          El Sitio puede contener enlaces a páginas web de terceros. El Club no controla dichos sitios ni asume
          responsabilidad alguna por sus contenidos, políticas de privacidad o disponibilidad. La inclusión de un
          enlace no implica ningún tipo de asociación o respaldo entre el Club y el sitio enlazado.
        </p>
      </section>

      <section>
        <h2>6. Limitación de responsabilidad</h2>
        <p>
          El Club no garantiza la disponibilidad ni la continuidad del Sitio. Asimismo, el Club no se responsabiliza
          de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad,
          de la utilización del Sitio o de sus contenidos, ni de los errores u omisiones en los mismos.
        </p>
      </section>

      <section>
        <h2>7. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier
          controversia derivada del acceso o uso del Sitio, las partes se someten a los Juzgados y Tribunales
          de la ciudad de <strong>Valencia</strong>, con renuncia expresa a cualquier otro fuero que pudiera
          corresponderles.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-atlantis-gray">
        <Link href="/legal/privacidad" className="text-atlantis-red hover:underline">Política de Privacidad</Link>
        <span className="text-gray-300">·</span>
        <Link href="/legal/cookies" className="text-atlantis-red hover:underline">Política de Cookies</Link>
        <span className="text-gray-300">·</span>
        <Link href="/" className="hover:text-atlantis-black transition-colors">Volver al inicio</Link>
      </div>
    </article>
  );
}
