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

#### **Release Branches (`release/*`)**
- Created for final testing before merging into `main`.
- Example: `feature/roozain-database-progress`


```mermaid
graph TD;
    Main[main] -->|Merge| Develop[develop];
    Develop -->|Branch| FeatureFixRequest[feature/fix-request-layout];
    Develop -->|Branch| FeatureUI[feature/ui-updates];
    Develop -->|Branch| FeatureUIFix[feature/minor-ui-changes];
    Develop -->|Branch| FeatureAlgorithm[feature/matching-algorithm];
    Develop -->|Branch| FeatureInterested[feature/interested-button-update];
    Develop -->|Branch| FeatureNotifications[feature/notifications-revamp];
    Develop -->|Branch| FeatureProfile[feature/amnah-ui-progress];
    Develop -->|Branch| FeatureLogin[feature/create-user-api];
    Develop -->|Branch| FeatureBackend[feature/database-population];
    Develop -->|Branch| FeatureSwapRequests[feature/roozain-ui-progress];
    
    FeatureFixRequest -->|Merge| Develop;
    FeatureUI -->|Merge| Develop;
    FeatureUIFix -->|Merge| Develop;
    FeatureAlgorithm -->|Merge| Develop;
    FeatureInterested -->|Merge| Develop;
    FeatureNotifications -->|Merge| Develop;
    FeatureProfile -->|Merge| Develop;
    FeatureLogin -->|Merge| Develop;
    FeatureBackend -->|Merge| Develop;
    FeatureSwapRequests -->|Merge| Develop;
    
    Develop -->|Branch| feature/roozain-database-progress;
    Release -->|Merge| Main;
