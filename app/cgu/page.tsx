import { redirect } from "next/navigation";

// CGU redirects to /conditions (canonical page)
export default function CGUPage() {
  redirect("/conditions");
}
