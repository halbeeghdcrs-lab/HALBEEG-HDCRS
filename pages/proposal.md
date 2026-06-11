---
title: HDCRS V2 Proposal
---

# 📋 Proposal for HDCRS V2

*Centralised, Gate‑Compliant Supervision Management – Aligned with the Supervision Operational Manual v2.0*

---

```{tab-set}
```{tab-item} 📋 Summary
### Executive Summary

Currently, every Resident Engineer (RE) sends raw site data to the Project Manager in Jigjiga, who manually compiles the daily progress report for the client. This process:

- 🔹 **Steals 2–3 hours daily** from the Project Manager.  
- 🔹 Is **error‑prone and often delayed**.  
- 🔹 **Does not enforce** the new mandatory approvals and gates required by our Supervision Operational Manual v2.0.

**HDCRS V2** is a zero‑cost, web‑based system that automates the entire daily supervision workflow. It collects structured data from REs, guides it through Director approvals, generates client reports automatically, and tracks key performance indicators – all while enforcing every rule of the manual.
```

```{tab-item} ⚠️ Problem
### The Problem Today

| Pain Point | Impact |
|------------|--------|
| Manual report compilation by PM | 2–3 hours/day lost; delays in client submission |
| No standard daily report format | WhatsApp messages, missing fields, photos without captions |
| No approval step | Reports go directly from RE to client – no Director/Head review |
| Inspections & issues on paper/memory | Risk of work without signed inspection, poor traceability |
| Error‑prone IPC preparation | Over‑certification risk; missing previous IPC references |
| KPI tracking impossible | Supervisors’ performance cannot be objectively measured |
| Data on personal phones | No central archive; audit is nearly impossible |

*Our new Supervision Operational Manual v2.0 requires structured data, approval hierarchies, and gate controls. Without a digital system, meeting those standards manually is unsustainable.*
```

```{tab-item} 💡 Solution
### What is HDCRS V2?

A simple, web‑based platform with three components, all running on **free, open‑source tools** (Google Sheets, Apps Script, GitHub Pages).

**📱 For Resident Engineers**  
Structured daily form (phone or laptop) capturing all SOP‑03 mandatory fields: work progress, labour, equipment, materials, photos, issues, and more. **Replaces WhatsApp and paper.**

**✅ For Directors & Head**  
Web dashboard showing pending reports, inspections, and issues. One‑click approve/reject, verify IPCs, monitor real‑time KPIs.

**📄 For the Project Manager**  
Auto‑compiles the client daily report **only from approved data**. One click to generate PDF, one click to email to client.

All information is stored instantly in secure Google Drive folders per project – **nothing lives on personal phones**.
```

```{tab-item} ✨ Features
### Key Features at a Glance

- **📋 Standardised Daily Reports** – 12‑field form with mandatory photos. No more incomplete WhatsApp messages.
- **👁️ Director Approval (Gate G7)** – Reports remain “Pending” until Director reviews and signs.
- **🔍 Hold‑Point Inspection** – Inspection requests logged; IPC items blocked if work not approved.
- **🚨 Issue Escalation** – Minor/Major/Critical classification with automatic alerts.
- **💰 Two‑Step IPC Verification** – Prepared → Director Verified → Head Approved. BOQ cross‑check prevents over‑certification.
- **📝 Variation Management** – Extra work logged, priced, tracked until client approval.
- **📬 One‑Click Client Report** – PM selects date, generates PDF, sends to client.
- **🗄️ Auto Archiving** – All data instantly saved in Drive; 24‑hour upload rule automatically satisfied.
- **📊 Live KPI Dashboard** – Report submission rate, inspection compliance, issue closure.
- **⏳ Exception Register** – Head‑only 7‑day exception for starting before contract.
```

```{tab-item} 🔗 Alignment
### Perfect Alignment with Our Operational Manual

| Manual Requirement | How HDCRS V2 Enforces It |
|--------------------|---------------------------|
| No work without signed contract | Blocks daily report submission unless contract verified |
| SOP‑03 daily report format | RE form contains exactly the 12 mandatory fields |
| Director approval (Gate G7) | Reports “Pending” until Director signs |
| Hold‑point inspection (SOP‑04) | Dedicated inspection form; IPC items blocked if not approved |
| Issue escalation timelines (SOP‑05) | Severity‑based alerts to Director/Head |
| IPC two‑step sign‑off (SOP‑06) | Three‑stage workflow: Prepared → Verified → Approved |
| Variation approval before execution (SOP‑11) | Variation log; status “Pending Client Approval” blocks execution |
| Financial close‑out (Gate G8) | Prevents archiving until Finance confirmation received |
| Archiving & no personal phones (SOP‑10) | All data instantly saved to Drive |
| KPI measurement (Section 6) | Real‑time dashboards; monthly KPI reports for performance review |
```

```{tab-item} 🌟 Benefits
### Benefits to Halbeeg

**🏢 Management** – Full visibility of every site with live performance metrics. Reduced financial risk. Auditable records.

**🧑‍💼 Project Manager** – Frees up 2–3 hours daily. Client reports always accurate and on time.

**👨‍🔧 Directors / Head** – Clear approval queues. Automatic critical alerts. KPI data feeds staff evaluations.

**👷 Resident Engineers** – Phone‑friendly form guides them through all required information. Objective performance measurement.

**🤝 The Client** – Receives standardised, validated daily reports – building trust and demonstrating Halbeeg’s quality commitment.
```

```{tab-item} 💵 Cost
### Cost: Absolutely Free

**$0 total**

Built entirely on **free Google services** (Sheets, Forms, Apps Script, Drive) and **free hosting** (GitHub Pages). No licence fees, no server costs, no vendor lock‑in.

The only resource needed is **staff time for setup and pilot** (about 2‑3 days configuration, plus a few hours training).
```

```{tab-item} 🚀 Plan
### Implementation Plan (Phased Rollout)

- **🔧 Phase 1 – Setup (Week 1)** – Install Google sheet templates, configure forms, dashboards. Import Master Schedule and BOQ.
- **🧪 Phase 2 – Pilot (Weeks 2‑3)** – 3 REs use the system in parallel. Director and PM test approvals and reporting.
- **📚 Phase 3 – Training (Week 3)** – Short video call + one‑page guide for all REs, Directors, Head.
- **🌐 Phase 4 – Full Rollout (Week 4)** – All 20+ sites go live. Manual process discontinued.
- **📈 Phase 5 – Optimisation (Months 2‑3)** – Monitor KPIs, refine dashboards, integrate with Finance for IPC and close‑out confirmations.
```
```

---

## 4. Create the Technical Specification page (`pages/technical-spec.md`)

Again, use tab sets for the 12 sections. This is long but complete. I’ll give you the full file.

````markdown
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