# 📝 AI Test Case Generator

An AI-powered web application that generates **test cases** with detailed **expected results** based on user actions and screenshots (before & after).  
Built using **Node.js, Express, Google Gemini API, and a responsive frontend**.

---

## 🚀 Features
- 📋 Input any **action** you performed in your application.  
- 🖼️ Upload / Drag & Drop / Paste screenshots (before & after action).  
- ⚡ Automatically generate **detailed test cases** using **Google Gemini AI**.  
- ✅ Output in **CSV-friendly format** (action + expected result).  
- 🔄 Dedicated **copy buttons** for quick transfer of Action and Expected Result.  
- 🎨 Responsive & clean UI with preview and remove option for images.

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express, Multer  
- **AI**: Google Gemini API (`gemini-pro` / `gemini-1.5-pro`)  
- **Other**: CORS, dotenv, node-fetch  

---

## 📂 Project Structure
```
testcase_generator/
│── index.html         # Frontend (UI)
│── server.js          # Backend server
│── package.json       # Node.js dependencies
│── .env               # Environment variables (ignored in Git)
│── .env.example       # Example env file (to share)
│── /node_modules      # Dependencies
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/yashasan/testcase_generator.git
cd testcase_generator
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

(We provide `.env.example` as a reference ✅)

### 4. Run the backend server
```bash
node server.js
```
The server will start at `http://localhost:3000`.

### 5. Open the frontend
- Option 1: Just open `index.html` in your browser.  
- Option 2 (recommended): Run a simple server:
  ```bash
  npx http-server .
  ```
  Then go to `http://localhost:8080/index.html`.

---

## 📊 Example Output
```
Action: Hover on login button
Expected Result: The login button will be highlighted with a color change and tooltip will be displayed.
```

You can copy **Action** and **Expected Result** separately into your CSV file.

---

## 📸 Screenshots
(Add screenshots of your app UI here)

---

## 📜 License
This project is licensed under the **MIT License** – feel free to use and modify.

---

## 👨‍💻 Author
Built with ❤️ by **Yashas A N**
