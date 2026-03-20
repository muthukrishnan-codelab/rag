🌀 RAG-Flow: Professional Workflow Orchestrator
RAG-Flow is a modern, high-performance web application designed for building and managing Retrieval-Augmented Generation (RAG) pipelines. It features a drag-and-drop canvas, real-time node configuration, and a comprehensive intelligence dashboard.

🚀 Key Features
Interactive Workflow Canvas: A custom-built, zoomable node-based editor for orchestrating AI logic.

Intelligence Dashboard: Monitor pipeline faithfulness, retrieval hit rates, and document ingestion status in real-time.

Adaptive UI: Modern "Glassmorphism" aesthetic with collapsible sidebars and sliding settings panels.

RAG Optimization: Specialized metrics for monitoring context precision, recall, and LLM hallucination rates.

Role-Based Access: Integrated AuthGuard with specific permissions for Admins and Viewers.

🛠️ Tech Stack
Frontend: React 18, Next.js 14 (App Router)

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

State Management: React Hooks (useState, useEffect, useRef)

📂 Project Structure
Bash
├── app/
│   ├── dashboard/          # RAG Analytics & Metrics
│   ├── workflow-builder/   # Core Canvas & Node logic
│   └── layout.tsx          # Global providers & AuthGuard
├── components/
│   ├── layout/             # Sidebar, Navbar, NodeSettings
│   └── ui/                 # Reusable interface components
└── public/                 # Static assets & icons

🚦 Getting Started
Clone the repository:

Bash
git clone https://github.com/your-username/rag-flow.git
Install dependencies:

Bash
npm install
Run the development server:

Bash
npm run dev
Open the app:
Navigate to http://localhost:3000 to see the dashboard.
