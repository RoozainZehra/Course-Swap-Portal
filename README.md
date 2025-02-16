# Course-Swap-Portal
# Course-Swap-Portal

##  Git Flow Strategy

### **Main Branches**
- **`main`**: Stable production-ready branch.
- **`develop`**: Integration branch where new features are merged.

### **Supporting Branches**
#### **Feature Branches (`feature/*`)**
Used for developing new functionalities:
- `feature/login`
- `feature/submit_request`
- `feature/search_request`
- `feature/delete_request`
- `feature/select_course`

#### **Release Branches (`release/*`)**
- Created for final testing before merging into `main`.
- Example: `release/v1.0`

#### **Hotfix Branches (`hotfix/*`)**
- Used for urgent fixes on `main` without affecting ongoing development.
- Example: `hotfix/urgent_fix`

```mermaid
graph TD;
    Main[main] -->|Merge| Develop[develop];
    Develop -->|Branch| FeatureLogin[feature/login];
    Develop -->|Branch| FeatureProfile[feature/profile];
    Develop -->|Branch| FeatureSubmitRequest[feature/submit_request];
    Develop -->|Branch| FeatureSearchRequest[feature/search_request];
    Develop -->|Branch| FeatureDeleteRequest[feature/delete_request];
    Develop -->|Branch| FeatureSelectCourse[feature/select_course];
    
    FeatureLogin -->|Merge| Develop;
    FeatureProfile -->|Merge| Develop;
    FeatureSubmitRequest -->|Merge| Develop;
    FeatureSearchRequest -->|Merge| Develop;
    FeatureDeleteRequest -->|Merge| Develop;
    FeatureSelectCourse -->|Merge| Develop;
    
    Develop -->|Branch| Release[release/v1.0];
    Release -->|Merge| Main;
    
    Main -->|Branch| Hotfix[hotfix/urgent_fix];
    Hotfix -->|Merge| Main;
    Hotfix -->|Merge| Develop;
