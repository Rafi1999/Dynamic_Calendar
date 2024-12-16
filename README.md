# Calendar App

A modern and intuitive calendar application for managing daily events. This app allows users to view, add, edit, and delete events while maintaining a clean and responsive user interface. The application includes advanced features like preventing overlapping events, filtering events, and exporting event lists.

---

## **Features**

### **1. Calendar View**
- Displays a calendar grid for the current month, with all days properly aligned.
- Navigate between months using "Previous" and "Next" buttons.
- Highlights the current day and the selected day for better visibility.

### **2. Event Management**
- Add events by clicking on a specific day.
- Edit or delete events from the selected day.
- Event details include:
  - Event name
  - Start time and end time
  - Optional description
- Prevent overlapping events (e.g., two events at the same time).

### **3. Event List**
- Display all events for the selected day in a modal or side panel.
- Filter events by keyword for easier navigation.

### **4. Data Persistence**
- Uses **localStorage** to persist event data between page refreshes.

### **5. UI Features**
- Clean and modern design using **shadcn** components.
- Clear separation of weekends and weekdays in the grid.

### **6. Bonus Features**
- Color-coded events based on categories (e.g., Work, Personal, Others).
- Export event lists for a specific month as **JSON** or **CSV** files.

---

## **Getting Started**

Follow these instructions to set up and run the app locally.

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/Rafi1999/Dynamic_Calendar.git
   ```
2. Navigate to the project directory:
   ```bash
   cd calendar-app
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### **Running the App Locally**

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## **Deployed Application**

You can access the live version of the application here:
[Deployed Calendar App](https://ucalendar.netlify.app/)

---

Thank you for using the Calendar App!

