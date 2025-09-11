// Application Data
const APP_DATA = {
  googleMapsConfig: {
    apiKey: "AIzaSyBFQ62nJD45JEvhuMORoBXYdnADcJL2Znw",
    libraries: ["marker"],
    region: "IN",
    language: "en"
  },
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  compatibility: {
    "A+": ["A+", "AB+"], "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"], "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"], "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"], "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  markerColors: {
    "A+": "#E53E3E", "A-": "#EF4444",
    "B+": "#DC2626", "B-": "#F87171",
    "AB+": "#B91C1C", "AB-": "#FCA5A5",
    "O+": "#991B1B", "O-": "#FEE2E2"
  },
  defaultCenter: { lat: 28.6139, lng: 77.2090, zoom: 12 },
  donors: [
    {
      id: 1, name: "Rajesh Kumar", phone: "+91-9876543210", bloodType: "O+",
      lat: 28.6139, lng: 77.2090, address: "Connaught Place, New Delhi",
      donationCount: 12, lastDonation: "2025-08-20", status: "available",
      verificationLevel: "verified", preferredTime: "Morning"
    },
    {
      id: 2, name: "Priya Sharma", phone: "+91-9876543211", bloodType: "A+",
      lat: 28.6169, lng: 77.2020, address: "India Gate, New Delhi",
      donationCount: 8, lastDonation: "2025-09-05", status: "available",
      verificationLevel: "verified", preferredTime: "Evening"
    },
    {
      id: 3, name: "Mohammed Ali", phone: "+91-9876543212", bloodType: "B+",
      lat: 28.6229, lng: 77.2065, address: "Red Fort, New Delhi",
      donationCount: 15, lastDonation: "2025-09-08", status: "available",
      verificationLevel: "verified", preferredTime: "Afternoon"
    },
    {
      id: 4, name: "Sneha Patel", phone: "+91-9876543213", bloodType: "AB+",
      lat: 28.6089, lng: 77.2120, address: "Lodhi Gardens, New Delhi",
      donationCount: 6, lastDonation: "2025-08-30", status: "available",
      verificationLevel: "verified", preferredTime: "Morning"
    },
    {
      id: 5, name: "Vikram Singh", phone: "+91-9876543214", bloodType: "O-",
      lat: 28.6059, lng: 77.2030, address: "Humayun's Tomb, New Delhi",
      donationCount: 20, lastDonation: "2025-09-10", status: "available",
      verificationLevel: "verified", preferredTime: "Anytime"
    },
    {
      id: 6, name: "Kavya Nair", phone: "+91-9876543215", bloodType: "A-",
      lat: 28.6189, lng: 77.2080, address: "Jantar Mantar, New Delhi",
      donationCount: 9, lastDonation: "2025-09-03", status: "available",
      verificationLevel: "verified", preferredTime: "Evening"
    }
  ],
  bloodBanks: [
    {
      name: "AIIMS Blood Bank", phone: "+91-11-26588700",
      address: "AIIMS, Ansari Nagar, New Delhi", lat: 28.5672, lng: 77.2100,
      currentStock: {"O+": 45, "A+": 32, "B+": 28, "AB+": 15, "O-": 12, "A-": 18, "B-": 10, "AB-": 8}
    },
    {
      name: "Safdarjung Hospital Blood Bank", phone: "+91-11-26165060",
      address: "Safdarjung Hospital, New Delhi", lat: 28.5706, lng: 77.2072,
      currentStock: {"O+": 38, "A+": 25, "B+": 22, "AB+": 12, "O-": 8, "A-": 14, "B-": 7, "AB-": 5}
    },
    {
      name: "Max Hospital Blood Bank", phone: "+91-11-26515050",
      address: "Max Hospital, Saket, New Delhi", lat: 28.5244, lng: 77.2066,
      currentStock: {"O+": 42, "A+": 30, "B+": 25, "AB+": 18, "O-": 10, "A-": 16, "B-": 9, "AB-": 6}
    }
  ],
  verificationSimulation: {
    processingTime: 3000,
    confidenceRange: [0.75, 0.98],
    successRate: 0.85,
    supportedFormats: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
    maxFileSize: 5242880,
    sampleResults: [
      {
        type: "prescription", confidence: 0.94, status: "verified",
        details: "Valid medical prescription detected with doctor signature and hospital letterhead"
      },
      {
        type: "hospital_letter", confidence: 0.89, status: "verified",
        details: "Hospital requisition form properly filled with patient details"
      }
    ]
  }
};

// Global variables
let map;
let userLocation = null;
let markers = [];
let bloodBankMarkers = [];
let currentDonor = null;
let showingBloodBanks = false;
let mapInitialized = false;

// DOM Elements - Initialize after DOM is loaded
let elements = {};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  initializeElements();
  initializeEventListeners();
  updateStatistics();
});

// Initialize DOM elements
function initializeElements() {
  elements = {
    // Navigation
    findDonorsBtn: document.getElementById('findDonorsBtn'),
    requestBloodBtn: document.getElementById('requestBloodBtn'),
    startRequestBtn: document.getElementById('startRequestBtn'),
    viewMapBtn: document.getElementById('viewMapBtn'),
    
    // Upload section
    uploadSection: document.getElementById('uploadSection'),
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    processingState: document.getElementById('processingState'),
    progressBar: document.getElementById('progressBar'),
    verificationResults: document.getElementById('verificationResults'),
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultDetails: document.getElementById('resultDetails'),
    confidenceScore: document.getElementById('confidenceScore'),
    proceedToMapBtn: document.getElementById('proceedToMapBtn'),
    
    // Map section
    mapSection: document.getElementById('mapSection'),
    mapContainer: document.getElementById('map'),
    mapLoading: document.getElementById('mapLoading'),
    bloodTypeFilter: document.getElementById('bloodTypeFilter'),
    getCurrentLocationBtn: document.getElementById('getCurrentLocationBtn'),
    showBloodBanksBtn: document.getElementById('showBloodBanksBtn'),
    
    // Donor panel
    donorPanel: document.getElementById('donorPanel'),
    closeDonorPanel: document.getElementById('closeDonorPanel'),
    donorName: document.getElementById('donorName'),
    donorBloodType: document.getElementById('donorBloodType'),
    donorPhone: document.getElementById('donorPhone'),
    donorAddress: document.getElementById('donorAddress'),
    donorCount: document.getElementById('donorCount'),
    donorLastDonation: document.getElementById('donorLastDonation'),
    donorPreferredTime: document.getElementById('donorPreferredTime'),
    donorDistance: document.getElementById('donorDistance'),
    contactDonorBtn: document.getElementById('contactDonorBtn'),
    getDirectionsBtn: document.getElementById('getDirectionsBtn'),
    
    // Statistics
    totalDonors: document.getElementById('totalDonors'),
    totalBloodBanks: document.getElementById('totalBloodBanks'),
    totalDonations: document.getElementById('totalDonations'),
    
    // Toast container
    toastContainer: document.getElementById('toastContainer')
  };
}

// Initialize Google Maps - Simpler approach
window.initMap = function() {
  console.log('InitMap called');
  
  try {
    // Create map with basic configuration
    map = new google.maps.Map(elements.mapContainer, {
      zoom: APP_DATA.defaultCenter.zoom,
      center: { lat: APP_DATA.defaultCenter.lat, lng: APP_DATA.defaultCenter.lng },
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: true
    });

    // Wait for map to be ready then load markers
    google.maps.event.addListenerOnce(map, 'idle', function() {
      loadDonorMarkers();
      hideMapLoading();
      mapInitialized = true;
      showToast('Map loaded successfully!', 'success');
    });
    
  } catch (error) {
    console.error('Error initializing map:', error);
    hideMapLoading();
    showToast('Failed to load map. Please refresh the page.', 'error');
  }
};

// Event listeners
function initializeEventListeners() {
  // Navigation buttons
  if (elements.requestBloodBtn) elements.requestBloodBtn.addEventListener('click', showUploadSection);
  if (elements.startRequestBtn) elements.startRequestBtn.addEventListener('click', showUploadSection);
  if (elements.findDonorsBtn) elements.findDonorsBtn.addEventListener('click', showMapSection);
  if (elements.viewMapBtn) elements.viewMapBtn.addEventListener('click', showMapSection);
  if (elements.proceedToMapBtn) elements.proceedToMapBtn.addEventListener('click', showMapSection);

  // File upload
  if (elements.uploadZone) {
    elements.uploadZone.addEventListener('click', function(e) {
      e.preventDefault();
      elements.fileInput.click();
    });
    elements.uploadZone.addEventListener('dragover', handleDragOver);
    elements.uploadZone.addEventListener('dragleave', handleDragLeave);
    elements.uploadZone.addEventListener('drop', handleFileDrop);
  }
  
  if (elements.fileInput) {
    elements.fileInput.addEventListener('change', handleFileSelect);
  }

  // Map controls
  if (elements.bloodTypeFilter) elements.bloodTypeFilter.addEventListener('change', filterDonorsByBloodType);
  if (elements.getCurrentLocationBtn) elements.getCurrentLocationBtn.addEventListener('click', getCurrentLocation);
  if (elements.showBloodBanksBtn) elements.showBloodBanksBtn.addEventListener('click', toggleBloodBanks);

  // Donor panel
  if (elements.closeDonorPanel) elements.closeDonorPanel.addEventListener('click', closeDonorPanel);
  if (elements.contactDonorBtn) elements.contactDonorBtn.addEventListener('click', contactDonor);
  if (elements.getDirectionsBtn) elements.getDirectionsBtn.addEventListener('click', getDirections);

  // Close panel when clicking outside
  document.addEventListener('click', function(e) {
    if (elements.donorPanel && !elements.donorPanel.contains(e.target) && !elements.donorPanel.classList.contains('hidden')) {
      if (!e.target.closest('.marker-content')) {
        closeDonorPanel();
      }
    }
  });
}

// Show upload section
function showUploadSection() {
  if (elements.uploadSection) {
    elements.uploadSection.classList.remove('hidden');
    elements.uploadSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Show map section
function showMapSection() {
  if (elements.mapSection) {
    elements.mapSection.classList.remove('hidden');
    elements.mapSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Initialize map if not already loaded
  if (!mapInitialized && window.google && window.google.maps) {
    setTimeout(() => {
      initMap();
    }, 100);
  }
}

// File upload handlers
function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  if (elements.uploadZone) {
    elements.uploadZone.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  e.preventDefault();
  e.stopPropagation();
  if (elements.uploadZone) {
    elements.uploadZone.classList.remove('drag-over');
  }
}

function handleFileDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  if (elements.uploadZone) {
    elements.uploadZone.classList.remove('drag-over');
  }
  
  const files = Array.from(e.dataTransfer.files);
  if (files.length > 0) {
    processFile(files[0]);
  }
}

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (file) {
    processFile(file);
  }
}

// Process uploaded file
function processFile(file) {
  console.log('Processing file:', file.name, file.type, file.size);
  
  // Validate file
  if (!APP_DATA.verificationSimulation.supportedFormats.includes(file.type)) {
    showToast('Unsupported file format. Please upload JPG, PNG, or PDF.', 'error');
    return;
  }

  if (file.size > APP_DATA.verificationSimulation.maxFileSize) {
    showToast('File size too large. Maximum size is 5MB.', 'error');
    return;
  }

  // Show processing state
  if (elements.uploadZone) elements.uploadZone.classList.add('hidden');
  if (elements.processingState) elements.processingState.classList.remove('hidden');

  showToast('Starting document verification...', 'info');

  // Simulate AI processing
  simulateDocumentVerification(file);
}

// Simulate document verification
function simulateDocumentVerification(file) {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 95) progress = 95;
    
    if (elements.progressBar) {
      elements.progressBar.style.width = progress + '%';
    }
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    if (elements.progressBar) {
      elements.progressBar.style.width = '100%';
    }
    
    // Simulate verification result
    const isSuccess = Math.random() < APP_DATA.verificationSimulation.successRate;
    const confidence = APP_DATA.verificationSimulation.confidenceRange[0] + 
      Math.random() * (APP_DATA.verificationSimulation.confidenceRange[1] - APP_DATA.verificationSimulation.confidenceRange[0]);
    
    const result = APP_DATA.verificationSimulation.sampleResults[
      Math.floor(Math.random() * APP_DATA.verificationSimulation.sampleResults.length)
    ];

    showVerificationResult(isSuccess, confidence, result.details);
  }, APP_DATA.verificationSimulation.processingTime);
}

// Show verification result
function showVerificationResult(isSuccess, confidence, details) {
  if (elements.processingState) elements.processingState.classList.add('hidden');
  if (elements.verificationResults) elements.verificationResults.classList.remove('hidden');

  if (isSuccess) {
    if (elements.resultIcon) elements.resultIcon.textContent = '✅';
    if (elements.resultTitle) elements.resultTitle.textContent = 'Document Verified';
    if (elements.verificationResults) {
      elements.verificationResults.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
      elements.verificationResults.style.borderColor = 'rgba(var(--color-success-rgb), 0.2)';
    }
    showToast('Document verified successfully!', 'success');
  } else {
    if (elements.resultIcon) elements.resultIcon.textContent = '❌';
    if (elements.resultTitle) elements.resultTitle.textContent = 'Verification Failed';
    if (elements.verificationResults) {
      elements.verificationResults.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
      elements.verificationResults.style.borderColor = 'rgba(var(--color-error-rgb), 0.2)';
    }
    if (elements.proceedToMapBtn) elements.proceedToMapBtn.style.display = 'none';
    showToast('Document verification failed. Please try again.', 'error');
  }

  if (elements.confidenceScore) {
    elements.confidenceScore.textContent = Math.round(confidence * 100) + '%';
  }
  if (elements.resultDetails) {
    elements.resultDetails.textContent = details;
  }
}

// Load donor markers on map using standard markers (fallback)
function loadDonorMarkers() {
  if (!map) return;

  try {
    console.log('Loading donor markers...');
    
    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // Add donor markers using standard markers
    APP_DATA.donors.forEach(donor => {
      const marker = new google.maps.Marker({
        position: { lat: donor.lat, lng: donor.lng },
        map: map,
        title: `${donor.name} (${donor.bloodType})`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: APP_DATA.markerColors[donor.bloodType],
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        },
        label: {
          text: donor.bloodType,
          color: '#FFFFFF',
          fontWeight: 'bold',
          fontSize: '10px'
        }
      });

      // Add click listener
      marker.addListener('click', () => showDonorPanel(donor));
      
      marker.donorData = donor;
      markers.push(marker);
    });

    console.log(`Loaded ${markers.length} donor markers`);
    showToast(`Loaded ${markers.length} donors on map`, 'success');
  } catch (error) {
    console.error('Error loading markers:', error);
    showToast('Failed to load donor markers', 'error');
  }
}

// Show donor panel
function showDonorPanel(donor) {
  currentDonor = donor;
  
  if (elements.donorName) elements.donorName.textContent = donor.name;
  if (elements.donorBloodType) {
    elements.donorBloodType.textContent = donor.bloodType;
    elements.donorBloodType.setAttribute('data-blood-type', donor.bloodType);
  }
  if (elements.donorPhone) elements.donorPhone.textContent = donor.phone;
  if (elements.donorAddress) elements.donorAddress.textContent = donor.address;
  if (elements.donorCount) elements.donorCount.textContent = `${donor.donationCount} times`;
  if (elements.donorLastDonation) elements.donorLastDonation.textContent = formatDate(donor.lastDonation);
  if (elements.donorPreferredTime) elements.donorPreferredTime.textContent = donor.preferredTime;
  
  // Calculate distance if user location is available
  if (userLocation && elements.donorDistance) {
    const distance = calculateDistance(
      userLocation.lat, userLocation.lng,
      donor.lat, donor.lng
    );
    elements.donorDistance.textContent = distance.toFixed(1) + ' km';
  } else if (elements.donorDistance) {
    elements.donorDistance.textContent = 'Location needed';
  }

  if (elements.donorPanel) {
    elements.donorPanel.classList.remove('hidden');
  }
}

// Close donor panel
function closeDonorPanel() {
  if (elements.donorPanel) {
    elements.donorPanel.classList.add('hidden');
  }
  currentDonor = null;
}

// Contact donor
function contactDonor() {
  if (currentDonor) {
    window.open(`tel:${currentDonor.phone}`, '_blank');
    showToast(`Calling ${currentDonor.name}...`, 'info');
  }
}

// Get directions
function getDirections() {
  if (currentDonor) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${currentDonor.lat},${currentDonor.lng}&travelmode=driving`;
    window.open(url, '_blank');
    showToast('Opening directions in Google Maps...', 'info');
  }
}

// Filter donors by blood type
function filterDonorsByBloodType() {
  const selectedBloodType = elements.bloodTypeFilter.value;
  
  markers.forEach(marker => {
    if (!selectedBloodType || marker.donorData.bloodType === selectedBloodType) {
      marker.setMap(map);
    } else {
      marker.setMap(null);
    }
  });
  
  const visibleCount = markers.filter(marker => marker.getMap() === map).length;
  showToast(`Showing ${visibleCount} donors`, 'info');
}

// Get current location
function getCurrentLocation() {
  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by this browser.', 'error');
    return;
  }

  showToast('Getting your location...', 'info');
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center map on user location
      if (map) {
        map.setCenter(userLocation);
        map.setZoom(14);

        // Add user location marker
        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Your Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: "#4285F4",
            fillOpacity: 1,
            strokeColor: '#FFFFFF',
            strokeWeight: 3
          },
          label: {
            text: "📍",
            color: '#FFFFFF'
          }
        });

        showToast('Location found successfully!', 'success');
      }
    },
    (error) => {
      let message = 'Unable to get your location. ';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          message += 'Please allow location access.';
          break;
        case error.POSITION_UNAVAILABLE:
          message += 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          message += 'Location request timed out.';
          break;
        default:
          message += 'An unknown error occurred.';
          break;
      }
      showToast(message, 'error');
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
  );
}

// Toggle blood banks
function toggleBloodBanks() {
  if (!showingBloodBanks) {
    loadBloodBankMarkers();
    if (elements.showBloodBanksBtn) elements.showBloodBanksBtn.textContent = '👤 Show Donors';
    showingBloodBanks = true;
    showToast('Showing blood banks', 'info');
  } else {
    hideBloodBankMarkers();
    if (elements.showBloodBanksBtn) elements.showBloodBanksBtn.textContent = '🏥 Blood Banks';
    showingBloodBanks = false;
    showToast('Showing donors', 'info');
  }
}

// Load blood bank markers
function loadBloodBankMarkers() {
  if (!map) return;

  try {
    APP_DATA.bloodBanks.forEach(bloodBank => {
      const marker = new google.maps.Marker({
        position: { lat: bloodBank.lat, lng: bloodBank.lng },
        map: map,
        title: bloodBank.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#FF6B6B",
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        },
        label: {
          text: "🏥",
          color: '#FFFFFF'
        }
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: createBloodBankInfoContent(bloodBank)
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      bloodBankMarkers.push(marker);
    });

    // Hide donor markers
    markers.forEach(marker => marker.setMap(null));
  } catch (error) {
    console.error('Error loading blood bank markers:', error);
    showToast('Failed to load blood bank markers', 'error');
  }
}

// Hide blood bank markers
function hideBloodBankMarkers() {
  bloodBankMarkers.forEach(marker => marker.setMap(null));
  bloodBankMarkers = [];
  
  // Show donor markers
  markers.forEach(marker => marker.setMap(map));
}

// Create blood bank info content
function createBloodBankInfoContent(bloodBank) {
  const stockInfo = Object.entries(bloodBank.currentStock)
    .map(([type, count]) => `<span style="margin-right: 8px; padding: 2px 6px; background: rgba(255,255,255,0.2); border-radius: 4px;">${type}: ${count}</span>`)
    .join(' ');

  return `
    <div style="max-width: 300px; padding: 8px;">
      <h4 style="margin: 0 0 8px 0; color: #333;">${bloodBank.name}</h4>
      <p style="margin: 4px 0;"><strong>Phone:</strong> ${bloodBank.phone}</p>
      <p style="margin: 4px 0;"><strong>Address:</strong> ${bloodBank.address}</p>
      <div style="margin: 8px 0 0 0;">
        <strong>Current Stock:</strong><br>
        <div style="margin-top: 4px;">${stockInfo}</div>
      </div>
    </div>
  `;
}

// Hide map loading
function hideMapLoading() {
  if (elements.mapLoading) {
    elements.mapLoading.classList.add('hidden');
  }
}

// Update statistics
function updateStatistics() {
  if (elements.totalDonors) elements.totalDonors.textContent = APP_DATA.donors.length;
  if (elements.totalBloodBanks) elements.totalBloodBanks.textContent = APP_DATA.bloodBanks.length;
  
  const totalDonations = APP_DATA.donors.reduce((sum, donor) => sum + donor.donationCount, 0);
  if (elements.totalDonations) elements.totalDonations.textContent = totalDonations;
}

// Utility functions
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Toast notifications
function showToast(message, type = 'info') {
  if (!elements.toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  
  elements.toastContainer.appendChild(toast);
  
  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 4000);
}

// Error handling for Maps API
window.gm_authFailure = function() {
  showToast('Google Maps authentication failed. Please check the API key.', 'error');
  hideMapLoading();
};
