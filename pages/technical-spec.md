---
title: HDCRS V2 – Technical Specification & Architecture
---

# 🖥️ HDCRS V2 – Technical Specification & Architecture

*Open‑Source, Gate‑Compliant Supervision Management Platform*

---

```{tab-set}
```{tab-item} 📌 Purpose
### 1. Purpose & Scope

HDCRS V2 replaces the original single‑purpose reporting tool with a full‑cycle supervision management platform that **enforces the Halbeeg Supervision Operational Manual v2.0**. It digitises every gate and SOP, provides role‑based interfaces, and generates the mandatory client daily progress report only after internal approvals.

All components are built with **free, open‑source tools** requiring no server costs.
```

```{tab-item} 🏗️ Architecture
### 2. System Architecture Overview

```
                 ┌─────────────────────────────────────┐
                 │        RESIDENT ENGINEERS (RE)       │
                 │   (Phone/Laptop – Google Account)    │
                 └───────────────┬─────────────────────┘
                                 │
          Daily Report (SOP03)   │   Inspections, Issues,
          Inspection form (SOP04)│   IPC measurements,
          Issue log (SOP05)      │   Variation register
                                 ▼
           ┌──────────────────────────────────────────────┐
           │        GOOGLE FORMS / WEB APP (RE Portal)    │
           │  Structured submission w/ all mandatory fields│
           └────────────────────┬─────────────────────────┘
                                │ (auto‑save)
                                ▼
           ┌──────────────────────────────────────────────┐
           │          GOOGLE SHEETS (Backend Database)    │
           │   ┌──────────┐ ┌───────────┐ ┌────────────┐ │
           │   │DailyLog  │ │IssueReg   │ │Inspection  │ │
           │   │Workforce │ │Variation  │ │IPC         │ │
           │   │EquipLog  │ │Material   │ │KPI_Data    │ │
           │   └──────────┘ └───────────┘ └────────────┘ │
           └────────────────────┬─────────────────────────┘
                                │
          ┌─────────────────────▼─────────────────────────┐
          │        GOOGLE APPS SCRIPT (Workflow Engine)   │
          │  - Approval routing (Director/Head)           │
          │  - Gate checks & escalation                   │
          │  - PDF generation (Client + internal forms)   │
          │  - KPI computation & alerting                 │
          │  - Drive folder auto‑archiving                │
          └──┬──────────────────────────────┬────────────┘
             │ (APIs: JSON)                 │ (email/Drive)
             ▼                              ▼
   ┌──────────────────────┐    ┌─────────────────────────┐
   │ GITHUB PAGES         │    │ GOOGLE DRIVE            │
   │ (PM/Director/Head)   │    │ (Archived PDFs, photos) │
   │ halbeeg.github.io    │    │ Structured project      │
   │ - Dashboards         │    │ folders                 │
   │ - Approval panels    │    └─────────────────────────┘
   │ - KPI views          │
   └──────────────────────┘
```

**Key principle:** All state lives in Google Sheets (master data + logs). Apps Script acts as the serverless backend. Frontend dashboards fetch data via Apps Script web APIs.
```

```{tab-item} ⚙️ Tech Stack
### 3. Technology Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Data storage | Google Sheets (multiple) | Free, collaborative, no database server needed |
| RE submission | Google Forms + optional custom web app | Collects all mandatory fields; file uploads |
| Backend logic | Google Apps Script (JavaScript) | Full access to Sheets, Drive, Gmail; triggers |
| PDF generation | Apps Script + HTML template | Produces exact client report format |
| Dashboards | GitHub Pages (static HTML/CSS/JS) | Accesses Apps Script REST API; free hosting |
| Authentication | Google Account (OAuth2) | Users must be logged into authorised Halbeeg Google account |
| File archiving | Google Drive (folders per project) | Automatic 24‑hour upload rule satisfied |
| Email | Gmail (MailApp) | Approval requests, escalation alerts, client report sending |
| Version control | GitHub public repository | Full source code, templates, documentation (MIT license) |
```

```{tab-item} 🗄️ Data Model
### 4. Data Model & Sheet Architecture

All data is stored in a single Google Sheet workbook with the following tabs.

#### 4.1 Master Data Sheets

| Tab Name | Description | Key Columns |
|----------|-------------|-------------|
| `MasterSchedule` | All project tasks | `Site`, `ID`, `Task Name`, `Unit`, `Planned QTY`, … |
| `BOQ` | Bill of Quantities | `Item Code`, `Description`, `Unit`, `Contract QTY`, `Rate` |
| `ManpowerSchedule` | Planned workforce | `Site`, `Trade`, `Planned Count` |
| `PlantLog` | Planned equipment | `Site`, `Equipment ID`, `Type`, `Planned QTY` |
| `ProjectMeta` | Project metadata | `Site`, `Client`, `Contractor`, `RE Name`, `Contract Type` |
| `LaborTypes` | Master list of labor types | `Labor Type` |
| `StaffAccounts` | Authorised user emails and roles | `Email`, `Role` (RE/Director/Head/PM/Finance) |

#### 4.2 Transactional Log Sheets (appended on submission)

| Tab Name | Key Columns (aligned with manual) |
|----------|-----------------------------------|
| `DailyLog` | `Report ID`, `Site`, `Report Date`, `Weather`, `Contractor Activity`, `Approval Status`, … |
| `DailyWorkforce` | `Report ID`, `Labor Type`, `Planned`, `Available`, `Comments` |
| `DailyMaterials` | `Report ID`, `Material ID`, `Unit`, `Quantity Delivered`, `Quantity On Site` |
| `DailyEquipment` | `Report ID`, `Equipment ID`, `Type`, `Quantity`, `Working Condition` |
| `DailyPhotos` | `Report ID`, `Photo URL` (Drive link), `Caption` |
| `InspectionLog` | `Inspection ID`, `Request Date`, `Inspection Date`, `Work Element`, `Decision`, … |
| `IssueLog` | `Issue No`, `Severity`, `Description`, `Deadline`, `Status`, … |
| `IPCLog` | `IPC ID`, `Contract Type`, `Previous IPC Ref`, `Prepared By`, `Director Verified`, `Head Approved` |
| `IPCItems` | `IPC ID`, `BOQ Ref`, `This Period QTY`, `Cumulative Total`, `Rate` |
| `VariationLog` | `VI Number`, `Type`, `Cost Impact`, `Client Approval Date`, … |
| `CorrespondenceLog` | `ID`, `Type`, `From`, `To`, `Note` |
| `SafetyLog` | `ID`, `Safety Issue`, `Note` |
| `StakeholderLog` | `ID`, `Stakeholder`, `Contribution` |
| `TestsLog` | `ID`, `Test Type`, `Description` |
| `ReportLog` | `Timestamp`, `PDF File ID`, `Sent to Client?` |
| `KPILog` | `Month`, `KPI Name`, `Value`, `Target`, `Status` |
| `ExceptionRegister` | `Exception Ref`, `Reason`, `Expiry Date`, … |

#### 4.3 Configuration

| Tab Name | Purpose |
|----------|---------|
| `Config` | System settings (emails, KPI thresholds, client email) |
```

```{tab-item} 🖥️ Backend
### 5. Backend: Google Apps Script Modules

```
/backend (Google Apps Script)
 ├── Code.gs (main trigger handlers)
 ├── Workflows.gs (approval routing, gate checks)
 ├── PDFGenerator.gs (all PDF creation)
 ├── KPIService.gs (KPI computation & alerts)
 ├── DriveService.gs (folder management, archiving)
 ├── MailService.gs (notification & client sending)
 ├── API.gs (doGet/doPost for GitHub Pages)
 └── Config.gs (constants)
```

#### 5.1 Core Functions

- `onFormSubmit(e)` – RE submission: validates contract, saves data, notifies Director, calculates daily completion %.
- `approveDailyReport()` – Director sign‑off; moves report to approved pool.
- `generateClientPDF(date)` – PM triggered; merges **only approved** reports into client PDF.
- `sendToClient(date)` – Emails PDF to client.
- `processInspection()` – SOP 04; blocks IPC items if inspection not approved.
- `manageIssueEscalation()` – Hourly scan; alerts Director/Head for overdue issues.
- `submitIPC()` – Supervisor; cross‑checks BOQ, rejects over‑certification.
- `verifyIPC()` – Director second‑verification.
- `approveIPC()` – Head final lock; generates IPC PDF, sends to Finance.
- `kpiNightlyJob()` – Computes all KPIs, populates `KPILog`, sends breach alerts.
```

```{tab-item} 📱 Frontend
### 6. Frontend Interfaces

**6.1 RE Submission Portal**  
Google Form (or custom web app) with all SOP‑03 fields, photo upload, electronic signature.

**6.2 Director Dashboard**  
GitHub Pages app: pending reports, one‑click approve/reject, inspection queue, issue management, IPC second‑verification.

**6.3 Head of Supervision Dashboard**  
Higher privileges: approve monthly reports/IPCs, manage Exception Register, full KPI overview, audit trail.

**6.4 Project Manager Dashboard**  
Date picker, list of sites with submission status, “Generate Client Report” button (from approved data only), “Send to Client” button, history log.
```

```{tab-item} 🔁 Workflows
### 7. Workflows & Gate Enforcement

| Gate | Enforcement in HDCRS V2 |
|------|--------------------------|
| G0.1–G0.4 | Blocks daily report unless contract signed + advance payment confirmed; exception register for 7‑day window |
| G1 | Director must enter “Project Start Approval” before RE can submit |
| G2 | Digital mobilisation checklist completed before daily submissions |
| G3 | SOP 03 form with mandatory fields; rejection if incomplete |
| G4 | IPC line items blocked if no approved inspection for that element |
| G5 | Critical open issues block IPC certification for related items |
| G6 | IPC stages: Prepared → Verified → Approved; Head cannot sign without Director |
| G7 | Client PDF generation disabled unless all daily reports are Director‑approved |
| G8 | Close‑Out prevented until Finance Confirmation flag set |
| G9 | Every submission auto‑saves to Drive; `ArchiveChecklist` tracked |

All gate bypasses logged in `AuditTrail`.
```

```{tab-item} 🔒 Security
### 8. Security & Access Control

- **Authentication:** Google account required; only emails listed in `StaffAccounts`.
- **Apps Script API:** Validates OAuth token or API key.
- **Sheet permissions:** Master sheets shared only with Director/Head; REs never access sheets directly.
- **Drive permissions:** Project folders shared with Director/Head (edit) and RE (view).
- **Open‑source safety:** Secrets kept in `config.gs`, excluded from public repo via `.gitignore`.
```

```{tab-item} 📊 KPI & Audit
### 9. KPI Engine & Audit Trail

**9.1 Real‑time KPI Calculation** (nightly `kpiNightlyJob()`)

- **Report Submission Rate** – from `DailyLog`
- **Inspection Compliance** – from `InspectionLog` (≤24h response)
- **IPC Accuracy** – from `IPCLog` rejection count
- **Issue Closure Rate** – from `IssueLog` deadline adherence
- **Document Upload Timeliness** – always 100%; checks for ≥3 photos
- **Gate Compliance** – zero bypasses in `AuditSheet`

Results stored in `KPILog`, displayed as colour‑coded charts in Head’s dashboard.

**9.2 Audit Trail**  
Every data‑modifying action writes a line: `[Timestamp], [User], [Action], [Detail], [Result]`.
```

```{tab-item} 🚀 Deployment
### 10. Deployment & Configuration

**Step‑by‑step Setup**
1. Clone the repo `halbeeg-hdcrs-v2`
2. Copy the master Google Sheet template
3. Import Master Schedule, BOQ, metadata
4. Copy Apps Script code from `/backend`
5. Set triggers: `onFormSubmit`, `kpiNightlyJob`, `manageIssueEscalation`
6. Deploy web app (API)
7. Create Google Forms (or deploy custom form)
8. Update `Config.gs` with emails and thresholds
9. Configure GitHub Pages with custom domain
10. Pilot test, then add all REs

**Quotas & Limits** – Free tier sufficient for 20+ sites.
```

```{tab-item} 📂 Repository
### 11. Open‑Source Repository Structure

```
halbeeg-hdcrs-v2/
├── README.md
├── LICENSE (MIT)
├── docs/
│   ├── architecture.md
│   ├── user-guide-re.md
│   ├── user-guide-director.md
│   └── setup-guide.md
├── backend/
│   ├── Code.gs
│   ├── Workflows.gs
│   ├── PDFGenerator.gs
│   ├── KPIService.gs
│   ├── DriveService.gs
│   ├── MailService.gs
│   ├── API.gs
│   └── Config.gs.sample
├── templates/
│   ├── master-sheets-template.xlsx
│   ├── re-submission-form.json
│   └── client-pdf-template.html
├── frontend/
│   ├── pm-dashboard/
│   ├── director-dashboard/
│   └── head-dashboard/
└── assets/
    └── logo.png
```
```

```{tab-item} ✅ Compliance
### 12. Compliance Matrix – Manual Alignment

| Manual Requirement | HDCRS V2 Feature |
|--------------------|------------------|
| SOP 03 Daily Report 12 fields + photos | Structured form with all fields, photo upload, electronic signature |
| Director approval (G7) | Automatic notification; approval with timestamp |
| Hold Point Inspection (SOP 04) | Dedicated inspection module, blocks IPC if not passed |
| Issue severity & escalation (SOP 05) | Issue register with deadline alerts, auto‑escalation |
| IPC two‑step verification (SOP 06) | Workflow: Prepared → Verified → Approved |
| Variation management (SOP 11) | Variation log with client approval; integrates into IPC |
| Client daily report from validated data | Compiled only from Approved reports; PM send button |
| Archiving & no personal storage (SOP 10) | Data instantly in Drive; structured folders |
| KPI tracking & performance evaluation | Real‑time dashboard, breach alerts, monthly KPI report |
| Contract Exception Register | Head‑only form, 7‑day expiry, reminder |
```
```