import Navbar from "@/_components/layout/navbar";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <Navbar />
      <div>
        <h1 className="text-9xl">404</h1>
        <p className="text-5xl">
          <mark>Uh oh,</mark> the page you’re looking for <br /> can’t be{" "}
          <mark>found.</mark>
        </p>
      </div>
      <div className="mt-10">
        <Link
          href="/"
          className="border p-5 hover:bg-foreground hover:text-background font-bold"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
