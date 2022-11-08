import axios from "axios";
import { format } from "date-fns";

import ptBr from "date-fns/locale/pt-BR";

import { FormEvent, useState } from "react";
import {
  CertificateData,
  CertificateDataProps,
} from "../components/CertificateData";

export default function Validar() {
  const [certificateId, setCertificateId] = useState("");
  const [certificateData, setCertificateData] = useState<CertificateDataProps>({
    name: "",
    generatedAt: "",
    certificateCode: "",
  });

  function formatDateToMyTimeZone(date: Date) {
    let localDate = new Date(date);
    return String(localDate);
  }

  let formatedDate;

  async function handleValidateCertificate(event: FormEvent) {
    event.preventDefault();
    try {
      axios
        .get(`http://localhost:3080/validate/${certificateId}`)
        .then((response) => {
          if (response.data.personCertificate != null) {
            let dateToTimestamp = new Date(
              response.data.personCertificate.generatedAt
            ).getTime();
            const formatedData = {
              name: response.data.personCertificate.name,
              certificateCode: response.data.personCertificate.certificateCode,
              generatedAt: format(
                dateToTimestamp,
                "'Dia' dd 'de' MMMM', às ' HH:mm'h'",
                { locale: ptBr }
              ),
            };
            console.log(formatedData);
            setCertificateData(formatedData);
          } else {
            alert("O código deste certificado não foi encontrado.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-white font-bold text-2xl sm:text-5xl text-center">
        Validar certificado
      </h1>
      <form
        onSubmit={handleValidateCertificate}
        className="flex w-full flex-col sm:flex-row items-center gap-2 mt-9 justify-center"
      >
        <input
          onChange={(e) => setCertificateId(e.target.value)}
          placeholder="Insira o código do certificado"
          className="w-[80%] max-w-sm bg-gray-500 py-4 px-6 rounded text-gray-200 border-gray-800 border-2 outline-none focus:outline-blue-500"
          type="text"
          required
        />
        <button className="w-[80%] max-w-sm md:max-w-[180px] bg-blue-500 py-4 px-6 rounded font-bold transition-colors hover:bg-blue-200">
          VALIDAR
        </button>
      </form>
      {certificateData.name ? (
        <CertificateData
          name={certificateData.name}
          generatedAt={certificateData.generatedAt}
          certificateCode={certificateData.certificateCode}
        />
      ) : null}
    </div>
  );
}
