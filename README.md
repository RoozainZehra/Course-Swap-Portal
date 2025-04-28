# Course-Swap-Portal
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

