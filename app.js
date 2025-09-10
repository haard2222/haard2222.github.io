// Blood Donation Website JavaScript

// Application data
const appData = {
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  compatibility: {
    "A+": ["A+", "AB+"], "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"], "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"], "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"], "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  colorMapping: {
    "A+": "#E53E3E", "A-": "#EF4444",
    "B+": "#DC2626", "B-": "#F87171",
    "AB+": "#B91C1C", "AB-": "#FCA5A5",
    "O+": "#991B1B", "O-": "#FEE2E2"
  },
  donors: [
    {"id": 1, "name": "Mohammed Junaid", "phone": "+91-9876543210", "bloodType": "O+", "lat": 28.6139, "lng": 77.2090, "city": "New Delhi", "status": "online", "donationCount": 6, "lastSeen": "2 hours ago", "distance": "1.2 km", "availability": "Available"},
    {"id": 2, "name": "Ibrahim Khan", "phone": "+91-9876543211", "bloodType": "O+", "lat": 19.0760, "lng": 72.8777, "city": "Mumbai", "status": "online", "donationCount": 6, "lastSeen": "1 hour ago", "distance": "2.1 km", "availability": "Available"},
    {"id": 3, "name": "Anas Rosy", "phone": "+91-9876543212", "bloodType": "O+", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "status": "online", "donationCount": 5, "lastSeen": "30 min ago", "distance": "0.8 km", "availability": "Available"},
    {"id": 4, "name": "Mariya Fatima", "phone": "+91-9876543213", "bloodType": "O+", "lat": 22.5726, "lng": 88.3639, "city": "Kolkata", "status": "online", "donationCount": 4, "lastSeen": "45 min ago", "distance": "3.2 km", "availability": "Available"},
    {"id": 5, "name": "Raiyan Razi", "phone": "+91-9876543214", "bloodType": "O+", "lat": 26.9124, "lng": 75.7873, "city": "Jaipur", "status": "online", "donationCount": 3, "lastSeen": "1.5 hours ago", "distance": "5.1 km", "availability": "Available"},
    {"id": 6, "name": "Tasneem Fatima", "phone": "+91-9876543215", "bloodType": "O+", "lat": 13.0827, "lng": 80.2707, "city": "Chennai", "status": "online", "donationCount": 2, "lastSeen": "20 min ago", "distance": "1.8 km", "availability": "Available"},
    {"id": 7, "name": "Ahmed Ali", "phone": "+91-9876543216", "bloodType": "A+", "lat": 23.0225, "lng": 72.5714, "city": "Ahmedabad", "status": "online", "donationCount": 8, "lastSeen": "10 min ago", "distance": "0.5 km", "availability": "Available"},
    {"id": 8, "name": "Fatima Sheikh", "phone": "+91-9876543217", "bloodType": "B+", "lat": 17.3850, "lng": 78.4867, "city": "Hyderabad", "status": "online", "donationCount": 7, "lastSeen": "35 min ago", "distance": "2.7 km", "availability": "Available"}
  ],
  bloodBanks: [
    {"name": "Red Cross Blood Bank", "address": "Central Delhi", "phone": "+91-11-25588253", "lat": 28.6139, "lng": 77.2090, "distance": "2.5 km"},
    {"name": "AIIMS Blood Center", "address": "Ansari Nagar", "phone": "+91-11-26588700", "distance": "3.1 km"},
    {"name": "Max Hospital Blood Bank", "address": "Saket", "phone": "+91-11-26515050", "distance": "4.2 km"}
  ]
};

// App state
let currentPage = 'home';
let donors = [...appData.donors];
let currentUserLocation = null;
let searchResults = [];

// Navigation function - must be global
function navigateTo(page) {
  console.log('Navigating to:', page);
  
  // Hide current page
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => {
    p.classList.remove('active');
  });
  
  // Show target page
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = page;
    
    // Initialize page-specific functionality
    if (page === 'leaderboard') {
      setTimeout(() => renderLeaderboard(), 100);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  } else {
    console.error('Page not found:', page);
  }
  
  // Update URL hash
  window.location.hash = page;
}

// Phone click handler - must be global
function handlePhoneClick(phoneNumber, donorName = '') {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile, trigger phone call
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // On desktop, copy to clipboard
    copyToClipboard(phoneNumber);
    showCopyNotification(donorName);
  }
}

// Modal close function - must be global
function closeModal() {
  const modal = document.getElementById('successModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

// Make functions globally available
window.navigateTo = navigateTo;
window.handlePhoneClick = handlePhoneClick;
window.closeModal = closeModal;

// Copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(err => {
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  
  document.body.removeChild(textArea);
}

// Show copy notification
function showCopyNotification(donorName = '') {
  const notification = document.getElementById('copyNotification');
  if (!notification) return;
  
  if (donorName) {
    notification.innerHTML = `<i class="fas fa-copy"></i> ${donorName}'s phone number copied!`;
  } else {
    notification.innerHTML = '<i class="fas fa-copy"></i> Phone number copied to clipboard!';
  }
  
  notification.classList.remove('hidden');
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 300);
  }, 3000);
}

// Modal functions
function showModal(title, message) {
  const modal = document.getElementById('successModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  
  if (!modal || !modalTitle || !modalMessage) return;
  
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.classList.remove('hidden');
}

// Calculate distance between two points using Haversine formula
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

// Find compatible donors
function findCompatibleDonors(requiredBloodType, location) {
  // Get all donor blood types that can donate to the required type
  const compatibleBloodTypes = [];
  for (const [donorType, canDonateTo] of Object.entries(appData.compatibility)) {
    if (canDonateTo.includes(requiredBloodType)) {
      compatibleBloodTypes.push(donorType);
    }
  }
  
  // Filter donors by compatibility
  const compatibleDonors = donors.filter(donor => 
    compatibleBloodTypes.includes(donor.bloodType) && donor.status === 'online'
  );
  
  // Calculate distances and sort
  return compatibleDonors.map(donor => ({
    ...donor,
    distance: calculateDistance(location.lat, location.lng, donor.lat, donor.lng)
  })).sort((a, b) => a.distance - b.distance);
}

// Geolocation capture
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
      
      statusElement.textContent = `✓ Location captured successfully`;
      statusElement.className = 'location-status';
    },
    (error) => {
      let message = 'Unable to get location: ';
      switch(error.code) {
        case error.PERMISSION_DENIED:
          message += 'Permission denied. Please allow location access.';
          break;
        case error.POSITION_UNAVAILABLE:
          message += 'Position unavailable. Please try again.';
          break;
        case error.TIMEOUT:
          message += 'Request timeout. Please try again.';
          break;
        default:
          message += 'Unknown error occurred.';
      }
      statusElement.textContent = message;
      statusElement.className = 'location-status error';
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// Donor registration handler
function handleDonorRegistration(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const donorData = {
    id: donors.length + 1,
    name: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    age: parseInt(formData.get('age')),
    bloodType: formData.get('bloodGroup'),
    city: formData.get('city'),
    address: formData.get('address'),
    lat: currentUserLocation ? currentUserLocation.lat : 28.6139 + (Math.random() - 0.5) * 0.1,
    lng: currentUserLocation ? currentUserLocation.lng : 77.2090 + (Math.random() - 0.5) * 0.1,
    donationCount: Math.floor(Math.random() * 5) + 1,
    lastSeen: 'Online',
    status: 'online',
    availability: 'Available',
    consent: formData.get('consent') === 'on'
  };
  
  // Validate required fields
  if (!donorData.name || !donorData.phone || !donorData.email || !donorData.bloodType || !donorData.consent) {
    showModal('Missing Information', 'Please fill all required fields and provide consent to continue.');
    return;
  }
  
  // Validate age
  if (donorData.age < 18 || donorData.age > 65) {
    showModal('Age Requirement', 'Blood donors must be between 18 and 65 years old.');
    return;
  }
  
  // Add to donors list
  donors.push(donorData);
  
  // Show success message
  showModal('Registration Successful!', `Thank you ${donorData.name}! You have been registered as a blood donor. You may be contacted when someone needs your blood type (${donorData.bloodType}).`);
  
  // Reset form
  e.target.reset();
  currentUserLocation = null;
  const locationStatus = document.getElementById('locationStatus');
  if (locationStatus) {
    locationStatus.textContent = '';
    locationStatus.className = 'location-status';
  }
}

// Blood request handler
function handleBloodRequest(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const requiredBloodType = formData.get('requiredBloodType');
  const manualAddress = formData.get('manualAddress');
  
  if (!requiredBloodType) {
    showModal('Missing Information', 'Please select a blood type to continue.');
    return;
  }
  
  // Use default location 
  const searchLocation = currentUserLocation || { lat: 28.6139, lng: 77.2090 };
  
  // Find compatible donors
  const compatibleDonors = findCompatibleDonors(requiredBloodType, searchLocation);
  searchResults = compatibleDonors;
  
  // Navigate to results
  navigateTo('results');
  setTimeout(() => {
    renderResults(requiredBloodType, compatibleDonors);
  }, 100);
}

// Render results page
function renderResults(requiredBloodType, compatibleDonors) {
  const donorList = document.getElementById('donorList');
  const noDonors = document.getElementById('noDonors');
  const resultsSummary = document.getElementById('resultsSummary');
  
  // Update results summary
  if (resultsSummary) {
    if (compatibleDonors.length > 0) {
      resultsSummary.textContent = `Found ${compatibleDonors.length} compatible donor${compatibleDonors.length === 1 ? '' : 's'} for blood type ${requiredBloodType}`;
      resultsSummary.style.display = 'block';
    } else {
      resultsSummary.textContent = `No compatible donors found for blood type ${requiredBloodType}`;
      resultsSummary.style.display = 'block';
    }
  }
  
  if (compatibleDonors.length === 0) {
    // Show no donors message and blood banks
    if (donorList) donorList.style.display = 'none';
    if (noDonors) {
      noDonors.style.display = 'block';
      renderBloodCamps();
    }
    clearRadarMap();
  } else {
    // Show donor list
    if (donorList) donorList.style.display = 'block';
    if (noDonors) noDonors.style.display = 'none';
    renderDonorList(compatibleDonors);
    renderRadarMap(compatibleDonors);
  }
  
  // Render legend
  renderLegend();
}

// Render donor list
function renderDonorList(donors) {
  const donorList = document.getElementById('donorList');
  if (!donorList) return;
  
  donorList.innerHTML = donors.map(donor => {
    const initials = donor.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    return `
      <div class="donor-item">
        <div class="donor-header">
          <div class="donor-profile">
            <div class="donor-avatar">${initials}</div>
            <div class="donor-info">
              <h4>${donor.name}</h4>
              <small class="donor-status">
                <i class="fas fa-circle" style="color: #10B981; font-size: 8px;"></i> ${donor.availability}
              </small>
            </div>
          </div>
          <span class="donor-blood-type">${donor.bloodType}</span>
        </div>
        <div class="donor-details">
          <div class="donor-distance">
            <i class="fas fa-map-marker-alt"></i>
            <span>${donor.distance.toFixed(1)} km away</span>
          </div>
          <a href="#" class="phone-link" onclick="handlePhoneClick('${donor.phone}', '${donor.name}')">
            <i class="fas fa-phone"></i> Call Now
          </a>
        </div>
      </div>
    `;
  }).join('');
}

// Render radar map
function renderRadarMap(donors) {
  const radarMarkers = document.getElementById('radarMarkers');
  if (!radarMarkers) return;
  
  const mapSize = 280;
  const maxDistance = Math.max(...donors.map(d => d.distance), 5);
  
  radarMarkers.innerHTML = donors.map((donor, index) => {
    const distance = Math.min(donor.distance, maxDistance);
    const angle = (index / donors.length) * 2 * Math.PI + (Math.random() - 0.5) * 0.5;
    const maxRadius = (mapSize / 2) - 20;
    const radius = (distance / maxDistance) * maxRadius;
    
    const x = (mapSize / 2) + radius * Math.cos(angle) - 7;
    const y = (mapSize / 2) + radius * Math.sin(angle) - 7;
    
    return `
      <div class="donor-marker" 
        style="left: ${x}px; top: ${y}px; background-color: ${appData.colorMapping[donor.bloodType]}"
        title="${donor.name} - ${donor.bloodType} - ${donor.distance.toFixed(1)}km"
        onclick="handlePhoneClick('${donor.phone}', '${donor.name}')">
      </div>
    `;
  }).join('');
}

function clearRadarMap() {
  const radarMarkers = document.getElementById('radarMarkers');
  if (radarMarkers) {
    radarMarkers.innerHTML = '';
  }
}

// Render legend
function renderLegend() {
  const legendItems = document.getElementById('legendItems');
  if (!legendItems) return;
  
  const usedTypes = [...new Set(searchResults.map(d => d.bloodType))];
  
  if (usedTypes.length === 0) {
    legendItems.innerHTML = '<span style="color: #6B7280; font-size: 14px;">No donors to display</span>';
    return;
  }
  
  legendItems.innerHTML = usedTypes.map(type => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${appData.colorMapping[type]}"></div>
      <span>${type}</span>
    </div>
  `).join('');
}

// Render blood camps
function renderBloodCamps() {
  const bloodCamps = document.getElementById('bloodCamps');
  if (!bloodCamps) return;
  
  bloodCamps.innerHTML = appData.bloodBanks.map(camp => `
    <div class="blood-camp">
      <div class="camp-name">${camp.name}</div>
      <div class="camp-details">
        <div><i class="fas fa-map-marker-alt"></i> ${camp.address}</div>
        <div><i class="fas fa-phone"></i> <a href="tel:${camp.phone}">${camp.phone}</a></div>
        ${camp.distance ? `<div><i class="fas fa-route"></i> ${camp.distance}</div>` : ''}
      </div>
    </div>
  `).join('');
}

// Render leaderboard
function renderLeaderboard() {
  const leaderboardBody = document.getElementById('leaderboardBody');
  if (!leaderboardBody) return;
  
  // Sort donors by donation count
  const sortedDonors = [...donors]
    .filter(d => d.donationCount > 0)
    .sort((a, b) => b.donationCount - a.donationCount);
  
  if (sortedDonors.length === 0) {
    leaderboardBody.innerHTML = `
      <div style="padding: 60px 20px; text-align: center; color: #6B7280;">
        <i class="fas fa-trophy" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
        <h3>No donations recorded yet</h3>
        <p>Be the first to donate and make it to the leaderboard!</p>
      </div>
    `;
    return;
  }
  
  leaderboardBody.innerHTML = sortedDonors.map((donor, index) => {
    const rank = index + 1;
    let rankBadgeClass = 'rank-badge';
    if (rank === 1) rankBadgeClass += ' gold';
    else if (rank === 2) rankBadgeClass += ' silver';
    else if (rank === 3) rankBadgeClass += ' bronze';
    
    const initials = donor.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    
    return `
      <div class="leaderboard-item">
        <span class="${rankBadgeClass}">${rank}</span>
        <div class="donor-profile-large">
          <div class="donor-avatar-large">${initials}</div>
          <div class="donor-info">
            <h4>${donor.name}</h4>
            <small style="color: #6B7280;">${donor.city || 'Location not specified'}</small>
          </div>
        </div>
        <div class="donor-meta">
          <span class="donor-blood-type">${donor.bloodType}</span>
          <div class="donation-count">
            <i class="fas fa-heart"></i>
            <span>${donor.donationCount}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Set up navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        const page = href.slice(1);
        navigateTo(page);
      }
    });
  });
  
  // Set up form handlers
  const donorForm = document.getElementById('donorForm');
  if (donorForm) {
    donorForm.addEventListener('submit', handleDonorRegistration);
  }
  
  const requestForm = document.getElementById('requestForm');
  if (requestForm) {
    requestForm.addEventListener('submit', handleBloodRequest);
  }
  
  // Set up location capture
  const captureBtn = document.getElementById('captureLocation');
  if (captureBtn) {
    captureBtn.addEventListener('click', function(e) {
      e.preventDefault();
      captureLocation('locationStatus');
    });
  }
  
  const captureRequestBtn = document.getElementById('captureRequestLocation');
  if (captureRequestBtn) {
    captureRequestBtn.addEventListener('click', function(e) {
      e.preventDefault();
      captureLocation('requestLocationStatus');
    });
  }
  
  // Initialize leaderboard
  renderLeaderboard();
  
  // Handle initial page
  const hash = window.location.hash.slice(1);
  if (hash && ['home', 'register', 'request', 'results', 'leaderboard'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
  
  // Handle browser back/forward
  window.addEventListener('hashchange', function() {
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'register', 'request', 'results', 'leaderboard'].includes(hash)) {
      navigateTo(hash);
    }
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    const modal = document.getElementById('successModal');
    if (modal && e.target === modal) {
      closeModal();
    }
  });
  
  // Keyboard accessibility
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  console.log('App initialized successfully');
});
