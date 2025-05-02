# Course-Swap-Portal

## About the Project
A web-based portal that allows university students to request and manage course swaps efficiently.

---

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Firebase Firestore (NoSQL Database)
- **Version Control**: Git + GitHub
- **Others**: Axios, React Router, etc.

---

## Getting Started

### Clone the Repository

-git clone https://github.com/RoozainZehra/Course-Swap-Portal.git
-cd HU-CourseSwap

---

### Install Dependencies

-npm install

---

### Setup Firebase

1. Go to Firebase Console and create a project.
2. In Project Settings, add a new web app.
3. Copy the Firebase config and paste it into your project.

---

### Run the Project

-npm start or npm run dev

---

##  Git Flow Strategy

### **Main Branches**
- **`main`**: Stable production-ready branch.

### **Supporting Branches**
#### **Feature Branches (`feature/*`)**
Used for developing new functionalities:
- `feature/fix-request-layout`
- `feature/ui-updates`
- `feature/minor-ui-changes`
- `feature/matching-algorithm`
- `feature/interested-button-update`
- `feature/notifications-revamp`
- `feature/amnah-ui-progress`
- `feature/create-user-api`
- `feature/database-population`
- `feature/roozain-ui-progress`


```mermaid
graph TD;
    Main -->|Branch| FeatureFixRequest[feature/fix-request-layout];
    Main -->|Branch| FeatureUI[feature/ui-updates];
    Main -->|Branch| FeatureUIFix[feature/minor-ui-changes];
    Main -->|Branch| FeatureAlgorithm[feature/matching-algorithm];
    Main -->|Branch| FeatureInterested[feature/interested-button-update];
    Main -->|Branch| FeatureNotifications[feature/notifications-revamp];
    Main -->|Branch| FeatureProfile[feature/amnah-ui-progress];
    Main -->|Branch| FeatureLogin[feature/create-user-api];
    Main -->|Branch| FeatureBackend[feature/database-population];
    Main -->|Branch| FeatureSwapRequests[feature/roozain-ui-progress];
    
    FeatureFixRequest -->|Merge| Main;
    FeatureUI -->|Merge| Main;
    FeatureUIFix -->|Merge| Main;
    FeatureAlgorithm -->|Merge| Main;
    FeatureInterested -->|Merge| Main;
    FeatureNotifications -->|Merge| Main;
    FeatureProfile -->|Merge| Main;
    FeatureLogin -->|Merge| Main;
    FeatureBackend -->|Merge| Main;
    FeatureSwapRequests -->|Merge| Main;

