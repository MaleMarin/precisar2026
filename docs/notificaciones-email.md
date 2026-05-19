# Notificaciones por correo (Precisar)

## Qué envía correo automático

| Origen | Firestore | Correo (Resend) |
|--------|-----------|-----------------|
| **Newsletter** (pie, /participa) | `newsletter_suscripciones` | Sí · asunto `[Precisar · newsletter]` |
| **Consulta** (/consulta) | `consulta_respuestas` | Sí · asunto `[Precisar · consulta]` |
| **Contáctanos** (pie, /participa) | No | Sí · asunto `[Precisar · pie]` o `[Precisar · participa]` |
| **Bot Onda** | `survey_responses_v6`, etc. | Ver abajo |

## Variables en Vercel

```
RESEND_API_KEY=
FOOTER_CONTACT_FROM=   # remitente verificado en Resend
FOOTER_CONTACT_TO=       # buzón (ej. male@precisar.net)
# PRECISAR_NOTIFY_TO=    # opcional, solo avisos newsletter/consulta
```

Sin `RESEND_API_KEY` y `FOOTER_CONTACT_FROM`, los datos **sí** se guardan en Firebase pero **no** llega el correo de aviso.

## Comprobar en producción

Abre en el navegador:

`https://precisar.net/api/health/forms`

Debe responder algo como:

```json
{
  "firebase": true,
  "resend": true,
  "newsletter": true,
  "consulta": true,
  "contactEmail": true
}
```

Si `firebase: false` → revisa las 6 variables `NEXT_PUBLIC_FIREBASE_ENCUESTA_*` en Vercel y **Redeploy**.  
Si `resend: false` → añade `RESEND_API_KEY` y `FOOTER_CONTACT_FROM`.

## Bot Onda

El bot guarda directo en Firestore desde su propia app; este repo no intercepta esos envíos.

Para recibir correo en cada encuesta del bot:

1. Firebase Console → **Extensiones** → instalar **Trigger Email from Firestore** (o similar).
2. Colección: `survey_responses_v6` (y las que uses).
3. Plantilla con campos `email`, `commune`, etc.

Alternativa: revisar Firestore en la consola o exportar periódicamente.
