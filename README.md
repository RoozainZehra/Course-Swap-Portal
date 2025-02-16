# Course-Swap-Portal

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
