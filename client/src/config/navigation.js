import {
  FaHome,
  FaBriefcase,
  FaUser,
  FaTasks,
  FaFileAlt,
  FaComments,
  FaCode
} from "react-icons/fa";

/**
 * Add new app pages here — Sidebar picks this up automatically.
 */
export const NAV_ITEMS = [
  { name: "Dashboard", path: "/dashboard", icon: FaHome },
  { name: "Applications", path: "/applications", icon: FaBriefcase },
  { name: "Daily Tasks", path: "/daily-tasks", icon: FaTasks },
  { name: "Profile", path: "/profile", icon: FaUser },
  { name: "Resumes", path: "/resumes", icon: FaFileAlt },
  { name: "DSA Sheet", path: "/dsa-sheet", icon: FaCode },
  { name: "Mock Interviews", path: "/mock-interviews", icon: FaComments },
];
