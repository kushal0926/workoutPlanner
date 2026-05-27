import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col p-10">
      <Link href="/" className="flex items-center justify-center gap-1">
        <Image
          src="/pulseplan.png"
          width={45}
          height={45}
          alt="logo"
          className="bg-transparent"
        />
        <span className="sm:text5xl text-4xl font-bold">workoutPlanner</span>
      </Link>
    </nav>
  );
}
