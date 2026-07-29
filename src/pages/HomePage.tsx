import { Link } from "react-router-dom";
import { subjects } from "../data/subjects";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-amber-50 p-10">
      <h1 className="mb-8 text-4xl font-bold text-center text-amber-900">
        Quiz Platform
      </h1>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            to={`/exam/${subject.id}`}
            className="rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-2xl font-bold text-amber-700">
              {subject.code}
            </h2>

            <p className="mt-2 text-amber-600">{subject.name}</p>

            <button className="mt-5 w-full rounded-lg bg-amber-600 py-2 text-white hover:bg-amber-700">
              Start Exam
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
