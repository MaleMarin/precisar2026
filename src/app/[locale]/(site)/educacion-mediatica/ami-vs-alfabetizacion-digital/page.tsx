"use client";

import { useState } from "react";
import styles from "./AmiPage.module.css";

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
];

const EJERCICIOS = [
  { id: 1, texto: "Usar una herramienta de verificación de imágenes (OSINT)", respuesta: "ami" as const },
  { id: 2, texto: "Crear una videollamada con agenda y enlace", respuesta: "digital" as const },
  { id: 3, texto: "Compartir un documento en la nube con permisos correctos", respuesta: "digital" as const },
  { id: 4, texto: "Hacer una copia de seguridad automática", respuesta: "digital" as const },
  { id: 5, texto: "Citar correctamente y respetar licencias de autor", respuesta: "ami" as const },
  { id: 6, texto: "Eliminar malware y actualizar el antivirus", respuesta: "digital" as const },
  { id: 7, texto: "Explicar cómo un algoritmo sesga tu feed", respuesta: "ami" as const },
  { id: 8, texto: "Configurar autenticación en dos pasos (2FA)", respuesta: "digital" as const },
  { id: 9, texto: "Reconocer publicidad nativa en un portal", respuesta: "ami" as const },
  { id: 10, texto: "Contrastar una noticia con tres fuentes independientes", respuesta: "ami" as const },
];

type ColId = "ami" | "digital";

export default function AmiVsDigitalPage() {
  const [dropped, setDropped] = useState<Record<number, ColId | null>>({});
  const [checked, setChecked] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);

  const pending = EJERCICIOS.filter((e) => !dropped[e.id]);
  const inCol = (col: ColId) => EJERCICIOS.filter((e) => dropped[e.id] === col);
  const score = EJERCICIOS.filter((e) => dropped[e.id] === e.respuesta).length;

  const handleDrop = (col: ColId) => {
    if (dragging === null) return;
    setDropped((p) => ({ ...p, [dragging]: col }));
    setDragging(null);
    setChecked(false);
  };

  const handleReset = () => {
    setDropped({});
    setChecked(false);
  };

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.kicker}>Educación Mediática · AMI</p>
        <h1 className={styles.heroTitle}>
          ¿En qué se diferencian
          <br />
          AMI y la Alfabetización Digital?
        </h1>
        <p className={styles.heroBajada}>
          AMI se centra en comprender, analizar y usar críticamente los medios y la información. La Alfabetización
          Digital prioriza las habilidades técnicas para usar herramientas y servicios tecnológicos con seguridad y
          eficacia.
        </p>
      </section>

      {/* DOS COLUMNAS */}
      <section className={styles.dosCol}>
        <div className={styles.colAmi}>
          <p className={styles.colTitulo}>AMI · Alfabetización Mediática e Informacional</p>
          <p className={styles.colSub}>Capacidades críticas sobre medios, mensajes y fuentes.</p>
          <ul className={styles.colList}>
            {[
              "Analizar cómo se construye una noticia y distinguir opinión de hecho.",
              "Evaluar la credibilidad de una fuente y detectar publicidad nativa.",
              "Verificar con varias fuentes y entender sesgos/algoritmos.",
              "Derechos: acceso, autoría, privacidad, libertad de expresión, uso justo.",
            ].map((item, i) => (
              <li key={i} className={styles.colItem}>
                <span className={styles.arrow}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.ejemplosLabel}>Ejemplos prácticos</p>
          <div className={styles.tags}>
            {["Detectar deepfakes en campaña", "Identificar titulares clickbait", "Comprobar autoría y fecha"].map(
              (e, i) => (
                <span key={i} className={styles.tagAmi}>
                  {e}
                </span>
              ),
            )}
          </div>
        </div>

        <div className={styles.colDigital}>
          <p className={styles.colTituloD}>Alfabetización Digital</p>
          <p className={styles.colSubD}>Habilidades técnicas y operativas con dispositivos y apps.</p>
          <ul className={styles.colListD}>
            {[
              "Usar correo, videollamadas, hojas de cálculo, gestores de archivos.",
              "Configurar seguridad: contraseñas, 2FA, copias de seguridad.",
              "Administrar privacidad y permisos en redes y móviles.",
              "Resolver problemas básicos de software/hardware.",
            ].map((item, i) => (
              <li key={i} className={styles.colItemD}>
                <span className={styles.arrowD}>→</span>
                {item}
              </li>
            ))}
          </ul>
          <p className={styles.ejemplosLabelD}>Ejemplos prácticos</p>
          <div className={styles.tags}>
            {["Activar 2FA en tus cuentas", "Compartir un Drive con permisos", "Limpiar malware del PC"].map(
              (e, i) => (
                <span key={i} className={styles.tagDigital}>
                  {e}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* TABLA */}
      <section className={styles.tablaSection}>
        <p className={styles.kicker}>Tabla comparativa</p>
        <h2 className={styles.secTitulo}>Dimensión a dimensión</h2>
        <div className={styles.tabla}>
          <div className={styles.tablaHead}>
            <div className={styles.headCelda} style={{ color: "rgba(245,242,236,0.5)" }}>
              Dimensión
            </div>
            <div className={styles.headCelda} style={{ color: "#DB5227" }}>
              AMI
            </div>
            <div className={styles.headCelda} style={{ color: "rgba(245,242,236,0.6)" }}>
              Alfabetización Digital
            </div>
          </div>
          {TABLA.map((f, i) => (
            <div key={i} className={styles.tablaFila}>
              <div className={styles.celdaDim}>{f.dimension}</div>
              <div className={styles.celda}>{f.ami}</div>
              <div className={styles.celda}>{f.digital}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EJERCICIO INTERACTIVO */}
      <section className={styles.ejercicioSection}>
        <p className={styles.kickerLight}>Prueba rápida</p>
        <h2 className={styles.secTituloLight}>
          Arrastra cada ejemplo
          <br />a su columna
        </h2>
        <p className={styles.tip}>
          Si dudas, pregúntate: ¿el ejemplo te pide pensar sobre la información (AMI) o usar herramientas con seguridad
          (Digital)?
        </p>

        <div className={styles.pool}>
          {pending.map((item) => (
            <div key={item.id} className={styles.dragItem} draggable onDragStart={() => setDragging(item.id)}>
              {item.texto}
            </div>
          ))}
          {pending.length === 0 && <p className={styles.poolEmpty}>Todos los ejemplos han sido asignados ✓</p>}
        </div>

        <div className={styles.dropGrid}>
          {(["ami", "digital"] as ColId[]).map((col) => (
            <div
              key={col}
              className={col === "ami" ? styles.dropAmi : styles.dropDigital}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col)}
            >
              <p className={col === "ami" ? styles.dropLabel : styles.dropLabelD}>
                {col === "ami" ? "AMI" : "Alfabetización Digital"}
              </p>
              {inCol(col).length === 0 && <p className={styles.dropHint}>Suelta aquí →</p>}
              {inCol(col).map((item) => (
                <div
                  key={item.id}
                  className={styles.droppedItem}
                  style={{
                    background: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.2)"
                        : "rgba(239,68,68,0.2)"
                      : "rgba(245,242,236,0.08)",
                    borderColor: checked
                      ? item.respuesta === col
                        ? "rgba(34,197,94,0.5)"
                        : "rgba(239,68,68,0.5)"
                      : "rgba(245,242,236,0.15)",
                  }}
                >
                  {checked && <span style={{ marginRight: 6 }}>{item.respuesta === col ? "✓" : "✗"}</span>}
                  {item.texto}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.controles}>
          <button type="button" className={styles.btnComprobar} onClick={() => setChecked(true)} disabled={pending.length > 0}>
            Comprobar
          </button>
          <button type="button" className={styles.btnReiniciar} onClick={handleReset}>
            Reiniciar
          </button>
          {checked && (
            <p className={styles.score}>
              {score} / {EJERCICIOS.length} correctos
            </p>
          )}
        </div>
      </section>

      {/* POR QUÉ IMPORTA */}
      <section className={styles.razonesSection}>
        <p className={styles.kicker}>¿Por qué importa distinguirlas?</p>
        <h2 className={styles.secTitulo}>Tres razones clave</h2>
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
              desc: "Reducir desinformación requiere AMI; reducir fraudes requiere Alfabetización Digital.",
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
  );
}
