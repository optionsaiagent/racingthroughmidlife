import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Jay and Michelle Miller",
  description: "Honolulu age-groupers. Marathons, Olympic triathlons, 70.3, full Ironman. Not a clinic.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-6xl px-5 py-16">
      <p className="kicker">Honolulu</p>
      <h1 className="display mt-3 max-w-3xl text-4xl text-asphalt sm:text-6xl">Jay and Michelle Miller</h1>
      <p className="mt-6 max-w-2xl text-lg text-mist">
        We are a couple who live in Honolulu and race as age-groupers. The channel is the camera. This site is the
        written log.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <figure>
          <div className="relative aspect-[3/4] overflow-hidden bg-ocean">
            <Image src="/images/jay.jpg" alt="Jay Miller" fill className="object-cover object-[center_20%]" sizes="50vw" />
          </div>
          <figcaption className="mt-3 text-sm text-mist">Jay</figcaption>
        </figure>
        <figure>
          <div className="relative aspect-[3/4] overflow-hidden bg-ocean">
            <Image src="/images/michelle.jpg" alt="Michelle Miller" fill className="object-cover object-[center_28%]" sizes="50vw" />
          </div>
          <figcaption className="mt-3 text-sm text-mist">Michelle</figcaption>
        </figure>
      </div>

      <div className="prose-about mx-auto mt-14 max-w-3xl text-lg leading-relaxed">
        <p>
          In 2014 we did the Honolulu Triathlon and the Tin Man. We were not really training. We had not caught the
          bug. Years later Michelle watched the 2021 Honolulu Marathon and said they should go do it for Jay’s 50th. He
          had never wanted a marathon. The longest run in the house was the Great Aloha Run.
        </p>
        <p className="mt-5">
          They trained anyway. First half marathon: Hibiscus, 2022. Hibiscus 2023: Michelle ran 2:12, a PR, while Jay
          sat on an easy pace so she could stay there. Same season: Honolulu Triathlon meant as a real race, then Honu
          70.3 on the Big Island — Jay’s first half iron, lava and heat included. Olympic, marathon, 70.3, and now the
          full distance.
        </p>
        <p className="mt-5">
          We write do’s and don’ts from that pile: heat, couples training, shoes we actually raced in, food that
          survived a brick. We are not coaches and we are not a clinic. We do not know your labs. We know what this
          island does to a long run, and what a household looks like when two people share a calendar and not a wattage
          target.
        </p>
        <p className="mt-5">
          The weekly videos live on{" "}
          <a className="text-sunrise underline underline-offset-4" href={site.youtube}>
            YouTube
          </a>
          . If a number on a race page is missing, it is because we will not invent a gun time. Send the official
          result and we will put it on the page.
        </p>
        <p className="mt-8 text-mist">
          — Jay and Michelle
          <br />
          Honolulu
        </p>
      </div>
    </article>
  );
}
