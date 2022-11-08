import axios from "axios";
import { useState, FormEvent } from "react";

export default function Home() {
  const [personName, setPersonName] = useState("");

  function handleGenerateCertificate(event: FormEvent) {
    event.preventDefault();
    axios.post("http://localhost:3080/generate", {
      personName,
    });
    setPersonName("");
  }

  return (
    <div className="flex flex-col items-center gap-3 justify-center mt-48">
      <h1 className="px-2 sm:px-0 text-white font-bold text-2xl sm:text-5xl text-center">
        Obrigado por participar do evento!
      </h1>
      <span className="px-2 sm:px-0 text-white text-xl md:text-3xl text-center">
        Digite seu nome abaixo e obtenha seu certificiado.
      </span>
      <form
        onSubmit={handleGenerateCertificate}
        className="flex w-full flex-col sm:flex-row items-center gap-2 mt-9 justify-center"
      >
        <input
          value={personName}
          onChange={(e) => setPersonName(e.target.value)}
          placeholder="Insira o seu nome"
          className="w-[80%] max-w-sm bg-gray-500 py-4 px-6 rounded text-gray-200 border-gray-800 border-2 outline-none focus:outline-blue-500"
          type="text"
          required
        />
        <button className="w-[80%] max-w-sm md:max-w-[220px] bg-blue-500 py-4 px-6 rounded font-bold transition-colors hover:bg-blue-200">
          GERAR CERTIFICADO
        </button>
      </form>
    </div>
  );
}
