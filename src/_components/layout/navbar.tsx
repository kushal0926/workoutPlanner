import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex flex-col p-10">
      <div className="flex items-center justify-center gap-1">
        <Image
          src="/pulseplan.png"
          width={45}
          height={45}
          alt="logo"
          className="bg-transparent"
        />
        <span className="text-5xl font-bold">workoutPlanner</span>
      </div>
    </nav>
  );
}
