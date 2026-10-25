📌 Overview
ReconEye is an AI-powered weapon detection and surveillance project developed to reduce the need for constant manual camera monitoring. The system brings together an object-detection service, a browser-based monitoring interface, and a backend for managing users, cameras, detection records, and alerts.

The project targets the detection of potentially dangerous objects, such as guns and knives, in camera imagery. When a detection is generated, the surrounding application is designed to make that information available to security operators for review and response.

This repository is a research and development prototype, not a certified security or emergency-response system. AI-generated detections can be incorrect; human verification remains essential.
✨ Key Features
- AI-assisted weapon detection using a Python service built with Ultralytics and FastAPI.
- Browser-based live monitoring with webcam capture, frame submission, and displayed detection results.
- Adjustable frame sampling with 1, 2, 4, and 8 FPS choices in the streaming interface.
- User and admin dashboards for navigating monitoring, alerts, and management screens.
- Detection history and acknowledgement for reviewing recorded events.
- Camera management APIs for creating, viewing, updating, and deleting configured cameras.
- Suspicious activity reporting through backend reporting endpoints.
- Email notification integration through Brevo's transactional email SDK in the detection-recording route.
- Account and authentication flows built into the Node.js/Express application.
Implementation note: The list above describes features and integrations found in the repository. It does not imply that every subsystem has been deployed or end-to-end tested in a production environment.

