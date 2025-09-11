// Application Data
const APP_DATA = {
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  compatibility: {
    "A+": ["A+", "AB+"], "A-": ["A+", "A-", "AB+", "AB-"],
    "B+": ["B+", "AB+"], "B-": ["B+", "B-", "AB+", "AB-"],
    "AB+": ["AB+"], "AB-": ["AB+", "AB-"],
    "O+": ["A+", "B+", "AB+", "O+"], "O-": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
  },
  donors: [
    {
      id: 1, name: "Dr. Rajesh Kumar", phone: "+91-9876543210", bloodType: "O+",
      distance: 1.2, area: "Connaught Place", donationCount: 25,
      lastDonation: "2025-09-08", status: "available", preferredTime: "Morning",
      avatar: "RK", verified: true, title: "Dr."
    },
    {
      id: 2, name: "Priya Sharma", phone: "+91-9876543211", bloodType: "A+",
      distance: 2.1, area: "India Gate", donationCount: 18,
      lastDonation: "2025-09-05", status: "available", preferredTime: "Evening",
      avatar: "PS", verified: true, title: ""
    },
    {
      id: 3, name: "Mohammed Ali Khan", phone: "+91-9876543212", bloodType: "B+",
      distance: 0.8, area: "Red Fort Area", donationCount: 22,
      lastDonation: "2025-09-10", status: "available", preferredTime: "Afternoon",
      avatar: "MA", verified: true, title: ""
    },
    {
      id: 4, name: "Sneha Patel", phone: "+91-9876543213", bloodType: "AB+",
      distance: 3.5, area: "Lodhi Road", donationCount: 12,
      lastDonation: "2025-08-30", status: "busy", preferredTime: "Morning",
      avatar: "SP", verified: true, title: ""
    },
    {
      id: 5, name: "Vikram Singh", phone: "+91-9876543214", bloodType: "O-",
      distance: 1.8, area: "Karol Bagh", donationCount: 31,
      lastDonation: "2025-09-11", status: "available", preferredTime: "Anytime",
      avatar: "VS", verified: true, title: ""
    },
    {
      id: 6, name: "Kavya Nair", phone: "+91-9876543215", bloodType: "A-",
      distance: 4.2, area: "Lajpat Nagar", donationCount: 15,
      lastDonation: "2025-09-03", status: "available", preferredTime: "Evening",
      avatar: "KN", verified: true, title: ""
    },
    {
      id: 7, name: "Amit Gupta", phone: "+91-9876543216", bloodType: "B-",
      distance: 2.7, area: "Nehru Place", donationCount: 9,
      lastDonation: "2025-08-25", status: "away", preferredTime: "Morning",
      avatar: "AG", verified: true, title: ""
    },
    {
      id: 8, name: "Deepika Singh", phone: "+91-9876543217", bloodType: "AB-",
      distance: 5.1, area: "Saket", donationCount: 7,
      lastDonation: "2025-09-01", status: "available", preferredTime: "Afternoon",
      avatar: "DS", verified: true, title: ""
    },
    {
      id: 9, name: "Rahul Mishra", phone: "+91-9876543218", bloodType: "O+",
      distance: 1.5, area: "Vasant Kunj", donationCount: 20,
      lastDonation: "2025-09-06", status: "available", preferredTime: "Morning",
      avatar: "RM", verified: true, title: ""
    },
    {
      id: 10, name: "Anita Reddy", phone: "+91-9876543219", bloodType: "A+",
      distance: 6.3, area: "Dwarka", donationCount: 14,
      lastDonation: "2025-08-28", status: "emergency-only", preferredTime: "Evening",
      avatar: "AR", verified: true, title: ""
    },
    {
      id: 11, name: "Suresh Kumar", phone: "+91-9876543220", bloodType: "B+",
      distance: 3.8, area: "Rohini", donationCount: 11,
      lastDonation: "2025-08-20", status: "available", preferredTime: "Afternoon",
      avatar: "SK", verified: true, title: ""
    },
    {
      id: 12, name: "Meera Joshi", phone: "+91-9876543221", bloodType: "AB+",
      distance: 2.9, area: "Pitampura", donationCount: 8,
      lastDonation: "2025-09-02", status: "busy", preferredTime: "Morning",
      avatar: "MJ", verified: true, title: ""
    },
    {
      id: 13, name: "Arjun Verma", phone: "+91-9876543222", bloodType: "O-",
      distance: 4.7, area: "Civil Lines", donationCount: 16,
      lastDonation: "2025-08-15", status: "available", preferredTime: "Evening",
      avatar: "AV", verified: true, title: ""
    },
    {
      id: 14, name: "Pooja Agarwal", phone: "+91-9876543223", bloodType: "A-",
      distance: 1.9, area: "Chandni Chowk", donationCount: 13,
      lastDonation: "2025-09-04", status: "available", preferredTime: "Afternoon",
      avatar: "PA", verified: true, title: ""
    },
    {
      id: 15, name: "Ravi Tiwari", phone: "+91-9876543224", bloodType: "B-",
      distance: 7.2, area: "Janakpuri", donationCount: 5,
      lastDonation: "2025-08-10", status: "away", preferredTime: "Morning",
      avatar: "RT", verified: true, title: ""
    }
  ],
  inspirationalQuotes: [
    "Give blood, give life - your donation can save up to 3 lives",
    "Be a hero without a cape - donate blood today",
    "The gift of blood is the gift of life",
    "Blood donation is the gift you give that keeps on giving",
    "Your blood can be someone's lifeline in their darkest hour",
    "Donate blood - because the life you save may be someone you love",
    "Every drop counts - your blood donation makes a difference",
    "Be the reason someone believes in the goodness of people",
    "Blood donors are life savers in the truest sense",
    "A single pint can save three lives - be that difference",
    "Giving blood costs nothing, but means everything to someone",
    "Blood donation - the most beautiful way to say 'I care'"
  ]
};

// Global state
let currentSection = 'home';
let selectedBloodType = '';
let filteredDonors = [];
let displayedDonors = [];
let donorsPerPage = 10;
let currentPage = 0;
let quoteIndex = 0;
let quoteInterval;

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  
  // Wait for DOM to be fully ready
  setTimeout(() => {
    initializeApp();
  }, 100);
});

function initializeApp() {
  console.log('Initializing app...');
  setupEventListeners();
  updateStatistics();
  startQuoteRotation();
  showSection('home');
  console.log('App initialization complete');
}

// Setup all event listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');

  // Navigation buttons with explicit event handling
  setupButton('homeBtn', () => {
    console.log('Home clicked');
    showSection('home');
  });

  setupButton('requestBloodBtn', () => {
    console.log('Request Blood clicked');
    showSection('upload');
  });

  setupButton('startRequestBtn', () => {
    console.log('Start Request clicked');
    showSection('upload');
  });

  setupButton('becomeDonorBtn', () => {
    console.log('Become Donor clicked');
    showSection('registration');
  });

  setupButton('proceedToListBtn', () => {
    console.log('Proceed to List clicked');
    showSection('bloodType');
  });

  // File upload functionality
  setupFileUpload();

  // Blood type buttons
  setupBloodTypeButtons();

  // Donor list controls
  setupDonorListControls();

  // Registration form
  setupRegistrationForm();

  console.log('Event listeners setup complete');
}

function setupButton(buttonId, clickHandler) {
  const button = document.getElementById(buttonId);
  if (button) {
    // Remove any existing listeners
    button.removeEventListener('click', clickHandler);
    // Add new listener
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(`Button ${buttonId} clicked`);
      clickHandler();
    });
    console.log(`Setup button: ${buttonId}`);
  } else {
    console.warn(`Button not found: ${buttonId}`);
  }
}

function setupFileUpload() {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('fileInput');

  if (uploadZone && fileInput) {
    console.log('Setting up file upload...');
    
    // Click handler
    uploadZone.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Upload zone clicked, triggering file input');
      fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
      console.log('File selected');
      const file = e.target.files[0];
      if (file) {
        processFile(file);
      }
    });

    // Drag and drop
    uploadZone.addEventListener('dragover', function(e) {
      e.preventDefault();
      uploadZone.classList.add('drag-over');
    });

    uploadZone.addEventListener('dragleave', function(e) {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
    });

    uploadZone.addEventListener('drop', function(e) {
      e.preventDefault();
      uploadZone.classList.remove('drag-over');
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    });

    console.log('File upload setup complete');
  } else {
    console.warn('File upload elements not found');
  }
}

function setupBloodTypeButtons() {
  const buttons = document.querySelectorAll('.blood-type-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const bloodType = this.dataset.bloodType;
      console.log('Blood type selected:', bloodType);
      selectBloodType(bloodType);
    });
  });
  console.log(`Setup ${buttons.length} blood type buttons`);
}

function setupDonorListControls() {
  const searchInput = document.getElementById('searchInput');
  const sortFilter = document.getElementById('sortFilter');
  const statusFilter = document.getElementById('statusFilter');
  const loadMoreBtn = document.getElementById('loadMoreBtn');

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  if (sortFilter) {
    sortFilter.addEventListener('change', handleSort);
  }
  if (statusFilter) {
    statusFilter.addEventListener('change', handleStatusFilter);
  }
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreDonors);
  }
}

function setupRegistrationForm() {
  const form = document.getElementById('registrationForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleRegistration(e);
    });
  }
}

// Show/Hide sections
function showSection(sectionName) {
  console.log('Showing section:', sectionName);
  
  const sections = {
    'home': 'homePage',
    'upload': 'uploadSection',
    'bloodType': 'bloodTypeSection',
    'donorList': 'donorListSection',
    'registration': 'registrationSection'
  };
  
  // Hide all sections
  Object.values(sections).forEach(sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.classList.add('hidden');
    }
  });

  // Show target section
  const targetSectionId = sections[sectionName];
  const targetElement = document.getElementById(targetSectionId);
  if (targetElement) {
    targetElement.classList.remove('hidden');
    currentSection = sectionName;
    console.log('Successfully showed section:', sectionName);
  } else {
    console.error('Section element not found:', targetSectionId);
  }

  // Handle quote banner visibility
  const quoteBanner = document.getElementById('quoteBanner');
  if (quoteBanner) {
    if (sectionName === 'home') {
      quoteBanner.classList.remove('hidden');
    } else {
      quoteBanner.classList.add('hidden');
    }
  }

  // Reset upload section when navigating to it
  if (sectionName === 'upload') {
    resetUploadSection();
  }

  window.scrollTo(0, 0);
}

function resetUploadSection() {
  const uploadZone = document.getElementById('uploadZone');
  const processingState = document.getElementById('processingState');
  const verificationResults = document.getElementById('verificationResults');
  const fileInput = document.getElementById('fileInput');

  if (uploadZone) uploadZone.classList.remove('hidden');
  if (processingState) processingState.classList.add('hidden');
  if (verificationResults) verificationResults.classList.add('hidden');
  if (fileInput) fileInput.value = '';
}

// Process uploaded file
function processFile(file) {
  console.log('Processing file:', file.name, file.type, file.size);
  
  // Validate file
  const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
  if (!supportedFormats.includes(file.type)) {
    showToast('Unsupported file format. Please upload JPG, PNG, or PDF.', 'error');
    return;
  }

  if (file.size > 5242880) { // 5MB
    showToast('File size too large. Maximum size is 5MB.', 'error');
    return;
  }

  // Show processing state
  const uploadZone = document.getElementById('uploadZone');
  const processingState = document.getElementById('processingState');
  
  if (uploadZone) uploadZone.classList.add('hidden');
  if (processingState) processingState.classList.remove('hidden');

  showToast('Starting document verification...', 'info');
  simulateDocumentVerification();
}

// Simulate document verification
function simulateDocumentVerification() {
  const progressBar = document.getElementById('progressBar');
  let progress = 0;
  
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress > 95) progress = 95;
    
    if (progressBar) progressBar.style.width = progress + '%';
  }, 200);

  setTimeout(() => {
    clearInterval(interval);
    if (progressBar) progressBar.style.width = '100%';
    
    // Always succeed for demo
    showVerificationResult(true, 0.94);
  }, 3000);
}

// Show verification result
function showVerificationResult(isSuccess, confidence) {
  const processingState = document.getElementById('processingState');
  const verificationResults = document.getElementById('verificationResults');
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultDetails = document.getElementById('resultDetails');
  const confidenceScore = document.getElementById('confidenceScore');

  if (processingState) processingState.classList.add('hidden');
  if (verificationResults) verificationResults.classList.remove('hidden');

  if (isSuccess) {
    if (resultIcon) resultIcon.textContent = '✅';
    if (resultTitle) resultTitle.textContent = 'Document Verified';
    if (resultDetails) resultDetails.textContent = 'Valid medical prescription detected with doctor signature and hospital letterhead';
    showToast('Document verified successfully!', 'success');
  } else {
    if (resultIcon) resultIcon.textContent = '❌';
    if (resultTitle) resultTitle.textContent = 'Verification Failed';
    if (resultDetails) resultDetails.textContent = 'Unable to verify document. Please ensure the document is clear and contains required medical information.';
    showToast('Document verification failed. Please try again.', 'error');
  }

  if (confidenceScore) confidenceScore.textContent = Math.round(confidence * 100) + '%';
}

// Blood type selection
function selectBloodType(bloodType) {
  console.log('Selecting blood type:', bloodType);
  selectedBloodType = bloodType;
  
  // Update button states
  const bloodTypeButtons = document.querySelectorAll('.blood-type-btn');
  bloodTypeButtons.forEach(btn => {
    if (btn.dataset.bloodType === bloodType) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });

  showToast(`Selected blood type: ${bloodType}`, 'info');

  // Show donor list after 1 second
  setTimeout(() => {
    prepareCompatibleDonors(bloodType);
    showSection('donorList');
  }, 1000);
}

// Prepare compatible donors
function prepareCompatibleDonors(neededBloodType) {
  const compatibleTypes = APP_DATA.compatibility[neededBloodType] || [neededBloodType];
  
  filteredDonors = APP_DATA.donors.filter(donor => 
    compatibleTypes.includes(donor.bloodType)
  );

  // Sort by distance (default)
  filteredDonors.sort((a, b) => a.distance - b.distance);
  
  currentPage = 0;
  displayedDonors = [];
  loadMoreDonors();
  updateDonorCount();
  
  showToast(`Found ${filteredDonors.length} compatible donors for ${neededBloodType}`, 'success');
}

// Handle search
function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  
  console.log('Search query:', query);
  
  if (!query) {
    // Reset to all compatible donors
    if (selectedBloodType) {
      prepareCompatibleDonors(selectedBloodType);
    }
    return;
  }

  const baseCompatible = selectedBloodType ? 
    APP_DATA.donors.filter(d => APP_DATA.compatibility[selectedBloodType].includes(d.bloodType)) :
    APP_DATA.donors;

  filteredDonors = baseCompatible.filter(donor => {
    return donor.name.toLowerCase().includes(query) ||
           donor.area.toLowerCase().includes(query);
  });

  currentPage = 0;
  displayedDonors = [];
  renderDonorList();
  updateDonorCount();
  
  showToast(`Found ${filteredDonors.length} donors matching "${query}"`, 'info');
}

// Handle sorting
function handleSort() {
  const sortFilter = document.getElementById('sortFilter');
  const sortBy = sortFilter ? sortFilter.value : 'distance';
  
  console.log('Sorting by:', sortBy);
  
  switch(sortBy) {
    case 'distance':
      filteredDonors.sort((a, b) => a.distance - b.distance);
      break;
    case 'donations':
      filteredDonors.sort((a, b) => b.donationCount - a.donationCount);
      break;
    case 'recent':
      filteredDonors.sort((a, b) => new Date(b.lastDonation) - new Date(a.lastDonation));
      break;
    case 'bloodType':
      filteredDonors.sort((a, b) => a.bloodType.localeCompare(b.bloodType));
      break;
  }
  
  currentPage = 0;
  displayedDonors = [];
  renderDonorList();
  
  showToast(`Sorted by ${sortBy}`, 'info');
}

// Handle status filter
function handleStatusFilter() {
  const statusFilter = document.getElementById('statusFilter');
  const status = statusFilter ? statusFilter.value : '';
  
  console.log('Filtering by status:', status);
  
  const baseCompatible = selectedBloodType ? 
    APP_DATA.donors.filter(d => APP_DATA.compatibility[selectedBloodType].includes(d.bloodType)) :
    APP_DATA.donors;

  if (status) {
    filteredDonors = baseCompatible.filter(donor => donor.status === status);
  } else {
    filteredDonors = [...baseCompatible];
  }

  // Apply current search
  const searchInput = document.getElementById('searchInput');
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  if (query) {
    filteredDonors = filteredDonors.filter(donor =>
      donor.name.toLowerCase().includes(query) ||
      donor.area.toLowerCase().includes(query)
    );
  }

  // Apply current sort
  handleSort();
  
  currentPage = 0;
  displayedDonors = [];
  renderDonorList();
  updateDonorCount();
}

// Load more donors
function loadMoreDonors() {
  const start = currentPage * donorsPerPage;
  const end = start + donorsPerPage;
  const newDonors = filteredDonors.slice(start, end);
  
  displayedDonors = [...displayedDonors, ...newDonors];
  currentPage++;
  
  renderDonorList();
  
  // Hide/show load more button
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    if (end >= filteredDonors.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
    }
  }
}

// Render donor list
function renderDonorList() {
  const donorList = document.getElementById('donorList');
  if (!donorList) return;
  
  donorList.innerHTML = '';
  
  displayedDonors.forEach(donor => {
    const donorCard = createDonorCard(donor);
    donorList.appendChild(donorCard);
  });
  
  console.log(`Rendered ${displayedDonors.length} donors`);
}

// Create donor card
function createDonorCard(donor) {
  const card = document.createElement('div');
  card.className = 'donor-card';
  
  card.innerHTML = `
    <div class="donor-avatar">${donor.avatar}</div>
    <div class="donor-info">
      <h4 class="donor-name">${donor.title}${donor.name}</h4>
      <div class="donor-details">
        <span class="blood-type-badge">${donor.bloodType}</span>
        <span class="distance">${donor.distance} km away</span>
        <span class="donations">${donor.donationCount} donations</span>
        <span class="availability-status ${donor.status}">${formatStatus(donor.status)}</span>
      </div>
      <div class="donor-contact">
        <button class="phone-btn" onclick="handlePhoneClick('${donor.phone}', '${donor.name}')">
          📞 Call Now
        </button>
        <span class="last-donation">Last donated: ${formatDate(donor.lastDonation)}</span>
      </div>
    </div>
  `;
  
  return card;
}

// Smart phone number handling
function handlePhoneClick(phoneNumber, donorName) {
  console.log('Phone click:', phoneNumber, donorName);
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Direct calling on mobile
    window.open(`tel:${phoneNumber}`, '_self');
    showToast(`Calling ${donorName}...`, 'info');
  } else {
    // Copy to clipboard on desktop
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(phoneNumber).then(() => {
        showToast(`Phone number ${phoneNumber} copied to clipboard!`, 'success');
      }).catch(() => {
        fallbackCopyToClipboard(phoneNumber);
      });
    } else {
      fallbackCopyToClipboard(phoneNumber);
    }
  }
}

// Fallback copy to clipboard
function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    showToast(`Phone number ${text} copied to clipboard!`, 'success');
  } catch (err) {
    showToast('Unable to copy phone number. Please note it down manually.', 'error');
  }
  
  document.body.removeChild(textArea);
}

// Handle registration
function handleRegistration(e) {
  e.preventDefault();
  console.log('Registration form submitted');
  
  const donorNameInput = document.getElementById('donorName');
  const donorPhoneInput = document.getElementById('donorPhone');
  const donorBloodTypeInput = document.getElementById('donorBloodType');
  const donorAreaInput = document.getElementById('donorArea');
  const donorPreferredTimeInput = document.getElementById('donorPreferredTime');

  const donorData = {
    name: donorNameInput ? donorNameInput.value : '',
    phone: donorPhoneInput ? donorPhoneInput.value : '',
    bloodType: donorBloodTypeInput ? donorBloodTypeInput.value : '',
    area: donorAreaInput ? donorAreaInput.value : '',
    preferredTime: donorPreferredTimeInput ? donorPreferredTimeInput.value : ''
  };

  // Validate required fields
  if (!donorData.name || !donorData.phone || !donorData.bloodType || !donorData.area || !donorData.preferredTime) {
    showToast('Please fill in all required fields.', 'error');
    return;
  }

  // Simulate registration
  showToast('Processing registration...', 'info');
  
  setTimeout(() => {
    showToast(`Welcome to LifeSaver, ${donorData.name}! Your registration is complete.`, 'success');
    
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) registrationForm.reset();
    
    setTimeout(() => {
      showSection('home');
    }, 2000);
  }, 1500);
}

// Update statistics
function updateStatistics() {
  const totalDonorsElement = document.getElementById('totalDonors');
  const livesSavedElement = document.getElementById('livesSaved');
  const activeRequestsElement = document.getElementById('activeRequests');

  if (totalDonorsElement) totalDonorsElement.textContent = APP_DATA.donors.length;
  if (livesSavedElement) livesSavedElement.textContent = Math.floor(APP_DATA.donors.reduce((sum, donor) => sum + donor.donationCount, 0) * 2.8);
  if (activeRequestsElement) activeRequestsElement.textContent = Math.floor(Math.random() * 12) + 5;

  // Update top donor (Vikram Singh has highest donation count: 31)
  const topDonor = APP_DATA.donors.find(d => d.name === 'Vikram Singh');
  
  const topDonorAvatar = document.getElementById('topDonorAvatar');
  const topDonorName = document.getElementById('topDonorName');
  const topDonorBloodType = document.getElementById('topDonorBloodType');
  const topDonorCount = document.getElementById('topDonorCount');
  const topDonorLocation = document.getElementById('topDonorLocation');

  if (topDonor) {
    if (topDonorAvatar) topDonorAvatar.textContent = topDonor.avatar;
    if (topDonorName) topDonorName.textContent = topDonor.name;
    if (topDonorBloodType) topDonorBloodType.textContent = topDonor.bloodType;
    if (topDonorCount) topDonorCount.textContent = `${topDonor.donationCount} donations`;
    if (topDonorLocation) topDonorLocation.textContent = topDonor.area + ", New Delhi";
  }
}

// Update donor count
function updateDonorCount() {
  const donorCountElement = document.getElementById('donorCount');
  if (donorCountElement) {
    donorCountElement.textContent = `(${filteredDonors.length})`;
  }
}

// Start quote rotation
function startQuoteRotation() {
  const quoteText = document.getElementById('quoteText');
  if (!quoteText) return;
  
  function rotateQuote() {
    quoteText.textContent = APP_DATA.inspirationalQuotes[quoteIndex];
    quoteIndex = (quoteIndex + 1) % APP_DATA.inspirationalQuotes.length;
  }
  
  // Set initial quote
  rotateQuote();
  
  // Rotate every 5 seconds
  quoteInterval = setInterval(rotateQuote, 5000);
}

// Utility functions
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

function formatStatus(status) {
  const statusMap = {
    'available': 'Available',
    'busy': 'Busy',
    'away': 'Away',
    'emergency-only': 'Emergency Only'
  };
  return statusMap[status] || status;
}

// Toast notifications
function showToast(message, type = 'info') {
  const toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
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

// Make functions globally available
window.handlePhoneClick = handlePhoneClick;
