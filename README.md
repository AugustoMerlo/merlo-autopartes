# Merlo Autopartes

Sitio web estático y adaptable, desarrollado con HTML, CSS y JavaScript nativo.

## Desarrollo local

Requiere Node.js 24 o posterior y Python 3 para servir el sitio localmente.

```powershell
npm ci
npm run check
py -m http.server 8000 --directory dist
```

Abrí `http://localhost:8000` en el navegador. `npm run check` valida HTML y CSS, crea `dist/` y verifica los recursos locales.

## Integración y despliegue

- Los cambios se integran mediante pull requests hacia `staging` o `main`.
- GitHub Actions ejecuta las validaciones y construye el mismo artefacto que se despliega.
- `staging` publica una vista de prueba; `main` es producción.
- Los pull requests generan una vista previa independiente cuando Cloudflare está configurado.
- La publicación usa Cloudflare Pages Direct Upload desde GitHub Actions; el sitio solo publica los archivos de `dist/`.

### Configuración de Cloudflare

1. Crea un proyecto de Cloudflare Pages con Direct Upload, por ejemplo `merlo-autopartes`, y establece `main` como rama de producción.
2. En GitHub, agrega los secretos `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`. El token debe tener permiso **Account → Cloudflare Pages → Edit**.
3. Agrega la variable de repositorio `CLOUDFLARE_PAGES_PROJECT` con el nombre exacto del proyecto.
4. Después de guardar esos valores, los cambios validados en `main` se publican en producción y los de `staging` en una URL de vista previa.
5. El dominio `.com` se conecta desde **Custom domains** en la configuración del proyecto de Pages cuando esté registrado.

Los despliegues se omiten de forma explícita hasta que estén configurados los secretos y la variable. Más información: [Cloudflare Pages con GitHub Actions](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/) y [vistas previas](https://developers.cloudflare.com/pages/configuration/preview-deployments/).
