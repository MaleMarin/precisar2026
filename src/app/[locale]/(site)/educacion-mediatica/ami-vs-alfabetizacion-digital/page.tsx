"use client"
import { useState } from "react"
import styles from "./AmiPage.module.css"

const TABLA = [
  {
    dimension: "Foco",
    ami: "Sentido crítico sobre mensajes, fuentes y contextos.",
    digital: "Uso eficiente y seguro de tecnologías y servicios.",
  },
  {
    dimension: "Preguntas guía",
    ami: "¿Quién lo dice? ¿con qué evidencia? ¿qué intención tiene?",
    digital: "¿Cómo lo hago? ¿qué botón? ¿qué ajuste de seguridad?",
  },
  {
    dimension: "Competencias",
    ami: "Analizar, evaluar, verificar, argumentar, derechos informacionales.",
    digital: "Instalar, configurar, operar, mantener, solucionar problemas.",
  },
  {
    dimension: "Ejemplos",
    ami: "Detectar sesgos; verificar una imagen; reconocer desinformación.",
    digital: "Crear una videollamada; cifrar un disco; gestionar contraseñas.",
  },
  {
    dimension: "Resultado buscado",
    ami: "Pensamiento crítico y ciudadanía informada.",
    digital: "Autonomía técnica y seguridad operativa.",
  },
]

const EJERCICIOS = [
  { id: 1, texto: "Usar una herramienta de verificación de imágenes (OSINT)", respuesta: "ami" },
  { id: 2, texto: "Crear una videollamada con agenda y enlace", respuesta: "digital" },
  { id: 3, texto: "Compartir un documento en la nube con permisos correctos", respuesta: "digital" },
  { id: 4, texto: "Hacer una copia de seguridad automática", respuesta: "digital" },
  { id: 5, texto: "Citar correctamente y respetar licencias de autor", respuesta: "ami" },
  { id: 6, texto: "Eliminar malware y actualizar el antivirus", respuesta: "digital" },
  { id: 7, texto: "Explicar cómo un algoritmo de recomendación sesga tu feed", respuesta: "ami" },
  { id: 8, texto: "Configurar autenticación en dos pasos (2FA)", respuesta: "digital" },
  { id: 9, texto: "Reconocer publicidad nativa en un portal", respuesta: "ami" },
  { id: 10, texto: "Contrastar una noticia con tres fuentes independientes", respuesta: "ami" },
]

type EjercicioItem = typeof EJERCICIOS[0]
type ColumnId = "ami" | "digital" | null

export default function AmiVsDigitalPage() {
  const [dragging, setDragging] = useState<EjercicioItem | null>(null)
  const [dropped, setDropped] = useState<Record<number, ColumnId>>({})
  const [checked, setChecked] = useState(false)

  const handleDragStart = (item: EjercicioItem) => {
    setDragging(item)
  }

  const handleDrop = (col: ColumnId) => {
    if (!dragging) return
    setDropped(prev => ({ ...prev, [dragging.id]: col }))
    setDragging(null)
    setChecked(false)
  }

  const handleReset = () => {
    setDropped({})
    setChecked(false)
  }

  const getItemsInColumn = (col: ColumnId) =>
    EJERCICIOS.filter(e => dropped[e.id] === col)

  const getPending = () =>
    EJERCICIOS.filter(e => !dropped[e.id])

  const getScore = () =>
    EJERCICIOS.filter(e => dropped[e.id] === e.respuesta).length

  return (
    <main className={styles.page}>

      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.kicker}>
          Educación Mediática · AMI
        </p>
        <h1 className={styles.titulo}>
          ¿En qué se diferencian AMI<br />
          y la Alfabetización Digital?
        </h1>
        <p className={styles.bajada}>
          AMI se centra en comprender, analizar y usar 
          críticamente los medios y la información 
          (fuentes, sesgos, verificación, derechos). 
          La Alfabetización Digital prioriza las habilidades 
          técnicas para usar herramientas y servicios 
          tecnológicos con seguridad y eficacia.
        </p>
      </section>

      {/* DOS COLUMNAS */}
      <section className={styles.dosColumnas}>
        <div className={styles.columna} 
          style={{ background: "#023661" }}>
          <p className={styles.colKicker}
            style={{ color: "#DB5227" }}>
            AMI · Alfabetización Mediática e Informacional
          </p>
          <p className={styles.colSubtitulo}
            style={{ color: "rgba(245,242,236,0.6)" }}>
            Capacidades críticas sobre medios, mensajes y fuentes.
          </p>
          <ul className={styles.colItems}>
            {[
              "Analizar cómo se construye una noticia y distinguir opinión de hecho.",
              "Evaluar la credibilidad de una fuente y detectar publicidad nativa.",
              "Verificar con varias fuentes y entender sesgos/algoritmos.",
              "Derechos: acceso, autoría, privacidad, libertad de expresión, uso justo.",
            ].map((item, i) => (
              <li key={i} className={styles.colItem}
                style={{ 
                  color: "rgba(245,242,236,0.8)",
                  borderBottomColor: "rgba(245,242,236,0.08)" 
                }}>
                <span style={{ color: "#DB5227" }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.colEjemplos}>
            <p className={styles.colEjemploLabel}
              style={{ color: "rgba(245,242,236,0.35)" }}>
              Ejemplos prácticos
            </p>
            {[
              "Detectar deepfakes en campaña",
              "Identificar titulares clickbait",
              "Comprobar autoría y fecha",
            ].map((e, i) => (
              <span key={i} className={styles.tag}
                style={{ 
                  background: "rgba(219,82,39,0.15)",
                  color: "#DB5227",
                  border: "1px solid rgba(219,82,39,0.3)" 
                }}>
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.columna} 
          style={{ background: "#F5F2EC" }}>
          <p className={styles.colKicker}
            style={{ color: "#023661" }}>
            Alfabetización Digital
          </p>
          <p className={styles.colSubtitulo}
            style={{ color: "rgba(10,12,18,0.55)" }}>
            Habilidades técnicas y operativas con dispositivos y apps.
          </p>
          <ul className={styles.colItems}>
            {[
              "Usar correo, videollamadas, hojas de cálculo, gestores de archivos.",
              "Configurar seguridad: contraseñas, 2FA, copias de seguridad.",
              "Administrar privacidad y permisos en redes y móviles.",
              "Resolver problemas básicos de software/hardware.",
            ].map((item, i) => (
              <li key={i} className={styles.colItem}
                style={{ 
                  color: "rgba(10,12,18,0.72)",
                  borderBottomColor: "rgba(10,12,18,0.08)" 
                }}>
                <span style={{ color: "#DB5227" }}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <div className={styles.colEjemplos}>
            <p className={styles.colEjemploLabel}
              style={{ color: "rgba(10,12,18,0.35)" }}>
              Ejemplos prácticos
            </p>
            {[
              "Activar 2FA en tus cuentas",
              "Compartir un Drive con permisos",
              "Limpiar malware del PC",
            ].map((e, i) => (
              <span key={i} className={styles.tag}
                style={{ 
                  background: "rgba(2,54,97,0.08)",
                  color: "#023661",
                  border: "1px solid rgba(2,54,97,0.2)" 
                }}>
                {e}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TABLA COMPARATIVA */}
      <section className={styles.tablaSection}>
        <p className={styles.sectionKicker}>
          Tabla comparativa
        </p>
        <h2 className={styles.sectionTitulo}>
          Dimensión a dimensión
        </h2>
        <div className={styles.tabla}>
          <div className={styles.tablaHeader}>
            <div className={styles.tablaCelda}>Dimensión</div>
            <div className={styles.tablaCelda}
              style={{ color: "#DB5227" }}>
              AMI
            </div>
            <div className={styles.tablaCelda}
              style={{ color: "#023661" }}>
              Alfabetización Digital
            </div>
          </div>
          {TABLA.map((fila, i) => (
            <div key={i} className={styles.tablaFila}>
              <div className={styles.tablaCelda}
                style={{ 
                  fontWeight: 600,
                  color: "#0A0C12" 
                }}>
                {fila.dimension}
              </div>
              <div className={styles.tablaCelda}
                style={{ color: "rgba(10,12,18,0.65)" }}>
                {fila.ami}
              </div>
              <div className={styles.tablaCelda}
                style={{ color: "rgba(10,12,18,0.65)" }}>
                {fila.digital}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EJERCICIO INTERACTIVO */}
      <section className={styles.ejercicioSection}>
        <p className={styles.sectionKicker}
          style={{ color: "#DB5227" }}>
          Prueba rápida
        </p>
        <h2 className={styles.sectionTitulo}
          style={{ color: "#F5F2EC" }}>
          Arrastra cada ejemplo<br />a su columna
        </h2>
        <p className={styles.ejercicioTip}>
          Tip: si dudas, pregúntate si el ejemplo te pide 
          pensar sobre la información (AMI) o 
          operar herramientas con seguridad (Digital).
        </p>

        {/* Items pendientes */}
        <div className={styles.itemsPool}>
          {getPending().map(item => (
            <div
              key={item.id}
              className={styles.dragItem}
              draggable
              onDragStart={() => handleDragStart(item)}
            >
              {item.texto}
            </div>
          ))}
        </div>

        {/* Zonas de drop */}
        <div className={styles.dropZonas}>
          {(["ami", "digital"] as ColumnId[]).map(col => (
            <div
              key={col}
              className={styles.dropZona}
              style={{
                background: col === "ami" 
                  ? "rgba(219,82,39,0.1)" 
                  : "rgba(2,54,97,0.2)",
                borderColor: col === "ami"
                  ? "rgba(219,82,39,0.3)"
                  : "rgba(2,54,97,0.4)",
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col)}
            >
              <p className={styles.dropZonaLabel}
                style={{ 
                  color: col === "ami" 
                    ? "#DB5227" 
                    : "rgba(245,242,236,0.6)" 
                }}>
                {col === "ami" 
                  ? "AMI" 
                  : "Alfabetización Digital"}
              </p>
              {getItemsInColumn(col).length === 0 && (
                <p className={styles.dropPlaceholder}>
                  Suelta aquí →
                </p>
              )}
              {getItemsInColumn(col).map(item => (
                <div
                  key={item.id}
                  className={styles.droppedItem}
                  style={{
                    background: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.15)"
                        : "rgba(239,68,68,0.15)"
                      : "rgba(245,242,236,0.08)",
                    borderColor: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.4)"
                        : "rgba(239,68,68,0.4)"
                      : "rgba(245,242,236,0.12)",
                  }}
                >
                  {checked && (
                    <span style={{ 
                      marginRight: "6px",
                      fontSize: "12px" 
                    }}>
                      {item.respuesta === col ? "✓" : "✗"}
                    </span>
                  )}
                  {item.texto}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Controles */}
        <div className={styles.ejercicioControles}>
          <button
            type="button"
            className={styles.btnComprobar}
            onClick={() => setChecked(true)}
            disabled={getPending().length > 0}
          >
            Comprobar
          </button>
          <button
            type="button"
            className={styles.btnReiniciar}
            onClick={handleReset}
          >
            Reiniciar
          </button>
          {checked && (
            <p className={styles.score}>
              {getScore()} / {EJERCICIOS.length} correctos
            </p>
          )}
        </div>
      </section>

      {/* POR QUÉ IMPORTA */}
      <section className={styles.porQueSection}>
        <p className={styles.sectionKicker}>
          ¿Por qué importa distinguirlas?
        </p>
        <h2 className={styles.sectionTitulo}
          style={{ color: "#0A0C12" }}>
          Tres razones clave
        </h2>
        <div className={styles.razonesGrid}>
          {[
            {
              titulo: "Diseño curricular",
              desc: "Equilibra pensamiento crítico (AMI) con habilidades técnicas (Digital).",
            },
            {
              titulo: "Políticas públicas",
              desc: "La brecha no es solo de acceso/uso; también de criterio y verificación.",
            },
            {
              titulo: "Ciudadanía",
              desc: "Reducir desinformación requiere AMI; reducir fraudes y pérdidas de datos requiere Alfabetización Digital.",
            },
          ].map((r, i) => (
            <div key={i} className={styles.razonCard}>
              <p className={styles.razonTitulo}>{r.titulo}</p>
              <p className={styles.razonDesc}>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  )
}
