document.addEventListener('DOMContentLoaded', function() {
  // Initialize a user requests array to store the user's submitted requests
  let userRequests = [];
  
  // Function to navigate between screens
  function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
      screen.style.display = 'none';
      screen.classList.remove('active');
    });
    
    // Show the selected screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.style.display = 'block';
      // Small timeout to ensure display:block is applied before adding the active class for transition
      setTimeout(() => targetScreen.classList.add('active'), 10);
    }
  }
  
  // Function to create a swap card based on form data
  function createSwapCard(haveCourseName, wantCourseName, haveDays, wantDays, haveTime, wantTime) {
    // Create the main card element
    const swapCard = document.createElement('div');
    swapCard.className = 'swap-card';
    
    // Create card content
    swapCard.innerHTML = `
      <div class="swap-card-header">
        <div class="course-code">${haveCourseName}</div>
        <div class="course-name">Available for swap</div>
      </div>
      <div class="swap-card-body">
        <div class="info-group">
          <div class="info-label">Current Schedule</div>
          <div class="info-value">${haveTime}</div>
          <div class="schedule-info">
            ${haveDays.map(day => `<span class="day-tag">${day}</span>`).join('')}
          </div>
        </div>
        <div class="info-group">
          <div class="info-label">Wanted Schedule</div>
          <div class="info-value">${wantTime}</div>
          <div class="schedule-info">
            ${wantDays.map(day => `<span class="day-tag">${day}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="swap-card-footer">
        <div class="posted-by">Posted by: Ali Ahmed</div>
        <button class="contact-btn">Interested</button>
      </div>
    `;
    
    return swapCard;
  }
  
  // Function to get selected days from the days selection
  function getSelectedDays(daysContainer) {
    const selectedDays = [];
    const dayButtons = daysContainer.querySelectorAll('.day-btn.active');
    dayButtons.forEach(button => {
      selectedDays.push(button.textContent);
    });
    return selectedDays.length > 0 ? selectedDays : ['None'];
  }
  
  // Function to save a request to the user's requests
  function saveUserRequest(haveCourseName, wantCourseName, haveDays, wantDays, haveTime, wantTime) {
    const requestId = Date.now(); // Generate a unique ID using timestamp
    
    const requestData = {
      id: requestId,
      haveCourseName,
      wantCourseName,
      haveDays,
      wantDays,
      haveTime,
      wantTime,
      status: 'Active', // Default status
      datePosted: new Date().toLocaleDateString()
    };
    
    userRequests.push(requestData);
    updateRequestCount();
    return requestData;
  }
  
  // Function to create a request card for the My Requests screen
  function createMyRequestCard(requestData) {
    const { id, haveCourseName, wantCourseName, haveDays, wantDays, haveTime, wantTime, status } = requestData;
    
    // Create the main card element
    const requestCard = document.createElement('div');
    requestCard.className = 'swap-card';
    requestCard.dataset.requestId = id;
    
    // Create card content
    requestCard.innerHTML = `
      <div class="request-status">${status}</div>
      <button class="delete-request-btn" data-id="${id}">✕</button>
      <div class="swap-card-header">
        <div class="course-code">${haveCourseName}</div>
        <div class="course-name">Available for swap</div>
      </div>
      <div class="swap-card-body">
        <div class="info-group">
          <div class="info-label">Current Schedule</div>
          <div class="info-value">${haveTime}</div>
          <div class="schedule-info">
            ${haveDays.map(day => `<span class="day-tag">${day}</span>`).join('')}
          </div>
        </div>
        <div class="info-group">
          <div class="info-label">Wanted Schedule</div>
          <div class="info-value">${wantTime}</div>
          <div class="schedule-info">
            ${wantDays.map(day => `<span class="day-tag">${day}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="swap-card-footer">
        <div class="posted-by">Posted: ${requestData.datePosted}</div>
        <div class="responses-count">0 responses</div>
      </div>
    `;
    
    // Add delete button event listener
    requestCard.querySelector('.delete-request-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      const requestId = this.getAttribute('data-id');
      
      if (confirm('Are you sure you want to delete this request?')) {
        deleteUserRequest(requestId);
      }
    });
    
    return requestCard;
  }
  
  // Function to update the My Requests screen
  function updateMyRequestsScreen() {
    const container = document.querySelector('.my-requests-container');
    const emptyState = document.getElementById('my-requests-empty-state');
    
    if (!container) return;
    
    // Clear the container but keep the empty state
    Array.from(container.children).forEach(child => {
      if (child.id !== 'my-requests-empty-state') {
        container.removeChild(child);
      }
    });
    
    // Show or hide the empty state message
    if (userRequests.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      
      // Add all user requests to the container
      userRequests.forEach(request => {
        container.appendChild(createMyRequestCard(request));
      });
    }
  }
  
  // Function to delete a user request
  function deleteUserRequest(requestId) {
    // Find the card element
    const card = document.querySelector(`.swap-card[data-request-id="${requestId}"]`);
    if (card) {
      // Add the deleting animation class
      card.classList.add('deleting');
      
      // Wait for animation to complete before removing
      setTimeout(() => {
        // Remove from the array
        userRequests = userRequests.filter(request => request.id.toString() !== requestId.toString());
        
        // Update the screen after the request is removed
        updateMyRequestsScreen();
        updateRequestCount();
        
        // If no requests left, show the empty state
        if (userRequests.length === 0) {
          const emptyState = document.getElementById('my-requests-empty-state');
          if (emptyState) emptyState.style.display = 'block';
        }
      }, 300); // Match this to the animation duration
    }
  }
  
  // Function to update the request count in profile
  function updateRequestCount() {
    const requestCountElement = document.querySelector('.profile-details .detail-item:nth-child(4) p');
    if (requestCountElement) {
      requestCountElement.textContent = userRequests.length;
    }
  }
  
  // Set initial screen
  showScreen('signup-screen');
  
  // SIGNUP FORM
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;

      document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
      let isValid = true;

      if (!fullName) document.getElementById('fullNameError').style.display = 'block', isValid = false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) document.getElementById('emailError').style.display = 'block', isValid = false;
      if (password.length < 8) document.getElementById('passwordError').style.display = 'block', isValid = false;
      if (password !== confirmPassword) document.getElementById('confirmPasswordError').style.display = 'block', isValid = false;

      if (isValid) {
        alert('Account created successfully!');
        this.reset();
        showScreen('course-swap-screen');
      }
    });
  }

  // NAVIGATION - Course swap related
  // Profile button in the course swap screen
  const profileBtn = document.querySelector('.profile-btn');
  if (profileBtn) {
    profileBtn.addEventListener('click', function() {
      showScreen('profile-screen');
    });
  }
  
  // Requests button in the profile screen
  const goToMyRequestsBtn = document.querySelector('.requests-btn');
  if (goToMyRequestsBtn) {
    goToMyRequestsBtn.addEventListener('click', function() {
      showScreen('my-requests-screen');
      updateMyRequestsScreen();
    });
  }
  
  // Add request buttons
  const addRequestBtns = document.querySelectorAll('.add-request-btn');
  addRequestBtns.forEach(button => {
    button.addEventListener('click', function() {
      showScreen('course-schedule-screen');
    });
  });
  
  // Home buttons to return to course swap screen
  const homeBtns = document.querySelectorAll('.home-btn');
  homeBtns.forEach(button => {
    button.addEventListener('click', function() {
      showScreen('course-swap-screen');
    });
  });

  // My Requests screen: Home button
  const myRequestsHomeBtn = document.getElementById('myRequestsHomeBtn');
  if (myRequestsHomeBtn) {
    myRequestsHomeBtn.addEventListener('click', function() {
      showScreen('course-swap-screen');
    });
  }
  
  // My Requests screen: Profile button
  const goToProfileFromRequests = document.getElementById('goToProfileFromRequests');
  if (goToProfileFromRequests) {
    goToProfileFromRequests.addEventListener('click', function() {
      showScreen('profile-screen');
    });
  }

  // NAVIGATION - Other screens
  // Go to sign in link
  document.getElementById('goToSignin')?.addEventListener('click', () => showScreen('course-swap-screen'));
  
  // Profile button in other screens
  document.getElementById('profileBtn')?.addEventListener('click', () => showScreen('profile-screen'));
  
  // Go to swap dashboard link
  document.getElementById('goToSwapDashboard')?.addEventListener('click', () => showScreen('course-swap-screen'));
  
  // Go to course schedule link
  document.getElementById('goToCourseSchedule')?.addEventListener('click', () => showScreen('course-schedule-screen'));
  
  // Go to signup/logout link
  document.getElementById('goToSignup')?.addEventListener('click', () => {
    if (confirm('Log out?')) {
      showScreen('signup-screen');
    }
  });

  // REQUEST FORM MODAL
  document.getElementById('openFormBtn')?.addEventListener('click', () => {
    const requestModal = document.getElementById('requestModal');
    if (requestModal) {
      requestModal.classList.remove('hidden');
    }
  });
  
  document.getElementById('closeFormBtn')?.addEventListener('click', () => {
    const requestModal = document.getElementById('requestModal');
    if (requestModal) {
      requestModal.classList.add('hidden');
    }
  });

  // SUBMIT REQUEST
  document.getElementById('requestForm')?.addEventListener('submit', function(event) {
    event.preventDefault();

    const fromCourse = document.getElementById('fromCourse').value;
    const toCourse = document.getElementById('toCourse').value;
    const details = document.getElementById('details').value;

    const requestsList = document.getElementById('requestsList');
    if (requestsList) {
      let requestCard = document.createElement('div');
      requestCard.className = 'bg-white p-4 shadow-md rounded-lg border-l-4 border-purple-500';
      requestCard.innerHTML = `<h3>${fromCourse} → ${toCourse}</h3><p>${details}</p>`;
      requestsList.appendChild(requestCard);
    }

    this.reset();
    
    const requestModal = document.getElementById('requestModal');
    if (requestModal) {
      requestModal.classList.add('hidden');
    }
    
    alert('Request submitted!');
  });

  // Add event listeners to the day buttons to toggle active state
  const dayButtons = document.querySelectorAll('.day-btn');
  dayButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });
  
  // Post button in course form
  const postBtn = document.querySelector('.post-btn');
  if (postBtn) {
    postBtn.addEventListener('click', function() {
      // Get form data
      const courseSections = document.querySelectorAll('.course-section');
      
      // First section is "have" course
      const haveSection = courseSections[0];
      const haveCourseName = haveSection.querySelector('input[placeholder="Course name"]').value || 'Unnamed Course';
      const haveDaysContainer = haveSection.querySelector('.days-selection');
      const haveDays = getSelectedDays(haveDaysContainer);
      const haveTime = haveSection.querySelector('input[placeholder="Time"]').value || 'Not specified';
      
      // Second section is "want" course
      const wantSection = courseSections[1];
      const wantCourseName = wantSection.querySelector('input[placeholder="Course name"]').value || 'Any Course';
      const wantDaysContainer = wantSection.querySelector('.days-selection');
      const wantDays = getSelectedDays(wantDaysContainer);
      const wantTime = wantSection.querySelector('input[placeholder="Time"]').value || 'Not specified';
      
      // Create a new swap card for the main dashboard
      const swapCard = createSwapCard(haveCourseName, wantCourseName, haveDays, wantDays, haveTime, wantTime);
      
      // Add the swap card to the container
      const swapRequestsContainer = document.querySelector('.swap-requests-container');
      
      // Check if there's an empty state message and remove it if exists
      const emptyState = swapRequestsContainer.querySelector('.empty-state');
      if (emptyState) {
        swapRequestsContainer.removeChild(emptyState);
      }
      
      // Add the new card
      swapRequestsContainer.appendChild(swapCard);
      
      // Also save to user's requests
      saveUserRequest(haveCourseName, wantCourseName, haveDays, wantDays, haveTime, wantTime);
      
      // Show success message and navigate back
      alert('Course swap request posted!');
      showScreen('course-swap-screen');
      
      // Reset the form
      const courseNameInputs = document.querySelectorAll('input[placeholder="Course name"]');
      const timeInputs = document.querySelectorAll('input[placeholder="Time"]');
      
      courseNameInputs.forEach(input => {
        input.value = '';
      });
      
      timeInputs.forEach(input => {
        input.value = '';
      });
      
      // Reset day selections
      document.querySelectorAll('.day-btn.active').forEach(button => {
        button.classList.remove('active');
      });
    });
  }
  
  // Add an empty state to the swap requests container if it's empty
  const swapRequestsContainer = document.querySelector('.swap-requests-container');
  if (swapRequestsContainer && swapRequestsContainer.children.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
      <div class="empty-state-icon">📅</div>
      <div class="empty-state-text">No swap requests available</div>
      <div>Use the "Add Request" button to create a new swap request</div>
    `;
    swapRequestsContainer.appendChild(emptyState);
  }
});