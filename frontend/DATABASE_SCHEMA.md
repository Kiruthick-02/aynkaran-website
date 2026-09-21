# Aynkaran Consultants • Complete Database Schema Documentation ( Public Website)

This document contains the fully functional database schema specifications for the **Aynkaran Consultants Premium Insurance Business Portal**. It outlines every collection and table used to manage our enterprise modules, user states, claims, advisory pipelines, blog system, and desktop database synchronization.

---

### 1. Users
Manages advisor profiles, corporate admins, business managers, and customer portal accounts.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique system identifier |
| `username` | String(50) | | Unique login username |
| `password` | String(255) | | Cryptographically hashed password |
| `roleId` | ObjectId | FK | Reference to `UserRoles._id` |
| `fullName` | String(100) | | Full name of the user |
| `mobile` | String(15) | | Active contact number |
| `email` | String(100) | | Primary communication email address |
| `status` | Boolean | | Account active status (`true` = Active, `false` = Suspended) |
| `createdAt` | Date | | Timestamp of account registration |
| `updatedAt` | Date | | Timestamp of last profile update |

---

### 2. UserRoles
Defines access levels and authorization boundaries across the portal modules (e.g., Administrator, Lead Manager, Registered Advisor).

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique role identifier |
| `roleName` | String(30) | | Distinct name of the role (e.g., ADMIN, ADVISOR, MANAGER) |
| `permissions` | Array[String] | | Array of feature permission flags (e.g., `["write:blog", "approve:claim"]`) |
| `description` | String(255) | | Descriptive label for administrative records |
| `createdAt` | Date | | Timestamp when role record was initialized |

---

### 3. InsuranceProducts
Holds the complete catalog of active policies from partner insurers (Life, Health, Wealth, and Child Plans).

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique product identifier |
| `category` | String(30) | | Product class (e.g., LIFE, HEALTH, CHILD, WEALTH) |
| `title` | String(100) | | Official market name of the policy plan |
| `description` | Text | | Detailed marketing and product copy |
| `features` | Array[String] | | Bulleted array outlining key rules and coverages |
| `benefits` | Array[String] | | List of cash benefits, riders, and fiscal rewards |
| `eligibility` | Array[String] | | Age brackets, monthly income caps, and medical tests needed |
| `docsRequired` | Array[String] | | Core files required for KYC onboarding folder |
| `claimProcess` | Array[String] | | Step-by-step instructions for filing reimbursement claims |
| `partnerId` | ObjectId | FK | Reference to `AssociatedCompanies._id` |
| `isActive` | Boolean | | Catalog visibility flag |

---

### 4. AssociatedCompanies
Catalog of primary public/private state-approved insurance providers associated with Aynkaran Consultants.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique insurer provider ID |
| `name` | String(100) | | Name of the insurance brand (e.g., LIC, HDFC Ergo) |
| `logo` | String(50) | | Text acronym or local SVG graphic path |
| `categories` | Array[String] | | Supported classes of policies |
| `claimRatio` | String(10) | | Standard verified IRDAI claim settlement ratio (e.g., `"99.5%"`) |
| `description` | String(255) | | High-level business synopsis |
| `isActive` | Boolean | | Toggle status for partner relationships |

---

### 5. Enquiries
Logs every policy consultation lead submitted by customers via products, general consult cards, or landing forms.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique enquiry lead record ID |
| `clientName` | String(100) | | Name of the prospective client |
| `mobile` | String(15) | | Active telephone/mobile number |
| `email` | String(100) | | Email address for digital quotation receipts |
| `preferredPolicy` | String(100) | | Targeted insurance category or product name selected |
| `message` | Text | | Custom brief describing current debt/health goals |
| `status` | String(20) | | Lead workflow state (`NEW`, `CONTACTED`, `CONVERTED`, `CLOSED`) |
| `assignedAdvisorId`| ObjectId | FK | Reference to `Users._id` matching on-field advisor |
| `createdAt` | Date | | Timestamp of the form submission |

---

### 6. AdvisorRegistrations
Monitors the talent acquisition pipeline for certified IRDAI field agents applying through the Careers block.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique application ID |
| `fullName` | String(100) | | Applicant's legal name |
| `email` | String(100) | | Applicant's primary email address |
| `mobile` | String(15) | | Direct contact number |
| `city` | String(50) | | Location of career operations |
| `qualification` | String(50) | | Highest education degree completed |
| `priorExperience` | Boolean | | Check for previous insurance sales background |
| `screeningStatus` | String(20) | | Onboarding state (`SUBMITTED`, `SCREENING_PASSED`, `TRAINING`, `LICENSED`) |
| `createdAt` | Date | | Date application was logged |

---

### 7. BlogPosts
Saves informational articles, regulatory IRDAI news briefs, and corporate updates. Includes posts synced directly from desktop clients.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique post ID |
| `title` | String(255) | | Editorial headline of the article |
| `description` | String(255) | | High-level summary of findings |
| `content` | Text | | Rich markdown content structure of the article |
| `coverImage` | String(255) | | Relative URL pointing to standard vector cover |
| `category` | String(30) | | Category tag (e.g., HEALTH, RETIREMENT, LIFE) |
| `author` | String(100) | | Name of author or `"Aynkaran Consultants (Desktop App)"` |
| `tags` | Array[String] | | High-relevance indexed keywords |
| `readTime` | String(20) | | Estimated reader completion speed |
| `publishDate` | String(30) | | Human-friendly publishing date |
| `createdAt` | Date | | Accurate transactional timestamp |

---

### 8. DesktopSyncLogs
Records transaction pipelines pushed live from local administrator environments to our cloud MongoDB cluster databases.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique sync operation ID |
| `desktopClientId` | String(50) | | Hardware ID of the transmitting offline app |
| `operationType` | String(20) | | Event type (`BULK_INSERT`, `UPDATE_POLICY`, `POST_BLOG`) |
| `recordsCount` | Integer | | Number of individual records compiled |
| `status` | String(20) | | Result of execution (`SUCCESS`, `CONFLICT_RESOLVED`, `FAILED`) |
| `logMessage` | String(255) | | Standard database cluster confirmation log string |
| `syncedAt` | Date | | Timestamp of execution |

---

### 9. CallbackRequests
Captures instant phone callback queries requested via the portal's quick assist slide-outs.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique callback record ID |
| `clientName` | String(100) | | Client name |
| `mobile` | String(15) | | Target callback phone number |
| `sourceWidget` | String(50) | | Origin selector of request (e.g., `"Sidebar_Quick_Assist"`) |
| `status` | String(20) | | Status tag (`PENDING`, `DIALED_IN_15_MINS`, `FAILED_NO_ANSWER`) |
| `createdAt` | Date | | Accurate trigger timestamp |

---

### 10. Claims
Tracks active claim file registrations submitted online for cashless processing.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique claim dossier ID |
| `policyNumber` | String(50) | | Reference code of current active insurance folder |
| `insuredName` | String(100) | | Name of policy holder |
| `hospitalName` | String(15) | | Hospital/ICU center admitting patient |
| `admissionDate` | Date | | Date of admission |
| `claimType` | String(30) | | Nature of claim (`CASHLESS_APPROVAL`, `REIMBURSEMENT`) |
| `estimatedAmount` | Decimal(12,2) | | Total bill amount expected for checkout |
| `status` | String(20) | | Claim status (`INITIATED`, `DOCUMENTS_VERIFIED`, `APPROVED`, `DISBURSED`) |
| `createdAt` | Date | | Claim submission date |

---

### 11. ChatLogs
Stores message history logged during patient/client interactions with the automated `AynkaranBot`.

| Field | Data Type | Key | Description |
| :--- | :--- | :---: | :--- |
| `_id` | ObjectId | PK | Unique message log ID |
| `sessionId` | String(50) | | Unique transient browser session identifier |
| `sender` | String(10) | | Actor ID (`USER`, `BOT`) |
| `messageText` | Text | | Content of user request or smart assistant response |
| `matchedKeywords` | Array[String] | | AI classification tags found during search (e.g., `["health", "cashless"]`) |
| `createdAt` | Date | | Log timestamp |
