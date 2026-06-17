"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";

import { LandingHeader } from "@/components/home/landing-header";

type ComplaintType = "management_member" | "management_general";

type ManagementPerson = {
  name: string;
  phone: string;
};

export default function ComplaintsPage() {
  const [people, setPeople] = useState<ManagementPerson[]>([]);
  const [loadingPeople, setLoadingPeople] = useState(true);
  const [complaintType, setComplaintType] =
    useState<ComplaintType>("management_member");
  const [selectedPersonKey, setSelectedPersonKey] = useState("");
  const [complaintText, setComplaintText] = useState("");
  const [message, setMessage] = useState("");
  const [successId, setSuccessId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadPeople() {
      try {
        const response = await fetch("/api/complaints");
        const result = (await response.json()) as {
          ok?: boolean;
          people?: ManagementPerson[];
          error?: string;
        };

        if (!response.ok || !result.ok) {
          throw new Error(result.error || "Failed to load people.");
        }

        if (!ignore) {
          setPeople(result.people ?? []);
        }
      } catch (error) {
        if (!ignore) {
          setMessage(
            error instanceof Error ? error.message : "Failed to load people.",
          );
        }
      } finally {
        if (!ignore) {
          setLoadingPeople(false);
        }
      }
    }

    loadPeople();

    return () => {
      ignore = true;
    };
  }, []);

  const selectedPerson = useMemo(
    () =>
      people.find(
        (person) => `${person.name}::${person.phone}` === selectedPersonKey,
      ),
    [people, selectedPersonKey],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccessId("");

    if (complaintType === "management_member" && !selectedPerson) {
      setMessage("Choose a person.");
      return;
    }

    if (!complaintText.trim()) {
      setMessage("Write complaint first.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaintType,
          sourceContext: "championship_s1",
          targetName: selectedPerson?.name ?? "",
          targetPhone: selectedPerson?.phone ?? "",
          complaintText,
        }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        complaintId?: string;
        error?: string;
      };

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Complaint failed.");
      }

      setComplaintText("");
      setSelectedPersonKey("");
      setSuccessId(result.complaintId ?? "");
      setMessage("Submitted successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Complaint failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#ffffff] text-black">
      <LandingHeader activeHref="/complaints" />

      <section className="flex h-[calc(100vh-5rem)] w-full items-stretch px-3 py-2 sm:px-4 lg:px-5">
        <div className="flex h-full w-full flex-1 flex-col border border-black/10 bg-white p-4 shadow-[0_24px_80px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/40">
                Complaints
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                Raise a complaint
              </h1>
            </div>
            <div className=" border border-black/10 bg-[#ffffff] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-black/40">
              Quick form
            </div>
          </div>

          <div className="mt-4 max-h-min grid flex-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
            <div className="border border-black/10 bg-[#fcfcf9] p-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/40">
                Type
              </p>
              <div className="mt-3 flex border border-black/10 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setComplaintType("management_member")}
                  className={`flex-1 px-4 py-2 text-center transition ${
                    complaintType === "management_member"
                      ? "bg-black text-white"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  <p className="text-[12px] font-semibold">Specific person</p>
                </button>

                <button
                  type="button"
                  onClick={() => setComplaintType("management_general")}
                  className={`flex-1 px-4 py-3 text-center transition ${
                    complaintType === "management_general"
                      ? "bg-black text-white"
                      : "text-black/55 hover:text-black"
                  }`}
                >
                  <p className="text-[12px] font-semibold">Whole management</p>
                </button>
              </div>
            </div>

            <div className="border border-black/10 bg-[#fcfcf9] p-4">
              <form className="flex h-full flex-col gap-4" onSubmit={handleSubmit}>
                {complaintType === "management_member" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-black/65">
                      Person
                    </label>
                    <select
                      value={selectedPersonKey}
                      onChange={(event) => setSelectedPersonKey(event.target.value)}
                      disabled={loadingPeople}
                      className="w-full border border-black/10 bg-white px-4 py-3 text-black outline-none transition focus:border-black/30 disabled:opacity-60"
                    >
                      <option value="">
                        {loadingPeople ? "Loading..." : "Select person"}
                      </option>
                      {people.map((person) => (
                        <option
                          key={`${person.name}::${person.phone}`}
                          value={`${person.name}::${person.phone}`}
                        >
                          {person.name} - {person.phone}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* {complaintType === "management_member" && selectedPerson && (
                  <div className="border border-black/10 bg-white px-4 py-3 text-sm text-black/60">
                    {selectedPerson.name} ({selectedPerson.phone})
                  </div>
                )} */}

                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-black/65">
                    Complaint
                  </label>
                  <textarea
                    rows={4}
                    value={complaintText}
                    onChange={(event) => setComplaintText(event.target.value)}
                    placeholder="Write complaint"
                    className="h-[170px] w-full resize-none border border-black/10 bg-white px-4 py-3 text-black outline-none transition placeholder:text-black/28 focus:border-black/30"
                  />
                </div>

                {message && (
                  <div
                    className={` border px-4 py-3 text-sm ${
                      successId
                        ? "border-black bg-black text-white"
                        : "border-black/10 bg-white text-black"
                    }`}
                  >
                    {message}
                    {successId ? (
                      <span className="mt-1 block text-white/72">
                        Complaint ID: {successId}
                      </span>
                    ) : null}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2  border border-black bg-black px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
                  <Link
                    href="/championships/s1"
                    className="inline-flex items-center justify-center gap-2  border border-black/10 bg-white px-6 py-3 text-sm font-medium text-black transition hover:border-black/25"
                  >
                    Back
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
