import Task from "@/components/task";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "../../../styles/film-grain.css";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (session?.user) {
    return (
      <div className="hero">
        <div className="overlay">
          <Task />
        </div>
      </div>
    );
  }
  return <h2 className="text-white">Login to see page</h2>;
}
