import type { Metadata } from "next";

import DeleteAccountClient from "./DeleteAccountClient";

export const metadata: Metadata = {
  title: "Delete Account",
  description: "Delete your GLENN account and linked data.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DeleteAccountPage() {
  return <DeleteAccountClient />;
}
