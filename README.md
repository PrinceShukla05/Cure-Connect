CureConnect – Medical Appointment Booking Website

CureConnect is a medical appointment booking web application designed to simplify healthcare by connecting patients and doctors through a seamless virtual platform. The project streamlines appointment scheduling, remote consultations, and medication access, ensuring efficient and timely healthcare delivery

.
Table of Contents

    Features

    Tech Stack

    Getting Started

    Project Structure

    Usage

    Future Enhancements

    Contributing

    License

Features

    Virtual Appointments: Book and manage secure online appointments with healthcare professionals.

    Doctor Profiles: Browse and filter doctors by specialty and location, and view detailed profiles.

    Admin Approval System: Doctors join only with admin verification to maintain professional integrity.

    Comprehensive Dashboards: Patients and doctors have dedicated dashboards for appointments, medical histories, and notifications.

    Medication Orders: Integrated option for ordering prescription medications online (if enabled).

    Notifications: Automated reminders to reduce no-shows and facilitate communication.

    Role-Based Access: Separate panels and permissions for Admins, Doctors, and Patients.

    Responsive UI: Fully mobile-friendly design for accessibility on all devices.

Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB
Auth	Context API, JWT
Deployment	Vercel (Frontend),
	MongoDB Atlas, Cloudinary (for media)
Getting Started
Prerequisites

    Node.js

    npm or yarn

    MongoDB instance (local or MongoDB Atlas)

    Git

Installation

bash
git clone https://github.com/Omsh24/CureConnect-A-medical-appointment-website.git
cd CureConnect-A-medical-appointment-website
npm install

Set up your .env file in the root directory with:

text
MONGO_URI=your_mongodb_connection_string
PORT=your_preferred_port
JWT_SECRET=your_jwt_secret
CLOUDINARY_URL=your_cloudinary_url (if used)

Running the App

bash
npm start

Access the frontend (deployed version):
https://appointment-application-nu.vercel.app/
Project Structure

text
CureConnect-A-medical-appointment-website/
  ├── client/           # React frontend
  ├── server/           # Node.js/Express backend
  ├── README.md
  ├── .env
  └── package.json

Usage

    Patient Registration:

        Sign up and log in as a patient.

        Browse doctors and book appointments based on specialty, location, and availability.

    Doctor Registration:

        Register and await admin approval.

        Set availability and manage appointments via the dashboard.

    Admin Panel:

        Verify doctor registrations.

        Manage platform users, appointments, and system settings.

    Appointment Management:

        View upcoming and past appointments.

        Receive notifications and reminders for booked appointments.

Future Enhancements

    Payment gateway integration for appointment fees.

    Reviews and rating system for doctors.

    Advanced search and filter capabilities.

    Telemedicine/video call functionality.

    Health record and prescription management

    .

Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes, new features, or improvements.
License

Distributed under the MIT License.
See LICENSE for more information.

This project aims to improve access to healthcare and create a bridge between patients and medical professionals through technology. For questions or support, please open an issue in the repository.
