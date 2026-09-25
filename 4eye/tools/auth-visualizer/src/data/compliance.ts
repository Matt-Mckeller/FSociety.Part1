// Compliance and consent diagrams

export const complianceOverview = {
  title: 'Compliance Requirements Overview',
  description: 'Regulations affecting authentication',
  chart: `mindmap
    root((Compliance))
      GDPR
        EU Users
        Explicit Consent
        Data Export
        Right to Delete
        Re-consent on Changes
      CCPA
        California Users
        Opt-Out Rights
        Data Access
        12-Month Validity
      COPPA
        Under 13 Users
        Parental Consent
        School Exception
        Data Minimization
        No Behavioral Ads`,
};

export const consentDecisionTree = {
  title: 'Consent Decision Tree',
  description: 'Which consent flow to use',
  chart: `flowchart TD
    Start([User Signup]) --> AgeCheck{Age Verified?}
    
    AgeCheck -->|No| AgeGate[Show Age Gate]
    AgeGate --> AgeEnter[User enters DOB]
    AgeEnter --> AgeResult{Age Result}
    
    AgeCheck -->|Yes| AgeResult
    
    AgeResult -->|18+| Adult[Adult Consent]
    AgeResult -->|13-17| Teen[Teen Consent]
    AgeResult -->|Under 13| Child{Auth Method?}
    
    Adult --> Standard[Standard ToS + PP]
    Teen --> Standard
    
    Child -->|EdLink/School| SchoolAgent[School = COPPA Agent]
    Child -->|Direct| Parental[Parental Consent Required]
    
    SchoolAgent --> NoExtra[No Extra Consent Needed]
    Parental --> ParentEmail[Collect Parent Email]
    ParentEmail --> SendVerify[Send Verification]
    SendVerify --> ParentApproves{Parent Approves?}
    
    ParentApproves -->|Yes| ChildAccount[Create Child Account]
    ParentApproves -->|No/Timeout| Rejected[Account Not Created]
    
    Standard --> AccountCreated[Account Created]
    NoExtra --> AccountCreated
    ChildAccount --> AccountCreated

    style Start fill:#e3f2fd,stroke:#1976d2
    style AccountCreated fill:#e8f5e9,stroke:#4caf50
    style Rejected fill:#ffebee,stroke:#f44336`,
};

export const consentTracking = {
  title: 'Consent Tracking Flow',
  description: 'How consents are logged and validated',
  chart: `sequenceDiagram
    participant User
    participant App
    participant ConsentProvider
    participant Backend
    participant ConsentDB

    Note over User,ConsentDB: On Login

    User->>App: Login successful
    App->>ConsentProvider: Check consent status
    ConsentProvider->>Backend: Query user consents
    Backend->>ConsentDB: Get consent logs
    ConsentDB-->>Backend: [ConsentLog, ...]
    Backend-->>ConsentProvider: { hasAll: false, missing: [ToS] }
    ConsentProvider->>App: Missing consent!
    App->>User: Show ConsentDialog

    Note over User,ConsentDB: User Accepts

    User->>App: Check ToS checkbox, click Accept
    App->>ConsentProvider: acceptConsent(ToS, v2026-03)
    ConsentProvider->>Backend: logConsent mutation
    
    Note over Backend: Log: userId, type, version,<br/>IP, userAgent, timestamp
    
    Backend->>ConsentDB: Insert ConsentLog
    ConsentDB-->>Backend: Saved
    Backend-->>ConsentProvider: ConsentLog
    ConsentProvider->>App: Consent complete
    App-->>User: Continue to dashboard`,
};

export const coppaVerification = {
  title: 'COPPA Parental Verification Methods',
  description: 'FTC-approved verification methods',
  chart: `flowchart TB
    subgraph Methods["FTC-Approved Verification Methods"]
        Email["Email Verification<br/><i>Email + delayed access</i>"]
        CreditCard["Credit Card<br/><i>Small charge + refund</i>"]
        Phone["Phone Verification<br/><i>Call or SMS</i>"]
        ID["Government ID<br/><i>Upload + review</i>"]
        VideoCall["Video Call<br/><i>Face-to-face verification</i>"]
    end

    subgraph Levels["Verification Levels"]
        Low["Low Risk Activities<br/><i>Email verification</i>"]
        Medium["Medium Risk<br/><i>Email + phone</i>"]
        High["High Risk / PII<br/><i>Credit card or ID</i>"]
    end

    Email --> Low
    Email --> Medium
    Phone --> Medium
    CreditCard --> High
    ID --> High
    VideoCall --> High

    style Methods fill:#e3f2fd,stroke:#1976d2
    style Levels fill:#f3e5f5,stroke:#9c27b0`,
};

export const dataRetention = {
  title: 'Data Retention Policy',
  description: 'How long different data is kept',
  chart: `flowchart LR
    subgraph Forever["Indefinite (Legal Requirement)"]
        Consent["Consent Logs"]
        Legal["Legal Agreements"]
    end

    subgraph Long["Long-term (Years)"]
        UserData["User Accounts"]
        BillingHist["Billing History"]
    end

    subgraph Medium["Medium (90 days)"]
        SessionLogs["Session Logs"]
        TokenLogs["Token Logs"]
    end

    subgraph Short["Short (30 days)"]
        FailedLogins["Failed Logins"]
        AnalyticsRaw["Raw Analytics"]
    end

    subgraph Immediate["Immediate (On Request)"]
        DeleteReq["Deletion Requests"]
        OptOut["Marketing Opt-outs"]
    end

    style Forever fill:#e8eaf6,stroke:#3f51b5
    style Long fill:#e8f5e9,stroke:#4caf50
    style Medium fill:#fff3e0,stroke:#ff9800
    style Short fill:#ffebee,stroke:#f44336
    style Immediate fill:#f3e5f5,stroke:#9c27b0`,
};

export const schoolConsentFlow = {
  title: 'School-as-Agent COPPA Flow',
  description: 'How schools provide COPPA consent',
  chart: `sequenceDiagram
    participant Admin as School Admin
    participant Portal as 4eye Admin Portal
    participant Backend
    participant Student
    participant EdLink

    Note over Admin,EdLink: School Setup (One-time)

    Admin->>Portal: Access school settings
    Portal->>Admin: COPPA agreement form
    Admin->>Portal: Sign COPPA agreement
    Portal->>Backend: Store school COPPA status
    Backend-->>Portal: School certified

    Note over Admin,EdLink: Student Access

    Student->>EdLink: Sign in via school
    EdLink->>Backend: Auth callback + school ID
    Backend->>Backend: Check school COPPA status
    
    alt School has COPPA agreement
        Backend->>Backend: Create student account
        Backend-->>Student: Logged in (no extra consent)
    else No school agreement
        Backend-->>Student: Redirect to parent consent
    end`,
};

export const allComplianceDiagrams = [
  complianceOverview,
  consentDecisionTree,
  consentTracking,
  coppaVerification,
  dataRetention,
  schoolConsentFlow,
];
