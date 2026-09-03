import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="kicker">Off course</p>
      <h1 className="display mt-3 text-4xl text-asphalt">That page is not on the map.</h1>
      <Link href="/" className="btn mt-8">
        Home
      </Link>
    </div>
  );
}
