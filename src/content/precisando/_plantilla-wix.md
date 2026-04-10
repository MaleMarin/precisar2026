# NO pegues artículos en este archivo

Este archivo es solo instrucciones. Cada artículo va en otro archivo distinto.

---

## Dónde pegar cada artículo (paso a paso)

1. En Cursor, abre la carpeta:

   **`web`** → **`src`** → **`content`** → **`precisando`**

2. Ahí verás muchos archivos que terminan en **`.md`**. Cada uno es **un solo artículo**.

3. El **nombre del archivo** tiene que ser **igual al “slug”** del post (la parte de la URL en Wix después de `precisar.net/`).

   **Ejemplo:** si la URL del post es  
   `https://www.precisar.net/ocde-hechos-frente-a-falsedades-integridad-informativa`  
   entonces pegas el texto en el archivo:

   **`ocde-hechos-frente-a-falsedades-integridad-informativa.md`**

4. **No** abras `_plantilla-wix.md` para pegar. Abre el `.md` del slug que corresponda.

5. Si no sabes el slug: abre **`web/src/data/articles.ts`**, busca el título del post y copia el valor de **`slug:`** — el archivo se llama **`ese-slug.md`** en esta misma carpeta `precisando`.

---

## Resumen en una línea

**Pegar cada artículo en:**  
`web/src/content/precisando/<slug>.md`  
(un archivo distinto por artículo; el slug sale de `articles.ts` o de la URL en Wix).
