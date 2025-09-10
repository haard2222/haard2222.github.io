// Application data
const appData = {
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  compatibility: {
    "A+": ["A+", "AB+"],
    "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"],
    "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"],
    "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"],
    "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  colorMapping: {
    "A+": "#FF6B6B", "A-": "#FF8E8E",
    "B+": "#4DABF7", "B-": "#74C0FC",
    "AB+": "#9775FA", "AB-": "#B197FC",
    "O+": "#51CF66", "O-": "#8CE99A"
  },
  sampleDonors: [
    {"id": 1, "name": "Rahul Sharma", "phone": "+91-9876543210", "bloodType": "O+", "lat": 12.9716, "lng": 77.5946, "city": "Bangalore", "donationCount": 5, "lastDonation": "2025-08-15"},
    {"id": 2, "name": "Priya Patel", "phone": "+91-9876543211", "bloodType": "A+", "lat": 12.9698, "lng": 77.5986, "city": "Bangalore", "donationCount": 3, "lastDonation": "2025-07-20"},
    {"id": 3, "name": "Amit Kumar", "phone": "+91-9876543212", "bloodType": "B+", "lat": 12.9738, "lng": 77.6013, "city": "Bangalore", "donationCount": 7, "lastDonation": "2025-09-01"},
    {"id": 4, "name": "Sneha Reddy", "phone": "+91-9876543213", "bloodType": "AB+", "lat": 12.9767, "lng": 77.5993, "city": "Bangalore", "donationCount": 2, "lastDonation": "2025-06-10"},
    {"id": 5, "name": "Ravi Singh", "phone": "+91-9876543214", "bloodType": "O-", "lat": 12.9648, "lng": 77.5970, "city": "Bangalore", "donationCount": 9, "lastDonation": "2025-08-30"},
    {"id": 6, "name": "Lakshmi Iyer", "phone": "+91-9876543215", "bloodType": "A-", "lat": 12.9721, "lng": 77.6040, "city": "Bangalore", "donationCount": 4, "lastDonation": "2025-08-05"},
    {"id": 7, "name": "Suresh Gupta", "phone": "+91-9876543216", "bloodType": "B-", "lat": 12.9690, "lng": 77.5920, "city": "Bangalore", "donationCount": 6, "lastDonation": "2025-07-15"},
    {"id": 8, "name": "Kavya Nair", "phone": "+91-9876543217", "bloodType": "AB-", "lat": 12.9755, "lng": 77.6100, "city": "Bangalore", "donationCount": 1, "lastDonation": "2025-05-22"}
  ],
  bloodCamps: [
    {"name": "Red Cross Blood Bank", "address": "MG Road, Bangalore", "phone": "+91-80-25588253", "lat": 12.9716, "lng": 77.6197},
    {"name": "Lions Blood Bank", "address": "Jayanagar, Bangalore", "phone": "+91-80-26633444", "lat": 12.9278, "lng": 77.5937},
    {"name": "Rotary Blood Bank", "address": "Indiranagar, Bangalore", "phone": "+91-80-25212285", "lat": 12.9719, "lng": 77.6412}
  ]
};

// App state
let currentPage = 'home';
let donors = [...appData.sampleDonors];
let currentUserLocation = null;
let searchResults = [];

// Navigation functions
function navigateTo(page) {
  // Hide current page
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  
  // Show target page
  const targetPage = document.getElementById(page);
  if (targetPage) {
    targetPage.classList.add('active');
    currentPage = page;
    
    // Initialize page-specific functionality
    if (page === 'leaderboard') {
      renderLeaderboard();
    }
  }
  
  // Update URL hash
  window.location.hash = page;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
  // Set up navigation
  const hash = window.location.hash.slice(1);
  if (hash && ['home', 'register', 'request', 'results', 'leaderboard'].includes(hash)) {
    navigateTo(hash);
  }
  
  // Set up form handlers
  setupFormHandlers();
  
  // Set up location capture
  setupLocationCapture();
  
  // Initialize leaderboard
  renderLeaderboard();
});

// Form handlers
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

// Location capture setup
function setupLocationCapture() {
  // Donor registration location
  const captureBtn = document.getElementById('captureLocation');
  if (captureBtn) {
    captureBtn.addEventListener('click', () => captureLocation('locationStatus'));
  }
  
  // Blood request location
  const captureRequestBtn = document.getElementById('captureRequestLocation');
  if (captureRequestBtn) {
    captureRequestBtn.addEventListener('click', () => captureLocation('requestLocationStatus'));
  }
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
      
      statusElement.textContent = `Location captured: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
      statusElement.className = 'location-status';
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
    lat: currentUserLocation ? currentUserLocation.lat : 12.9716 + (Math.random() - 0.5) * 0.1,
    lng: currentUserLocation ? currentUserLocation.lng : 77.5946 + (Math.random() - 0.5) * 0.1,
    donationCount: 0,
    lastDonation: null,
    consent: formData.get('consent') === 'on'
  };
  
  // Validate required fields
  if (!donorData.name || !donorData.phone || !donorData.email || !donorData.bloodType || !donorData.consent) {
    alert('Please fill all required fields and provide consent.');
    return;
  }
  
  // Add to donors list
  donors.push(donorData);
  
  // Show success message
  showModal('Registration Successful!', `Thank you ${donorData.name}! You have been registered as a blood donor. You may be contacted when someone needs your blood type.`);
  
  // Reset form
  e.target.reset();
  currentUserLocation = null;
  document.getElementById('locationStatus').textContent = '';
}

// Blood request handler
function handleBloodRequest(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const requiredBloodType = formData.get('requiredBloodType');
  const manualAddress = formData.get('manualAddress');
  
  if (!requiredBloodType) {
    alert('Please select a blood type.');
    return;
  }
  
  if (!currentUserLocation && !manualAddress) {
    alert('Please provide your location or enter an address.');
    return;
  }
  
  // Use default location if manual address is provided but no geolocation
  const searchLocation = currentUserLocation || { lat: 12.9716, lng: 77.5946 };
  
  // Find compatible donors
  const compatibleDonors = findCompatibleDonors(requiredBloodType, searchLocation);
  searchResults = compatibleDonors;
  
  // Navigate to results
  navigateTo('results');
  renderResults(requiredBloodType, compatibleDonors);
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
    compatibleBloodTypes.includes(donor.bloodType)
  );
  
  // Calculate distances and sort
  return compatibleDonors.map(donor => ({
    ...donor,
    distance: calculateDistance(location.lat, location.lng, donor.lat, donor.lng)
  })).sort((a, b) => a.distance - b.distance);
}

// Calculate distance between two points (simplified)
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
function renderResults(requiredBloodType, compatibleDonors) {
  const donorList = document.getElementById('donorList');
  const noDonors = document.getElementById('noDonors');
  const radarMarkers = document.getElementById('radarMarkers');
  
  if (compatibleDonors.length === 0) {
    // Show no donors message and blood camps
    donorList.style.display = 'none';
    noDonors.style.display = 'block';
    renderBloodCamps();
    radarMarkers.innerHTML = '';
  } else {
    // Show donor list
    donorList.style.display = 'block';
    noDonors.style.display = 'none';
    renderDonorList(compatibleDonors);
    renderRadarMap(compatibleDonors);
  }
  
  // Render legend
  renderLegend();
}

// Render donor list
function renderDonorList(donors) {
  const donorList = document.getElementById('donorList');
  
  donorList.innerHTML = donors.map(donor => `
    <div class="donor-item">
      <div class="donor-header">
        <span class="donor-name">${donor.name}</span>
        <span class="blood-type-badge" style="background-color: ${appData.colorMapping[donor.bloodType]}">${donor.bloodType}</span>
      </div>
      <div class="donor-details">
        <span>${donor.distance.toFixed(1)} km away</span>
        <a href="#" class="phone-link" onclick="handlePhoneClick('${donor.phone}')">${donor.phone}</a>
      </div>
    </div>
  `).join('');
}

// Render radar map
function renderRadarMap(donors) {
  const radarMarkers = document.getElementById('radarMarkers');
  const mapSize = 300;
  const maxDistance = Math.max(...donors.map(d => d.distance), 10);
  
  radarMarkers.innerHTML = donors.map(donor => {
    const distance = donor.distance;
    const angle = Math.random() * 2 * Math.PI; // Random angle for visualization
    const radius = Math.min((distance / maxDistance) * (mapSize / 2 - 10), mapSize / 2 - 10);
    
    const x = mapSize / 2 + radius * Math.cos(angle) - 6; // -6 for marker offset
    const y = mapSize / 2 + radius * Math.sin(angle) - 6;
    
    return `<div class="donor-marker" 
      style="left: ${x}px; top: ${y}px; background-color: ${appData.colorMapping[donor.bloodType]}"
      title="${donor.name} - ${donor.bloodType} - ${donor.distance.toFixed(1)}km"
      onclick="handlePhoneClick('${donor.phone}')"></div>`;
  }).join('');
}

// Render legend
function renderLegend() {
  const legendItems = document.getElementById('legendItems');
  const usedTypes = [...new Set(searchResults.map(d => d.bloodType))];
  
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
  
  bloodCamps.innerHTML = appData.bloodCamps.map(camp => `
    <div class="blood-camp">
      <div class="camp-name">${camp.name}</div>
      <div class="camp-details">
        <div>${camp.address}</div>
        <div><a href="tel:${camp.phone}" class="phone-link">${camp.phone}</a></div>
      </div>
    </div>
  `).join('');
}

// Handle phone click
function handlePhoneClick(phoneNumber) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // On mobile, trigger phone call
    window.location.href = `tel:${phoneNumber}`;
  } else {
    // On desktop, copy to clipboard
    copyToClipboard(phoneNumber);
    showCopyNotification();
  }
}

// Copy to clipboard
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}

// Show copy notification
function showCopyNotification() {
  const notification = document.getElementById('copyNotification');
  notification.classList.remove('hidden');
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 300);
  }, 2000);
}

// Render leaderboard
function renderLeaderboard() {
  const leaderboardBody = document.getElementById('leaderboardBody');
  
  // Sort donors by donation count
  const sortedDonors = [...donors]
    .filter(d => d.donationCount > 0)
    .sort((a, b) => b.donationCount - a.donationCount);
  
  leaderboardBody.innerHTML = sortedDonors.map((donor, index) => {
    const rank = index + 1;
    let rankBadgeClass = 'rank-badge';
    if (rank === 1) rankBadgeClass += ' gold';
    else if (rank === 2) rankBadgeClass += ' silver';
    else if (rank === 3) rankBadgeClass += ' bronze';
    
    return `
      <div class="table-row">
        <div class="table-cell" data-label="Rank">
          <span class="${rankBadgeClass}">${rank}</span>
        </div>
        <div class="table-cell" data-label="Name">${donor.name}</div>
        <div class="table-cell" data-label="Blood Type">
          <span class="blood-type-badge" style="background-color: ${appData.colorMapping[donor.bloodType]}">${donor.bloodType}</span>
        </div>
        <div class="table-cell" data-label="Donations">${donor.donationCount}</div>
        <div class="table-cell" data-label="Last Donation">${donor.lastDonation || 'Never'}</div>
      </div>
    `;
  }).join('');
  
  if (sortedDonors.length === 0) {
    leaderboardBody.innerHTML = `
      <div class="table-row">
        <div style="grid-column: 1 / -1; text-align: center; color: var(--color-text-secondary);">
          No donations recorded yet. Be the first to donate!
        </div>
      </div>
    `;
  }
}

// Modal functions
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
  if (e.target === modal) {
    closeModal();
  }
});

// Initialize navigation links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('href').slice(1);
      navigateTo(page);
    });
  });
});