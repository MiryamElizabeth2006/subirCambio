# Sistema de Digitalización de Documentos

Un sistema web moderno y completo para la digitalización, procesamiento y gestión de documentos con funcionalidades avanzadas de OCR y análisis inteligente.

## 🚀 Características Principales

### 🔐 Autenticación y Seguridad
- **Sistema de Login**: Autenticación segura con validación de credenciales
- **Gestión de Sesiones**: Control de acceso y cierre de sesión
- **Datos Demo**: Usuario: `admin` / Contraseña: `123456`

### 📊 Dashboard Interactivo
- **Estadísticas en Tiempo Real**: Documentos procesados, pendientes, precisión OCR y espacio usado
- **Actividad Reciente**: Simulación de actividad en tiempo real
- **Métricas Dinámicas**: Actualización automática de estadísticas
- **Animaciones Suaves**: Efectos visuales para mejor experiencia de usuario

### 📤 Subida y Procesamiento de Documentos
- **Drag & Drop**: Arrastra y suelta archivos directamente
- **Múltiples Formatos**: Soporte para PDF, JPG, PNG
- **Validación de Archivos**: Verificación de tipo y tamaño (máximo 10MB)
- **Auto-detección**: Detección automática del tipo de documento basada en el nombre
- **Cola de Procesamiento**: Sistema de cola para múltiples documentos
- **Barra de Progreso**: Indicador visual del progreso de procesamiento

### 🔍 OCR y Extracción de Texto
- **Procesamiento OCR Simulado**: Extracción inteligente de texto
- **Auto-llenado de Formularios**: Extracción automática de fechas, números, montos y descripciones
- **Validación de Documentos**: Verificación de campos importantes
- **Análisis Avanzado**: Estadísticas detalladas del contenido extraído
- **Auto-guardado**: Guardado automático del texto extraído

### 📝 Gestión de Documentos
- **Formulario Inteligente**: Validación en tiempo real con mensajes de error
- **Metadatos Detallados**: Información de procesamiento, confianza OCR y páginas
- **Búsqueda Avanzada**: Filtrado por tipo y búsqueda por texto
- **Acciones Múltiples**: Ver, editar, exportar y eliminar documentos
- **Vista Modal**: Detalles completos en ventana emergente

### 📤 Exportación y Análisis
- **Exportación a Excel**: Descarga de documentos en formato CSV
- **Exportación Individual**: Exportar documentos específicos
- **Análisis de Contenido**: Detección de números, moneda, emails y teléfonos
- **Validación Automática**: Verificación de completitud de documentos
- **Recomendaciones**: Sugerencias basadas en el análisis del contenido

### 🎨 Interfaz de Usuario
- **Diseño Responsivo**: Adaptable a diferentes tamaños de pantalla
- **Tema Oscuro**: Interfaz moderna con tema oscuro
- **Animaciones CSS**: Transiciones suaves y efectos visuales
- **Tooltips Informativos**: Información contextual en hover
- **Notificaciones**: Sistema de alertas para feedback del usuario

## 🛠️ Funcionalidades Técnicas

### JavaScript Avanzado
- **Gestión de Estado**: Control de estado de la aplicación
- **Local Storage**: Persistencia de datos en el navegador
- **Event Handling**: Manejo completo de eventos del usuario
- **Validación de Formularios**: Validación en tiempo real
- **Simulación de OCR**: Procesamiento simulado con resultados realistas

### CSS Moderno
- **Flexbox y Grid**: Layouts modernos y responsivos
- **Animaciones CSS**: Transiciones y keyframes
- **Backdrop Filter**: Efectos de desenfoque
- **Gradientes**: Efectos visuales modernos
- **Media Queries**: Diseño adaptativo

### HTML Semántico
- **Estructura Clara**: Organización lógica del contenido
- **Accesibilidad**: Elementos semánticos apropiados
- **Formularios Intuitivos**: Campos bien estructurados
- **Navegación Clara**: Menú de navegación organizado

## 📱 Experiencia de Usuario

### Flujo de Trabajo
1. **Inicio de Sesión**: Autenticación segura
2. **Dashboard**: Vista general del sistema
3. **Subida de Documentos**: Drag & drop o selección manual
4. **Procesamiento OCR**: Extracción automática de texto
5. **Validación y Edición**: Revisión y corrección de datos
6. **Guardado**: Almacenamiento con metadatos
7. **Gestión**: Búsqueda, filtrado y exportación

### Interactividad
- **Feedback Visual**: Notificaciones y animaciones
- **Validación en Tiempo Real**: Mensajes de error inmediatos
- **Auto-completado**: Llenado automático de formularios
- **Progreso Visual**: Barras de progreso y estados
- **Acciones Rápidas**: Botones de acceso directo

## 🔧 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexión a internet (para fuentes Google Fonts)

### Instalación
1. Descarga todos los archivos del proyecto
2. Abre `index.html` en tu navegador
3. Inicia sesión con las credenciales demo
4. ¡Comienza a digitalizar documentos!

### Uso Básico
1. **Subir Documento**: Arrastra un archivo PDF o imagen
2. **Procesar**: Haz clic en "Procesar Documento"
3. **Revisar**: Verifica el texto extraído
4. **Completar**: Llena el formulario con los datos
5. **Guardar**: Almacena el documento digitalizado

## 🎯 Funcionalidades Destacadas

### Auto-detección de Tipo
El sistema analiza automáticamente el nombre del archivo para sugerir el tipo de documento:
- `factura` o `invoice` → Factura
- `recibo` o `receipt` → Recibo
- `contrato` o `contract` → Contrato
- `dni`, `id` o `identificacion` → Identificación

### Extracción Inteligente
Utiliza expresiones regulares para extraer automáticamente:
- **Fechas**: Formato DD/MM/YYYY
- **Números de Documento**: Patrones alfanuméricos
- **Montos**: Valores monetarios en soles
- **Descripciones**: Conceptos y detalles

### Validación Avanzada
Verifica la presencia de:
- ✅ Fechas válidas
- ✅ Montos monetarios
- ✅ Números de documento
- ✅ Información de empresa
- ✅ Completitud del contenido

### Análisis de Contenido
Proporciona estadísticas detalladas:
- 📊 Conteo de palabras y caracteres
- 📄 Número de líneas
- 🔢 Detección de números
- 💰 Información monetaria
- 📧 Emails y teléfonos

## 🚀 Próximas Mejoras

- [ ] Integración con APIs de OCR reales
- [ ] Soporte para más formatos de archivo
- [ ] Sistema de usuarios y permisos
- [ ] Backup en la nube
- [ ] API REST para integración
- [ ] Aplicación móvil
- [ ] Análisis de inteligencia artificial
- [ ] Integración con sistemas contables

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para fines educativos y comerciales.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir mejoras.

---

**Desarrollado con ❤️ para la digitalización eficiente de documentos**
