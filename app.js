// Enhanced Blood Donation Website - JavaScript with Authentication, Maps & AI Verification

// Application configuration with API keys
const appConfig = {
  googleConfig: {
    clientId: "802774386823-ls3anbs56qeahbkge1sdrs8dcjtsambl.apps.googleusercontent.com",
    mapsApiKey: "AIzaSyBFQ62nJD45JEvhuMORoBXYdnADcJL2Znw",
    geminiApiKey: "AIzaSyC4tkCPIyUoyDM47-I3INQNQoulDBycbzU"
  },
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  compatibility: {
    "A+": ["A+", "AB+"], "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"], "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"], "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"], "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  mapMarkerColors: {
    "A+": "#E53E3E", "A-": "#EF4444",
    "B+": "#DC2626", "B-": "#F87171", 
    "AB+": "#B91C1C", "AB-": "#FCA5A5",
    "O+": "#991B1B", "O-": "#FEE2E2"
  },
  donors: [
    {"id": 1, "name": "Mohammed Junaid", "phone": "+91-9876543210", "bloodType": "O+", "lat": 28.6139, "lng": 77.2090, "city": "New Delhi", "status": "online", "donationCount": 6, "verified": true, "lastSeen": "2 hours ago", "availability": "Available"},
    {"id": 2, "name": "Ibrahim Khan", "phone": "+91-9876543211", "bloodType": "O+", "lat": 28.6129, "lng": 77.2080, "city": "New Delhi", "status": "online", "donationCount": 8, "verified": true, "lastSeen": "1 hour ago", "availability": "Available"},
    {"id": 3, "name": "Anas Rosy", "phone": "+91-9876543212", "bloodType": "A+", "lat": 28.6149, "lng": 77.2100, "city": "New Delhi", "status": "online", "donationCount": 5, "verified": true, "lastSeen": "30 min ago", "availability": "Available"},
    {"id": 4, "name": "Mariya Fatima", "phone": "+91-9876543213", "bloodType": "B+", "lat": 28.6159, "lng": 77.2110, "city": "New Delhi", "status": "online", "donationCount": 4, "verified": true, "lastSeen": "45 min ago", "availability": "Available"},
    {"id": 5, "name": "Raiyan Razi", "phone": "+91-9876543214", "bloodType": "AB+", "lat": 28.6119, "lng": 77.2070, "city": "New Delhi", "status": "online", "donationCount": 3, "verified": true, "lastSeen": "1.5 hours ago", "availability": "Available"},
    {"id": 6, "name": "Tasneem Fatima", "phone": "+91-9876543215", "bloodType": "O-", "lat": 28.6109, "lng": 77.2060, "city": "New Delhi", "status": "online", "donationCount": 7, "verified": true, "lastSeen": "20 min ago", "availability": "Available"}
  ],
  bloodBanks: [
    {"name": "AIIMS Blood Bank", "address": "Ansari Nagar, New Delhi", "phone": "+91-11-26588700", "lat": 28.5672, "lng": 77.2100, "verified": true},
    {"name": "Safdarjung Hospital Blood Bank", "address": "Safdarjung, New Delhi", "phone": "+91-11-26165060", "lat": 28.5706, "lng": 77.2072, "verified": true},
    {"name": "Max Hospital Blood Bank", "address": "Saket, New Delhi", "phone": "+91-11-26515050", "lat": 28.5244, "lng": 77.2066, "verified": true}
  ],
  achievements: [
    {"id": "verified_donor", "name": "Verified Donor", "description": "Google-authenticated blood donor", "icon": "🛡️"},
    {"id": "first_aid", "name": "First Aid Hero", "description": "Registered as blood donor", "icon": "🩸"},
    {"id": "life_saver", "name": "Life Saver", "description": "Donated blood 5 times", "icon": "💖"},
    {"id": "guardian_angel", "name": "Guardian Angel", "description": "Donated blood 10 times", "icon": "👼"},
    {"id": "community_champion", "name": "Community Champion", "description": "Helped 25 people", "icon": "🏆"}
  ]
};

// App state
let currentPage = 'home';
let currentStep = 1;
let currentUser = null;
let isAuthenticated = false;
let currentUserLocation = null;
let searchResults = [];
let currentTestimonial = 0;
let googleMap = null;
let mapMarkers = [];
let currentDocument = null;
let verificationStatus = null;

// Google Maps integration
let mapsLoaded = false;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('LifeLink app initializing...');
  
  // Set up navigation
  setupNavigation();
  
  // Set up form handlers
  setupFormHandlers();
  
  // Set up authentication
  setupAuthentication();
  
  // Set up document upload
  setupDocumentUpload();
  
  // Setup multi-step form
  setupMultiStepForm();
  
  // Setup testimonial carousel
  setupTestimonialCarousel();
  
  // Setup theme toggle
  setupThemeToggle();
  
  // Setup results filters
  setupResultsFilters();
  
  // Check for existing auth state
  checkAuthState();
  
  // Initialize with current hash or home
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
  
  // Start testimonial auto-rotation
  startTestimonialRotation();
});

// Global function for Google Maps callback
window.initializeApp = function() {
  mapsLoaded = true;
  console.log('Google Maps API loaded');
  
  // Initialize Google Sign-In
  if (window.google && window.google.accounts) {
    window.google.accounts.id.initialize({
      client_id: appConfig.googleConfig.clientId,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: true
    });
  }
};

// Authentication Functions
function setupAuthentication() {
  // The Google Sign-In will be initialized in the initializeApp callback
  console.log('Setting up authentication...');
}

function showAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('hidden');
  
  // Render the Google Sign-In button if not already rendered
  setTimeout(() => {
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.renderButton(
          document.querySelector('.g_id_signin'),
          {
            type: 'standard',
            shape: 'rectangular',
            theme: 'outline',
            text: 'signin_with',
            size: 'large',
            logo_alignment: 'left'
          }
        );
      } catch (error) {
        console.log('Google Sign-In button already rendered or error:', error);
      }
    }
  }, 100);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.add('hidden');
}

// Global callback for Google Sign-In
window.handleCredentialResponse = function(response) {
  try {
    // Decode the JWT token
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    // Store user information
    currentUser = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
      emailVerified: payload.email_verified,
      givenName: payload.given_name,
      familyName: payload.family_name
    };
    
    isAuthenticated = true;
    
    // Update UI
    updateAuthUI();
    
    // Close modal
    closeAuthModal();
    
    // Show success message
    showToast(`Welcome ${currentUser.name}! You are now authenticated.`, 'success');
    
    // Update any auth-required sections
    updateAuthRequiredSections();
    
    console.log('User authenticated:', currentUser);
  } catch (error) {
    console.error('Authentication error:', error);
    showToast('Authentication failed. Please try again.', 'error');
  }
};

function signOut() {
  if (window.google && window.google.accounts) {
    window.google.accounts.id.disableAutoSelect();
  }
  
  // Clear user data
  currentUser = null;
  isAuthenticated = false;
  verificationStatus = null;
  currentDocument = null;
  
  // Update UI
  updateAuthUI();
  updateAuthRequiredSections();
  
  // Navigate to home
  navigateTo('home');
  
  showToast('You have been signed out successfully.', 'info');
}

function updateAuthUI() {
  const signInBtn = document.getElementById('signInBtn');
  const userProfile = document.getElementById('userProfile');
  const userAvatar = document.getElementById('userAvatar');
  const userName = document.getElementById('userName');
  
  if (isAuthenticated && currentUser) {
    signInBtn.classList.add('hidden');
    userProfile.classList.remove('hidden');
    
    userAvatar.src = currentUser.picture;
    userAvatar.alt = currentUser.name;
    userName.textContent = currentUser.givenName || currentUser.name;
  } else {
    signInBtn.classList.remove('hidden');
    userProfile.classList.add('hidden');
  }
}

function checkAuthState() {
  // In a real app, you'd check for stored tokens or session
  // For now, we'll just update the UI
  updateAuthUI();
  updateAuthRequiredSections();
}

function updateAuthRequiredSections() {
  // Update registration form
  const registerAuthCheck = document.getElementById('registerAuthCheck');
  const registrationForm = document.getElementById('registrationForm');
  
  if (registerAuthCheck && registrationForm) {
    if (isAuthenticated) {
      registerAuthCheck.style.display = 'none';
      registrationForm.style.display = 'block';
      updateGoogleProfileInfo();
    } else {
      registerAuthCheck.style.display = 'block';
      registrationForm.style.display = 'none';
    }
  }
  
  // Update request form
  const requestAuthCheck = document.getElementById('requestAuthCheck');
  const requestFormContainer = document.getElementById('requestFormContainer');
  
  if (requestAuthCheck && requestFormContainer) {
    if (isAuthenticated) {
      requestAuthCheck.style.display = 'none';
      requestFormContainer.style.display = 'block';
    } else {
      requestAuthCheck.style.display = 'block';
      requestFormContainer.style.display = 'none';
    }
  }
}

function updateGoogleProfileInfo() {
  if (!currentUser) return;
  
  const profilePreviewAvatar = document.getElementById('profilePreviewAvatar');
  const profilePreviewName = document.getElementById('profilePreviewName');
  const profilePreviewEmail = document.getElementById('profilePreviewEmail');
  
  if (profilePreviewAvatar) profilePreviewAvatar.src = currentUser.picture;
  if (profilePreviewName) profilePreviewName.textContent = currentUser.name;
  if (profilePreviewEmail) profilePreviewEmail.textContent = currentUser.email;
}

function checkAuthAndNavigate(page) {
  if (isAuthenticated) {
    navigateTo(page);
  } else {
    showAuthModal();
  }
}

// Document Upload and Verification
function setupDocumentUpload() {
  const uploadArea = document.getElementById('uploadArea');
  const documentInput = document.getElementById('documentInput');
  
  if (uploadArea && documentInput) {
    // Handle drag and drop
    uploadArea.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    });
    
    // Handle file input change
    documentInput.addEventListener('change', function(e) {
      if (e.target.files.length > 0) {
        handleFileSelect(e.target.files[0]);
      }
    });
  }
}

function handleFileSelect(file) {
  // Validate file type and size
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    showToast('Please select a valid image (JPG, PNG) or PDF file.', 'error');
    return;
  }
  
  if (file.size > maxSize) {
    showToast('File size must be less than 5MB.', 'error');
    return;
  }
  
  currentDocument = file;
  showDocumentPreview(file);
}

function showDocumentPreview(file) {
  const uploadArea = document.getElementById('uploadArea');
  const documentPreview = document.getElementById('documentPreview');
  const previewImage = document.getElementById('previewImage');
  const fileName = document.getElementById('fileName');
  const fileSize = document.getElementById('fileSize');
  
  uploadArea.style.display = 'none';
  documentPreview.style.display = 'block';
  
  // Create preview
  const reader = new FileReader();
  reader.onload = function(e) {
    if (file.type.startsWith('image/')) {
      previewImage.src = e.target.result;
    } else {
      previewImage.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /%3E%3C/svg%3E';
    }
  };
  reader.readAsDataURL(file);
  
  fileName.textContent = file.name;
  fileSize.textContent = formatFileSize(file.size);
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function clearDocument() {
  const uploadArea = document.getElementById('uploadArea');
  const documentPreview = document.getElementById('documentPreview');
  const documentInput = document.getElementById('documentInput');
  
  currentDocument = null;
  verificationStatus = null;
  
  uploadArea.style.display = 'block';
  documentPreview.style.display = 'none';
  
  if (documentInput) documentInput.value = '';
  
  // Hide verification results
  document.getElementById('verificationProgress').style.display = 'none';
  document.getElementById('verificationResult').style.display = 'none';
  
  updateRequestFormState();
}

function verifyDocument() {
  if (!currentDocument) {
    showToast('Please select a document first.', 'error');
    return;
  }
  
  // Show progress
  const documentPreview = document.getElementById('documentPreview');
  const verificationProgress = document.getElementById('verificationProgress');
  const progressText = document.getElementById('progressText');
  
  documentPreview.style.display = 'none';
  verificationProgress.style.display = 'block';
  
  // Simulate AI verification process
  const steps = [
    'Analyzing document authenticity...',
    'Checking medical validation...',
    'Verifying hospital credentials...',
    'Processing AI results...',
    'Finalizing verification...'
  ];
  
  let stepIndex = 0;
  const stepInterval = setInterval(() => {
    if (stepIndex < steps.length) {
      progressText.textContent = steps[stepIndex];
      stepIndex++;
    } else {
      clearInterval(stepInterval);
      showVerificationResult();
    }
  }, 800);
}

function showVerificationResult() {
  const verificationProgress = document.getElementById('verificationProgress');
  const verificationResult = document.getElementById('verificationResult');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultDescription = document.getElementById('resultDescription');
  const confidenceScore = document.getElementById('confidenceScore');
  
  verificationProgress.style.display = 'none';
  verificationResult.style.display = 'block';
  
  // Simulate AI results (in real app, this would call actual AI API)
  const isValid = Math.random() > 0.2; // 80% success rate simulation
  const confidence = isValid ? Math.floor(Math.random() * 15 + 85) : Math.floor(Math.random() * 40 + 20);
  
  verificationStatus = {
    verified: isValid,
    confidence: confidence,
    timestamp: new Date().toISOString()
  };
  
  if (isValid) {
    resultIcon.className = 'fas fa-check-circle';
    resultIcon.style.color = 'var(--color-success)';
    resultTitle.textContent = 'Document Verified Successfully';
    resultDescription.textContent = 'Your medical prescription has been authenticated by our AI system.';
    confidenceScore.textContent = `${confidence}%`;
    confidenceScore.style.color = 'var(--color-success)';
    
    showToast('Document verified successfully!', 'success');
  } else {
    resultIcon.className = 'fas fa-exclamation-triangle';
    resultIcon.style.color = 'var(--color-error)';
    resultTitle.textContent = 'Verification Failed';
    resultDescription.textContent = 'Unable to verify the document. Please ensure it\'s a clear, authentic medical prescription.';
    confidenceScore.textContent = `${confidence}%`;
    confidenceScore.style.color = 'var(--color-error)';
    
    showToast('Document verification failed. Please try another document.', 'error');
  }
  
  updateRequestFormState();
}

function updateRequestFormState() {
  const statusElement = document.getElementById('requestVerificationStatus');
  const submitBtn = document.getElementById('submitRequestBtn');
  
  if (!statusElement || !submitBtn) return;
  
  if (verificationStatus && verificationStatus.verified) {
    statusElement.innerHTML = `
      <div class="status-indicator verified">
        <i class="fas fa-check-circle"></i>
        <span>Document verified - Ready to find donors</span>
      </div>
    `;
    submitBtn.disabled = false;
    submitBtn.classList.remove('btn--disabled');
  } else if (verificationStatus && !verificationStatus.verified) {
    statusElement.innerHTML = `
      <div class="status-indicator failed">
        <i class="fas fa-times-circle"></i>
        <span>Verification failed - Please upload valid document</span>
      </div>
    `;
    submitBtn.disabled = true;
    submitBtn.classList.add('btn--disabled');
  } else {
    statusElement.innerHTML = `
      <div class="status-indicator pending">
        <i class="fas fa-exclamation-triangle"></i>
        <span>Document verification required to proceed</span>
      </div>
    `;
    submitBtn.disabled = true;
    submitBtn.classList.add('btn--disabled');
  }
}

// Google Maps Integration
function initializeGoogleMap(containerId = 'googleMap', center = {lat: 28.6139, lng: 77.2090}) {
  if (!mapsLoaded || !window.google) {
    const mapContainer = document.getElementById(containerId);
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div class="map-loading">
          <div class="spinner"></div>
          <p>Loading Google Maps...</p>
        </div>
      `;
    }
    return null;
  }

  const mapContainer = document.getElementById(containerId);
  if (!mapContainer) return null;

  try {
    const map = new google.maps.Map(mapContainer, {
      zoom: 13,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    });

    return map;
  } catch (error) {
    console.error('Error initializing Google Maps:', error);
    mapContainer.innerHTML = `
      <div class="map-loading">
        <i class="fas fa-exclamation-triangle" style="color: var(--color-error);"></i>
        <p>Unable to load Google Maps</p>
      </div>
    `;
    return null;
  }
}

function addDonorMarkersToMap(map, donors) {
  if (!map || !window.google || !donors) return;

  // Clear existing markers
  mapMarkers.forEach(marker => {
    if (marker.setMap) marker.setMap(null);
  });
  mapMarkers = [];

  donors.forEach(donor => {
    try {
      const position = { lat: donor.lat, lng: donor.lng };
      
      // Create custom marker content
      const markerContent = document.createElement('div');
      markerContent.className = 'custom-marker';
      markerContent.style.cssText = `
        width: 30px;
        height: 30px;
        background-color: ${appConfig.mapMarkerColors[donor.bloodType]};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        color: white;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
      `;
      markerContent.textContent = donor.bloodType;

      // Use AdvancedMarkerElement if available, fallback to regular Marker
      let marker;
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: position,
          content: markerContent,
          title: `${donor.name} - ${donor.bloodType}`
        });
      } else {
        // Fallback to regular marker
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: `${donor.name} - ${donor.bloodType}`,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: appConfig.mapMarkerColors[donor.bloodType],
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3,
            scale: 15
          }
        });
      }

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: createInfoWindowContent(donor)
      });

      // Add click listener
      marker.addListener('click', () => {
        // Close other info windows
        mapMarkers.forEach(m => {
          if (m.infoWindow) m.infoWindow.close();
        });
        infoWindow.open(map, marker);
      });

      marker.infoWindow = infoWindow;
      mapMarkers.push(marker);
    } catch (error) {
      console.error('Error creating marker for donor:', donor, error);
    }
  });

  // Fit map bounds to show all markers
  if (mapMarkers.length > 0) {
    const bounds = new google.maps.LatLngBounds();
    mapMarkers.forEach(marker => {
      if (marker.position) {
        bounds.extend(marker.position);
      }
    });
    map.fitBounds(bounds);
    
    // Don't zoom in too much for single marker
    if (mapMarkers.length === 1) {
      map.setZoom(15);
    }
  }
}

function createInfoWindowContent(donor) {
  const distance = donor.distance ? donor.distance.toFixed(1) : 'N/A';
  
  return `
    <div class="custom-info-window">
      <div class="info-header">
        <div class="info-avatar">${donor.name.charAt(0)}</div>
        <div class="info-name">${donor.name}</div>
      </div>
      <div class="info-details">
        <span><i class="fas fa-tint"></i> ${donor.bloodType}</span>
        <span><i class="fas fa-map-marker-alt"></i> ${distance} km</span>
        <span><i class="fas fa-heart"></i> ${donor.donationCount} donations</span>
        <span class="verification-badge"><i class="fas fa-check-circle"></i> Verified</span>
      </div>
      <div class="info-actions">
        <button class="btn btn--primary btn--sm" onclick="handlePhoneClick('${donor.phone}', '${donor.name}')">
          <i class="fas fa-phone"></i> Call
        </button>
        <button class="btn btn--outline btn--sm" onclick="showDirections(${donor.lat}, ${donor.lng}, '${donor.name}')">
          <i class="fas fa-directions"></i> Directions
        </button>
      </div>
    </div>
  `;
}

function showDirections(lat, lng, donorName) {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(donorName)}`;
  window.open(url, '_blank');
  showToast(`Opening directions to ${donorName}`, 'info');
}

function toggleMapType() {
  if (!googleMap) return;
  
  const currentType = googleMap.getMapTypeId();
  const newType = currentType === google.maps.MapTypeId.ROADMAP 
    ? google.maps.MapTypeId.SATELLITE 
    : google.maps.MapTypeId.ROADMAP;
  
  googleMap.setMapTypeId(newType);
}

function centerMapOnUser() {
  if (!googleMap) return;
  
  if (currentUserLocation) {
    googleMap.setCenter(currentUserLocation);
    googleMap.setZoom(15);
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        googleMap.setCenter(userLocation);
        googleMap.setZoom(15);
        currentUserLocation = userLocation;
      },
      () => {
        showToast('Unable to get your location', 'error');
      }
    );
  }
}

// Navigation functions
function navigateTo(page) {
  // Hide current page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = page;
    
    // Update active nav link
    const navLink = document.querySelector(`[href="#${page}"]`);
    if (navLink) navLink.classList.add('active');
    
    // Initialize page-specific functionality
    switch(page) {
      case 'home':
        animateStats();
        break;
      case 'register':
      case 'request':
        updateAuthRequiredSections();
        break;
      case 'results':
        if (mapsLoaded && searchResults.length > 0) {
          setTimeout(() => {
            googleMap = initializeGoogleMap('googleMap', currentUserLocation || {lat: 28.6139, lng: 77.2090});
            if (googleMap) {
              addDonorMarkersToMap(googleMap, searchResults);
            }
          }, 100);
        }
        break;
      case 'leaderboard':
        renderLeaderboard();
        break;
      case 'dashboard':
        renderDashboard();
        break;
      case 'blood-banks':
        renderBloodBanks();
        break;
      case 'emergency':
        renderEmergencyRequests();
        break;
    }
  }
  
  // Update URL hash
  window.location.hash = page;
}

function setupNavigation() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('href').slice(1);
      navigateTo(page);
    });
  });
}

// Form setup and handlers
function setupFormHandlers() {
  // Donor registration form
  const donorForm = document.getElementById('donorForm');
  if (donorForm) {
    donorForm.addEventListener('submit', handleDonorRegistration);
  }
  
  // Blood request form
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', handleBloodRequest);
  }
}

function setupMultiStepForm() {
  const nextBtn = document.getElementById('nextStep');
  const prevBtn = document.getElementById('prevStep');
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (validateCurrentStep()) {
        nextStep();
      }
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', prevStep);
  }
}

function nextStep() {
  if (currentStep < 4) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    
    currentStep++;
    
    // Show next step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      progressFill.style.width = `${(currentStep / 4) * 100}%`;
    }
    
    // Update buttons
    document.getElementById('prevStep').style.display = currentStep > 1 ? 'inline-flex' : 'none';
    
    if (currentStep === 4) {
      document.getElementById('nextStep').style.display = 'none';
      document.getElementById('submitForm').style.display = 'inline-flex';
    }
  }
}

function prevStep() {
  if (currentStep > 1) {
    // Hide current step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    currentStep--;
    
    // Show previous step
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
    
    // Update progress bar
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      progressFill.style.width = `${(currentStep / 4) * 100}%`;
    }
    
    // Update buttons
    document.getElementById('prevStep').style.display = currentStep > 1 ? 'inline-flex' : 'none';
    document.getElementById('nextStep').style.display = 'inline-flex';
    document.getElementById('submitForm').style.display = 'none';
  }
}

function validateCurrentStep() {
  const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
  const requiredInputs = currentStepElement.querySelectorAll('input[required], select[required]');
  
  for (let input of requiredInputs) {
    if (!input.value.trim()) {
      input.focus();
      showToast('Please fill in all required fields', 'error');
      return false;
    }
    
    // Email validation
    if (input.type === 'email' && !isValidEmail(input.value)) {
      input.focus();
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    
    // Age validation
    if (input.name === 'age' && (input.value < 18 || input.value > 65)) {
      input.focus();
      showToast('Age must be between 18 and 65 years', 'error');
      return false;
    }
  }
  
  // Step 4 consent validation
  if (currentStep === 4) {
    const consentCheckbox = document.getElementById('consent');
    if (!consentCheckbox.checked) {
      showToast('Please provide consent to continue', 'error');
      return false;
    }
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Location capture
function captureLocation(statusElementId) {
  const statusElement = document.getElementById(statusElementId);
  
  if (!navigator.geolocation) {
    statusElement.textContent = 'Geolocation is not supported by this browser.';
    statusElement.className = 'location-status error';
    return;
  }
  
  statusElement.textContent = 'Getting your location...';
  statusElement.className = 'location-status';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      currentUserLocation = { lat, lng };
      
      statusElement.textContent = `Location captured: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      statusElement.className = 'location-status';
      
      showToast('Location captured successfully!', 'success');
    },
    (error) => {
      let message = 'Unable to get location: ';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          message += 'Permission denied';
          break;
        case error.POSITION_UNAVAILABLE:
          message += 'Position unavailable';
          break;
        case error.TIMEOUT:
          message += 'Request timeout';
          break;
        default:
          message += 'Unknown error';
      }
      statusElement.textContent = message;
      statusElement.className = 'location-status error';
    }
  );
}

// Setup location buttons
document.addEventListener('DOMContentLoaded', function() {
  const captureBtn = document.getElementById('captureLocation');
  if (captureBtn) {
    captureBtn.addEventListener('click', () => captureLocation('locationStatus'));
  }
  
  const captureRequestBtn = document.getElementById('captureRequestLocation');
  if (captureRequestBtn) {
    captureRequestBtn.addEventListener('click', () => captureLocation('requestLocationStatus'));
  }
});

// Handle donor registration
function handleDonorRegistration(e) {
  e.preventDefault();
  
  if (!validateCurrentStep()) {
    return;
  }
  
  if (!isAuthenticated || !currentUser) {
    showToast('Please sign in with Google first.', 'error');
    return;
  }
  
  showLoadingOverlay('Registering your verified account...');
  
  setTimeout(() => {
    const formData = new FormData(e.target);
    const donorData = {
      id: appConfig.donors.length + 1,
      name: currentUser.name,
      email: currentUser.email,
      phone: formData.get('phone'),
      age: parseInt(formData.get('age')),
      gender: formData.get('gender'),
      bloodType: formData.get('bloodGroup'),
      weight: parseInt(formData.get('weight')),
      city: formData.get('city'),
      address: formData.get('address'),
      lat: currentUserLocation ? currentUserLocation.lat : 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: currentUserLocation ? currentUserLocation.lng : 77.2090 + (Math.random() - 0.5) * 0.1,
      donationCount: 0,
      verified: true,
      googleAuth: true,
      joinDate: new Date().toISOString().split('T')[0],
      achievements: ['verified_donor', 'first_aid'],
      availability: formData.get('availability') || 'Available',
      preferredTime: formData.get('preferredTime') || 'Any',
      status: 'online'
    };
    
    // Add to donors list
    appConfig.donors.push(donorData);
    
    hideLoadingOverlay();
    
    // Show success modal with achievement
    showModal(
      'Welcome to Verified LifeLink! 🎉',
      `Congratulations ${donorData.name}! You've earned "Verified Donor 🛡️" and "First Aid Hero 🩸" achievements. You are now part of our authenticated community of life savers.`
    );
    
    // Reset form
    resetRegistrationForm();
    
  }, 1500);
}

function resetRegistrationForm() {
  document.getElementById('donorForm').reset();
  currentStep = 1;
  currentUserLocation = null;
  
  // Reset form steps
  document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
  document.querySelectorAll('.step').forEach(step => {
    step.classList.remove('active', 'completed');
  });
  document.querySelector('.form-step[data-step="1"]').classList.add('active');
  document.querySelector('.step[data-step="1"]').classList.add('active');
  
  // Reset progress
  const progressFill = document.getElementById('progressFill');
  if (progressFill) progressFill.style.width = '25%';
  
  // Reset buttons
  document.getElementById('prevStep').style.display = 'none';
  document.getElementById('nextStep').style.display = 'inline-flex';
  document.getElementById('submitForm').style.display = 'none';
  
  // Clear location status
  const locationStatus = document.getElementById('locationStatus');
  if (locationStatus) locationStatus.textContent = '';
}

// Handle blood request
function handleBloodRequest(e) {
  e.preventDefault();
  
  if (!isAuthenticated || !currentUser) {
    showToast('Please sign in with Google first.', 'error');
    return;
  }
  
  if (!verificationStatus || !verificationStatus.verified) {
    showToast('Please verify your medical document first.', 'error');
    return;
  }
  
  const formData = new FormData(e.target);
  const requiredBloodType = formData.get('requiredBloodType');
  const urgency = formData.get('urgency') || 'Urgent';
  const unitsNeeded = formData.get('unitsNeeded') || '1';
  const hospital = formData.get('hospital');
  const manualAddress = formData.get('manualAddress');
  
  if (!requiredBloodType) {
    showToast('Please select a blood type', 'error');
    return;
  }
  
  if (!currentUserLocation && !manualAddress) {
    showToast('Please provide your location or enter an address', 'error');
    return;
  }
  
  showLoadingOverlay('Finding verified compatible donors...');
  
  setTimeout(() => {
    // Use default location if manual address is provided but no geolocation
    const searchLocation = currentUserLocation || { lat: 28.6139, lng: 77.2090 };
    
    // Find compatible verified donors
    const compatibleDonors = findCompatibleDonors(requiredBloodType, searchLocation, urgency);
    searchResults = compatibleDonors;
    
    hideLoadingOverlay();
    
    // Navigate to results
    navigateTo('results');
    renderResults(requiredBloodType, compatibleDonors, urgency);
  }, 2000);
}

// Find compatible donors (enhanced for verification)
function findCompatibleDonors(requiredBloodType, location, urgency = 'Urgent') {
  // Get all donor blood types that can donate to the required type
  const compatibleBloodTypes = [];
  for (const [donorType, canDonateTo] of Object.entries(appConfig.compatibility)) {
    if (canDonateTo.includes(requiredBloodType)) {
      compatibleBloodTypes.push(donorType);
    }
  }
  
  // Filter donors by compatibility, verification, and availability
  let compatibleDonors = appConfig.donors.filter(donor => {
    const isCompatible = compatibleBloodTypes.includes(donor.bloodType);
    const isVerified = donor.verified === true;
    const isAvailable = donor.availability === 'Available';
    
    // For critical requests, include busy verified donors too
    if (urgency === 'Critical') {
      return isCompatible && isVerified && donor.availability !== 'Away';
    }
    
    return isCompatible && isVerified && isAvailable;
  });
  
  // Calculate distances and sort
  compatibleDonors = compatibleDonors.map(donor => ({
    ...donor,
    distance: calculateDistance(location.lat, location.lng, donor.lat, donor.lng)
  })).sort((a, b) => {
    // For critical requests, prioritize by donation count then distance
    if (urgency === 'Critical') {
      if (a.donationCount !== b.donationCount) {
        return b.donationCount - a.donationCount;
      }
    }
    return a.distance - b.distance;
  });
  
  // Limit results based on urgency
  const maxResults = urgency === 'Critical' ? 20 : urgency === 'Urgent' ? 15 : 10;
  return compatibleDonors.slice(0, maxResults);
}

// Calculate distance between two points
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Render results page
function renderResults(requiredBloodType, compatibleDonors, urgency = 'Urgent') {
  const donorList = document.getElementById('donorList');
  const noDonors = document.getElementById('noDonors');
  const resultsSubtitle = document.getElementById('resultsSubtitle');
  
  if (resultsSubtitle) {
    resultsSubtitle.textContent = `Found ${compatibleDonors.length} verified compatible donors for ${requiredBloodType} (${urgency})`;
  }
  
  if (compatibleDonors.length === 0) {
    donorList.style.display = 'none';
    noDonors.style.display = 'block';
    renderBloodCamps();
  } else {
    donorList.style.display = 'block';
    noDonors.style.display = 'none';
    renderDonorList(compatibleDonors);
  }
  
  renderLegend();
}

// Render donor list
function renderDonorList(donors) {
  const donorList = document.getElementById('donorList');
  
  donorList.innerHTML = donors.map(donor => {
    const lastDonationDate = donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : 'Never';
    
    return `
      <div class="donor-item" data-donor-id="${donor.id}">
        <div class="donor-header">
          <div class="donor-name">
            <div class="status-indicator ${donor.status}"></div>
            ${donor.name}
            ${donor.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success); margin-left: 4px;" title="Verified Donor"></i>' : ''}
          </div>
          <span class="blood-type-badge" style="background-color: ${appConfig.mapMarkerColors[donor.bloodType]}">${donor.bloodType}</span>
        </div>
        <div class="donor-stats">
          <span><i class="fas fa-map-marker-alt"></i> ${donor.distance.toFixed(1)} km away</span>
          <span><i class="fas fa-tint"></i> ${donor.donationCount} donations</span>
          <span><i class="fas fa-clock"></i> Last: ${lastDonationDate}</span>
          <span><i class="fas fa-shield-alt"></i> Google Verified</span>
        </div>
        <div class="donor-actions">
          <a href="#" class="phone-link" onclick="handlePhoneClick('${donor.phone}', '${donor.name}')">
            <i class="fas fa-phone"></i> ${donor.phone}
          </a>
          <button class="btn btn--outline btn--sm" onclick="showDirections(${donor.lat}, ${donor.lng}, '${donor.name}')">
            <i class="fas fa-directions"></i> Directions
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function renderLegend() {
  const legendItems = document.getElementById('legendItems');
  const usedTypes = [...new Set(searchResults.map(d => d.bloodType))];
  
  if (legendItems) {
    legendItems.innerHTML = usedTypes.map(type => `
      <div class="legend-item">
        <div class="legend-color" style="background-color: ${appConfig.mapMarkerColors[type]}"></div>
        <span>${type}</span>
      </div>
    `).join('');
  }
}

function renderBloodCamps() {
  const bloodCamps = document.getElementById('bloodCamps');
  
  if (bloodCamps) {
    bloodCamps.innerHTML = appConfig.bloodBanks.map(bank => `
      <div class="blood-camp">
        <div class="camp-name">${bank.name} ${bank.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success);"></i>' : ''}</div>
        <div class="camp-details">
          <div><i class="fas fa-map-marker-alt"></i> ${bank.address}</div>
          <div><a href="tel:${bank.phone}" class="phone-link"><i class="fas fa-phone"></i> ${bank.phone}</a></div>
        </div>
      </div>
    `).join('');
  }
}

// Results filters setup
function setupResultsFilters() {
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      
      const filter = e.target.getAttribute('data-filter');
      applyFilter(filter);
    }
  });
  
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const sortBy = this.value;
      applySorting(sortBy);
    });
  }
}

function applyFilter(filter) {
  let filteredResults = [...searchResults];
  
  switch (filter) {
    case 'online':
      filteredResults = searchResults.filter(donor => donor.status === 'online');
      break;
    case 'nearby':
      filteredResults = searchResults.filter(donor => donor.distance <= 5);
      break;
    default:
      filteredResults = searchResults;
  }
  
  renderDonorList(filteredResults);
  if (googleMap) {
    addDonorMarkersToMap(googleMap, filteredResults);
  }
}

function applySorting(sortBy) {
  let sortedResults = [...searchResults];
  
  switch (sortBy) {
    case 'donations':
      sortedResults.sort((a, b) => b.donationCount - a.donationCount);
      break;
    case 'recent':
      sortedResults.sort((a, b) => new Date(b.lastDonation || '2020-01-01') - new Date(a.lastDonation || '2020-01-01'));
      break;
    default:
      sortedResults.sort((a, b) => a.distance - b.distance);
  }
  
  renderDonorList(sortedResults);
  if (googleMap) {
    addDonorMarkersToMap(googleMap, sortedResults);
  }
}

// Phone click handler
function handlePhoneClick(phoneNumber, name = 'Donor') {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.location.href = `tel:${phoneNumber}`;
    showToast(`Calling ${name}...`, 'info');
  } else {
    copyToClipboard(phoneNumber);
    showToast(`${name}'s phone number copied to clipboard!`, 'success');
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// Stats animation
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      
      stat.textContent = current.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }
    
    requestAnimationFrame(updateNumber);
  });
}

// Testimonial carousel
function setupTestimonialCarousel() {
  window.showTestimonial = function(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const indicators = document.querySelectorAll('.indicator');
    
    testimonials.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    currentTestimonial = index;
  };
}

function startTestimonialRotation() {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % 3;
    showTestimonial(currentTestimonial);
  }, 5000);
}

// Theme toggle
function setupThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const html = document.documentElement;
      const currentScheme = html.getAttribute('data-color-scheme');
      const newScheme = currentScheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-color-scheme', newScheme);
      
      const icon = this.querySelector('i');
      icon.className = newScheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  }
}

// Dashboard, Leaderboard, and other page renderers
function renderDashboard() {
  if (!isAuthenticated || !currentUser) {
    showToast('Please sign in to view dashboard', 'info');
    return;
  }
  
  renderAchievements();
  renderChallenges();
  updateImpactStats();
}

function renderAchievements() {
  const achievementsGrid = document.getElementById('achievementsGrid');
  if (!achievementsGrid) return;
  
  achievementsGrid.innerHTML = appConfig.achievements.map(achievement => {
    const earned = isAuthenticated; // Simplified - in real app, check user achievements
    return `
      <div class="achievement-badge ${earned ? 'earned' : ''}">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${achievement.name}</div>
        <div class="achievement-desc">${achievement.description}</div>
      </div>
    `;
  }).join('');
}

function renderChallenges() {
  const challengesList = document.getElementById('challengesList');
  if (!challengesList) return;
  
  const challenges = [
    {"title": "September Hero", "description": "Donate blood once this month", "progress": 67},
    {"title": "Verified Community", "description": "Refer 3 friends to register", "progress": 33}
  ];
  
  challengesList.innerHTML = challenges.map(challenge => `
    <div class="challenge-item">
      <div class="challenge-header">
        <strong>${challenge.title}</strong>
        <span>${challenge.progress}%</span>
      </div>
      <p>${challenge.description}</p>
      <div class="challenge-progress">
        <div class="challenge-progress-fill" style="width: ${challenge.progress}%"></div>
      </div>
    </div>
  `).join('');
}

function updateImpactStats() {
  const impactNumbers = document.querySelectorAll('.impact-number');
  const donations = 0; // In real app, get from user data
  const livesSaved = Math.floor(donations * 2.5);
  
  impactNumbers.forEach((num, index) => {
    const target = index === 0 ? livesSaved : donations;
    animateNumber(num, target);
  });
}

function animateNumber(element, target) {
  const duration = 1000;
  const startTime = performance.now();
  
  function updateNumber(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.floor(progress * target);
    
    element.textContent = current;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }
  
  requestAnimationFrame(updateNumber);
}

function renderLeaderboard() {
  const leaderboardTable = document.getElementById('leaderboardTable');
  if (!leaderboardTable) return;
  
  const sortedDonors = [...appConfig.donors]
    .filter(d => d.verified && d.donationCount > 0)
    .sort((a, b) => b.donationCount - a.donationCount)
    .slice(0, 10);
  
  const tableHeader = `
    <div class="table-header">
      <div>Rank</div>
      <div>Name</div>
      <div>Blood Type</div>
      <div>Donations</div>
      <div>Status</div>
      <div>City</div>
    </div>
  `;
  
  const tableRows = sortedDonors.map((donor, index) => {
    const rank = index + 1;
    let rankBadgeClass = 'rank-badge';
    if (rank === 1) rankBadgeClass += ' gold';
    else if (rank === 2) rankBadgeClass += ' silver';
    else if (rank === 3) rankBadgeClass += ' bronze';
    
    return `
      <div class="table-row">
        <div><span class="${rankBadgeClass}">${rank}</span></div>
        <div>${donor.name} ${donor.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success);"></i>' : ''}</div>
        <div><span class="blood-type-badge" style="background-color: ${appConfig.mapMarkerColors[donor.bloodType]}">${donor.bloodType}</span></div>
        <div>${donor.donationCount}</div>
        <div>Verified</div>
        <div>${donor.city}</div>
      </div>
    `;
  }).join('');
  
  leaderboardTable.innerHTML = tableHeader + tableRows;
}

function renderBloodBanks() {
  const bloodBanksGrid = document.getElementById('bloodBanksGrid');
  if (!bloodBanksGrid) return;
  
  bloodBanksGrid.innerHTML = appConfig.bloodBanks.map(bank => `
    <div class="blood-bank-card">
      <h3>${bank.name} ${bank.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success);"></i>' : ''}</h3>
      <div class="bank-details">
        <p><i class="fas fa-map-marker-alt"></i> ${bank.address}</p>
        <p><a href="tel:${bank.phone}" class="phone-link"><i class="fas fa-phone"></i> ${bank.phone}</a></p>
        <p><i class="fas fa-shield-alt"></i> Verified Blood Bank</p>
      </div>
    </div>
  `).join('');
}

function renderEmergencyRequests() {
  const emergencyRequests = document.getElementById('emergencyRequests');
  if (!emergencyRequests) return;
  
  const requests = [
    {"id": 1, "bloodType": "O-", "location": "Apollo Hospital, Chennai", "urgency": "Critical", "timeLeft": "2 hours", "verified": true},
    {"id": 2, "bloodType": "A+", "location": "Max Hospital, Delhi", "urgency": "Urgent", "timeLeft": "6 hours", "verified": true}
  ];
  
  emergencyRequests.innerHTML = requests.map(request => `
    <div class="emergency-card">
      <div class="emergency-header">
        <h3>${request.urgency} Blood Request ${request.verified ? '<i class="fas fa-check-circle" style="color: var(--color-success);"></i>' : ''}</h3>
        <span class="time-left">${request.timeLeft} left</span>
      </div>
      <div class="emergency-details">
        <p><strong>Blood Type:</strong> <span class="blood-type-badge" style="background-color: ${appConfig.mapMarkerColors[request.bloodType]}">${request.bloodType}</span></p>
        <p><strong>Location:</strong> ${request.location}</p>
        <p><strong>Status:</strong> <i class="fas fa-shield-alt"></i> AI Verified Request</p>
      </div>
      <div class="emergency-actions">
        <button class="btn btn--primary" onclick="respondToEmergency('${request.id}')">
          <i class="fas fa-hand-paper"></i> I Can Help
        </button>
      </div>
    </div>
  `).join('');
}

function respondToEmergency(requestId) {
  if (!isAuthenticated) {
    showAuthModal();
    return;
  }
  showToast('Thank you for responding! Your verified details have been shared.', 'success');
}

// Toast notification system
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = toast.querySelector('.toast-message');
  const toastIcon = toast.querySelector('.toast-icon');
  
  toastMessage.textContent = message;
  
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle',
    warning: 'fas fa-exclamation-triangle'
  };
  
  toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
  toast.className = `toast ${type} show`;
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 3000);
}

function showLoadingOverlay(message = 'Loading...') {
  const overlay = document.getElementById('loadingOverlay');
  const loadingText = overlay.querySelector('p');
  
  if (loadingText) {
    loadingText.textContent = message;
  }
  
  overlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.add('hidden');
}

function showModal(title, message) {
  const modal = document.getElementById('successModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('successModal');
  modal.classList.add('hidden');
}

// Event listeners
window.addEventListener('hashchange', function() {
  const hash = window.location.hash.slice(1);
  if (hash && document.getElementById(hash)) {
    navigateTo(hash);
  }
});

window.addEventListener('click', function(e) {
  const modal = document.getElementById('successModal');
  if (e.target === modal) {
    closeModal();
  }
  
  const authModal = document.getElementById('authModal');
  if (e.target === authModal.querySelector('.modal-overlay')) {
    closeAuthModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
    closeAuthModal();
  }
});

console.log('LifeLink Enhanced App Loaded Successfully!');
