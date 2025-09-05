// ===== VARIABLES GLOBALES =====
let currentUser = null;
let currentDocument = null;
let documents = JSON.parse(localStorage.getItem('documents')) || [];
let currentFile = null;
let processingQueue = [];
let isProcessing = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showMainScreen();
        loadDocuments();
        initializeSidebar();
        updateDashboardStats();
        startActivitySimulation();
    } else {
        showLoginScreen();
    }
    
    // Configurar event listeners
    setupEventListeners();
}

// ===== GESTIÓN DE PANTALLAS =====
function showLoginScreen() {
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('main-screen').classList.remove('active');
}

function showMainScreen() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('main-screen').classList.add('active');
    currentUser = { name: 'Administrador' };
}

// ===== CONFIGURACIÓN DE EVENT LISTENERS =====
function setupEventListeners() {
    // Login
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', handleNavigation);
    });
    
    // Subida de archivos
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleFileDrop);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    fileInput.addEventListener('change', handleFileSelect);
    
    // Procesamiento de archivos
    document.getElementById('remove-file').addEventListener('click', removeFile);
    document.getElementById('process-file').addEventListener('click', processFile);
    
    // Tabs de procesamiento
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', handleTabChange);
    });
    
    // Formulario de documento
    document.getElementById('document-form').addEventListener('submit', handleDocumentSave);
    
    // Búsqueda y filtros
    document.getElementById('search-docs').addEventListener('input', handleSearch);
    document.getElementById('filter-type').addEventListener('change', handleFilter);
    
    // Sidebar toggle
    document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
    
    // Modal
    document.getElementById('close-modal').addEventListener('click', closeModal);
    
    // Cerrar modal al hacer clic fuera
    document.getElementById('document-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Manejar cambio de tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    // Overlay para cerrar sidebar
    document.getElementById('sidebar-overlay').addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            toggleSidebar();
        }
    });

    // Event listeners adicionales para nuevas funcionalidades
    setupAdvancedEventListeners();
}

function setupAdvancedEventListeners() {
    // Botón de copiar texto
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'Copiar Texto') {
            copyText();
        }
        if (e.target.textContent === 'Exportar PDF') {
            exportToPDF();
        }
        if (e.target.textContent === 'Exportar Excel') {
            exportToExcel();
        }
        if (e.target.textContent === 'Validar Documento') {
            validateDocument();
        }
        if (e.target.textContent === 'Análisis Avanzado') {
            performAdvancedAnalysis();
        }
    });

    // Auto-guardado del texto extraído
    const extractedTextarea = document.getElementById('extracted-textarea');
    if (extractedTextarea) {
        extractedTextarea.addEventListener('input', autoSaveExtractedText);
    }

    // Validación en tiempo real del formulario
    const formInputs = document.querySelectorAll('#document-form input, #document-form select, #document-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateFormField);
        input.addEventListener('input', clearFieldError);
    });
}

// ===== AUTENTICACIÓN =====
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validación simple (en producción usar backend)
    if (username === 'admin' && password === '123456') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ name: 'Administrador' }));
        showMainScreen();
        loadDocuments();
        showNotification('Sesión iniciada correctamente', 'success');
        
        // Registrar actividad
        addActivity('Sesión iniciada', 'login');
    } else {
        showNotification('Usuario o contraseña incorrectos', 'error');
        // Agregar efecto de shake al formulario
        const loginCard = document.querySelector('.login-card');
        loginCard.classList.add('shake');
        setTimeout(() => loginCard.classList.remove('shake'), 500);
    }
}

function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    showLoginScreen();
    showNotification('Sesión cerrada', 'info');
}

// ===== NAVEGACIÓN =====
function handleNavigation(e) {
    const section = e.currentTarget.dataset.section;
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Mostrar sección correspondiente
    document.querySelectorAll('.content-section').forEach(sectionEl => {
        sectionEl.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    
    // Actualizar título de la página
    const titles = {
        dashboard: 'Dashboard',
        upload: 'Subir Documento',
        documents: 'Documentos',
        processing: 'Procesamiento'
    };
    document.getElementById('page-title').textContent = titles[section];
    
    // Cerrar sidebar en móviles después de navegar
    if (window.innerWidth <= 768) {
        toggleSidebar();
    }

    // Cargar datos específicos de la sección
    if (section === 'dashboard') {
        updateDashboardStats();
    } else if (section === 'documents') {
        loadDocuments();
    }
}

// ===== TOGGLE SIDEBAR =====
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const isCollapsed = sidebar.classList.contains('collapsed');
    
    if (isCollapsed) {
        sidebar.classList.remove('collapsed');
        sidebar.classList.add('open');
        // Mostrar overlay solo en móviles
        if (window.innerWidth <= 768) {
            overlay.classList.remove('hidden');
        }
    } else {
        sidebar.classList.add('collapsed');
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
    }
    
    // Guardar estado en localStorage
    localStorage.setItem('sidebarCollapsed', !isCollapsed);
}

function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarCollapsed = localStorage.getItem('sidebarCollapsed');
    
    // En pantallas pequeñas, el sidebar siempre empieza colapsado
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
    } else {
        // En pantallas grandes, recordar el estado anterior
        if (sidebarCollapsed === 'true') {
            sidebar.classList.add('collapsed');
        }
    }
}

function handleResize() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    // En pantallas pequeñas, asegurar que el sidebar esté colapsado
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
    } else {
        // En pantallas grandes, remover la clase 'open' que es solo para móviles
        sidebar.classList.remove('open');
        overlay.classList.add('hidden');
    }
}

// ===== SUBIDA DE ARCHIVOS =====
function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    // Validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
        showNotification('Tipo de archivo no soportado. Use PDF, JPG o PNG', 'error');
        return;
    }
    
    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
        showNotification('El archivo es demasiado grande. Máximo 10MB', 'error');
        return;
    }
    
    currentFile = file;
    showFilePreview(file);
    showNotification('Archivo cargado correctamente', 'success');
    
    // Auto-detección del tipo de documento
    autoDetectDocumentType(file);
}

function autoDetectDocumentType(file) {
    // Simular detección automática basada en el nombre del archivo
    const fileName = file.name.toLowerCase();
    const docTypeSelect = document.getElementById('doc-type');
    
    if (fileName.includes('factura') || fileName.includes('invoice')) {
        docTypeSelect.value = 'factura';
    } else if (fileName.includes('recibo') || fileName.includes('receipt')) {
        docTypeSelect.value = 'recibo';
    } else if (fileName.includes('contrato') || fileName.includes('contract')) {
        docTypeSelect.value = 'contrato';
    } else if (fileName.includes('dni') || fileName.includes('id') || fileName.includes('identificacion')) {
        docTypeSelect.value = 'identificacion';
    }
    
    if (docTypeSelect.value) {
        showNotification(`Tipo de documento detectado: ${docTypeSelect.options[docTypeSelect.selectedIndex].text}`, 'info');
    }
}

function showFilePreview(file) {
    const preview = document.getElementById('file-preview');
    const previewImg = document.getElementById('preview-img');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const fileType = document.getElementById('file-type');
    
    // Mostrar información del archivo
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);
    fileType.textContent = file.type;
    
    // Mostrar vista previa si es imagen
    if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        previewImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzMzMzMzIi8+CjxwYXRoIGQ9Ik01MCA1MEgxNTBWMTUwSDUwVjUwWiIgZmlsbD0iIzY2NjY2NiIvPgo8cGF0aCBkPSJNNzAgNzBIMTMwVjkwSDcwVjcwWiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNNzAgMTAwSDEzMFYxMjBINzBWMTAwWiIgZmlsbD0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNNzAgMTMwSDEzMFYxNTBINzBWMTMwWiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K';
    }
    
    preview.classList.remove('hidden');
}

function removeFile() {
    currentFile = null;
    document.getElementById('file-preview').classList.add('hidden');
    document.getElementById('file-input').value = '';
    showNotification('Archivo eliminado', 'info');
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ===== PROCESAMIENTO DE DOCUMENTOS =====
function processFile() {
    if (!currentFile) {
        showNotification('No hay archivo para procesar', 'error');
        return;
    }
    
    // Agregar a la cola de procesamiento
    processingQueue.push(currentFile);
    
    if (!isProcessing) {
        processNextInQueue();
    }
    
    showNotification('Documento agregado a la cola de procesamiento', 'info');
}

function processNextInQueue() {
    if (processingQueue.length === 0) {
        isProcessing = false;
        return;
    }
    
    isProcessing = true;
    const file = processingQueue.shift();
    
    // Simular procesamiento OCR
    const statusBadge = document.getElementById('processing-status');
    statusBadge.textContent = 'Procesando...';
    statusBadge.className = 'status-badge processing';
    
    showNotification('Iniciando procesamiento OCR...', 'info');
    
    // Mostrar progreso
    showProcessingProgress();
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
        statusBadge.textContent = 'Completado';
        statusBadge.className = 'status-badge completed';
        
        // Simular texto extraído
        const extractedText = simulateOCRText();
        document.getElementById('extracted-textarea').value = extractedText;
        
        // Mostrar documento en la vista original
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('document-img').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
        
        // Cambiar a la sección de procesamiento
        document.querySelector('[data-section="processing"]').click();
        
        showNotification('Documento procesado correctamente', 'success');
        
        // Auto-llenar formulario con datos extraídos
        autoFillFormFromText(extractedText);
        
        // Procesar siguiente en la cola
        processNextInQueue();
    }, 3000);
}

function showProcessingProgress() {
    // Crear barra de progreso si no existe
    let progressBar = document.querySelector('.processing-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'processing-progress';
        progressBar.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-text">Procesando OCR...</div>
        `;
        document.querySelector('.processing-header').appendChild(progressBar);
    }
    
    // Animar progreso
    const progressFill = progressBar.querySelector('.progress-fill');
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => progressBar.remove(), 1000);
        }
        progressFill.style.width = progress + '%';
    }, 200);
}

function autoFillFormFromText(text) {
    // Extraer información del texto usando regex
    const form = document.getElementById('document-form');
    
    // Extraer fecha
    const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
    if (dateMatch) {
        const date = new Date(dateMatch[1].split('/').reverse().join('-'));
        document.getElementById('doc-date').value = date.toISOString().split('T')[0];
    }
    
    // Extraer número de documento
    const numberMatch = text.match(/[Nn]úmero[:\s]*([A-Z0-9\-]+)/);
    if (numberMatch) {
        document.getElementById('doc-number').value = numberMatch[1];
    }
    
    // Extraer monto
    const amountMatch = text.match(/TOTAL[:\s]*S\/\.\s*([\d,]+\.?\d*)/);
    if (amountMatch) {
        document.getElementById('doc-amount').value = amountMatch[1].replace(',', '');
    }
    
    // Extraer descripción
    const descriptionMatch = text.match(/Por concepto de[:\s]*([^\n]+)/);
    if (descriptionMatch) {
        document.getElementById('doc-description').value = descriptionMatch[1].trim();
    }
}

function simulateOCRText() {
    const sampleTexts = [
        `FACTURA ELECTRÓNICA
Número: F001-2024-00012345
Fecha: 15/01/2024

EMPRESA EJEMPLO S.A.
RUC: 20123456789
Dirección: Av. Principal 123, Lima

CLIENTE:
Juan Pérez
DNI: 12345678
Dirección: Calle Secundaria 456

DETALLE:
1. Servicio de consultoría - S/. 1,500.00
2. Desarrollo de software - S/. 3,200.00
3. Capacitación - S/. 800.00

Subtotal: S/. 5,500.00
IGV (18%): S/. 990.00
TOTAL: S/. 6,490.00

Forma de pago: Transferencia bancaria
Vencimiento: 30 días`,

        `RECIBO DE PAGO
Número: R001-2024-00098765
Fecha: 20/01/2024

Recibí de: María González
La suma de: S/. 2,500.00
Por concepto de: Pago de servicios profesionales

Monto en letras: DOS MIL QUINIENTOS Y 00/100 SOLES

Firma: _________________
DNI: 87654321`,

        `CONTRATO DE ARRENDAMIENTO
Contrato N°: C001-2024
Fecha: 10/01/2024

ENTRE LOS SUSCRITOS:
Arrendador: Carlos López
DNI: 11223344
Dirección: Av. Los Pinos 789

Arrendatario: Ana Martínez
DNI: 55667788
Dirección: Calle Real 321

OBJETO:
Arrendamiento de oficina ubicada en Av. Los Pinos 789, 3er piso.

PLAZO: 12 meses
MONTO MENSUAL: S/. 3,000.00

Firmas:
Arrendador: _________________
Arrendatario: _________________`
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
}

// ===== GESTIÓN DE TABS =====
function handleTabChange(e) {
    const tabName = e.currentTarget.dataset.tab;
    
    // Actualizar botones activos
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.currentTarget.classList.add('active');
    
    // Mostrar contenido correspondiente
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
}

// ===== FORMULARIO DE DOCUMENTO =====
function handleDocumentSave(e) {
    e.preventDefault();
    
    // Validar formulario
    if (!validateForm()) {
        showNotification('Por favor complete todos los campos requeridos', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const documentData = {
        id: Date.now(),
        name: currentFile ? currentFile.name : 'Documento sin nombre',
        type: formData.get('doc-type') || document.getElementById('doc-type').value,
        date: formData.get('doc-date') || document.getElementById('doc-date').value,
        number: formData.get('doc-number') || document.getElementById('doc-number').value,
        amount: formData.get('doc-amount') || document.getElementById('doc-amount').value,
        description: formData.get('doc-description') || document.getElementById('doc-description').value,
        tags: formData.get('doc-tags') || document.getElementById('doc-tags').value,
        extractedText: document.getElementById('extracted-textarea').value,
        status: 'Procesado',
        createdAt: new Date().toISOString(),
        file: currentFile ? {
            name: currentFile.name,
            size: currentFile.size,
            type: currentFile.type
        } : null,
        metadata: {
            processingTime: Math.floor(Math.random() * 10) + 2,
            confidence: Math.floor(Math.random() * 20) + 80,
            pages: Math.floor(Math.random() * 5) + 1
        }
    };
    
    // Guardar documento
    documents.push(documentData);
    localStorage.setItem('documents', JSON.stringify(documents));
    
    // Limpiar formulario
    e.target.reset();
    removeFile();
    
    showNotification('Documento guardado correctamente', 'success');
    
    // Registrar actividad
    addActivity(`Documento "${documentData.name}" guardado`, 'save');
    
    // Cambiar a la sección de documentos
    document.querySelector('[data-section="documents"]').click();
}

function validateForm() {
    const requiredFields = ['doc-type', 'doc-date'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

function validateFormField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        showFieldError(field, 'Este campo es requerido');
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        field.classList.add('error');
        showFieldError(field, 'Email inválido');
    } else {
        field.classList.remove('error');
        clearFieldError(field);
    }
}

function clearFieldError(field) {
    field.classList.remove('error');
    const errorMsg = field.parentNode.querySelector('.field-error');
    if (errorMsg) {
        errorMsg.remove();
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function autoSaveExtractedText() {
    // Auto-guardar el texto extraído cada 5 segundos
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(() => {
        const text = document.getElementById('extracted-textarea').value;
        if (text.trim()) {
            localStorage.setItem('autoSavedText', text);
            showNotification('Texto auto-guardado', 'info');
        }
    }, 5000);
}

// ===== GESTIÓN DE DOCUMENTOS =====
function loadDocuments() {
    const tbody = document.getElementById('documents-tbody');
    tbody.innerHTML = '';
    
    documents.forEach(doc => {
        const row = createDocumentRow(doc);
        tbody.appendChild(row);
    });
}

function createDocumentRow(doc) {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td>
            <span class="document-name" onclick="viewDocument(${doc.id})">${doc.name}</span>
        </td>
        <td>
            <span class="document-type ${doc.type}">${doc.type}</span>
        </td>
        <td>${formatDate(doc.date)}</td>
        <td>${doc.number || '-'}</td>
        <td>${doc.amount ? 'S/. ' + parseFloat(doc.amount).toFixed(2) : '-'}</td>
        <td>
            <span class="status-badge completed">${doc.status}</span>
        </td>
        <td>
            <div class="document-actions">
                <button class="action-btn view" onclick="viewDocument(${doc.id})" title="Ver detalles">👁️</button>
                <button class="action-btn edit" onclick="editDocument(${doc.id})" title="Editar">✏️</button>
                <button class="action-btn export" onclick="exportDocument(${doc.id})" title="Exportar">📤</button>
                <button class="action-btn delete" onclick="deleteDocument(${doc.id})" title="Eliminar">🗑️</button>
            </div>
        </td>
    `;
    
    return row;
}

function viewDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    const modal = document.getElementById('document-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="document-details">
            <div class="detail-row">
                <strong>Nombre:</strong> ${doc.name}
            </div>
            <div class="detail-row">
                <strong>Tipo:</strong> <span class="document-type ${doc.type}">${doc.type}</span>
            </div>
            <div class="detail-row">
                <strong>Fecha:</strong> ${formatDate(doc.date)}
            </div>
            <div class="detail-row">
                <strong>Número:</strong> ${doc.number || '-'}
            </div>
            <div class="detail-row">
                <strong>Monto:</strong> ${doc.amount ? 'S/. ' + parseFloat(doc.amount).toFixed(2) : '-'}
            </div>
            <div class="detail-row">
                <strong>Descripción:</strong> ${doc.description || '-'}
            </div>
            <div class="detail-row">
                <strong>Etiquetas:</strong> ${doc.tags || '-'}
            </div>
            <div class="detail-row">
                <strong>Estado:</strong> <span class="status-badge completed">${doc.status}</span>
            </div>
            ${doc.metadata ? `
            <div class="detail-row">
                <strong>Metadatos:</strong>
                <div class="metadata-info">
                    <span>Tiempo de procesamiento: ${doc.metadata.processingTime}s</span>
                    <span>Confianza OCR: ${doc.metadata.confidence}%</span>
                    <span>Páginas: ${doc.metadata.pages}</span>
                </div>
            </div>
            ` : ''}
            <div class="detail-row">
                <strong>Texto Extraído:</strong>
                <div class="extracted-text-preview">
                    <pre>${doc.extractedText || 'No hay texto extraído'}</pre>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn btn-primary" onclick="exportDocument(${doc.id})">Exportar</button>
                <button class="btn btn-secondary" onclick="editDocument(${doc.id})">Editar</button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function editDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    // Llenar formulario con datos del documento
    document.getElementById('doc-type').value = doc.type;
    document.getElementById('doc-date').value = doc.date;
    document.getElementById('doc-number').value = doc.number || '';
    document.getElementById('doc-amount').value = doc.amount || '';
    document.getElementById('doc-description').value = doc.description || '';
    document.getElementById('doc-tags').value = doc.tags || '';
    document.getElementById('extracted-textarea').value = doc.extractedText || '';
    
    // Cambiar a la sección de procesamiento
    document.querySelector('[data-section="processing"]').click();
    
    showNotification('Documento cargado para edición', 'info');
}

function deleteDocument(id) {
    if (confirm('¿Está seguro de que desea eliminar este documento?')) {
        documents = documents.filter(d => d.id !== id);
        localStorage.setItem('documents', JSON.stringify(documents));
        loadDocuments();
        updateDashboardStats();
        showNotification('Documento eliminado', 'success');
    }
}

function exportDocument(id) {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;
    
    // Crear contenido para exportar
    const content = `
DOCUMENTO DIGITALIZADO
=====================

Nombre: ${doc.name}
Tipo: ${doc.type}
Fecha: ${formatDate(doc.date)}
Número: ${doc.number || 'N/A'}
Monto: ${doc.amount ? 'S/. ' + parseFloat(doc.amount).toFixed(2) : 'N/A'}
Descripción: ${doc.description || 'N/A'}
Etiquetas: ${doc.tags || 'N/A'}

TEXTO EXTRAÍDO:
${doc.extractedText || 'No hay texto extraído'}

Metadatos:
- Tiempo de procesamiento: ${doc.metadata?.processingTime || 'N/A'}s
- Confianza OCR: ${doc.metadata?.confidence || 'N/A'}%
- Páginas: ${doc.metadata?.pages || 'N/A'}

Exportado el: ${new Date().toLocaleString('es-ES')}
    `;
    
    // Crear y descargar archivo
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.name}_exportado.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Documento exportado correctamente', 'success');
}

function closeModal() {
    document.getElementById('document-modal').classList.add('hidden');
}

// ===== BÚSQUEDA Y FILTROS =====
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#documents-tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

function handleFilter(e) {
    const filterType = e.target.value;
    const rows = document.querySelectorAll('#documents-tbody tr');
    
    rows.forEach(row => {
        const typeCell = row.querySelector('.document-type');
        const type = typeCell ? typeCell.textContent.toLowerCase() : '';
        
        if (!filterType || type === filterType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ===== DASHBOARD Y ESTADÍSTICAS =====
function updateDashboardStats() {
    const totalProcessed = documents.length;
    const pendingCount = processingQueue.length;
    const averageConfidence = documents.length > 0 
        ? Math.round(documents.reduce((sum, doc) => sum + (doc.metadata?.confidence || 0), 0) / documents.length)
        : 0;
    const usedSpace = Math.round(documents.reduce((sum, doc) => sum + (doc.file?.size || 0), 0) / (1024 * 1024 * 1024) * 100) / 100;
    
    // Actualizar estadísticas
    document.querySelectorAll('.stat-number')[0].textContent = totalProcessed;
    document.querySelectorAll('.stat-number')[1].textContent = pendingCount;
    document.querySelectorAll('.stat-number')[2].textContent = averageConfidence + '%';
    document.querySelectorAll('.stat-number')[3].textContent = usedSpace + ' GB';
}

function startActivitySimulation() {
    // Simular actividad en tiempo real
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% de probabilidad
            const activities = [
                { title: 'Documento procesado', icon: '📄', time: 'Hace 2 minutos' },
                { title: 'OCR completado', icon: '✅', time: 'Hace 5 minutos' },
                { title: 'Archivo subido', icon: '📤', time: 'Hace 8 minutos' },
                { title: 'Validación exitosa', icon: '🔍', time: 'Hace 12 minutos' }
            ];
            
            const activity = activities[Math.floor(Math.random() * activities.length)];
            addActivity(activity.title, 'system', activity.icon, activity.time);
        }
    }, 10000); // Cada 10 segundos
}

function addActivity(title, type = 'system', icon = '📊', time = null) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
        <span class="activity-icon">${icon}</span>
        <div class="activity-content">
            <div class="activity-title">${title}</div>
            <div class="activity-time">${time || 'Ahora mismo'}</div>
        </div>
    `;
    
    // Agregar al inicio de la lista
    activityList.insertBefore(activityItem, activityList.firstChild);
    
    // Limitar a 5 actividades
    const items = activityList.querySelectorAll('.activity-item');
    if (items.length > 5) {
        activityList.removeChild(items[items.length - 1]);
    }
}

// ===== FUNCIONES AVANZADAS =====
function copyText() {
    const textarea = document.getElementById('extracted-textarea');
    textarea.select();
    document.execCommand('copy');
    showNotification('Texto copiado al portapapeles', 'success');
}

function exportToPDF() {
    showNotification('Funcionalidad de exportación PDF en desarrollo', 'info');
}

function exportToExcel() {
    if (documents.length === 0) {
        showNotification('No hay documentos para exportar', 'error');
        return;
    }
    
    // Crear CSV
    const headers = ['Nombre', 'Tipo', 'Fecha', 'Número', 'Monto', 'Estado'];
    const csvContent = [
        headers.join(','),
        ...documents.map(doc => [
            doc.name,
            doc.type,
            formatDate(doc.date),
            doc.number || '',
            doc.amount || '',
            doc.status
        ].join(','))
    ].join('\n');
    
    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'documentos_exportados.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Documentos exportados a Excel', 'success');
}

function validateDocument() {
    const textarea = document.getElementById('extracted-textarea');
    const text = textarea.value;
    
    if (!text.trim()) {
        showNotification('No hay texto para validar', 'error');
        return;
    }
    
    // Simular validación
    const validationResults = {
        hasDate: /\d{1,2}\/\d{1,2}\/\d{4}/.test(text),
        hasAmount: /S\/\.\s*[\d,]+\.?\d*/.test(text),
        hasDocumentNumber: /[Nn]úmero[:\s]*([A-Z0-9\-]+)/.test(text),
        hasCompanyInfo: /(EMPRESA|S\.A\.|SAC|EIRL)/i.test(text)
    };
    
    const score = Object.values(validationResults).filter(Boolean).length;
    const percentage = Math.round((score / Object.keys(validationResults).length) * 100);
    
    showNotification(`Validación completada: ${percentage}% de campos detectados`, 'success');
    
    // Mostrar resultados detallados
    const results = Object.entries(validationResults).map(([key, value]) => 
        `${key}: ${value ? '✅' : '❌'}`
    ).join('\n');
    
    alert(`Resultados de validación:\n\n${results}\n\nPuntuación: ${percentage}%`);
}

function performAdvancedAnalysis() {
    const textarea = document.getElementById('extracted-textarea');
    const text = textarea.value;
    
    if (!text.trim()) {
        showNotification('No hay texto para analizar', 'error');
        return;
    }
    
    // Simular análisis avanzado
    const analysis = {
        wordCount: text.split(/\s+/).length,
        characterCount: text.length,
        lineCount: text.split('\n').length,
        hasNumbers: /\d/.test(text),
        hasCurrency: /S\/\./.test(text),
        hasEmail: /\S+@\S+\.\S+/.test(text),
        hasPhone: /\d{3,}[-.\s]?\d{3,}[-.\s]?\d{3,}/.test(text)
    };
    
    const analysisText = `
ANÁLISIS AVANZADO DEL DOCUMENTO
================================

Estadísticas básicas:
- Palabras: ${analysis.wordCount}
- Caracteres: ${analysis.characterCount}
- Líneas: ${analysis.lineCount}

Elementos detectados:
- Números: ${analysis.hasNumbers ? 'Sí' : 'No'}
- Moneda: ${analysis.hasCurrency ? 'Sí' : 'No'}
- Email: ${analysis.hasEmail ? 'Sí' : 'No'}
- Teléfono: ${analysis.hasPhone ? 'Sí' : 'No'}

Recomendaciones:
${analysis.wordCount < 50 ? '- Documento muy corto, verificar completitud' : ''}
${!analysis.hasNumbers ? '- No se detectaron números importantes' : ''}
${!analysis.hasCurrency ? '- No se detectó información monetaria' : ''}
    `;
    
    alert(analysisText);
}

// ===== UTILIDADES =====
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES');
}

function showNotification(message, type = 'info') {
    const notifications = document.getElementById('notifications');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notifications.appendChild(notification);
    
    // Remover notificación después de 5 segundos
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ===== FUNCIONES ADICIONALES =====
function copyText() {
    const textarea = document.getElementById('extracted-textarea');
    textarea.select();
    document.execCommand('copy');
    showNotification('Texto copiado al portapapeles', 'success');
}

// Agregar estilos CSS dinámicos para nuevas funcionalidades
const style = document.createElement('style');
style.textContent = `
    .processing-progress {
        margin-top: 16px;
    }
    
    .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: linear-gradient(45deg, #4facfe 0%, #00f2fe 100%);
        width: 0%;
        transition: width 0.3s ease;
    }
    
    .progress-text {
        margin-top: 8px;
        font-size: 12px;
        color: #888;
        text-align: center;
    }
    
    .field-error {
        color: #ff6b6b;
        font-size: 12px;
        margin-top: 4px;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }
    
    .metadata-info {
        display: flex;
        gap: 16px;
        margin-top: 8px;
    }
    
    .metadata-info span {
        background: rgba(255, 255, 255, 0.05);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
    }
    
    .modal-actions {
        display: flex;
        gap: 12px;
        margin-top: 20px;
        padding-top: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .action-btn.export {
        background: rgba(40, 167, 69, 0.2);
        color: #28a745;
    }
    
    .shake {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .extracted-text-preview {
        max-height: 200px;
        overflow-y: auto;
        background: rgba(255, 255, 255, 0.05);
        padding: 12px;
        border-radius: 6px;
        margin-top: 8px;
    }
    
    .extracted-text-preview pre {
        white-space: pre-wrap;
        font-family: 'Inter', monospace;
        font-size: 12px;
        line-height: 1.4;
        margin: 0;
    }
`;
document.head.appendChild(style);
