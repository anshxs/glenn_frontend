"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

import { LandingFooter } from "@/components/home/landing-footer";
import { LandingHeader } from "@/components/home/landing-header";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const timeSlots = ["12 PM", "3 PM", "6 PM", "9 PM", "12 AM"] as const;

const roles = [
  {
    slug: "scrims-host-pt-maker",
    team: "Scrims",
    title: "Host + PT Maker",
    description: "Handle scrims hosting, PT making, and lobby flow for Glenn scrims.",
  },
  {
    slug: "graphic-designer-editor",
    team: "Creative",
    title: "Graphic Designer + Editor",
    description:
      "Create match creatives, edits, promo assets, and visual content for Glenn.",
  },
] as const;

type RoleSlug = (typeof roles)[number]["slug"];
type DayName = (typeof days)[number];
type AvailabilityState = Record<DayName, string[]>;

function getInitialAvailability(): AvailabilityState {
  return {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
}

export default function CareersPage() {
  const [activeRole, setActiveRole] = useState<RoleSlug | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [experienceMonths, setExperienceMonths] = useState("");
  const [availability, setAvailability] = useState<AvailabilityState>(
    getInitialAvailability(),
  );
  const [description, setDescription] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedRole = roles.find((role) => role.slug === activeRole) ?? null;

  const selectedSlotsCount = useMemo(
    () =>
      Object.values(availability).reduce(
        (total, daySlots) => total + daySlots.length,
        0,
      ),
    [availability],
  );

  function resetForm() {
    setApplicantName("");
    setApplicantPhone("");
    setExperienceMonths("");
    setAvailability(getInitialAvailability());
    setDescription("");
    setPageUrl("");
    setMessage("");
    setApplicationId("");
  }

  function openRole(roleSlug: RoleSlug) {
    resetForm();
    setActiveRole(roleSlug);
  }

  function closeRole() {
    resetForm();
    setActiveRole(null);
  }

  function toggleSlot(day: DayName, time: string) {
    setAvailability((current) => {
      const currentDay = current[day];
      const hasSlot = currentDay.includes(time);

      return {
        ...current,
        [day]: hasSlot
          ? currentDay.filter((slot) => slot !== time)
          : [...currentDay, time],
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setApplicationId("");

    if (!selectedRole) {
      setMessage("Choose a role.");
      return;
    }

    if (!applicantName.trim() || !applicantPhone.trim()) {
      setMessage("Name and phone number are required.");
      return;
    }

    if (!experienceMonths.trim()) {
      setMessage("Experience in months is required.");
      return;
    }

    if (selectedRole.slug === "scrims-host-pt-maker" && selectedSlotsCount === 0) {
      setMessage("Choose at least one time slot.");
      return;
    }

    if (selectedRole.slug === "graphic-designer-editor" && !description.trim()) {
      setMessage("Description is required.");
      return;
    }

    if (selectedRole.slug === "graphic-designer-editor" && !pageUrl.trim()) {
      setMessage("Page URL is required.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roleSlug: selectedRole.slug,
          applicantName,
          applicantPhone,
          experienceMonths: Number(experienceMonths),
          availability:
            selectedRole.slug === "scrims-host-pt-maker" ? availability : undefined,
          description:
            selectedRole.slug === "graphic-designer-editor"
              ? description
              : undefined,
          pageUrl:
            selectedRole.slug === "graphic-designer-editor" ? pageUrl : undefined,
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
      setAvailability(getInitialAvailability());
      setDescription("");
      setPageUrl("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Application failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#ffffff] text-black">
      <LandingHeader activeHref="/careers" />

      <section className="flex min-h-[calc(100vh-5rem)] w-full items-stretch px-3 py-3 sm:px-4 lg:px-5">
        <div className="flex w-full flex-1 flex-col border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.06)] sm:p-5">
          {!selectedRole ? (
            <>
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/40">
                    Careers
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Careers at Glenn
                  </h1>
                </div>
              </div>

              <div className="mt-4 grid flex-1 gap-4 lg:grid-cols-2">
                {roles.map((role) => (
                  <div
                    key={role.slug}
                    className="flex flex-col justify-between border border-black/10 bg-[#fcfcf9] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.04)]"
                  >
                    <div>
                      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/40">
                        {role.team}
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-black">
                        {role.title}
                      </h2>
                      <p className="mt-4 text-sm leading-7 text-black/55">
                        {role.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openRole(role.slug)}
                      className="mt-8 inline-flex items-center justify-center border border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      Apply now
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/40">
                    Apply
                  </p>
                  <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    {selectedRole.team} - {selectedRole.title}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={closeRole}
                  className="inline-flex items-center gap-2 border border-black/10 bg-white px-4 py-2 text-sm font-medium text-black transition hover:border-black/25"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              </div>

              <form
                className="mt-4 flex flex-1 flex-col gap-4 border border-black/10 bg-[#fcfcf9] p-4"
                onSubmit={handleSubmit}
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black/65">
                      Name
                    </label>
                    <input
                      value={applicantName}
                      onChange={(event) => setApplicantName(event.target.value)}
                      placeholder="Enter name"
                      className="w-full border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-black/65">
                      Phone number
                    </label>
                    <input
                      value={applicantPhone}
                      onChange={(event) => setApplicantPhone(event.target.value)}
                      placeholder="Enter phone number"
                      className="w-full border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black/30"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-black/65">
                      Experience in months
                    </label>
                    <input
                      value={experienceMonths}
                      onChange={(event) => setExperienceMonths(event.target.value)}
                      inputMode="numeric"
                      placeholder="0"
                      className="w-full border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black/30"
                    />
                  </div>
                </div>

                {selectedRole.slug === "scrims-host-pt-maker" ? (
                  <div className="border border-black/10 bg-white p-4">
                    <div>
                      <p className="text-sm font-medium text-black/75">
                        Availability
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-black/40">
                        Choose multiple slots
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {days.map((day) => (
                        <div
                          key={day}
                          className="border border-black/10 bg-[#fcfcf9] p-2"
                        >
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black">
                            {day.slice(0, 3)}
                          </p>
                          <div className="mt-2 grid gap-1">
                            {timeSlots.map((slot) => {
                              const active = availability[day].includes(slot);

                              return (
                                <button
                                  key={`${day}-${slot}`}
                                  type="button"
                                  onClick={() => toggleSlot(day, slot)}
                                  className={`border px-2 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] transition ${
                                    active
                                      ? "border-black bg-black text-white"
                                      : "border-black/10 bg-white text-black/65 hover:border-black/25"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                    <div className="border border-black/10 bg-white p-4">
                      <label className="mb-2 block text-sm font-medium text-black/65">
                        Description
                      </label>
                      <textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder="Tell us about your editing, design style, tools, and work."
                        className="min-h-40 w-full resize-none border border-black/10 bg-[#fcfcf9] px-4 py-3 text-black outline-none transition focus:border-black/30"
                      />
                    </div>

                    <div className="border border-black/10 bg-white p-4">
                      <label className="mb-2 block text-sm font-medium text-black/65">
                        Page URL
                      </label>
                      <input
                        value={pageUrl}
                        onChange={(event) => setPageUrl(event.target.value)}
                        placeholder="Instagram, portfolio, drive, or edit page link"
                        className="w-full border border-black/10 bg-[#fcfcf9] px-4 py-3 text-black outline-none transition focus:border-black/30"
                      />
                    </div>
                  </div>
                )}

                {message && (
                  <div
                    className={`border px-4 py-3 text-sm ${
                      applicationId
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white text-black"
                    }`}
                  >
                    {message}
                    {applicationId ? (
                      <span className="mt-1 block text-white/72">
                        Application ID: {applicationId}
                      </span>
                    ) : null}
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 border border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      "Submit application"
                    )}
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black transition hover:border-black/25"
                  >
                    Back home
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </section>

      <LandingFooter />
    </main>
  );
}
