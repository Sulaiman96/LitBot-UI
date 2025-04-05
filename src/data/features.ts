import { BookOpen, Search, FileText, Sparkles, Users, HelpCircle, TrendingUp, Layers, ScrollText } from "lucide-react";

export const features = [
  {
    id: "summarisation",
    icon: FileText,
    title: "AI Summarisation",
    short: "Quickly generate clear, concise summaries of complex academic papers.",
    full: "LitBot uses advanced NLP models to generate concise and accurate summaries of academic papers. This allows researchers to scan through large volumes of literature in a fraction of the time, extracting key findings, methodologies, and contributions without reading each paper in full.",
  },
  {
    id: "semantic-search",
    icon: Search,
    title: "Semantic Search",
    short: "Find relevant papers based on meaning, not just keywords.",
    full: "LitBot allows users to search academic content using semantic understanding — not just basic keyword matching. This helps surface more relevant research even when terminology varies, improving discovery and saving researchers from sifting through irrelevant results.",
  },
  {
    id: "cross-paper-comparison",
    icon: Layers,
    title: "Cross-Paper Comparison",
    short: "Compare multiple papers to identify trends and common findings.",
    full: "With LitBot, users can view multiple papers side-by-side, compare methodologies, findings, and contributions. This helps identify patterns and gaps across studies, enabling meta-analysis and comparative literature reviews.",
  },
  {
    id: "question-answering",
    icon: HelpCircle,
    title: "Question Answering",
    short: "Ask direct questions about paper content and get accurate answers.",
    full: "LitBot enables users to ask questions like \"What method did they use?\" or \"What were the main findings?\" and receive direct answers extracted from the paper’s content. This reduces time spent scanning documents manually.",
  },
  {
    id: "topic-extraction",
    icon: Sparkles,
    title: "Topic Extraction",
    short: "Automatically identify core topics and keywords within a paper.",
    full: "LitBot scans documents to extract themes, subjects, and keywords. This is ideal for generating tags, organising papers, or quickly understanding a document’s focus areas at a glance.",
  },
  {
    id: "smart-citations",
    icon: ScrollText,
    title: "Smart Citations",
    short: "Generate and manage citations in your preferred style.",
    full: "LitBot automates citation formatting in styles like APA, MLA, and Chicago. It keeps track of cited material, enables bibliography exports, and reduces the manual burden of citation management for researchers.",
  },
  {
    id: "collaborative-tools",
    icon: Users,
    title: "Collaboration Tools",
    short: "Share notes, highlights, and insights with collaborators.",
    full: "LitBot enables team-based research by allowing users to annotate papers, share reading lists, comment on findings, and collaboratively organise insights — ideal for research teams or group projects.",
  },
  {
    id: "personalised-suggestions",
    icon: TrendingUp,
    title: "Personalised Paper Suggestions",
    short: "Receive tailored paper recommendations based on your research.",
    full: "Using your research interests, past searches, and paper interactions, LitBot suggests new academic papers relevant to your evolving focus. This helps researchers stay up-to-date without the overwhelm.",
  },
  {
    id: "research-dashboard",
    icon: BookOpen,
    title: "Research Dashboard",
    short: "Centralised view of saved, summarised, and annotated papers.",
    full: "LitBot provides a streamlined dashboard where users can see their reading history, saved papers, summaries, citations, and open questions. It serves as a personalised knowledge base for ongoing research.",
  },
];
