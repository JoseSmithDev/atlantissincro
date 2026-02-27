import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies del Club Natación Artística Atlantis conforme al RGPD y la LSSI.',
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-black text-atlantis-black tracking-tight mb-2">Política de Cookies</h1>
      <p className="text-atlantis-gray text-sm mb-10">
        Última actualización: febrero de 2026
      </p>

      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Una cookie es un pequeño archivo de texto que un sitio web almacena en el navegador del usuario cuando
          este lo visita. Las cookies permiten que el sitio recuerde información sobre su visita (idioma, sesión
          iniciada, preferencias, etc.), lo que facilita la navegación y hace el sitio más útil.
        </p>
      </section>

      <section>
        <h2>2. Cookies utilizadas en este sitio</h2>
        <p>
          Este sitio web utiliza <strong>únicamente cookies técnicas y de sesión estrictamente necesarias</strong>
          para su funcionamiento. No se utilizan cookies de publicidad, rastreo de terceros ni analítica de
          comportamiento.
        </p>

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Proveedor</th>
              <th>Tipo</th>
              <th>Duración</th>
              <th>Finalidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>sb-&lt;project&gt;-auth-token</code></td>
              <td>Supabase</td>
              <td>Técnica / sesión</td>
              <td>Sesión / 1 hora</td>
              <td>Mantener la sesión autenticada en el Área de Padres y la administración. Sin esta cookie no es posible iniciar sesión.</td>
            </tr>
            <tr>
              <td><code>sb-&lt;project&gt;-auth-token-code-verifier</code></td>
              <td>Supabase</td>
              <td>Técnica / sesión</td>
              <td>Sesión</td>
              <td>Verificación PKCE durante el flujo de autenticación OAuth. Se elimina al finalizar el proceso de login.</td>
            </tr>
            <tr>
              <td><code>atlantis-intro</code></td>
              <td>Propio</td>
              <td>Preferencia / sessionStorage</td>
              <td>Sesión del navegador</td>
              <td>Recuerda si ya se ha mostrado la animación de bienvenida para no repetirla en la misma sesión. No es una cookie HTTP; se almacena en sessionStorage.</td>
            </tr>
          </tbody>
        </table>

        <p>
          Las cookies de Supabase son necesarias para el funcionamiento del área protegida del sitio. Si las
          bloquea, no podrá acceder al Área de Padres ni al panel de administración, pero el resto del sitio
          funcionará con normalidad.
        </p>
      </section>

      <section>
        <h2>3. Cookies de terceros</h2>
        <p>
          Este sitio web <strong>no instala cookies de terceros</strong> (Google Analytics, Meta Pixel,
          publicidad, redes sociales, etc.). Los únicos servicios externos utilizados son Supabase y Cloudflare,
          cuyas cookies se limitan a las descritas en la tabla anterior y son estrictamente técnicas.
        </p>
      </section>

      <section>
        <h2>4. Cómo gestionar o desactivar las cookies</h2>
        <p>
          Puede configurar su navegador para rechazar, bloquear o eliminar cookies. A continuación encontrará
          los enlaces a las instrucciones de los navegadores más habituales:
        </p>
        <ul>
          <li>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
              Google Chrome
            </a>
          </li>
          <li>
            <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web" target="_blank" rel="noopener noreferrer">
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">
              Safari (macOS / iOS)
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">
              Microsoft Edge
            </a>
          </li>
        </ul>
        <p>
          Tenga en cuenta que deshabilitar cookies puede afectar al funcionamiento de algunas funciones del sitio,
          como la autenticación en el Área de Padres.
        </p>
      </section>

      <section>
        <h2>5. Actualizaciones de esta política</h2>
        <p>
          Esta política puede actualizarse para adaptarse a cambios normativos o funcionales del sitio. La fecha
          de última actualización se indica en la cabecera. Le recomendamos revisarla periódicamente.
        </p>
      </section>

      <section>
        <h2>6. Más información</h2>
        <p>
          Para cualquier consulta sobre el uso de cookies o el tratamiento de sus datos, puede contactarnos en{' '}
          <a href="mailto:atlantissincro@gmail.com">atlantissincro@gmail.com</a>. También puede consultar la
          guía sobre cookies de la{' '}
          <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer">
            Agencia Española de Protección de Datos (AEPD)
          </a>.
        </p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm text-atlantis-gray">
        <Link href="/legal/aviso-legal" className="text-atlantis-red hover:underline">Aviso Legal</Link>
        <span className="text-gray-300">·</span>
        <Link href="/legal/privacidad" className="text-atlantis-red hover:underline">Política de Privacidad</Link>
        <span className="text-gray-300">·</span>
        <Link href="/" className="hover:text-atlantis-black transition-colors">Volver al inicio</Link>
      </div>
    </article>
  );
}
