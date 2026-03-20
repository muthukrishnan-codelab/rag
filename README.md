🌀 RAG-Flow: AI Workflow Orchestrator
-
A high-performance interface for building, managing, and monitoring Retrieval-Augmented Generation (RAG) pipelines. Built with Next.js 14, Tailwind CSS, and Framer Motion.

Core Features
-
-Visual Canvas: A drag-and-drop environment for designing node-based AI workflows. Includes native zoom, pan, and role-based editing permissions.

-RAG Analytics Dashboard: Real-time monitoring of pipeline performance, including Retrieval Hit Rate, Faithfulness (Hallucination tracking), and Context Precision.

-Intelligent Ingestion: Track document processing, chunking status, and vector synchronization directly from the UI.

-Sliding Node Settings: Context-aware configuration panel for fine-tuning LLM parameters (Temperature, Top-K, Max Tokens) without leaving the canvas.

-AuthGuard Security: Role-aware navigation and action masking for Admin and Viewer roles.

🏗️ Technical Architecture
-
i)Fontend: React 18 / Next.js 14 (App Router)
ii)Styling: Tailwind CSS (Modern Dark/Glassmorphism UI)
iii)Motion: Framer Motion for 60fps transitions and sliding panels
iv)Icons: Lucide React
v)State: React Hooks & Context API for canvas node persistence

🛠️ Installation & Setup
Bash
# Clone the repository
git clone https://github.com/your-username/rag-flow.git

# Install dependencies
npm install

# Start development server
npm run dev
