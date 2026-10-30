# LifeBridge Smart Organ Transplant System

## Team ID

SOA-26-27-S6-T03

## Team Members

| S.No | Name | University ID |
|---|---|---|
| 1 | G. Rithwik Sai | 2420030415 |
| 2 | A. Nikitha | 2420030505 |
| 3 | V. Sraavya | 2420030584 |

## Supervisor

Venkateswari Ketineni

## Abstract

LifeBridge Smart Organ Transplant System is a service-oriented healthcare platform designed to manage and coordinate organ donation and transplantation activities. It supports donor registration, recipient management, organ availability tracking, compatibility assessment, matching, allocation and notifications.

The system aims to organize transplant-related activities through a centralized platform. It follows a modular service-oriented approach, where different application components handle specific responsibilities. The proposed architecture focuses on secure access, efficient communication between services and organized management of transplant information.

## Objectives

- Manage donor and recipient information.
- Maintain organ availability records.
- Support compatibility assessment and matching.
- Improve organ allocation and coordination.
- Provide secure access to authorized users.
- Provide timely notifications.
- Organize transplant-related information in one platform.

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- TypeScript
- REST APIs

### Data Management
- JSON
- Excel

### Development Tools
- Visual Studio Code
- Git
- GitHub

## Proposed System Architecture

The proposed system follows a Service-Oriented Architecture (SOA) with independently organized modules for:

- User Authentication
- Donor Management
- Recipient Management
- Organ Management
- Compatibility Matching
- Organ Allocation
- Notification Management

The planned architecture may include JWT authentication, role-based authorization, MySQL, Eureka Service Discovery and Spring Cloud Gateway as development progresses, depending on the final backend implementation.

## Main Modules

1. Operations Dashboard
2. Donor Management
3. Recipient Management
4. Organ Inventory
5. Compatibility Matching Queue
6. Organ Allocation
7. Notifications
8. Access Management

## Project Workflow

Donor Registration → Organ Management → Compatibility Assessment → Recipient Matching → Organ Allocation → Notifications

## Repository Structure

```text
KLH-CSE-2026-27-S6-T03-LifeBridge/
│
├── src/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── data/
│   │   │   ├── lib/
│   │   │   ├── routes/
│   │   │   ├── app.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   │
│   ├── frontend/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── lib/
│   │   │   ├── pages/
│   │   │   ├── App.tsx
│   │   │   ├── index.css
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── README.md
│   │
│   └── README.md
│
├── data/
│   ├── lifebridge-fixture-dataset.json
│   ├── lifebridge-fixture-dataset.xlsx
│   └── README.md
│
├── docs/
│   └── README.md
│
├── results/
│   ├── Operations Dashboard.jpeg
│   ├── Compatibility Matching Queue.jpeg
│   ├── Organ Inventory.jpeg
│   ├── Recipient Registry.jpeg
│   └── README.md
│
├── reports/
│   └── README.md
│
└── README.md
```

## Expected Outcomes

- Organized donor and recipient records.
- Better tracking of available organs.
- Structured compatibility assessment.
- Improved organ matching and allocation workflow.
- Better coordination through notifications.
- A modular and maintainable application structure.

## Future Enhancements

- AI-assisted compatibility matching.
- Mobile application support.
- Real-time notifications.
- Hospital management system integration.
- Advanced analytics and reporting.

## Project Status

The project repository contains the frontend and backend source code, sample datasets and application interface screenshots. Further development, integration and testing are part of the ongoing project work.

## Team

SOA-26-27-S6-T03

K L Deemed to be University
