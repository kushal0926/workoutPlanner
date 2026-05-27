import { Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 ">
      <div className="font-bold text-xl flex justify-center">
        <Copyright className="w-5 h-5" />
        <span>2026 workoutPlanner</span>
      </div>
    </footer>
  );
}
