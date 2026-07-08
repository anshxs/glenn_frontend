"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

export default function GraphicDesignerEditorCareerPage() {
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [experienceMonths, setExperienceMonths] = useState("");
  const [description, setDescription] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setApplicationId("");

    if (!applicantName.trim() || !applicantPhone.trim()) {
      setMessage("Name and phone number are required.");
      return;
    }

    if (!experienceMonths.trim()) {
      setMessage("Experience in months is required.");
      return;
    }

    if (!description.trim()) {
      setMessage("Description is required.");
      return;
    }

    if (!pageUrl.trim()) {
      setMessage("Page URL is required.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleSlug: "graphic-designer-editor",
          applicantName,
          applicantPhone,
          experienceMonths: Number(experienceMonths),
          description,
          pageUrl,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        applicationId?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Application failed.");
      }

      setMessage("Application submitted successfully.");
      setApplicationId(result.applicationId ?? "");
      setApplicantName("");
      setApplicantPhone("");
      setExperienceMonths("");
      setDescription("");
      setPageUrl("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Application failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden text-black">
      <LandingHeader activeHref="/careers" />

      <section className="relative flex-1 px-3 py-3 sm:px-4 lg:min-h-[calc(100vh-5rem)] lg:px-5">
        {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top_left,_rgba(200,255,0,0.12),_transparent_42%),radial-gradient(circle_at_top_right,_rgba(235,108,47,0.08),_transparent_34%)]" /> */}
        <div className="relative border bg-[#f8f5ed] ">
          <div className="grid lg:min-h-[calc(100vh-5rem-1.5rem)] lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="relative overflow-hidden border-b bg-[#f5f1e7] p-4 lg:border-b-0 lg:border-r lg:p-6 xl:p-7">
              <div className="absolute inset-0 bg-red-500" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-black/45">
                    Glenn Careers
                  </p>
                  <h1
                    className="mt-2 text-3xl uppercase leading-[0.94] tracking-[-0.04em] text-black sm:text-4xl xl:text-5xl"
                    style={{ fontFamily: '"Anton", sans-serif' }}
                  >
                    Graphic Designer
                    <br />
                    + Editor
                  </h1>
                  <p className="mt-3 inline-flex bg-[#000000] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#ff0707]">
                    Freelancing / Intern Role
                  </p>
                </div>
                <Link
                  href="/careers"
                  className="inline-flex shrink-0 items-center gap-2 bg-black px-3 py-2 text-sm font-medium text-red-500 backdrop-blur-sm transition hover:hover:bg-white"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Link>
              </div>

              {/* <p className="relative mt-4 max-w-lg text-sm leading-6 text-black/62">
                Join Glenn&apos;s creative team to build match creatives, edits,
                announcement assets, promo visuals, and branded content for the
                esports community.
              </p> */}

              <div className="relative mt-5 grid gap-0 bg-black text-sm">
                {[
                  ["Openings", "4"],
                  ["Type", "Freelancing / Intern"],
                  ["Salary", "Discussion in chat"],
                  ["Flexibility", "Flexible timing"],
                  ["Contact", "glennesports7@gmail.com"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`grid grid-cols-[110px_1fr] gap-3 px-4 py-3 ${
                      index !== 0 ? "border-t border-red-500" : ""
                    }`}
                  >
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/82">
                      {label}
                    </span>
                    <span className="text-red-500">{value}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="relative flex min-h-full flex-col bg-[#fffdfa] p-4 sm:p-5 lg:p-6 xl:p-7">
              <div className="absolute right-0 top-0 h-20 w-20 bg-[radial-gradient(circle_at_top_right,_rgba(200,255,0,0.16),_transparent_70%)]" />
              <div className="relative border-b border-black/10 pb-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-black/40">
                  Freelancing / Intern Application
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black sm:text-[2rem]">
                  Submit your application
                </h2>
                {/* <p className="mt-2 max-w-2xl text-sm leading-6 text-black/58">
                  Fill out the form below. Keep it direct, include the page where we
                  can review your work, and we can discuss pay and workflow in chat.
                </p> */}
              </div>

              <form className="relative mt-5 flex flex-1 flex-col gap-4 lg:gap-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 rounded-sm border border-black/10 bg-[#fcfbf7] p-4 lg:grid-cols-2">
                  <div className="space-y-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45">
                      Full Name
                    </label>
                    <input
                      value={applicantName}
                      onChange={(event) => setApplicantName(event.target.value)}
                      placeholder="Enter your full name"
                      className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/28 focus:border-[#eb6c2f]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45">
                      Phone Number
                    </label>
                    <input
                      value={applicantPhone}
                      onChange={(event) => setApplicantPhone(event.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/28 focus:border-[#eb6c2f]"
                    />
                  </div>
                </div>

                <div className="grid gap-4 rounded-sm border border-black/10 bg-[#fcfbf7] p-4">
                  <div className="max-w-sm space-y-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45">
                      Experience In Months
                    </label>
                    <input
                      value={experienceMonths}
                      onChange={(event) => setExperienceMonths(event.target.value)}
                      inputMode="numeric"
                      placeholder="Enter total experience in months"
                      className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/28 focus:border-[#eb6c2f]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(event) => setDescription(event.target.value)}
                      placeholder="Tell us about your editing style, design work, tools you use, and what type of content you have created."
                      className="min-h-36 w-full resize-none border border-black/15 bg-white px-4 py-3 text-sm leading-6 text-black outline-none transition placeholder:text-black/28 focus:border-[#eb6c2f] sm:min-h-44"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-black/45">
                      Portfolio / Page URL
                    </label>
                    <input
                      value={pageUrl}
                      onChange={(event) => setPageUrl(event.target.value)}
                      placeholder="Instagram, Behance, Drive, portfolio site, or edit page link"
                      className="w-full border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/28 focus:border-[#eb6c2f]"
                    />
                  </div>
                </div>

                {message ? (
                  <div
                    className={`border px-4 py-3 text-sm ${
                      applicationId
                        ? "border-black bg-black text-white shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
                        : "border-[#eb6c2f]/25 bg-[#fff1ea] text-black"
                    }`}
                  >
                    {message}
                    {applicationId ? (
                      <span className="mt-1 block text-white/72">
                        Application ID: {applicationId}
                      </span>
                    ) : null}
                  </div>
                ) : null}

                <div className="mt-auto flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex min-w-[190px] items-center justify-center gap-2 border border-black bg-[#111111] px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#c8ff00] hover:text-black disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#111111] disabled:hover:text-white"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </button>
                  <Link
                    href="/careers"
                    className="inline-flex min-w-[190px] items-center justify-center border border-black/15 bg-white px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] text-black transition hover:border-[#eb6c2f] hover:text-[#eb6c2f]"
                  >
                    Back To Careers
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
