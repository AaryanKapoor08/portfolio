
%-------------------------
% Resume in LaTeX
% Author : Aaryan Kapoor
% Based on: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\classesList}[4]{
    \item\small{
        {#1 #2 #3 #4 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

% One-line heading: title -- role on the left, date on the right
\newcommand{\resumeExpHeading}[2]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & \textbf{\small #2} \\
    \end{tabular*}\vspace{-5pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{1.0\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%
\begin{document}

%----------HEADING----------
\begin{center}
    {\Huge \scshape Aaryan Kapoor} \\ \vspace{1pt}
    \small \raisebox{-0.1\height}\faPhone\ +1 647 218 2320 ~ 
    \href{mailto:aaryan.kapoor@unb.ca}{\raisebox{-0.2\height}\faEnvelope\  \underline{aaryan.kapoor@unb.ca}} ~ 
    \href{https://linkedin.com/in/aaryan-kapoor-88a007332/}{\raisebox{-0.2\height}\faLinkedin\ \underline{linkedin.com/in/aaryan-kapoor-88a007332}} \\ \vspace{1pt}
    \href{https://github.com/AaryanKapoor08}{\raisebox{-0.2\height}\faGithub\ \underline{github.com/AaryanKapoor08}} ~
    \href{https://aaryan-kapoor-portfolio.vercel.app/}{\underline{portfolio website}}
    \vspace{-8pt}
\end{center}

%-----------SUMMARY-----------
\section{Summary}
Rising third-year Computer Science student building AI developer tools, Chrome extensions, and retrieval-agent systems. Strong across TypeScript, Python, React, LangGraph, RAG, and LLM provider orchestration, with shipped open-source projects and hands-on work turning model behavior into reliable product workflows.

%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Programming}{: Python, JavaScript, TypeScript, Java, C} \\
     \textbf{Frontend \& Backend}{: React.js, Next.js, Node.js, Express.js, HTML, CSS, Tailwind CSS, REST APIs} \\
     \textbf{AI \& Retrieval}{: RAG fundamentals, LangChain, LangGraph, LangSmith, LLM APIs, prompt engineering, provider orchestration, BM25} \\
     \textbf{Databases \& Tools}{: Supabase, PostgreSQL, MongoDB, SQL, SQLite, Git, GitHub Actions, Docker} \\
     \textbf{Testing \& Platforms}{: pytest, Vitest, Vite, Vercel, Chrome Extensions (Manifest V3), Solidity, Hardhat, ethers.js} \\
    }}
 \end{itemize}
 \vspace{-16pt}

%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart

    \resumeExpHeading
      {Hastinapur Metals Pvt. Ltd. -- Freelance Web Developer (Remote)}{2026}
      \resumeItemListStart
        \resumeItem{Built an operations website for the firm's day-to-day work, replacing manual tracking with a structured catalog, enquiry handling, and an admin dashboard.}
      \resumeItemListEnd

    \resumeExpHeading
      {Dual-Use Technology Hackathon, UNB -- Participant}{May 2026}
      \resumeItemListStart
        \resumeItem{Built Fluo in a 48-hour team sprint: a defence procurement workflow using n8n-style automation, vendor risk checks, and a blockchain audit ledger for tamper-evident procurement events.}
      \resumeItemListEnd

    \resumeExpHeading
      {GirlScript Summer of Code -- Open Source Contributor (Remote)}{2026}
      \resumeItemListStart
        \resumeItem{Active contributor in a large open-source mentorship program, resolving issues and landing merged pull requests across community-maintained repositories.}
      \resumeItemListEnd

    \resumeExpHeading
      {Code Social, Winter of Code -- Open Source Contributor (Remote)}{Nov 2025 -- Present}
      \resumeItemListStart
        \resumeItem{Contributing across multiple repositories in a 3-month seasonal program through code reviews, pull requests, and issue triage.}
      \resumeItemListEnd

    \resumeExpHeading
      {Fredericton Ideation Boost Camp 2026 -- Participant}{January 2026}
      \resumeItemListStart
        \resumeItem{Participated in the 48-hour camp to design and pitch Auctus, an AI funding-discovery platform, and ship a working MVP.}
      \resumeItemListEnd

  \resumeSubHeadingListEnd
\vspace{-16pt}

%-----------PROJECTS-----------
\section{Projects}
    \resumeSubHeadingListStart

      \resumeProjectHeading
          {\textbf{PromptGod} $|$ \emph{Manifest V3, TypeScript, Vite} $|$ \href{https://github.com/AaryanKapoor08/promptgod}{\underline{GitHub}} $\cdot$ \href{https://chromewebstore.google.com/detail/promptgod/cohbligncfolnlncmobbelfjiehlpijo}{\underline{test it out}}}{November 2025 -- Present}
          \resumeItemListStart
            \resumeItem{Published a Manifest V3 Chrome extension that rewrites prompts inside ChatGPT, Claude, Gemini, and Perplexity, then inserts the improved prompt back into the chat input automatically.}
            \resumeItem{Built local validation, repair, and retry logic that catches weak rewrites, near-echoes, dropped instructions, and wrapper-style outputs before they reach the page.}
            \resumeItem{Integrated Google Gemini/Gemma, Groq, and OpenRouter with provider fallback, model selection, right-click selected-text rewriting, and per-site adapters for supported AI chat pages.}
          \resumeItemListEnd
          \vspace{-13pt}

      \resumeProjectHeading
          {\textbf{Software Maintenance Agent} $|$ \emph{Python, DSPy, pytest, SQLite, JEPA-style scoring} $|$ \href{https://github.com/AaryanKapoor08/software_maintenance_agent}{\underline{GitHub}}}{April 2026 -- Present}
          \resumeItemListStart
            \resumeItem{Built a local coding agent for small, testable fixes: it accepts a task, reproduces the failure in a sandboxed copy, finds likely files, applies a focused patch, reruns tests, and writes a report.}
            \resumeItem{Uses BM25, hybrid retrieval, and a JEPA-inspired patch-risk scorer to rank likely fix locations, while recording each agent step in SQLite and enforcing secret redaction, command allow-listing, and path-scoped edits.}
          \resumeItemListEnd
          \vspace{-13pt}

      \newpage

      \resumeProjectHeading
          {\textbf{Auctus} $|$ \emph{Next.js 16, React 19, Supabase} $|$ \href{https://auctus-five.vercel.app/}{\underline{Live}} $\cdot$ \href{https://github.com/AaryanKapoor08/auctus}{\underline{GitHub}}}{January 2026 -- Present}
          \resumeItemListStart
            \resumeItem{A Canadian funding-discovery platform serving three roles: businesses pursuing grants, students seeking scholarships and bursaries, and professors sourcing research funding, built on Next.js 16, React 19, and Supabase.}
            \resumeItem{Implemented role-based onboarding, profile-based match scoring, Postgres row-level security, and a TypeScript scraper that ingests official funding sources into a structured funding database.}
          \resumeItemListEnd
          \vspace{-13pt}

      \resumeProjectHeading
          {\textbf{Hermes Graph Context Router} $|$ \emph{Python, CodeGraph, SQLite, MCP}}{May 2026 -- Present}
          \resumeItemListStart
            \resumeItem{Built a graph-guided context router that converts coding tasks into focused agent briefings with relevant files, symbols, callers, callees, impact areas, and test commands.}
            \resumeItem{Integrated CodeGraph-style dependency lookup with SQLite task history to generate Hermes/Codex-ready context packs and reduce repeated repository discovery before code changes.}
          \resumeItemListEnd
          \vspace{-13pt}

      \resumeProjectHeading
          {\textbf{Agentic RAG Pipeline} $|$ \emph{Python, LangGraph, LangChain, LangSmith}}{April 2026 -- Present}
          \resumeItemListStart
            \resumeItem{Built a LangGraph retrieval workflow that plans, retrieves, critiques context quality, re-retrieves when relevance is weak, and traces runs end to end in LangSmith.}
          \resumeItemListEnd
          \vspace{-13pt}

      \resumeProjectHeading
          {\textbf{Multimodal RAG Pipeline} $|$ \emph{Python, LangChain, Embeddings}}{December 2025}
          \resumeItemListStart
            \resumeItem{Built a prototype that indexed text and images with local embeddings, returning grounded answers with citations to the exact source page or figure.}
            \vspace{2pt}
          \resumeItemListEnd
          \vspace{-13pt}

\resumeSubHeadingListEnd
\vspace{-10pt}

%-----------CERTIFICATIONS-----------

\section{Awards \& Certifications}
    \begin{itemize}[leftmargin=0.15in, label={}]
        \small{\item{
            \textbf{RAG Bootcamp -- Udemy (May 2026)}{: Practiced traditional, multimodal, and agentic RAG patterns with LangChain, LangGraph, and LangSmith, covering retrieval design, persistent memory, and multi-step agent workflows.} \\
            \textbf{Oracle GenAI Certified -- Oracle (November 2025)}{: Worked through transformer architecture, RAG systems, and vector embeddings with hands-on OCI Generative AI labs focused on semantic retrieval.} \\
            \textbf{Oracle APEX Cloud Developer Certified Professional -- Oracle (November 2025)}{: Built secure, scalable low-code enterprise applications on Oracle APEX with generative AI features, dynamic reports, and workflow automation.} \\
            \textbf{HackFest Hackathon -- GDG Cloud New Delhi (November 2025)}{: Built full-stack applications with TypeScript, React, WebRTC, and real-time communication under competition time limits.} \\
        }}
    \end{itemize}
 \vspace{-16pt}

%-----------VOLUNTEER EXPERIENCE-----------
\section{Volunteer Experience}
    \begin{itemize}[leftmargin=0.15in, label={}]
        \small{\item{
            \textbf{Atlantic AI Summit 2026 -- Volunteer (June 2026, Fredericton, NB)}{: Helped run Atlantic Canada's flagship applied-AI gathering hosted by UNB's RIDSAI, supporting on-site logistics across keynotes, panels, and workshops over the three-day event.} \\
        }}
    \end{itemize}
 \vspace{-16pt}

%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
  \resumeSubheading
  {University of New Brunswick}{September 2024 -- April 2028}
  {Bachelor of Science in Computer Science (Rising 3rd Year)}{Fredericton, NB}
      \resumeItemListStart
        \resumeItem{Relevant Coursework: Java, C, SQL, Calculus I \& II, Statistics, Data Analysis, Machine Language}
      \resumeItemListEnd

    \resumeSubheading
      {Jaspal Kaur Public School}{April 2023 -- March 2024}
      {High School Diploma -- Physics, Chemistry \& Mathematics}{India}
      \resumeItemListStart
        \resumeItem{Grade: 84\%}
        \resumeItem{Developed Python games using Pygame \& Turtle including Snake Game and Tic-Tac-Toe with AI logic, gaining early experience in game mechanics and algorithm implementation.}
      \resumeItemListEnd
  \resumeSubHeadingListEnd

\end{document}
