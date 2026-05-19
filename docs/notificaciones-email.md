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

## Bot Onda

El bot guarda directo en Firestore desde su propia app; este repo no intercepta esos envíos.

Para recibir correo en cada encuesta del bot:

1. Firebase Console → **Extensiones** → instalar **Trigger Email from Firestore** (o similar).
2. Colección: `survey_responses_v6` (y las que uses).
3. Plantilla con campos `email`, `commune`, etc.

Alternativa: revisar Firestore en la consola o exportar periódicamente.
