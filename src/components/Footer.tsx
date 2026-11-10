import { profile } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  return (
    <footer className="no-print border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-5 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
