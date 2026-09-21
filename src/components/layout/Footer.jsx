import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

import Container from "../ui/Container";
import ScrollLink from "../ui/ScrollLink";
import Button from "../ui/Button";

import logo from "../../assets/logos/logo.png";

const columns = [
  {
    title: "Club",
    links: [
      { name: "Programs", to: "programs" },
      { name: "Dashboard", to: "dashboard" },
      { name: "Schedule", to: "schedule" },
      { name: "Coaches", to: "coaches" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Recovery Lab", to: "recovery" },
      { name: "Membership", to: "membership" },
      { name: "FAQ", to: "faq" },
    ],
  },
];

const socials = [
  { icon: FaInstagram, label: "Instagram" },
  { icon: FaXTwitter, label: "X (Twitter)" },
  { icon: FaYoutube, label: "YouTube" },
];

function Footer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = () => {
    reset();
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0B0B0D] pt-24">
      <div className="absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-blue-500/5 blur-[150px]" />

      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          {/* Brand */}

          <div>
            <img src={logo} alt="IronPulse" className="h-10 w-auto object-contain" />

            <p className="mt-6 max-w-xs text-sm leading-6 text-zinc-400">
              A premium performance club for athletes, professionals and
              anyone committed to training smarter and recovering faster.
            </p>

            <div className="mt-8 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#hero"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    text-zinc-400
                    transition-all
                    duration-300
                    hover:border-blue-500/30
                    hover:bg-blue-500/10
                    hover:text-blue-400
                  "
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                {col.title}
              </h4>

              <div className="mt-6 flex flex-col gap-4">
                {col.links.map((link) => (
                  link.to === "dashboard" ? (
                    <Link
                      key={link.name}
                      to="/dashboard"
                      className="w-fit text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <ScrollLink
                      key={link.name}
                      to={link.to}
                      className="w-fit text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
                    >
                      {link.name}
                    </ScrollLink>
                  )
                ))}
              </div>
            </div>
          ))}

          {/* Newsletter */}

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Stay In The Loop
            </h4>

            <p className="mt-6 text-sm leading-6 text-zinc-400">
              Training tips, schedule updates and member offers — no spam.
            </p>

            {isSubmitSuccessful ? (
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-300">
                <Check size={16} />
                You're on the list.
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-5" noValidate>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    })}
                    className="
                      w-full
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      px-5
                      py-3
                      text-sm
                      text-white
                      placeholder:text-zinc-600
                      outline-none
                      transition-colors
                      duration-300
                      focus:border-blue-500/50
                    "
                  />

                  <Button size="sm" className="shrink-0 !px-4">
                    <ArrowRight size={16} />
                  </Button>
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-400">
                    Enter a valid email address.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 py-8 text-xs text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} IronPulse Performance Club. All rights reserved.</p>

          <div className="flex gap-6">
            <span className="cursor-default hover:text-zinc-400">Privacy Policy</span>
            <span className="cursor-default hover:text-zinc-400">Terms of Service</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
